import React, { useState, useEffect } from "react";
import { getAllRecords } from "../../../data/indexedDBNCokhteman"; // مسیر تابع getAllRecords
import AddProjectForm from "../projectView/ProjectDetails";
import ImportExcel from "../dataManager/ImportExcel";
import { exportToExcel } from "../dataManager/exportExcel"; // ایمپورت تابع از فایل ExportExcel.js
import * as XLSX from "xlsx";
import {
  fieldUser,
  fieldProject,
  fieldNezam,
} from "../../../data/fieldsConfig";

const DataManagement = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [projectsData, setProjectsData] = useState([]);

  // خواندن داده‌ها از indexedDB
  useEffect(() => {
    // فرض می‌کنیم که داده‌ها رو از جدول projects_basic می‌گیریم
    getAllRecords("projects_basic")
      .then((data) => {
        setProjectsData(data); // داده‌ها رو در state ذخیره می‌کنیم
      })
      .catch((err) => {
        console.error("خطا در خواندن داده‌ها از دیتابیس:", err);
      });
  }, []); // فقط در بارگذاری اولیه

  // تابع برای ایجاد شیت اکسل با کلیدها و برچسب‌ها
  const createSheetWithHeaders = (records, sheetName, fields) => {
    if (!records || records.length === 0) {
      // اگر رکوردها خالی بود، یک رکورد با کلیدها و برچسب‌ها فقط در نظر بگیر
      const emptyData = fields.map((item) => ({ [item.key]: null }));
      records = emptyData; // رکوردهای خالی به‌طور موقت در نظر گرفته می‌شود
    }

    // اضافه کردن کلیدها و برچسب‌ها به شیت
    const fieldKeys = fields.map((item) => item.key);
    const sheetData = [
      fieldKeys, // سطر اول: کلیدها
      fields.map((item) => item.label), // سطر دوم: برچسب‌ها
      ...records.map((record) => fieldKeys.map((key) => record[key] || "")), // سطرهای بعدی: مقادیر داده‌ها
    ];

    // برگرداندن شیت آماده برای اکسل
    return XLSX.utils.aoa_to_sheet(sheetData);
  };

  // تابع برای export داده‌ها به اکسل
  const handleExport = async () => {
    try {
      // دریافت داده‌ها از دیتابیس
      const basic = await getAllRecords("projects_basic"); // داده‌های basic
      const details = await getAllRecords("projects_details"); // داده‌های details
      const status = await getAllRecords("projects_status"); // داده‌های status

      // چاپ داده‌ها در کنسول برای بررسی
      console.log("داده‌های Basic:", basic);
      console.log("داده‌های Details:", details);
      console.log("داده‌های Status:", status);

      // ارسال داده‌ها به تابع export
      const wb = XLSX.utils.book_new();

      // ساخت شیت‌ها با استفاده از کلیدها و برچسب‌ها
      const wsBasic = createSheetWithHeaders(basic, "Basic", fieldUser);
      XLSX.utils.book_append_sheet(wb, wsBasic, "Basic");

      const wsDetails = createSheetWithHeaders(
        details,
        "Details",
        fieldProject
      );
      XLSX.utils.book_append_sheet(wb, wsDetails, "Details");

      const wsStatus = createSheetWithHeaders(status, "Status", fieldNezam);
      XLSX.utils.book_append_sheet(wb, wsStatus, "Status");

      // ذخیره فایل اکسل
      if (wb.SheetNames.length > 0) {
        XLSX.writeFile(wb, "project_data.xlsx");
      } else {
        console.error("Workbook خالی است، چیزی برای ذخیره وجود ندارد!");
      }
    } catch (error) {
      console.error("خطا در گرفتن داده‌ها برای Export:", error);
    }
  };

  return (
    <div>
      <h2>مدیریت داده‌ها</h2>

      {/* دکمه‌ها برای انتخاب کامپوننت */}
      <button onClick={() => setActiveComponent("importExcel")}>
        بارگذاری فایل اکسل
      </button>

      <button onClick={() => setActiveComponent("addProjectForm")}>
        افزودن پروژه جدید
      </button>

      <button>دانلود اکسل</button>

      {/* نمایش کامپوننت انتخاب‌شده */}
      {activeComponent === "importExcel" && <ImportExcel />}
      {activeComponent === "addProjectForm" && <AddProjectForm />}
    </div>
  );
};

export default DataManagement;
// 📄 Summary:
// - فایل DataManagment.jsx ساخته شد.
// - تولید کننده قالب اصلی برای مدیریت فیلد های دیتا بیس
// - اطلاعات فیلد ها را از بخش Section: [01-05]PublicComponent/indexedDBNCokhteman می گیرد
// - نیاز به بازبینی و اصلاح استایل دارد
