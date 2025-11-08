// src/services/authService.js
/**
 * ============================================================
 * ✅ Auth Service – Central Authentication Manager
 * ============================================================
 * این فایل تمام عملیات مربوط به احراز هویت را در یک نقطه مدیریت می‌کند.
 * هدف این است که کامپوننت‌ها فقط توابع را صدا بزنند و درگیر axios،
 * مدیریت خطا، ذخیره‌سازی یا timeout نباشند.
 *
 * 📌 مزایا:
 *  - تمام درخواست‌ها از یک تابع مرکزی (request) عبور می‌کنند
 *  - دارای Timeout برای جلوگیری از قفل شدن درخواست‌ها
 *  - پاسخ خروجی تمامی توابع ساختار ثابت دارد
 *  - پیام‌ها کاملاً انگلیسی و استاندارد هستند
 *  - در صورت تغییر API فقط این فایل باید ویرایش شود
 *
 * ------------------------------------------------------------
 * ✅ ساختار استاندارد پاسخ توابع
 * ------------------------------------------------------------
 * همیشه یک آبجکت با این فرم برمی‌گردد:
 *
 * {
 *   success: Boolean,      // وضعیت موفقیت
 *   message: String,       // پیام استاندارد برای UI
 *   data / user / users    // محتوای بازگشتی در صورت موفقیت
 * }
 *
 * ------------------------------------------------------------
 * ✅ پیام‌های ثابت
 * ------------------------------------------------------------
 * "REGISTER_SUCCESS"
 * "REGISTER_FAILED"
 * "LOGIN_SUCCESS"
 * "LOGIN_FAILED"
 * "LOGOUT_SUCCESS"
 * "USER_FOUND"
 * "INVALID_TOKEN"
 * "USERS_FETCHED"
 * "UNAUTHORIZED"
 * "REQUEST_TIMEOUT"
 * "REQUEST_FAILED"
 *
 * ------------------------------------------------------------
 * ✅ لیست توابع و ورودی/خروجی‌ها
 * ------------------------------------------------------------
 * 1) registerUser(username, password, role)
 *    → ثبت نام و ساخت کاربر جدید
 *    ← success, message, user
 *
 * 2) loginUser(username, password)
 *    → ورود کاربر و دریافت token
 *    ← success, message, token, user
 *
 * 3) logoutUser()
 *    → پاک‌سازی token و user از localStorage
 *    ← success, message
 *
 * 4) getUserInfo(token)
 *    → گرفتن اطلاعات کاربری از سرور
 *    ← success, message, user
 *
 * 5) getAllUsers(token)
 *    → لیست کاربران (فقط برای admin)
 *    ← success, message, users
 *
 * ------------------------------------------------------------
 * ✅ اگر API تغییر کند؟
 * فقط این فایل را ویرایش کن،
 * تمام کامپوننت‌ها بدون تغییر همچنان کار می‌کنند.
 *
 * ============================================================
 */

import axios from "axios";

const API_URL = "http://localhost:5000";
const TIMEOUT = 7000; // 7 seconds

// ✅ تابع عمومی برای درخواست‌های axios با Timeout
async function request(method, url, data = {}, token = null) {
  try {
    // const controller = new AbortController();
    // const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const config = {
      method,
      url: API_URL + url,
      data,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios(config);
    // clearTimeout(timeoutId);

    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    // if (err.name === "CanceledError") {
    // return { success: false, message: "REQUEST_TIMEOUT" ,
    //  error: err.response?.data || err.message || null,
    // };
    // }

    return {
      success: false,
      message: "REQUEST_FAILED",
      error: err.response?.data || null,
    };
  }
}

// ✅ ثبت‌نام
export const registerUser = async (username, password, role = "userNezam") => {
  const res = await request("POST", "/register", { username, password, role });

  if (!res.success) return { success: false, message: "REGISTER_FAILED" };

  return {
    success: true,
    message: "REGISTER_SUCCESS",
    user: res.data.user,
  };
};

// ✅ ورود
export const loginUser = async (username, password) => {
  console.log("Sending login request...", { username, password });

  const res = await request("POST", "/login", { username, password });
  console.log("Server responded", res.data);
  if (!res.success) return { success: false, message: "LOGIN_FAILED" };

  return {
    success: true,
    message: "LOGIN_SUCCESS",
    token: res.data.token,
    user: res.data.user,
  };
};

// ✅ خروج
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return { success: true, message: "LOGOUT_SUCCESS" };
};

// ✅ دریافت اطلاعات کاربر
export const getUserInfo = async (token) => {
  const res = await request("GET", "/user", {}, token);

  if (!res.success) return { success: false, message: "INVALID_TOKEN" };

  return {
    success: true,
    message: "USER_FOUND",
    user: res.data.user,
  };
};

// ✅ لیست کاربران
export const getAllUsers = async (token) => {
  const res = await request("GET", "/users", {}, token);

  if (!res.success) return { success: false, message: "UNAUTHORIZED" };

  return {
    success: true,
    message: "USERS_FETCHED",
    users: res.data.users,
  };
};
