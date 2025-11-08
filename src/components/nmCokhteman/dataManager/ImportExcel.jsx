import React, { useState } from "react";
import * as XLSX from "xlsx";
import { addRecord } from "../../../data/indexedDBNCokhteman";
import {
  fieldUser,
  fieldProject,
  fieldNezam,
} from "../../../data/fieldsConfig";

// تعریف فیلدهای جدول‌ها
let basicKeys = fieldUser.map((field) => field.key); // اصلاح برای basicFields
let detailsKeys = fieldProject.map((field) => field.key); // درست برای detailsFields
let statusKeys = fieldNezam.map((field) => field.key); // اصلاح برای statusFields
let counterID = 1;
const ImportExcel = () => {
  const [message, setMessage] = useState(""); // پیام موفقیت یا خطا

  const handleFile = (e) => {
    const file = e.target.files[0]; // انتخاب فایل
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // فرض می‌کنیم شیت اول
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet); // تبدیل شیت به JSON

      if (jsonData.length === 0) {
        setMessage("⚠️ فایل اکسل خالی است!");
        return;
      }

      // پردازش داده‌ها
      for (let row of jsonData) {
        const basicRecord = {}; // رکورد برای جدول basic
        const detailsRecord = {}; // رکورد برای جدول details
        const statusRecord = {}; // رکورد برای جدول status

        // پردازش هر ردیف داده‌ها
        for (let [excelKey, value] of Object.entries(row)) {
          // بررسی برای جدول basic
          if (basicKeys.includes(excelKey)) basicRecord[excelKey] = value;
          // بررسی برای جدول details
          if (detailsKeys.includes(excelKey)) detailsRecord[excelKey] = value;
          // بررسی برای جدول status
          if (statusKeys.includes(excelKey)) statusRecord[excelKey] = value;
        }

        // ذخیره رکوردها در IndexedDB
        try {
          if (Object.keys(basicRecord).length > 0)
            await addRecord("projects_basic", basicRecord);
          if (Object.keys(detailsRecord).length > 0)
            await addRecord("projects_details", detailsRecord);
          if (Object.keys(statusRecord).length > 0)
            await addRecord("projects_status", statusRecord);
        } catch (err) {
          console.error("❌ خطا در ذخیره رکورد:", err);
        }
      }

      setMessage("✅ داده‌ها با موفقیت از اکسل وارد و ذخیره شدند!");
    };

    reader.readAsArrayBuffer(file); // خواندن فایل به فرمت ArrayBuffer
  };

  return (
    <div
      style={{ padding: "20px", background: "#f4f4f4", borderRadius: "8px" }}
    >
      <h2>📥 وارد کردن اطلاعات از فایل Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImportExcel;
// 📄 Summary:
// - فایل ExportExcel.jsx ساخته شد.
// -   برای خواندن یک فایل اکسل و انتقال ان به دیتابیس استفاده می شود
// - در فایل DataManagment.jsx استفاده می شود
// - نمونه اولیه نیاز به اصلاحات اساسی دارد
