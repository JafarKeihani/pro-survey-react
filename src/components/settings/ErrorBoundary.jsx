import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";

function errorHandler(error, info) {
  // ✅ همیشه در کنسول خطا را دقیق لاگ می‌کند
  console.group("%c ❌ React Error Boundary", "color: red; font-weight: bold;");
  console.error("Error:", error);
  console.error("Stack:", info.componentStack);
  console.groupEnd();
}

export default function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={errorHandler} // 🔥 این قسمت باعث نمایش خطا در کنسول می‌شود
    >
      {children}
    </ReactErrorBoundary>
  );
}
