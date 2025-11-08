import React from "react";
import { useRoutes } from "react-router-dom";
import { adminRoutes } from "./AdminRoutes";
import { publicRoutes } from "./PublicRoutes";
import { userRoutes } from "./UserRoutes";

export default function AppRoutes() {
  const routes = useRoutes([adminRoutes, publicRoutes, userRoutes]);

  return routes; // چون useRoutes خودش JSX برمی‌گردونه
}
