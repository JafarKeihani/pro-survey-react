import React, { useState } from "react";
import { addRecord } from "../../../data/indexedDBNCokhteman"; // مسیر فایل indexedDB.js

const AddProjectForm = () => {
  // وضعیت برای ذخیره مقادیر فرم
  const [formData, setFormData] = useState({
    projectCode: "",
    address: "",
    ownerPhone: "",
    coordinator: "",
    coordinatorPhone: "",
    hasCommitment: false,
    allocationBasis: "",
    tariffBasis: "",
    separationBasis: "",
    status: "",
  });

  // وضعیت برای نمایش پیام
  const [message, setMessage] = useState("");

  // تغییرات فرم
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ارسال فرم
  const handleSubmit = (e) => {
    e.preventDefault();

    // ذخیره داده‌ها در IndexedDB
    addRecord("projects_basic", formData)
      .then(() => {
        setMessage("اطلاعات با موفقیت ذخیره شد!");
        setFormData({
          projectCode: "",
          address: "",
          ownerPhone: "",
          coordinator: "",
          coordinatorPhone: "",
          hasCommitment: false,
          allocationBasis: "",
          tariffBasis: "",
          separationBasis: "",
          status: "",
        });
      })
      .catch((error) => {
        setMessage("خطا در ذخیره اطلاعات.");
        console.error(error);
      });
  };

  return (
    <div>
      <h2>افزودن اطلاعات پروژه</h2>
      <form onSubmit={handleSubmit}>
        {/* ورودی‌های فرم */}
        <div>
          <label>کد رهگیری:</label>
          <input
            type="text"
            name="projectCode"
            value={formData.projectCode}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>آدرس:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>شماره تماس مالک:</label>
          <input
            type="text"
            name="ownerPhone"
            value={formData.ownerPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>هماهنگ کننده:</label>
          <input
            type="text"
            name="coordinator"
            value={formData.coordinator}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>شماره تماس هماهنگ کننده:</label>
          <input
            type="text"
            name="coordinatorPhone"
            value={formData.coordinatorPhone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>آیا تعهد دارد؟</label>
          <input
            type="checkbox"
            name="hasCommitment"
            checked={formData.hasCommitment}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>مبنای اختصاص:</label>
          <input
            type="text"
            name="allocationBasis"
            value={formData.allocationBasis}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>مبنای تعرفه:</label>
          <input
            type="text"
            name="tariffBasis"
            value={formData.tariffBasis}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>مبنای تفکیک:</label>
          <input
            type="text"
            name="separationBasis"
            value={formData.separationBasis}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>وضعیت:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>

        <button type="submit">ذخیره اطلاعات</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProjectForm;

// 📄 Summary:
// - فایل addProjectForm.jsx ساخته شد.
// -  فرم اضافه کردن یک فیلد جدید به دیتا بیس
// - در فایل DataManagment.jsx استفاده می شود
// - نمونه اولیه نیاز به اصلاحات اساسی دارد
