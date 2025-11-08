

import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Style, Icon, Text, Fill, Stroke, Circle as CircleStyle } from "ol/style";
import { parseGlobalCoords } from "./SurvayMath";

const DEFAULT_CENTER = [51.4, 35.7]; // lon, lat (تهران)

const MapView = ({ projects = [], selectedProject = null }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    console.log("✅ Projects in MapView:", projects);

    const baseLayer = new TileLayer({ source: new OSM() });

    // فیچرهای پروژه‌های معتبر
    const validProjects = (projects || []).filter((p) => {
      const coords = parseGlobalCoords(p.globalCoords);
      console.log("🔍 parse:", p.projectCode, "->", p.globalCoords, "=>", coords);
      return coords !== null;
    });

    const projectFeatures = validProjects.map((p) => {
      const { lon, lat } = parseGlobalCoords(p.globalCoords);
      const feat = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        projectCode: p.projectCode,
        ownerName: p.ownerName || p.projectName || "",
        label: `${p.ownerName || p.projectName || "پروژه"} (${p.projectCode || "-"})`,
      });

      const isSelected = selectedProject && selectedProject.projectCode === p.projectCode;
      if (isSelected) {
        // Selected: blue circular marker, larger
        feat.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 9,
              fill: new Fill({ color: "#0d6efd" }),
              stroke: new Stroke({ color: "#ffffff", width: 2 }),
            }),
            text: new Text({
              text: feat.get("label"),
              offsetY: -20,
              fill: new Fill({ color: "#0d6efd" }),
              stroke: new Stroke({ color: "#fff", width: 3 }),
            }),
          })
        );
      } else {
        // Default: small gray pin
        feat.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.05,
            }),
            text: new Text({
              text: feat.get("label"),
              offsetY: -25,
              fill: new Fill({ color: "#111" }),
              stroke: new Stroke({ color: "#fff", width: 3 }),
            }),
          })
        );
      }

      return feat;
    });

    // یک vectorSource مشترک که بعداً می‌تونیم userFeature رو هم بهش اضافه کنیم
    const vectorSource = new VectorSource({ features: projectFeatures });
    const vectorLayer = new VectorLayer({ source: vectorSource });
    vectorSourceRef.current = vectorSource;

    // اگر قبلاً نقشه ساخته شده بود اون رو پاک کن
    if (mapInstance.current) {
      mapInstance.current.setTarget(null);
      mapInstance.current = null;
    }

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, vectorLayer],
      view: new View({
        center: fromLonLat(DEFAULT_CENTER),
        zoom: 7,
      }),
    });

    mapInstance.current = map;

    // فوکوس اولیه: اگر پروژه انتخاب‌شده داریم روی همان زوم کن، وگرنه روی همه فیچرها فیت کن
    if (projectFeatures.length > 0) {
      setTimeout(() => {
        try {
          if (selectedProject) {
            const target = projectFeatures.find(
              (f) => f.get("projectCode") === selectedProject.projectCode
            );
            if (target) {
              const coord = target.getGeometry().getFirstCoordinate();
              map.getView().animate({ center: coord, zoom: 15, duration: 600 });
            }
          } else {
            const extent = vectorSource.getExtent();
            if (extent && !isNaN(extent[0])) {
              map.getView().fit(extent, { padding: [60, 60, 60, 60], maxZoom: 16, duration: 700 });
            }
          }
        } catch (err) {
          console.warn("خطا هنگام تنظیم نمای نقشه:", err);
        }
      }, 200);
    }

    // --- این بخش اکنون همیشه اجرا می‌شود: اضافه کردن موقعیت کاربر (در صورت اجازه) ---
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLon = pos.coords.longitude;
          const userLat = pos.coords.latitude;
          console.log("📍 user position:", userLon, userLat);

          const userFeature = new Feature({
            geometry: new Point(fromLonLat([userLon, userLat])),
            projectCode: "USER_LOCATION",
            ownerName: "موقعیت شما",
          });

          // استایل متمایز: دایره آبی با حاشیه سفید
          userFeature.setStyle(
            new Style({
              image: new CircleStyle({
                radius: 7,
                fill: new Fill({ color: "rgba(0,122,255,0.95)" }),
                stroke: new Stroke({ color: "#fff", width: 2 }),
              }),
              text: new Text({
                text: "شما",
                offsetY: -18,
                fill: new Fill({ color: "#0044cc" }),
                stroke: new Stroke({ color: "#fff", width: 3 }),
              }),
            })
          );

          vectorSource.addFeature(userFeature);

          // اگر هیچ پروژه‌ای نباشد، روی موقعیت کاربر زوم کن، در غیر اینصورت می‌تونیم کاربر هم دیده شود بدون تغییر view
          if (projectFeatures.length === 0) {
            map.getView().animate({ center: fromLonLat([userLon, userLat]), zoom: 13, duration: 700 });
          }
        },
        (err) => {
          console.warn("موقعیت کاربر در دسترس نیست یا رد شده:", err);
          // هیچ کاری لازم نیست — نقشه روی DEFAULT_CENTER می‌ماند
        }
      );
    } else {
      console.warn("Geolocation API در این مرورگر در دسترس نیست.");
    }

    return () => {
      map.setTarget(null);
      mapInstance.current = null;
      vectorSourceRef.current = null;
    };
  }, [projects, selectedProject]);

  // واکنش به تغییر انتخاب پروژه: هایلایت و فوکوس فقط روی انتخاب‌شده
  useEffect(() => {
    if (!mapInstance.current || !vectorSourceRef.current) return;
    const map = mapInstance.current;
    const vectorSource = vectorSourceRef.current;

    const features = vectorSource.getFeatures();
    features.forEach((feat) => {
      const code = feat.get("projectCode");
      const isSelected = selectedProject && selectedProject.projectCode === code;
      const label = feat.get("label") || "";
      if (isSelected) {
        feat.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 9,
              fill: new Fill({ color: "#0d6efd" }),
              stroke: new Stroke({ color: "#ffffff", width: 2 }),
            }),
            text: new Text({
              text: label,
              offsetY: -20,
              fill: new Fill({ color: "#0d6efd" }),
              stroke: new Stroke({ color: "#fff", width: 3 }),
            }),
          })
        );
      } else {
        feat.setStyle(
          new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.05,
            }),
            text: new Text({
              text: label,
              offsetY: -25,
              fill: new Fill({ color: "#111" }),
              stroke: new Stroke({ color: "#fff", width: 3 }),
            }),
          })
        );
      }
    });

    if (selectedProject) {
      const targetFeature = features.find(
        (f) => f.get("projectCode") === selectedProject.projectCode
      );
      if (targetFeature) {
        const geom = targetFeature.getGeometry();
        if (geom) {
          map.getView().animate({ center: geom.getFirstCoordinate(), zoom: 15, duration: 500 });
        }
      }
    }
  }, [selectedProject]);

  return (
    <div
      ref={mapRef}
      id="map"
      style={{
        width: "100%",
        height: "40vh",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    />
  );
};

export default MapView;

// 📄 Summary:
// - فایل MapView.jsx ساخته شد.
// - نمایش موقعیت کاربر و فیلدهای دیتابیس بر روی نقشه
// - اطلاعات فیلد ها را از بخش Section: [01-05]PublicComponent/indexedDBNCokhteman می گیرد
// - نیاز به بازبینی و تکمیل دارد

