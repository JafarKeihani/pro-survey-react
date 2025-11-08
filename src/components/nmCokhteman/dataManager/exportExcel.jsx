// src/Components/ExportExcel.js

import * as XLSX from "xlsx";

// تابع برای ایجاد شیت با کلیدها و labelها
const createSheetWithHeaders = (records, sheetName, fieldLabels) => {
  if (!records || records.length === 0) {
    console.warn(`${sheetName} داده‌ها خالی است!`);

    // وقتی داده‌ها خالی هستند، سطر اول کلیدها و سطر دوم برچسب‌ها رو اضافه می‌کنیم
    const fieldKeys = Object.keys(fieldLabels); // کلیدها رو از fieldLabels می‌گیریم
    const sheetData = [
      fieldKeys, // سطر اول: کلیدها
      Object.values(fieldLabels), // سطر دوم: برچسب‌ها
    ];

    // ایجاد شیت از داده‌ها
    return XLSX.utils.aoa_to_sheet(sheetData);
  }

  // اگر داده‌ها موجود باشند، از آن‌ها استفاده می‌کنیم
  const fieldKeys = Object.keys(records[0]);

  // تبدیل داده‌ها به آرایه برای اکسل
  const sheetData = [
    fieldKeys, // سطر اول: کلیدها
    ...records.map((record) => fieldKeys.map((field) => record[field])), // سطرهای داده
  ];

  // برگرداندن داده‌ها به شیت اکسل
  return XLSX.utils.aoa_to_sheet(sheetData);
};

// تابع برای Export به اکسل
export const exportToExcel = (dataSets, labels) => {
  const wb = XLSX.utils.book_new();

  // بررسی و افزودن هر بخش داده به شیت‌ها
  if (dataSets.basic && dataSets.basic.length) {
    const wsBasic = createSheetWithHeaders(
      dataSets.basic,
      "Basic",
      labels.basic
    );
    XLSX.utils.book_append_sheet(wb, wsBasic, "Basic");
  } else {
    const wsBasic = createSheetWithHeaders([], "Basic", labels.basic); // اگر خالی بود، فقط کلیدها و برچسب‌ها رو اضافه می‌کنیم
    XLSX.utils.book_append_sheet(wb, wsBasic, "Basic");
  }

  if (dataSets.details && dataSets.details.length) {
    const wsDetails = createSheetWithHeaders(
      dataSets.details,
      "Details",
      labels.details
    );
    XLSX.utils.book_append_sheet(wb, wsDetails, "Details");
  } else {
    const wsDetails = createSheetWithHeaders([], "Details", labels.details); // اگر خالی بود، فقط کلیدها و برچسب‌ها رو اضافه می‌کنیم
    XLSX.utils.book_append_sheet(wb, wsDetails, "Details");
  }

  if (dataSets.status && dataSets.status.length) {
    const wsStatus = createSheetWithHeaders(
      dataSets.status,
      "Status",
      labels.status
    );
    XLSX.utils.book_append_sheet(wb, wsStatus, "Status");
  } else {
    const wsStatus = createSheetWithHeaders([], "Status", labels.status); // اگر خالی بود، فقط کلیدها و برچسب‌ها رو اضافه می‌کنیم
    XLSX.utils.book_append_sheet(wb, wsStatus, "Status");
  }

  // چک می‌کنیم که آیا چیزی به ورک‌بوک اضافه شده است یا نه
  if (wb.SheetNames.length > 0) {
    XLSX.writeFile(wb, "project_data.xlsx");
  } else {
    console.error("Workbook خالی است، چیزی برای ذخیره وجود ندارد!");
  }
};
// 📄 Summary:
// - فایل ExportExcel.jsx ساخته شد.
// -   برای خواندن یک فایل اکسل و انتقال ان به دیتابیس استفاده می شود
// - در فایل DataManagment.jsx استفاده می شود
// - نمونه اولیه نیاز به اصلاحات اساسی دارد
