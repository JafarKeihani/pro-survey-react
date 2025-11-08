// 📁 src/contexts/AuthContext.jsx
/**
 * AuthContext
 * مدیریت وضعیت ورود / خروج کاربر در کل برنامه
 * فقط با authService ارتباط دارد و هیچ درخواست مستقیم axios اینجا نیست
 */
/**
 * AuthContext
 * -------------------------
 * This file manages local authentication state in the browser.
 *
 * Responsibilities:
 * ✅ Stores logged-in user and access token
 * ✅ Provides login / logout functions to all components
 * ✅ Syncs with authService (server communication layer)
 * ✅ Restores session on page reload using localStorage
 *
 * Public Functions:
 *  - login(email, password)
 *      => calls authService.login()
 *      => saves token & user info locally
 *      => returns success / error message
 *
 *  - logout()
 *      => clears local user/token
 *
 *  - getUser()
 *      => returns current logged in user
 *
 * Exposed Values:
 *  - user: current logged-in user (null if logged out)
 *  - token: authentication token
 *  - isAuthenticated: true/false
 *
 * Note:
 * UI never communicates with server directly.
 * UI → AuthContext → authService → server
 */
// ✅ src/contexts/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserInfo,
} from "@services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /** ✅ Login */
  const login = async (username, password) => {
    const result = await loginUser(username, password);

    if (result.success) {
      setUser(result.user); // کاربر در حافظه برنامه
      console.log("AuthContast login -2 :", result.user);
    }

    return result;
  };

  /** ✅ Register */
  const register = async (username, password, role = "user") => {
    return await registerUser(username, password, role);
  };

  /** ✅ Logout */
  const logout = async () => {
    await logoutUser(); // سرور کوکی را پاک می‌کند
    setUser(null);
  };

  /** ✅ Session Restore بعد از رفرش */
  useEffect(() => {
    const restore = async () => {
      const result = await getUserInfo(); // از سرور می‌پرسیم کاربر کیه

      if (result.success) {
        setUser(result.user);
      } else {
        setUser(null);
      }

      setLoading(false);
      console.log("AuthContast useEffect-3 :", result.user);
    };

    restore();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/** ✅ استفاده در کامپوننت‌ها */
export const useAuth = () => useContext(AuthContext);
