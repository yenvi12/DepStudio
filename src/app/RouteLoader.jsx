// src/app/RouteLoader.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./RootLayout.jsx";

import Home from "../pages/Home.jsx";
import Booking from "../pages/booking";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Makeup from "../pages/makeup";
import News from "../pages/news";
import Profile from "../pages/profile";
import Promotions from "../pages/promotions";
import Register from "../pages/register";
import Rental from "../pages/rental";
import Studio from "../pages/studio";

export default function RouteLoader() {
  return (
    <Routes>
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
        <Route path="/studio/*" element={<Studio />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
