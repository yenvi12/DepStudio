"use client"

import { useState } from "react"
import {
  Building2,
  Users,
  BarChart3,
  Settings,
  Shield,
  Bell,
  Search,
  Filter,
  Eye,
  Edit,
  TrendingUp,
  Store,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Calendar,
  CreditCard,
  Star,
  Mail,
  Database,
  FileText,
  Zap,
  Headphones,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { SystemOverview } from "@/components/admin/system-overview"
import { BookingManagement } from "@/components/admin/booking-management"
import { PaymentManagement } from "@/components/admin/payment-management"
import { ReviewManagement } from "@/components/admin/review-management"
import { UserManagement } from "../../components/admin/UserManagement"
import { ShopManagement } from "@/components/admin/ShopManagement"
import NoSSR from "@/components/NoSSR"

export default function SystemAdminDashboard() {
  return (
    <NoSSR fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải System Admin...</p>
        </div>
      </div>
    }>
      <SystemAdminContent />
    </NoSSR>
  )
}

function SystemAdminContent() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const sidebarItems = [
    { id: "overview", label: "Tổng quan", icon: BarChart3, color: "text-blue-600" },
    { id: "shops", label: "Quản lý Shop", icon: Building2, color: "text-green-600" },
    { id: "users", label: "Người dùng", icon: Users, color: "text-purple-600" },
    { id: "bookings", label: "Đặt lịch", icon: Calendar, color: "text-orange-600" },
    { id: "payments", label: "Thanh toán", icon: CreditCard, color: "text-emerald-600" },
    { id: "reviews", label: "Đánh giá", icon: Star, color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                System Admin
              </h1>
              <p className="text-sm text-gray-500">Quản trị hệ thống booking studio</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                5
              </Badge>
            </Button>
            <Avatar className="ring-2 ring-blue-100">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">SA</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">

        <aside className="w-72 bg-white/70 backdrop-blur-sm border-r border-gray-200/50 min-h-screen">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={selectedTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 h-11 ${
                    selectedTab === item.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : "hover:bg-gray-50/80"
                  }`}
                  onClick={() => setSelectedTab(item.id)}
                >
                  <Icon className={`h-5 w-5 ${selectedTab === item.id ? "text-white" : item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </Button>
              )
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {selectedTab === "overview" && <SystemOverview />}
          {selectedTab === "bookings" && <BookingManagement />}
          {selectedTab === "payments" && <PaymentManagement />}
          {selectedTab === "reviews" && <ReviewManagement />}
          {selectedTab === "users" && <UserManagement />} 
          {selectedTab === "shops" && <ShopManagement />}
        </main>
      </div>
    </div>
  )
}