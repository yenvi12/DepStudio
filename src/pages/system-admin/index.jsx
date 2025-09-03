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
import { MarketingTools } from "@/components/admin/marketing-tools"
import { SecuritySettings } from "@/components/admin/security-settings"
import { AuditLogs } from "@/components/admin/audit-logs"
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
    { id: "marketing", label: "Marketing", icon: Zap, color: "text-pink-600" },
    { id: "support", label: "Hỗ trợ", icon: Headphones, color: "text-indigo-600" },
    { id: "analytics", label: "Phân tích", icon: TrendingUp, color: "text-cyan-600" },
    { id: "security", label: "Bảo mật", icon: Shield, color: "text-red-600" },
    { id: "settings", label: "Cài đặt", icon: Settings, color: "text-gray-600" },
    { id: "logs", label: "Nhật ký", icon: FileText, color: "text-slate-600" },
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
        {/* Modern Sidebar */}
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

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedTab === "overview" && <SystemOverview />}
          {selectedTab === "bookings" && <BookingManagement />}
          {selectedTab === "payments" && <PaymentManagement />}
          {selectedTab === "reviews" && <ReviewManagement />}
          {selectedTab === "marketing" && <MarketingTools />}
          {selectedTab === "security" && <SecuritySettings />}
          {selectedTab === "logs" && <AuditLogs />}

          {selectedTab === "shops" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Quản lý Studio</h2>
                  <p className="text-gray-600 mt-1">Giám sát và quản lý tất cả studio trong hệ thống</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Lọc
                  </Button>
                  <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
                    <Building2 className="h-4 w-4" />
                    Thêm Studio
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Tổng Studio</p>
                        <p className="text-3xl font-bold text-blue-900">45</p>
                        <p className="text-blue-600 text-xs">+5 tháng này</p>
                      </div>
                      <Store className="h-12 w-12 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Đang hoạt động</p>
                        <p className="text-3xl font-bold text-green-900">38</p>
                        <p className="text-green-600 text-xs">84% tổng số</p>
                      </div>
                      <CheckCircle className="h-12 w-12 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-600 text-sm font-medium">Chờ duyệt</p>
                        <p className="text-3xl font-bold text-yellow-900">4</p>
                        <p className="text-yellow-600 text-xs">Cần xem xét</p>
                      </div>
                      <AlertTriangle className="h-12 w-12 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-600 text-sm font-medium">Tạm khóa</p>
                        <p className="text-3xl font-bold text-red-900">3</p>
                        <p className="text-red-600 text-xs">Vi phạm chính sách</p>
                      </div>
                      <Shield className="h-12 w-12 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Shop Management Table */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Danh sách Studio
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead className="font-semibold">Studio</TableHead>
                          <TableHead className="font-semibold">Chủ sở hữu</TableHead>
                          <TableHead className="font-semibold">Địa điểm</TableHead>
                          <TableHead className="font-semibold">Trạng thái</TableHead>
                          <TableHead className="font-semibold">Doanh thu</TableHead>
                          <TableHead className="font-semibold">Đánh giá</TableHead>
                          <TableHead className="font-semibold">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          {
                            name: "Bella Studio",
                            owner: "Nguyễn Thị Mai",
                            location: "Quận 1, TP.HCM",
                            status: "active",
                            revenue: 15000000,
                            rating: 4.8,
                          },
                          {
                            name: "Glamour Makeup",
                            owner: "Trần Văn Nam",
                            location: "Quận 3, TP.HCM",
                            status: "active",
                            revenue: 12000000,
                            rating: 4.6,
                          },
                          {
                            name: "Royal Wedding",
                            owner: "Lê Thị Hoa",
                            location: "Quận 7, TP.HCM",
                            status: "pending",
                            revenue: 8000000,
                            rating: 4.2,
                          },
                        ].map((shop, index) => (
                          <TableRow key={index} className="hover:bg-gray-50/50">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                                  <Store className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{shop.name}</p>
                                  <p className="text-sm text-gray-500">Studio makeup & photo</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">{shop.owner.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{shop.owner}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{shop.location}</TableCell>
                            <TableCell>
                              <Badge
                                variant={shop.status === "active" ? "default" : "secondary"}
                                className={
                                  shop.status === "active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                }
                              >
                                {shop.status === "active" ? "Hoạt động" : "Chờ duyệt"}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-semibold text-green-600">
                              {shop.revenue.toLocaleString("vi-VN")}đ
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="font-medium">{shop.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                                  <Shield className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Quản lý Người dùng</h2>
                  <p className="text-gray-600 mt-1">Quản lý tài khoản khách hàng và chủ studio</p>
                </div>
                <div className="flex gap-3">
                  <Input placeholder="Tìm kiếm người dùng..." className="w-64" />
                  <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    Tìm kiếm
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  <TabsTrigger value="customers">Khách hàng</TabsTrigger>
                  <TabsTrigger value="owners">Chủ studio</TabsTrigger>
                  <TabsTrigger value="blocked">Bị khóa</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-600 text-sm font-medium">Tổng người dùng</p>
                            <p className="text-3xl font-bold text-blue-900">1,250</p>
                          </div>
                          <Users className="h-12 w-12 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-600 text-sm font-medium">Hoạt động tháng này</p>
                            <p className="text-3xl font-bold text-green-900">892</p>
                          </div>
                          <UserCheck className="h-12 w-12 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-600 text-sm font-medium">Đăng ký mới</p>
                            <p className="text-3xl font-bold text-purple-900">+156</p>
                          </div>
                          <TrendingUp className="h-12 w-12 text-purple-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Người dùng</TableHead>
                            <TableHead>Vai trò</TableHead>
                            <TableHead>Ngày tham gia</TableHead>
                            <TableHead>Hoạt động cuối</TableHead>
                            <TableHead>Trạng thái</TableHead>
                            <TableHead>Thao tác</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              name: "Nguyễn Thị Lan",
                              email: "lan@email.com",
                              role: "customer",
                              joinDate: "2024-01-10",
                              lastActive: "2 giờ trước",
                              status: "active",
                            },
                            {
                              name: "Trần Văn Nam",
                              email: "nam@studio.com",
                              role: "owner",
                              joinDate: "2023-12-15",
                              lastActive: "1 ngày trước",
                              status: "active",
                            },
                          ].map((user, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.role === "owner" ? "default" : "secondary"}>
                                  {user.role === "owner" ? "Chủ studio" : "Khách hàng"}
                                </Badge>
                              </TableCell>
                              <TableCell>{user.joinDate}</TableCell>
                              <TableCell className="text-gray-600">{user.lastActive}</TableCell>
                              <TableCell>
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                  Hoạt động
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {selectedTab === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Cài đặt Hệ thống</h2>
                <p className="text-gray-600 mt-1">Cấu hình và tùy chỉnh hệ thống</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      Cài đặt chung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Chế độ bảo trì</Label>
                        <p className="text-sm text-gray-500">Tạm khóa hệ thống để bảo trì</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Đăng ký mới</Label>
                        <p className="text-sm text-gray-500">Cho phép người dùng đăng ký tài khoản mới</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Thông báo email</Label>
                        <p className="text-sm text-gray-500">Gửi email thông báo tự động</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      Thanh toán
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div>
                      <Label htmlFor="commission">Phí hoa hồng (%)</Label>
                      <Input id="commission" type="number" defaultValue="10" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="min-payout">Số tiền rút tối thiểu</Label>
                      <Input id="min-payout" type="number" defaultValue="100000" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="payment-methods">Phương thức thanh toán</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Chọn phương thức" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vnpay">VNPay</SelectItem>
                          <SelectItem value="momo">MoMo</SelectItem>
                          <SelectItem value="banking">Internet Banking</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-purple-600" />
                      Email Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div>
                      <Label>Email chào mừng</Label>
                      <Button variant="outline" className="w-full mt-2 justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa template
                      </Button>
                    </div>
                    <div>
                      <Label>Email xác nhận đặt lịch</Label>
                      <Button variant="outline" className="w-full mt-2 justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa template
                      </Button>
                    </div>
                    <div>
                      <Label>Email nhắc nhở</Label>
                      <Button variant="outline" className="w-full mt-2 justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa template
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-red-600" />
                      Sao lưu & Khôi phục
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div>
                      <Label>Sao lưu tự động</Label>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-600">Hàng ngày lúc 2:00 AM</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                    <div>
                      <Label>Sao lưu thủ công</Label>
                      <Button className="w-full mt-2 bg-red-600 hover:bg-red-700">
                        <Database className="h-4 w-4 mr-2" />
                        Tạo bản sao lưu ngay
                      </Button>
                    </div>
                    <div>
                      <Label>Khôi phục dữ liệu</Label>
                      <Button variant="outline" className="w-full mt-2">
                        <FileText className="h-4 w-4 mr-2" />
                        Xem danh sách backup
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}