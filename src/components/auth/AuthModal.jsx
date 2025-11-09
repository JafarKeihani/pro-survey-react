// src/components/auth/AuthModal.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthModal } from "@contexts/AuthModalContext";

// فرم‌ها
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UnauthorizedForm from "./UnauthorizedForm";
import AuthRequiredForm from "./AuthRequiredForm";

// ✅ انیمیشن باز و بسته شدن مودال
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// ✅ تعریف فرم‌ها همراه با عنوان
const FORM_COMPONENTS = {
  LoginForm: { title: "ورود به حساب کاربری", component: <LoginForm /> },
  RegisterForm: { title: "ثبت نام", component: <RegisterForm /> },
  UnauthorizedForm: {
    title: "دسترسی محدود است",
    component: <UnauthorizedForm />,
  },
  AuthRequiredForm: {
    title: "ابتدا وارد شوید",
    component: <AuthRequiredForm />,
  },
};

export default function AuthModal() {
  const { modalType, modalData, closeAuthModal } = useAuthModal();
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (modalType && FORM_COMPONENTS[modalType]) {
      setForm(FORM_COMPONENTS[modalType]);
    }
  }, [modalType]);

  // ❌ اگر مودال بسته است، هیچی نمایش نده
  if (!modalType) return null;

  // ✅ اجازه تعویض فرم داخل مودال
  const changeForm = (target) => {
    if (FORM_COMPONENTS[target]) setForm(FORM_COMPONENTS[target]);
  };

  return (
    <Dialog
      open={true}
      onClose={closeAuthModal}
      fullWidth
      maxWidth="xs"
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "18px",
          paddingBottom: 2,
          background: "linear-gradient(180deg, #ffffff, #f7f9fc)",
        },
      }}
    >
      {/* ✅ عنوان مودال + دکمه بستن شیک */}
      <DialogTitle
        sx={{
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {form?.title}
        <IconButton onClick={closeAuthModal}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* ✅ محتوای مودال */}
      <DialogContent sx={{ mt: 1 }}>
        {form &&
          React.cloneElement(form.component, {
            changeForm,
            onClose: closeAuthModal,
            data: modalData, // اگر دیتایی ارسال شده باشد
          })}
      </DialogContent>
    </Dialog>
  );
}
