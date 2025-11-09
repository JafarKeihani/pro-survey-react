import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProviderCustom } from "./contexts/ThemeContext";
import { AuthModalProvider } from "./contexts/AuthModalContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderCustom>
        <AuthProvider>
          <AuthModalProvider>
            <App />
          </AuthModalProvider>
        </AuthProvider>
      </ThemeProviderCustom>
    </BrowserRouter>
  </React.StrictMode>
);
