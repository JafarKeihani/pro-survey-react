// src/routes/Navigator.jsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./routeConfig";
import ProtectedRoute from "./ProtectedRoute";
import LoadingScreen from "@components/settings/LoadingScreen";
import NotFound from "@pages/loginForm/NotFound"; // مطمئن شو مسیر درست باشه

export default function Navigator() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((group, index) => {
          const Layout = group.layout;
          const role = group.role;

          return (
            <Route
              key={index}
              element={
                role ? (
                  <ProtectedRoute element={<Layout />} requiredRole={role} />
                ) : (
                  <Layout />
                )
              }
            >
              {group.routes.map((route, i) => (
                <Route
                  key={`${index}-${i}`}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Route>
          );
        })}

        {/* catch-all 404 — این خط باید خارج از حلقه باشد */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
