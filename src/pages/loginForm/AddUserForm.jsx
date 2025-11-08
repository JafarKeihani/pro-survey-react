// 📁 src/pages/loginForm/AddUserPage.jsx
import React, { useState } from "react";
import FormAddUser from "../../components/settings/AddNewUserForm";

export default function AddUserPage() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div style={{ padding: "40px" }}>
      {showForm ? (
        <FormAddUser onClose={() => setShowForm(false)} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>✅ عملیات انجام شد</h3>
          <button onClick={() => setShowForm(true)}>افزودن کاربر دیگر</button>
        </div>
      )}
    </div>
  );
}
