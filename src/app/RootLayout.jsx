// src/app/RootLayout.jsx
import { Outlet } from "react-router-dom";
import "../index.css";

import { AuthProvider } from "@/contexts/auth-context";

export default function RootLayout() {
  return (
    <AuthProvider>
        <Outlet />
      
    </AuthProvider>
  );
}
