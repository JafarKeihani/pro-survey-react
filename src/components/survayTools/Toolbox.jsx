import React, { useMemo, useState } from "react";
import proj4 from "proj4";

// Minimal core: WGS84 and dynamic UTM
const WGS84 = "WGS84";

function toUtmCrs(zone, hemisphere = "N") {
  const code = hemisphere === "N" ? 32600 + zone : 32700 + zone; // EPSG codes
  return `EPSG:${code}`;
}

const Toolbox = () => {
  const [activeTab, setActiveTab] = useState("convert");

  // Convert tab state
  const [lat, setLat] = useState(35.6892);
  const [lon, setLon] = useState(51.3890);
  const [zone, setZone] = useState(39);
  const [hemisphere, setHemisphere] = useState("N");
  const [easting, setEasting] = useState(0);
  const [northing, setNorthing] = useState(0);

  const utmCrs = useMemo(() => toUtmCrs(Number(zone), hemisphere), [zone, hemisphere]);

  const handleToUTM = () => {
    try {
      const [x, y] = proj4(WGS84, utmCrs, [lon, lat]);
      setEasting(Number(x.toFixed(3)));
      setNorthing(Number(y.toFixed(3)));
    } catch (e) {
      console.error(e);
      alert("خطا در تبدیل به UTM");
    }
  };

  const handleToGeographic = () => {
    try {
      const [lonOut, latOut] = proj4(utmCrs, WGS84, [Number(easting), Number(northing)]);
      setLon(Number(lonOut.toFixed(8)));
      setLat(Number(latOut.toFixed(8)));
    } catch (e) {
      console.error(e);
      alert("خطا در تبدیل به جغرافیایی");
    }
  };

  return (
    <div className="card" dir="rtl">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "convert" ? "active" : ""}`} onClick={() => setActiveTab("convert")}>
              تبدیل مختصات
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "datum" ? "active" : ""}`} onClick={() => setActiveTab("datum")}>
              دیتوم
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "height" ? "active" : ""}`} onClick={() => setActiveTab("height")}>
              ارتفاع
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "units" ? "active" : ""}`} onClick={() => setActiveTab("units")}>
              تبدیل واحد
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeTab === "calc" ? "active" : ""}`} onClick={() => setActiveTab("calc")}>
              ماشین‌حساب
            </button>
          </li>
        </ul>
      </div>

      <div className="card-body">
        {activeTab === "convert" && (
          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <div className="border rounded p-3 h-100">
                <div className="mb-2 fw-bold">جغرافیایی → UTM</div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label">lat (°)</label>
                    <input className="form-control" value={lat} onChange={e => setLat(parseFloat(e.target.value || 0))} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">lon (°)</label>
                    <input className="form-control" value={lon} onChange={e => setLon(parseFloat(e.target.value || 0))} />
                  </div>
                  <div className="col-4">
                    <label className="form-label">زون</label>
                    <input className="form-control" value={zone} onChange={e => setZone(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-label">نیمکره</label>
                    <select className="form-select" value={hemisphere} onChange={e => setHemisphere(e.target.value)}>
                      <option value="N">شمالی (N)</option>
                      <option value="S">جنوبی (S)</option>
                    </select>
                  </div>
                  <div className="col-4 d-flex align-items-end">
                    <button className="btn btn-primary w-100" onClick={handleToUTM}>تبدیل</button>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Easting (m)</label>
                    <input className="form-control" value={easting} readOnly />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Northing (m)</label>
                    <input className="form-control" value={northing} readOnly />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="border rounded p-3 h-100">
                <div className="mb-2 fw-bold">UTM → جغرافیایی</div>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label">Easting (m)</label>
                    <input className="form-control" value={easting} onChange={e => setEasting(parseFloat(e.target.value || 0))} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Northing (m)</label>
                    <input className="form-control" value={northing} onChange={e => setNorthing(parseFloat(e.target.value || 0))} />
                  </div>
                  <div className="col-4">
                    <label className="form-label">زون</label>
                    <input className="form-control" value={zone} onChange={e => setZone(e.target.value)} />
                  </div>
                  <div className="col-4">
                    <label className="form-label">نیمکره</label>
                    <select className="form-select" value={hemisphere} onChange={e => setHemisphere(e.target.value)}>
                      <option value="N">شمالی (N)</option>
                      <option value="S">جنوبی (S)</option>
                    </select>
                  </div>
                  <div className="col-4 d-flex align-items-end">
                    <button className="btn btn-primary w-100" onClick={handleToGeographic}>تبدیل</button>
                  </div>
                  <div className="col-6">
                    <label className="form-label">lat (°)</label>
                    <input className="form-control" value={lat} readOnly />
                  </div>
                  <div className="col-6">
                    <label className="form-label">lon (°)</label>
                    <input className="form-control" value={lon} readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "datum" && (
          <div className="text-muted small">پشتیبانی از هلمرت 7 پارامتری و تعاریف سفارشی به‌زودی اضافه می‌شود.</div>
        )}

        {activeTab === "height" && (
          <div className="text-muted small">تبدیل h↔H با انتخاب مدل ژئوئید (EGM96/2008/گراید محلی) به‌زودی.</div>
        )}

        {activeTab === "units" && (
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <div className="border rounded p-3">
                <div className="fw-bold mb-2">تبدیل طول (m ↔ ft)</div>
                <UnitsLength />
              </div>
            </div>
          </div>
        )}

        {activeTab === "calc" && (
          <div className="text-muted small">ماشین‌حساب مهندسی به‌زودی.</div>
        )}
      </div>
    </div>
  );
};

const UnitsLength = () => {
  const [meters, setMeters] = useState(0);
  const feet = useMemo(() => meters * 3.280839895, [meters]);
  return (
    <div className="row g-2">
      <div className="col-6">
        <label className="form-label">متر</label>
        <input className="form-control" value={meters} onChange={e => setMeters(parseFloat(e.target.value || 0))} />
      </div>
      <div className="col-6">
        <label className="form-label">فوت</label>
        <input className="form-control" value={feet.toFixed(6)} readOnly />
      </div>
    </div>
  );
};

export default Toolbox;



