import React, { useState } from "react";
import { addUser } from "./MetodUserDB";
import { searchByField } from "@data/indexedDBNCokhteman";

export default function FormAddUser({ onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!username || !password) {
      setMessage("⚠️ لطفاً تمام فیلدها را پر کنید.");
      return;
    }

    // 🟡 بررسی وجود کاربر تکراری
    const existing = await searchByField("list_users", "username", username);
    if (existing && existing.length > 0) {
      setMessage("⚠️ این نام کاربری قبلاً ثبت شده است.");
      return;
    }

    const newUser = { username, password, role };

    try {
      const result = await addUser(newUser);
      if (result) {
        setMessage("✅ کاربر با موفقیت اضافه شد!");
        setUsername("");
        setPassword("");
        setRole("user");
        setTimeout(() => onClose && onClose(), 1500);
      }
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage("❌ خطا در ذخیره‌سازی کاربر.");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "0 auto",
        background: "#f9f9f9",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ textAlign: "center" }}>افزودن کاربر جدید</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "6px 0" }}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "6px 0" }}
        />

        <label>نقش کاربر:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "8px", margin: "6px 0" }}
        >
          <option value="user">کاربر عادی</option>
          <option value="userNezam">کاربر نظام مهندسی</option>
          <option value="admin">مدیر</option>
        </select>

        <button type="submit" style={{ width: "100%", padding: "8px" }}>
          ذخیره کاربر
        </button>

        <button
          type="button"
          onClick={() => onClose && onClose()}
          style={{
            marginTop: "8px",
            width: "100%",
            padding: "8px",
            background: "#ccc",
          }}
        >
          انصراف
        </button>
      </form>
      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}

// 📁 src/components/setting/FormAddUser.jsx

// import React, { useState } from "react";
// import { addUser } from "./MetodUserDB";

// export default function FormAddUser({ onClose }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("admin");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!username || !password) {
//       setMessage("⚠️ لطفاً تمام فیلدها را پر کنید.");
//       return;
//     }

//     const newUser = { username, password, role: "admin" };
//     const result = await addUser(newUser);

//     if (result) {
//       setMessage("✅ کاربر با موفقیت اضافه شد!");
//       setUsername("");
//       setPassword("");
//       setRole("user");
//       setTimeout(() => onClose && onClose(), 1500);
//     } else {
//       setMessage("❌ خطا در ذخیره‌سازی کاربر.");
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: 400,
//         margin: "0 auto",
//         background: "#f9f9f9",
//         borderRadius: "10px",
//         padding: "20px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h3 style={{ textAlign: "center" }}>افزودن کاربر جدید</h3>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="نام کاربری"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           style={{ width: "100%", padding: "8px", margin: "6px 0" }}
//         />
//         <input
//           type="password"
//           placeholder="رمز عبور"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{ width: "100%", padding: "8px", margin: "6px 0" }}
//         />

//         <label>نقش کاربر:</label>
//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           style={{ width: "100%", padding: "8px", margin: "6px 0" }}
//         >
//           <option value="user">کاربر عادی</option>
//           <option value="userNezam">کاربر نظام مهندسی</option>
//         </select>

//         <button type="submit" style={{ width: "100%", padding: "8px" }}>
//           ذخیره کاربر
//         </button>

//         <button
//           type="button"
//           onClick={() => onClose && onClose()}
//           style={{
//             marginTop: "8px",
//             width: "100%",
//             padding: "8px",
//             background: "#ccc",
//           }}
//         >
//           انصراف
//         </button>
//       </form>
//       {message && (
//         <p style={{ color: message.includes("❌") ? "red" : "green" }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// }
