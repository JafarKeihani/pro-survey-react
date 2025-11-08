// 📁 src/data/usersDB.js
import {
  openDB,
  addRecord,
  getOneByIndex,
  getAllRecords,
  updateRecord,
  deleteRecord,
} from "../../data/indexedDBNCokhteman";

// 🏪 نام store
const storeName = "list_users";
const indexName = "username"; // باید در تعریف store ایندکس شود

// ➕ افزودن کاربر جدید
export const addUser = async (user) => {
  try {
    await openDB();
    const result = await addRecord(storeName, user);
    console.log("✅ کاربر اضافه شد:", result);
    return true;
  } catch (err) {
    console.error("❌ خطا در افزودن کاربر:", err);
    return false;
  }
};

// 🔍 جستجو بر اساس نام کاربری
export const getUserByUsername = async (username) => {
  try {
    await openDB();
    const user = await getOneByIndex(storeName, indexName, username);
    return user || null;
  } catch (err) {
    console.error("❌ خطا در getUserByUsername:", err);
    return null;
  }
};

// 📋 گرفتن همه کاربران
export const getAllUsers = async () => {
  try {
    await openDB();
    return await getAllRecords(storeName);
  } catch (err) {
    console.error("❌ خطا در getAllUsers:", err);
    return [];
  }
};

// ✏️ به‌روزرسانی اطلاعات کاربر
export const updateUser = async (username, updates) => {
  try {
    await openDB();
    const user = await getUserByUsername(username);
    if (!user) return false;

    const updatedUser = { ...user, ...updates };
    await updateRecord(storeName, updatedUser);
    console.log("✅ کاربر به‌روزرسانی شد:", updatedUser);
    return true;
  } catch (err) {
    console.error("❌ خطا در updateUser:", err);
    return false;
  }
};

// 🗑️ حذف کاربر
export const deleteUser = async (username) => {
  try {
    await openDB();
    const user = await getUserByUsername(username);
    if (!user) return false;

    await deleteRecord(storeName, user.id);
    console.log(`🗑️ کاربر "${username}" حذف شد`);
    return true;
  } catch (err) {
    console.error("❌ خطا در deleteUser:", err);
    return false;
  }
};

// 🎭 دریافت نقش کاربر
export const getUserRole = async (username) => {
  try {
    const user = await getUserByUsername(username);
    return user ? user.role : null;
  } catch (err) {
    console.error("❌ خطا در getUserRole:", err);
    return null;
  }
};
export const existingUser = async (username) => {
  try {
    await getUserByUsername(username);
    return true;
  } catch (err) {
    console.error("⚠️ نام کاربری تکراری است!", err);
    return false;
  }
};
