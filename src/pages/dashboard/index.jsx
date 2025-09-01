import React, { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar, Heart, Star, TrendingUp, Clock, CheckCircle, Gift, Bell,
  CreditCard, MapPin, Camera, Palette, Shirt, ArrowRight, Plus, Eye,
} from "lucide-react"
import { format, addDays, isToday, isTomorrow } from "date-fns"
import { vi } from "date-fns/locale"

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isWelcome = searchParams.get("welcome") === "true"
  const [showWelcome, setShowWelcome] = useState(isWelcome)

  useEffect(() => {
    if (!user) navigate("/login")
  }, [user, navigate])

  if (!user) return null

  // Mock data
  const stats = {
    totalBookings: 12,
    completedBookings: 8,
    upcomingBookings: 2,
    favoriteProviders: 15,
    totalSpent: 25000000,
    pointsEarned: 2500,
  }

  const upcomingBookings = [
    {
      id: "1",
      type: "studio",
      providerName: "Studio Ánh Dương",
      service: "Chụp ảnh cưới cao cấp",
      date: addDays(new Date(), 2),
      time: "09:00-12:00",
      status: "confirmed",
      price: 5000000,
      image: "/placeholder.svg?height=60&width=60",
      address: "123 Nguyễn Huệ, Quận 1",
    },
    {
      id: "2",
      type: "makeup",
      providerName: "Makeup Artist Linh",
      service: "Makeup cô dâu",
      date: addDays(new Date(), 2),
      time: "07:00-09:00",
      status: "confirmed",
      price: 1500000,
      image: "/placeholder.svg?height=60&width=60",
      address: "456 Lê Lợi, Quận 1",
    },
  ]

  const recentActivity = [
    { id: "1", type: "booking",  message: "Đặt lịch thành công tại Studio Ánh Dương", time: "2 giờ trước", icon: Calendar },
    { id: "2", type: "favorite", message: "Đã thêm Makeup Artist Mai vào yêu thích",  time: "1 ngày trước",  icon: Heart },
    { id: "3", type: "review",   message: "Đã đánh giá 5 sao cho Studio Minh Châu",   time: "3 ngày trước",  icon: Star },
  ]

  const recommendations = [
    { id: "1", type: "studio", name: "Studio Hoàng Gia", rating: 4.8, location: "Quận 3, TP.HCM", image: "/placeholder.svg?height=80&width=80", priceFrom: 2000000, reason: "Phù hợp với sở thích của bạn" },
    { id: "2", type: "makeup", name: "Beauty Expert Trang", rating: 4.9, location: "Quận 1, TP.HCM", image: "/placeholder.svg?height=80&width=80", priceFrom: 1200000, reason: "Được đánh giá cao bởi khách hàng" },
  ]

  const membershipProgress = {
    current: "Gold",
    next: "Platinum",
    currentPoints: 2500,
    nextLevelPoints: 5000,
    progress: (2500 / 5000) * 100,
  }

  const getDateText = (date) => {
    if (isToday(date)) return "Hôm nay"
    if (isTomorrow(date)) return "Ngày mai"
    return format(date, "dd/MM/yyyy", { locale: vi })
  }

  const getServiceIcon = (type) => {
    switch (type) {
      case "studio": return Camera
      case "makeup": return Palette
      case "rental": return Shirt
      default: return Calendar
    }
  }

  return (
    <div className="min-h-screen bg-[#EFE7DA]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {showWelcome && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Gift className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Chào mừng bạn đến với nền tảng của chúng tôi!</strong>
              Bạn đã nhận được 100 điểm thưởng và ưu đãi 10% cho lần đặt đầu tiên.
              <Button variant="link" className="p-0 h-auto text-green-600 ml-2" onClick={() => setShowWelcome(false)}>
                Đóng
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Chào {user.name.split(" ").pop()}! 👋</h1>
              <p className="text-gray-600">Chúc bạn có một ngày tuyệt vời</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/booking">
                <Plus className="w-4 h-4 mr-2" />
                Đặt lịch mới
              </Link>
            </Button>
            <Button asChild>
              <Link to="/profile">
                <Eye className="w-4 h-4 mr-2" />
                Xem hồ sơ
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card><CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{stats.totalBookings}</div>
                <div className="text-sm text-gray-600">Tổng đặt lịch</div>
              </CardContent></Card>

              <Card><CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{stats.completedBookings}</div>
                <div className="text-sm text-gray-600">Đã hoàn thành</div>
              </CardContent></Card>

              <Card><CardContent className="p-4 text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold">{stats.favoriteProviders}</div>
                <div className="text-sm text-gray-600">Yêu thích</div>
              </CardContent></Card>

              <Card><CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{stats.pointsEarned}</div>
                <div className="text-sm text-gray-600">Điểm tích lũy</div>
              </CardContent></Card>
            </div>

            {/* Upcoming */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Lịch hẹn sắp tới</CardTitle>
                  <CardDescription>Bạn có {upcomingBookings.length} lịch hẹn trong tuần này</CardDescription>
                </div>
                <Button variant="outline" asChild>
                  <Link to="/bookings">
                    Xem tất cả <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.length ? (
                  upcomingBookings.map((booking) => {
                    const ServiceIcon = getServiceIcon(booking.type)
                    return (
                      <div key={booking.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="relative">
                          <img
                            src={booking.image || "/placeholder.svg"}
                            alt={booking.providerName}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                            loading="lazy"
                          />
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <ServiceIcon className="w-3 h-3 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{booking.providerName}</h3>
                          <p className="text-sm text-gray-600">{booking.service}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{getDateText(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.address}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-blue-600">{booking.price.toLocaleString()}đ</div>
                          <Badge className="bg-green-100 text-green-800">Đã xác nhận</Badge>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 mb-4">Bạn chưa có lịch hẹn nào sắp tới</p>
                    <Button asChild><Link to="/booking">Đặt lịch ngay</Link></Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Gợi ý dành cho bạn</CardTitle>
                <CardDescription>Các nhà cung cấp dịch vụ phù hợp với sở thích của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((item) => {
                    const ServiceIcon = getServiceIcon(item.type)
                    return (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="rounded-lg object-cover"
                              loading="lazy"
                            />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                              <ServiceIcon className="w-3 h-3 text-white" />
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{item.name}</h3>
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span>{item.location}</span>
                            </div>
                            <p className="text-xs text-blue-600 mb-2">{item.reason}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-blue-600">Từ {item.priceFrom.toLocaleString()}đ</span>
                              <Button size="sm" variant="outline" asChild>
                                <Link to={`/${item.type}/${item.id}`}>Xem chi tiết</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-600" />
                  Thành viên {membershipProgress.current}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{membershipProgress.currentPoints}</div>
                  <div className="text-sm text-gray-600">điểm hiện tại</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tiến độ lên {membershipProgress.next}</span>
                    <span>{membershipProgress.nextLevelPoints - membershipProgress.currentPoints} điểm nữa</span>
                  </div>
                  <Progress value={membershipProgress.progress} className="h-2" />
                </div>

                <div className="text-xs text-gray-600 text-center">
                  Đặt thêm dịch vụ để tích lũy điểm và nhận ưu đãi tốt hơn!
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Hoạt động gần đây
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((a) => {
                  const ActivityIcon = a.icon
                  return (
                    <div key={a.id} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <ActivityIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{a.message}</p>
                        <p className="text-xs text-gray-500">{a.time}</p>
                      </div>
                    </div>
                  )
                })}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/notifications">Xem tất cả thông báo</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Thao tác nhanh</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/favorites"><Heart className="w-4 h-4 mr-2" />Danh sách yêu thích</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/reviews"><Star className="w-4 h-4 mr-2" />Đánh giá của tôi</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/payments"><CreditCard className="w-4 h-4 mr-2" />Phương thức thanh toán</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/settings"><Bell className="w-4 h-4 mr-2" />Cài đặt thông báo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
