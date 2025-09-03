"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { BarChart3, Users, Building2, Calendar, DollarSign, TrendingUp, Activity, AlertTriangle } from "lucide-react"

export function SystemOverview() {
  const systemStats = {
    totalShops: 45,
    totalUsers: 1250,
    monthlyRevenue: 125000000,
    activeBookings: 340,
    systemHealth: 98.5,
    serverLoad: 45,
  }

  const recentActivities = [
    { type: "shop", message: "Studio mới 'Beauty Palace' đã được duyệt", time: "5 phút trước" },
    { type: "booking", message: "156 đặt lịch mới trong 24h qua", time: "1 giờ trước" },
    { type: "payment", message: "Thanh toán 15.5M đã được xử lý", time: "2 giờ trước" },
    { type: "alert", message: "Cảnh báo: Server load cao 85%", time: "3 giờ trước" },
  ]

  const topPerformingShops = [
    { name: "Bella Studio", revenue: 15000000, bookings: 89, growth: 12 },
    { name: "Glamour Makeup", revenue: 12000000, bookings: 67, growth: 8 },
    { name: "Royal Wedding", revenue: 10000000, bookings: 54, growth: 15 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Tổng quan Hệ thống
        </h2>
        <p className="text-gray-600 mt-1">Dashboard tổng quan về hoạt động của toàn bộ hệ thống</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-blue-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Tổng Studio</p>
                <p className="text-4xl font-bold text-blue-900 mt-2">{systemStats.totalShops}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+5 tháng này</span>
                </div>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 via-green-100 to-green-200 border-green-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Người dùng</p>
                <p className="text-4xl font-bold text-green-900 mt-2">{systemStats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+15% tháng này</span>
                </div>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 border-purple-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-semibold uppercase tracking-wide">Doanh thu</p>
                <p className="text-4xl font-bold text-purple-900 mt-2">
                  {(systemStats.monthlyRevenue / 1000000).toFixed(0)}M
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+22% tháng này</span>
                </div>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 border-orange-300 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-wide">Đặt lịch</p>
                <p className="text-4xl font-bold text-orange-900 mt-2">{systemStats.activeBookings}</p>
                <div className="flex items-center mt-2">
                  <Activity className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-orange-600 text-sm font-medium">Đang hoạt động</span>
                </div>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-600" />
              Tình trạng Hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Sức khỏe hệ thống</span>
                <span className="text-sm font-bold text-green-600">{systemStats.systemHealth}%</span>
              </div>
              <Progress value={systemStats.systemHealth} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Tải server</span>
                <span className="text-sm font-bold text-blue-600">{systemStats.serverLoad}%</span>
              </div>
              <Progress value={systemStats.serverLoad} className="h-3" />
            </div>
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-medium">Tất cả dịch vụ hoạt động bình thường</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Hoạt động Gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/80">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "alert"
                        ? "bg-red-100 text-red-600"
                        : activity.type === "shop"
                          ? "bg-blue-100 text-blue-600"
                          : activity.type === "booking"
                            ? "bg-green-100 text-green-600"
                            : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {activity.type === "alert" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : activity.type === "shop" ? (
                      <Building2 className="h-4 w-4" />
                    ) : activity.type === "booking" ? (
                      <Calendar className="h-4 w-4" />
                    ) : (
                      <DollarSign className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Shops */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Studio Hàng đầu
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {topPerformingShops.map((shop, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{shop.name}</p>
                      <p className="text-xs text-gray-500">{shop.bookings} đặt lịch</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{(shop.revenue / 1000000).toFixed(1)}M</p>
                    <Badge variant="outline" className="text-xs">
                      +{shop.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
