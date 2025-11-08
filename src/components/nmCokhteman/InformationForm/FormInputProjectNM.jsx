import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Container,
  Typography,
} from "@mui/material";

import StepBasicInfo from "./InputUserInfo"; ///ok fixed
import StepLocation from "./InputLocation"; ///ok fixed
import StepFiles from "./InputProject";
import StepReview from "./InputReview";

// مراحل فرم
const steps = ["اطلاعات پایه", "موقعیت پروژه", "فایل‌ها", "تایید و ارسال"];

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "",
    province: "",
    city: "",
    coordinates: "",
    files: [],
  });

  // 🧠 بازیابی داده‌ها از localStorage هنگام بارگذاری اولیه
  useEffect(() => {
    const savedData = localStorage.getItem("projectFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // 🧠 ذخیره خودکار در localStorage در هر تغییر
  useEffect(() => {
    localStorage.setItem("projectFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        if (!formData.name || !formData.code || !formData.type) {
          alert("لطفاً تمام فیلدهای اطلاعات پایه را تکمیل کنید.");
          return false;
        }
        break;
      case 1:
        if (!formData.province || !formData.city || !formData.coordinates) {
          alert("لطفاً اطلاعات موقعیت پروژه را وارد کنید.");
          return false;
        }
        break;
      default:
        return true;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("📦 داده نهایی:", formData);
    alert("✅ فرم با موفقیت ارسال شد!");
    localStorage.removeItem("projectFormData");
    setActiveStep(0);
    setFormData({
      name: "",
      code: "",
      type: "",
      province: "",
      city: "",
      coordinates: "",
      files: [],
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <StepBasicInfo data={formData} onChange={handleChange} />;
      case 1:
        return <StepLocation data={formData} onChange={handleChange} />;
      case 2:
        return <StepFiles data={formData} onChange={handleChange} />;
      case 3:
        return <StepReview data={formData} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        فرم ثبت پروژه
      </Typography>

      {/* 🎨 Stepper سفارشی */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label.Mui-active": {
            color: "#1976d2",
            fontWeight: "bold",
          },
          "& .MuiStepLabel-label.Mui-completed": { color: "success.main" },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 5 }}>{renderStepContent()}</Box>

      {/* کنترل‌ها */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          مرحله قبل
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="success" onClick={handleSubmit}>
            ارسال نهایی
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            مرحله بعد
          </Button>
        )}
      </Box>
    </Container>
  );
}
