// ✅ src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000";
const TIMEOUT = 7000;

// ✅ عمومی با کوکی
async function request(method, url, data = {}) {
  try {
    const res = await axios({
      method,
      url: API_URL + url,
      data,
      timeout: TIMEOUT,
      withCredentials: true, // ✅ مهم برای ارسال/دریافت کوکی
      headers: { "Content-Type": "application/json" },
    });

    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "REQUEST_FAILED",
      error: err.response?.data || null,
    };
  }
}

/* ============================================================
   ✅ Register
============================================================ */
export const registerUser = async (username, password, role = "user") => {
  const res = await request("POST", "/auth/register", {
    username,
    password,
    role,
  });

  if (!res.data.success)
    return { success: false, message: res.data.message || "REGISTER_FAILED" };

  return {
    success: true,
    message: "REGISTER_SUCCESS",
    user: res.data.user,
  };
};

/* ============================================================
   ✅ Login
============================================================ */
export const loginUser = async (username, password) => {
  const res = await request("POST", "/auth/login", { username, password });

  if (!res.data.success)
    return { success: false, message: res.data.message || "LOGIN_FAILED" };

  return {
    success: true,
    message: "LOGIN_SUCCESS",
    user: res.data.user,
  };
};

/* ============================================================
   ✅ Logout
============================================================ */
export const logoutUser = async () => {
  const res = await request("POST", "/auth/logout");

  return {
    success: res.data.success,
    message: "LOGOUT_SUCCESS",
  };
};

/* ============================================================
   ✅ Get current user
============================================================ */
export const getUserInfo = async () => {
  const res = await request("GET", "/auth/user");

  if (!res.success) {
    return { success: false, message: "INVALID_TOKEN" };
  }

  return {
    success: true,
    user: res.data.user,
  };
};

/* ============================================================
   ✅ Admin: Get all users
============================================================ */
export const getAllUsers = async () => {
  const res = await request("GET", "/auth/users");

  if (!res.data.success)
    return { success: false, message: res.data.message || "UNAUTHORIZED" };

  return {
    success: true,
    users: res.data.users,
  };
};
