// src/app/RouteLoader.jsx
"use client";

import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout.jsx";
import StudioDetailPage from "../pages/studio/detail.jsx";

// 👉 Lazy-load các page để tách bundle
const Home =          lazy(() => import("../pages/Home.jsx"));
const Booking =       lazy(() => import("../pages/booking/index.jsx"));
const Dashboard =     lazy(() => import("../pages/dashboard/index.jsx"));
const Login =         lazy(() => import("../pages/login/index.jsx"));
const Makeup =        lazy(() => import("../pages/makeup/index.jsx"));
const News =          lazy(() => import("../pages/news/index.jsx"));
const Profile =       lazy(() => import("../pages/profile/index.jsx"));
const Promotions =    lazy(() => import("../pages/promotions/index.jsx"));
const Register =      lazy(() => import("../pages/register/index.jsx"));
const Rental =        lazy(() => import("../pages/rental/index.jsx"));
const Studio =        lazy(() => import("../pages/studio/index.jsx"));
const ShopOwner =     lazy(() => import("../pages/shop-owner/index.jsx"));
const SystemAdmin =   lazy(() => import("../pages/system-admin/index.jsx"));

// Fallback khi đang load chunk
function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center text-[#6F5D4F] bg-[#F5F1EB]">
      Đang tải…
    </div>
  );
}

export default function RouteLoader() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Bọc mọi thứ trong layout chung */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />

          <Route path="/booking/*" element={<Booking />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/makeup/*" element={<Makeup />} />
          <Route path="/news/*" element={<News />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/promotions/*" element={<Promotions />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rental/*" element={<Rental />} />
          <Route path="/studios/*" element={<Studio />} />
          <Route path="/studios/:id" element={<StudioDetailPage />} />

          {/* 👇 Thêm 2 route mới */}
          <Route path="/shop-owner" element={<ShopOwner />} />
          <Route path="/system-admin" element={<SystemAdmin />} />

          <Route path="/login" element={<Login />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
