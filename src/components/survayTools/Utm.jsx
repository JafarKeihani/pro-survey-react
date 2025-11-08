import React, { useState } from "react";
import UTM from "utm-latlng";
import DataTable from "../compNCokhteman/tableView/DataTable";

const utm = new UTM();

const CoordinateConverter = () => {
  const [mode, setMode] = useState("utmToLatLon");
  const [inputs, setInputs] = useState({
    easting: "",
    northing: "",
    zone: "",
    letter: "",
    lat: "",
    lon: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleConvert = () => {
    try {
      if (mode === "utmToLatLon") {
        const { easting, northing, zone, letter } = inputs;
        if (!easting || !northing || !zone || !letter) {
          alert("لطفاً تمام مقادیر را وارد کنید");
          return;
        }
        const res = utm.convertUtmToLatLng(
          parseFloat(easting),
          parseFloat(northing),
          parseInt(zone),
          letter
        );
        setResult({
          lat: res.lat.toFixed(6),
          lon: res.lng.toFixed(6),
        });
      } else {
        const { lat, lon } = inputs;
        if (!lat || !lon) {
          alert("لطفاً مختصات جغرافیایی را وارد کنید");
          return;
        }
        const res = utm.convertLatLngToUtm(parseFloat(lat), parseFloat(lon));
        setResult(res);
      }
    } catch (err) {
      alert("خطایی در تبدیل رخ داد: " + err.message);
    }
  };

  return (
    <div
      style={{
        background: "#f9fafb",
        padding: "20px",
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "40px auto",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        direction: "rtl",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🔄 ابزار تبدیل مختصات (UTM ↔ WGS84)
      </h2>

      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button
          onClick={() => {
            setMode("utmToLatLon");
            setResult(null);
          }}
          style={{
            background: mode === "utmToLatLon" ? "#4CAF50" : "#ccc",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            margin: "0 5px",
            cursor: "pointer",
          }}
        >
          UTM → WGS84
        </button>

        <button
          onClick={() => {
            setMode("latLonToUtm");
            setResult(null);
          }}
          style={{
            background: mode === "latLonToUtm" ? "#2196F3" : "#ccc",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            margin: "0 5px",
            cursor: "pointer",
          }}
        >
          WGS84 → UTM
        </button>
      </div>

      {/* 🧩 فرم ورودی */}
      {mode === "utmToLatLon" ? (
        <div>
          <label>شرق (Easting):</label>
          <input
            name="easting"
            value={inputs.easting}
            onChange={handleChange}
            style={inputStyle}
          />
          <label>شمال (Northing):</label>
          <input
            name="northing"
            value={inputs.northing}
            onChange={handleChange}
            style={inputStyle}
          />
          <label>زون (Zone):</label>
          <input
            name="zone"
            value={inputs.zone}
            onChange={handleChange}
            style={inputStyle}
          />
          <label>حرف ناحیه (Letter):</label>
          <input
            name="letter"
            value={inputs.letter}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      ) : (
        <div>
          <label>عرض جغرافیایی (Latitude):</label>
          <input
            name="lat"
            value={inputs.lat}
            onChange={handleChange}
            style={inputStyle}
          />
          <label>طول جغرافیایی (Longitude):</label>
          <input
            name="lon"
            value={inputs.lon}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      )}

      <button
        onClick={handleConvert}
        style={{
          background: "#333",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          marginTop: "15px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        تبدیل
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            background: "#eef2f3",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h4>نتیجه:</h4>
          <pre style={{ direction: "ltr" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "8px",
  margin: "6px 0 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  textAlign: "center",
};

export default CoordinateConverter;
