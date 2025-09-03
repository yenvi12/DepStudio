"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Progress } from "../../components/ui/progress"
import { Badge } from "../../components/ui/badge"
import { TrendingUp, Users, Calendar, DollarSign, Star } from "lucide-react"

const analyticsData = {
  revenue: {
    current: 45000000,
    previous: 38000000,
    growth: 18.4,
  },
  bookings: {
    current: 156,
    previous: 142,
    growth: 9.9,
  },
  customers: {
    current: 89,
    previous: 76,
    growth: 17.1,
  },
  satisfaction: {
    current: 4.8,
    previous: 4.6,
    growth: 4.3,
  },
}

const topServices = [
  { name: "Makeup cô dâu", bookings: 45, revenue: 112500000, growth: 12 },
  { name: "Chụp ảnh cưới", bookings: 32, revenue: 160000000, growth: 8 },
  { name: "Thuê váy cưới", bookings: 28, revenue: 42000000, growth: -5 },
  { name: "Trang điểm dự tiệc", bookings: 51, revenue: 40800000, growth: 15 },
]

const customerSegments = [
  { segment: "Khách hàng mới", percentage: 35, count: 31 },
  { segment: "Khách hàng quay lại", percentage: 45, count: 40 },
  { segment: "Khách hàng VIP", percentage: 20, count: 18 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.revenue.current.toLocaleString("vi-VN")}đ</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+{analyticsData.revenue.growth}%</span>
              <span className="text-muted-foreground">so với tháng trước</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent pointer-events-none" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đặt lịch</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.bookings.current}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-blue-500" />
              <span className="text-blue-500">+{analyticsData.bookings.growth}%</span>
              <span className="text-muted-foreground">so với tháng trước</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.customers.current}</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-purple-500" />
              <span className="text-purple-500">+{analyticsData.customers.growth}%</span>
              <span className="text-muted-foreground">so với tháng trước</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá TB</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.satisfaction.current}/5</div>
            <div className="flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-yellow-500" />
              <span className="text-yellow-500">+{analyticsData.satisfaction.growth}%</span>
              <span className="text-muted-foreground">so với tháng trước</span>
            </div>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent pointer-events-none" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Dịch vụ hàng đầu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{service.name}</h4>
                      <Badge variant={service.growth > 0 ? "default" : "destructive"} className="text-xs">
                        {service.growth > 0 ? "+" : ""}
                        {service.growth}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{service.bookings} đặt lịch</span>
                      <span>{service.revenue.toLocaleString("vi-VN")}đ</span>
                    </div>
                    <Progress value={(service.bookings / 60) * 100} className="mt-2 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Phân khúc khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerSegments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{segment.segment}</span>
                    <span className="text-sm text-gray-600">{segment.count} khách</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={segment.percentage} className="flex-1 h-2" />
                    <span className="text-sm font-medium w-12">{segment.percentage}%</span>
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
