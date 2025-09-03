"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Calendar } from "../../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import {
  FileText,
  Search,
  Filter,
  Download,
  CalendarIcon,
  User,
  Settings,
  CreditCard,
  Building2,
  Eye,
  Trash2,
  Clock,
} from "lucide-react"

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date())

  const auditLogs = [
    {
      id: "LOG001",
      timestamp: "2024-01-20 14:30:25",
      user: "admin@system.com",
      userType: "admin",
      action: "user_created",
      resource: "User",
      resourceId: "USR123",
      details: "Tạo tài khoản mới cho Nguyễn Thị Lan",
      ip: "192.168.1.100",
      userAgent: "Chrome/120.0.0.0",
      status: "success",
    },
    {
      id: "LOG002",
      timestamp: "2024-01-20 14:25:12",
      user: "shop@bella.com",
      userType: "shop_owner",
      action: "service_updated",
      resource: "Service",
      resourceId: "SRV456",
      details: "Cập nhật giá dịch vụ Makeup cô dâu từ 2.000.000đ thành 2.500.000đ",
      ip: "192.168.1.105",
      userAgent: "Safari/17.0",
      status: "success",
    },
    {
      id: "LOG003",
      timestamp: "2024-01-20 14:20:45",
      user: "customer@email.com",
      userType: "customer",
      action: "booking_created",
      resource: "Booking",
      resourceId: "BK789",
      details: "Đặt lịch dịch vụ Chụp ảnh cưới tại Glamour Makeup",
      ip: "192.168.1.110",
      userAgent: "Chrome/120.0.0.0",
      status: "success",
    },
    {
      id: "LOG004",
      timestamp: "2024-01-20 14:15:30",
      user: "admin@system.com",
      userType: "admin",
      action: "payment_processed",
      resource: "Payment",
      resourceId: "PAY101",
      details: "Xử lý thanh toán 5.000.000đ cho đặt lịch BK789",
      ip: "192.168.1.100",
      userAgent: "Chrome/120.0.0.0",
      status: "success",
    },
    {
      id: "LOG005",
      timestamp: "2024-01-20 14:10:18",
      user: "hacker@evil.com",
      userType: "unknown",
      action: "login_failed",
      resource: "Auth",
      resourceId: "AUTH001",
      details: "Đăng nhập thất bại - Sai mật khẩu",
      ip: "45.123.45.67",
      userAgent: "Bot/1.0",
      status: "failed",
    },
    {
      id: "LOG006",
      timestamp: "2024-01-20 14:05:55",
      user: "shop@royal.com",
      userType: "shop_owner",
      action: "shop_settings_updated",
      resource: "Shop",
      resourceId: "SHP202",
      details: "Cập nhật thông tin liên hệ và địa chỉ studio",
      ip: "192.168.1.115",
      userAgent: "Firefox/121.0",
      status: "success",
    },
  ]

  const getActionIcon = (action: string) => {
    if (action.includes("user")) return <User className="h-4 w-4" />
    if (action.includes("service") || action.includes("shop")) return <Building2 className="h-4 w-4" />
    if (action.includes("payment")) return <CreditCard className="h-4 w-4" />
    if (action.includes("settings")) return <Settings className="h-4 w-4" />
    return <FileText className="h-4 w-4" />
  }

  const getActionBadge = (action: string) => {
    const actionMap = {
      user_created: { label: "Tạo người dùng", color: "bg-green-100 text-green-800" },
      user_updated: { label: "Cập nhật người dùng", color: "bg-blue-100 text-blue-800" },
      user_deleted: { label: "Xóa người dùng", color: "bg-red-100 text-red-800" },
      service_created: { label: "Tạo dịch vụ", color: "bg-green-100 text-green-800" },
      service_updated: { label: "Cập nhật dịch vụ", color: "bg-blue-100 text-blue-800" },
      service_deleted: { label: "Xóa dịch vụ", color: "bg-red-100 text-red-800" },
      booking_created: { label: "Tạo đặt lịch", color: "bg-green-100 text-green-800" },
      booking_updated: { label: "Cập nhật đặt lịch", color: "bg-blue-100 text-blue-800" },
      booking_cancelled: { label: "Hủy đặt lịch", color: "bg-red-100 text-red-800" },
      payment_processed: { label: "Xử lý thanh toán", color: "bg-green-100 text-green-800" },
      payment_failed: { label: "Thanh toán thất bại", color: "bg-red-100 text-red-800" },
      login_success: { label: "Đăng nhập", color: "bg-green-100 text-green-800" },
      login_failed: { label: "Đăng nhập thất bại", color: "bg-red-100 text-red-800" },
      shop_settings_updated: { label: "Cập nhật cài đặt", color: "bg-blue-100 text-blue-800" },
    }
    const config = actionMap[action as keyof typeof actionMap] || {
      label: action,
      color: "bg-gray-100 text-gray-800",
    }
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const config = {
      success: { color: "bg-green-100 text-green-800", label: "Thành công" },
      failed: { color: "bg-red-100 text-red-800", label: "Thất bại" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Đang xử lý" },
    }
    const { color, label } = config[status as keyof typeof config]
    return <Badge className={color}>{label}</Badge>
  }

  const getUserTypeBadge = (userType: string) => {
    const config = {
      admin: { color: "bg-purple-100 text-purple-800", label: "Admin" },
      shop_owner: { color: "bg-blue-100 text-blue-800", label: "Chủ shop" },
      customer: { color: "bg-green-100 text-green-800", label: "Khách hàng" },
      unknown: { color: "bg-gray-100 text-gray-800", label: "Không xác định" },
    }
    const { color, label } = config[userType as keyof typeof config]
    return <Badge className={color}>{label}</Badge>
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesUser = userFilter === "all" || log.userType === userFilter
    return matchesSearch && matchesAction && matchesUser
  })

  const logStats = {
    total: auditLogs.length,
    success: auditLogs.filter((log) => log.status === "success").length,
    failed: auditLogs.filter((log) => log.status === "failed").length,
    today: auditLogs.filter((log) => log.timestamp.startsWith("2024-01-20")).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Nhật ký Hệ thống</h2>
          <p className="text-gray-600 mt-1">Theo dõi tất cả hoạt động trong hệ thống</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Bộ lọc nâng cao
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-500 to-indigo-500">
            <Download className="h-4 w-4" />
            Xuất nhật ký
          </Button>
        </div>
      </div>

      {/* Log Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Tổng nhật ký</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{logStats.total}</p>
                <p className="text-blue-600 text-sm mt-1">Tất cả hoạt động</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Thành công</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{logStats.success}</p>
                <p className="text-green-600 text-sm mt-1">
                  {((logStats.success / logStats.total) * 100).toFixed(1)}% tổng số
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <Eye className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-semibold uppercase tracking-wide">Thất bại</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{logStats.failed}</p>
                <p className="text-red-600 text-sm mt-1">Cần xem xét</p>
              </div>
              <div className="bg-red-500 p-3 rounded-xl">
                <Trash2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-semibold uppercase tracking-wide">Hôm nay</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">{logStats.today}</p>
                <p className="text-purple-600 text-sm mt-1">Hoạt động mới</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo người dùng, hoạt động, tài nguyên..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại hoạt động" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả hoạt động</SelectItem>
                <SelectItem value="user_created">Tạo người dùng</SelectItem>
                <SelectItem value="service_updated">Cập nhật dịch vụ</SelectItem>
                <SelectItem value="booking_created">Tạo đặt lịch</SelectItem>
                <SelectItem value="payment_processed">Xử lý thanh toán</SelectItem>
                <SelectItem value="login_failed">Đăng nhập thất bại</SelectItem>
              </SelectContent>
            </Select>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loại người dùng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả người dùng</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="shop_owner">Chủ shop</SelectItem>
                <SelectItem value="customer">Khách hàng</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange ? dateRange.toLocaleDateString("vi-VN") : "Chọn ngày"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Nhật ký Chi tiết
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-semibold">Thời gian</TableHead>
                  <TableHead className="font-semibold">Người dùng</TableHead>
                  <TableHead className="font-semibold">Hoạt động</TableHead>
                  <TableHead className="font-semibold">Tài nguyên</TableHead>
                  <TableHead className="font-semibold">Chi tiết</TableHead>
                  <TableHead className="font-semibold">IP</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <div>
                          <div className="font-medium">{log.timestamp.split(" ")[1]}</div>
                          <div className="text-gray-500 text-xs">{log.timestamp.split(" ")[0]}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{log.user}</div>
                        {getUserTypeBadge(log.userType)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gray-100 rounded">{getActionIcon(log.action)}</div>
                        {getActionBadge(log.action)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{log.resource}</div>
                        <div className="text-xs text-gray-500 font-mono">{log.resourceId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-700 line-clamp-2">{log.details}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{log.ip}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(log.status)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
