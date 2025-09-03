// src/pages/dashboard/ShopOwnerDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  MessageSquare,
  Plus,
  BarChart3,
  Bell,
  Eye,
  Edit,
  Trash2,
  Star,
  DollarSign,
  Package,
  Users,
} from "lucide-react";

// ⬇️ ĐỔI alias '@/...' thành relative path theo dự án của bạn
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

import { RevenueChart } from "../../components/charts/revenue-chart";
import { BookingCalendar } from "../../components/calendar/booking-calendar";
import { ChatInterface } from "../../components/chat/chat-interface";
import { AnalyticsDashboard } from "../../components/analytics/analytics-dashboard";
import { InventoryManagement } from "../../components/inventory/inventory-management";
import { StaffManagement } from "../../components/staff/staff-management";
import { NotificationButton } from "../../components/notifications/notification-button";

// --------- NoSSR thay cho Next dynamic/SSR ----------
function NoSSR({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : fallback;
}
// -----------------------------------------------------

export default function ShopOwnerDashboard() {
  return (
    <NoSSR
      fallback={
        <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#6F5D4F] mx-auto mb-4"></div>
            <p className="text-[#6F5D4F] text-lg">Đang tải Shop Owner Dashboard...</p>
          </div>
        </div>
      }
    >
      <ShopOwnerContent />
    </NoSSR>
  );
}

function ShopOwnerContent() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data
  const stats = {
    totalBookings: 156,
    monthlyRevenue: 45000000,
    activeServices: 12,
    customerSatisfaction: 4.8,
  };

  const recentBookings = [
    { id: 1, customer: "Nguyễn Thị Lan", service: "Makeup cô dâu", date: "2024-01-15", status: "confirmed", amount: 2500000 },
    { id: 2, customer: "Trần Văn Nam", service: "Chụp ảnh cưới", date: "2024-01-16", status: "pending", amount: 5000000 },
    { id: 3, customer: "Lê Thị Hoa", service: "Thuê váy cưới", date: "2024-01-17", status: "completed", amount: 1500000 },
  ];

  const services = [
    { id: 1, name: "Makeup cô dâu", price: 2500000, bookings: 45, status: "active" },
    { id: 2, name: "Chụp ảnh cưới", price: 5000000, bookings: 32, status: "active" },
    { id: 3, name: "Thuê váy cưới", price: 1500000, bookings: 28, status: "active" },
    { id: 4, name: "Trang điểm dự tiệc", price: 800000, bookings: 51, status: "active" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* Header */}
      <header className="bg-[#F8F5F0] border-b border-[#C1B6A3] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#6F5D4F]">Studio Management</h1>
            <p className="text-[#6F5D4F]/70">Chào mừng trở lại, Bella Studio</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationButton />
            <Avatar className="ring-2 ring-[#C1B6A3] hover:ring-[#B3907A] transition-all duration-200">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-r from-[#B3907A] to-[#6F5D4F] text-white font-semibold">
                BS
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#F8F5F0] border-r border-[#C1B6A3] min-h-screen">
          <nav className="p-4 space-y-2">
            <Button variant={selectedTab === "overview" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("overview")}>
              <BarChart3 className="mr-2 h-4 w-4" /> Tổng quan
            </Button>
            <Button variant={selectedTab === "services" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("services")}>
              <Package className="mr-2 h-4 w-4" /> Quản lý dịch vụ
            </Button>
            <Button variant={selectedTab === "bookings" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("bookings")}>
              <Calendar className="mr-2 h-4 w-4" /> Đặt lịch
            </Button>
            <Button variant={selectedTab === "messages" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("messages")}>
              <MessageSquare className="mr-2 h-4 w-4" /> Tin nhắn
            </Button>
            <Button variant={selectedTab === "promotions" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("promotions")}>
              <Star className="mr-2 h-4 w-4" /> Ưu đãi
            </Button>
            <Button variant={selectedTab === "news" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("news")}>
              <Bell className="mr-2 h-4 w-4" /> Tin tức
            </Button>
            <Button variant={selectedTab === "calendar" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("calendar")}>
              <Calendar className="mr-2 h-4 w-4" /> Lịch hẹn
            </Button>
            <Button variant={selectedTab === "analytics" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("analytics")}>
              <BarChart3 className="mr-2 h-4 w-4" /> Phân tích chi tiết
            </Button>
            <Button variant={selectedTab === "inventory" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("inventory")}>
              <Package className="mr-2 h-4 w-4" /> Quản lý Tổng Thể
            </Button>
            <Button variant={selectedTab === "staff" ? "default" : "ghost"} className="w-full justify-start" onClick={() => setSelectedTab("staff")}>
              <Users className="mr-2 h-4 w-4" /> Quản lý nhân viên
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-[#C1B6A3] bg-[#EFE7DA] text-[#6F5D4F] shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#6F5D4F]">Tổng đặt lịch</CardTitle>
                    <Calendar className="h-4 w-4 text-[#B3907A]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#6F5D4F]">{stats.totalBookings}</div>
                    <p className="text-xs text-[#6F5D4F]/70">+12% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card className="border border-[#C1B6A3] bg-[#EFE7DA] text-[#6F5D4F] shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#6F5D4F]">Doanh thu tháng</CardTitle>
                    <DollarSign className="h-4 w-4 text-[#B3907A]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#6F5D4F]">{stats.monthlyRevenue.toLocaleString("vi-VN")}đ</div>
                    <p className="text-xs text-[#6F5D4F]/70">+8% so với tháng trước</p>
                  </CardContent>
                </Card>

                <Card className="border border-[#C1B6A3] bg-[#EFE7DA] text-[#6F5D4F] shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#6F5D4F]">Dịch vụ hoạt động</CardTitle>
                    <Package className="h-4 w-4 text-[#B3907A]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#6F5D4F]">{stats.activeServices}</div>
                    <p className="text-xs text-[#6F5D4F]/70">+2 dịch vụ mới</p>
                  </CardContent>
                </Card>

                <Card className="border border-[#C1B6A3] bg-[#EFE7DA] text-[#6F5D4F] shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#6F5D4F]">Đánh giá TB</CardTitle>
                    <Star className="h-4 w-4 text-[#B3907A]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#6F5D4F]">{stats.customerSatisfaction}/5</div>
                    <p className="text-xs text-[#6F5D4F]/70">Từ 89 đánh giá</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings */}
              <Card className="border border-[#C1B6A3] bg-[#EFE7DA] text-[#6F5D4F] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#6F5D4F]">Đặt lịch gần đây</CardTitle>
                  <CardDescription className="text-[#6F5D4F]/70">Danh sách các đặt lịch mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Dịch vụ</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Số tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((bk) => (
                        <TableRow key={bk.id}>
                          <TableCell>{bk.customer}</TableCell>
                          <TableCell>{bk.service}</TableCell>
                          <TableCell>{bk.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                bk.status === "confirmed"
                                  ? "default"
                                  : bk.status === "pending"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {bk.status === "confirmed"
                                ? "Đã xác nhận"
                                : bk.status === "pending"
                                ? "Chờ xác nhận"
                                : "Hoàn thành"}
                            </Badge>
                          </TableCell>
                          <TableCell>{bk.amount.toLocaleString("vi-VN")}đ</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "services" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Quản lý dịch vụ</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Thêm dịch vụ
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm dịch vụ mới</DialogTitle>
                      <DialogDescription>Tạo dịch vụ mới cho studio của bạn</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="service-name">Tên dịch vụ</Label>
                        <Input id="service-name" placeholder="Nhập tên dịch vụ" />
                      </div>
                      <div>
                        <Label htmlFor="service-price">Giá dịch vụ</Label>
                        <Input id="service-price" type="number" placeholder="Nhập giá" />
                      </div>
                      <div>
                        <Label htmlFor="service-description">Mô tả</Label>
                        <Textarea id="service-description" placeholder="Mô tả dịch vụ" />
                      </div>
                      <Button className="w-full">Tạo dịch vụ</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tên dịch vụ</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Số lượng đặt</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((sv) => (
                        <TableRow key={sv.id}>
                          <TableCell className="font-medium">{sv.name}</TableCell>
                          <TableCell>{sv.price.toLocaleString("vi-VN")}đ</TableCell>
                          <TableCell>{sv.bookings}</TableCell>
                          <TableCell>
                            <Badge variant="default">Hoạt động</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                              <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                              <Button variant="outline" size="icon"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "messages" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Tin nhắn khách hàng</h2>
              <ChatInterface />
            </div>
          )}

          {selectedTab === "promotions" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Quản lý ưu đãi</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Tạo ưu đãi</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tạo ưu đãi mới</DialogTitle>
                      <DialogDescription>Tạo chương trình ưu đãi cho khách hàng</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div><Label htmlFor="promo-title">Tiêu đề ưu đãi</Label><Input id="promo-title" placeholder="Nhập tiêu đề" /></div>
                      <div><Label htmlFor="promo-discount">Phần trăm giảm giá</Label><Input id="promo-discount" type="number" placeholder="%" /></div>
                      <div><Label htmlFor="promo-code">Mã ưu đãi</Label><Input id="promo-code" placeholder="Nhập mã" /></div>
                      <div><Label htmlFor="promo-description">Mô tả</Label><Textarea id="promo-description" placeholder="Mô tả ưu đãi" /></div>
                      <Button className="w-full">Tạo ưu đãi</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Giảm giá 20% - Tết 2024</CardTitle>
                    <CardDescription>Mã: TET2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Giảm giá 20% cho tất cả dịch vụ makeup trong dịp Tết</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="default">Đang hoạt động</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Sửa</Button>
                        <Button variant="outline" size="sm">Xóa</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === "news" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Quản lý tin tức</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4" /> Thêm tin tức</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Thêm tin tức mới</DialogTitle>
                      <DialogDescription>Tạo bài viết tin tức cho khách hàng</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div><Label htmlFor="news-title">Tiêu đề</Label><Input id="news-title" placeholder="Nhập tiêu đề tin tức" /></div>
                      <div><Label htmlFor="news-content">Nội dung</Label><Textarea id="news-content" placeholder="Nội dung tin tức" className="min-h-32" /></div>
                      <div>
                        <Label htmlFor="news-category">Danh mục</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="promotion">Khuyến mãi</SelectItem>
                            <SelectItem value="service">Dịch vụ mới</SelectItem>
                            <SelectItem value="event">Sự kiện</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Đăng tin tức</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Khai trương chi nhánh mới</CardTitle>
                    <CardDescription>15/01/2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Bella Studio vui mừng thông báo khai trương chi nhánh thứ 3 tại quận 7...
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="default">Đã đăng</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Sửa</Button>
                        <Button variant="outline" size="sm">Xóa</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {selectedTab === "calendar" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Lịch hẹn</h2>
              <BookingCalendar />
            </div>
          )}

          {selectedTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Phân tích chi tiết</h2>
              <AnalyticsDashboard />
              <Card>
                <CardHeader><CardTitle>Biểu đồ doanh thu</CardTitle></CardHeader>
                <CardContent><RevenueChart /></CardContent>
              </Card>
            </div>
          )}

          {selectedTab === "inventory" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Quản lý kho</h2>
              <InventoryManagement />
            </div>
          )}

          {selectedTab === "staff" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Quản lý nhân viên</h2>
              <StaffManagement />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
