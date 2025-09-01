import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Star,
  Edit,
  Save,
  X,
  Bell,
  Shield,
  CreditCard,
  Clock,
  CheckCircle,
} from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    id: "1",
    name: "Nguyễn Văn A",
    email: "user@example.com",
    phone: "0901234567",
    avatar: "/placeholder.svg?height=120&width=120",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    dateOfBirth: "1990-01-01",
    gender: "male",
    bio: "Yêu thích chụp ảnh và tham gia các sự kiện đặc biệt",
    joinDate: "2023-01-15",
    verified: true,
    membershipLevel: "Gold",
  })

  const [editForm, setEditForm] = useState(user)

  // Mock data
  const bookings = [
    {
      id: "1",
      type: "studio",
      providerName: "Studio Ánh Dương",
      service: "Chụp ảnh cưới cao cấp",
      date: "2024-02-15",
      time: "09:00-12:00",
      status: "confirmed",
      price: 5000000,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      type: "makeup",
      providerName: "Makeup Artist Linh",
      service: "Makeup cô dâu cao cấp",
      date: "2024-02-15",
      time: "07:00-09:00",
      status: "confirmed",
      price: 1500000,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "3",
      type: "rental",
      providerName: "Thuê Áo Cưới Hoàng Gia",
      service: "Thuê áo cưới",
      date: "2024-02-10",
      time: "10:00-12:00",
      status: "completed",
      price: 2000000,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const favorites = [
    {
      id: "1",
      type: "studio",
      name: "Studio Minh Châu",
      rating: 4.7,
      location: "Quận 3, TP.HCM",
      image: "/placeholder.svg?height=100&width=100",
      priceFrom: 1500000,
    },
    {
      id: "2",
      type: "makeup",
      name: "Beauty Artist Mai",
      rating: 4.9,
      location: "Quận 1, TP.HCM",
      image: "/placeholder.svg?height=100&width=100",
      priceFrom: 800000,
    },
  ]

  const reviews = [
    {
      id: "1",
      providerName: "Studio Ánh Dương",
      service: "Chụp ảnh cưới",
      rating: 5,
      comment: "Dịch vụ tuyệt vời, ảnh đẹp, nhân viên nhiệt tình!",
      date: "2024-01-20",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "2",
      providerName: "Makeup Artist Linh",
      service: "Makeup cưới",
      rating: 5,
      comment: "Makeup rất đẹp và tự nhiên, rất hài lòng!",
      date: "2024-01-15",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  const handleSave = () => {
    setUser(editForm)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm(user)
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận"
      case "pending":
        return "Chờ xác nhận"
      case "completed":
        return "Hoàn thành"
      case "cancelled":
        return "Đã hủy"
      default:
        return "Không rõ"
    }
  }

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                <p className="text-gray-600 mb-2">{user.email}</p>

                <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500">
                  {user.membershipLevel} Member
                </Badge>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Tham gia {format(new Date(user.joinDate), "dd/MM/yyyy", { locale: vi })}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>TP.HCM</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/bookings">
                      <Calendar className="w-4 h-4 mr-2" />
                      Lịch đặt
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/favorites">
                      <Heart className="w-4 h-4 mr-2" />
                      Yêu thích
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng đặt lịch</span>
                  <span className="font-semibold">{bookings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đã hoàn thành</span>
                  <span className="font-semibold">{bookings.filter((b) => b.status === "completed").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yêu thích</span>
                  <span className="font-semibold">{favorites.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đánh giá</span>
                  <span className="font-semibold">{reviews.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
                <TabsTrigger value="bookings">Đặt lịch</TabsTrigger>
                <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                <TabsTrigger value="settings">Cài đặt</TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="w-4 h-4 mr-2" />
                          Hủy
                        </Button>
                        <Button onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Lưu
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ và tên</Label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={editForm.name}
                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <User className="w-4 h-4 text-gray-400" />
                            <span>{user.name}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span>{user.email}</span>
                          {user.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Số điện thoại</Label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Giới tính</Label>
                        {isEditing ? (
                          <Select
                            value={editForm.gender}
                            onValueChange={(value) => setEditForm({ ...editForm, gender: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Nam</SelectItem>
                              <SelectItem value="female">Nữ</SelectItem>
                              <SelectItem value="other">Khác</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="p-2 bg-gray-50 rounded">
                            <span>{user.gender === "male" ? "Nam" : user.gender === "female" ? "Nữ" : "Khác"}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{user.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Giới thiệu bản thân</Label>
                      {isEditing ? (
                        <Textarea
                          id="bio"
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          rows={3}
                        />
                      ) : (
                        <div className="p-2 bg-gray-50 rounded">
                          <span>{user.bio}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={booking.image || "/placeholder.svg"}
                          alt={booking.providerName}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.providerName}</h3>
                              <p className="text-gray-600">{booking.service}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>{getStatusText(booking.status)}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{format(new Date(booking.date), "dd/MM/yyyy", { locale: vi })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              <span>{booking.price.toLocaleString()}đ</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/${booking.type}/${booking.id}`}>Chi tiết</Link>
                            </Button>
                            {booking.status === "confirmed" && (
                              <Button variant="outline" size="sm">Hủy đặt lịch</Button>
                            )}
                            {booking.status === "completed" && (
                              <Button variant="outline" size="sm">Đánh giá</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favorites.map((favorite) => (
                    <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={favorite.image || "/placeholder.svg"}
                            alt={favorite.name}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                            loading="lazy"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{favorite.name}</h3>
                            <div className="flex items-center gap-1 mb-2">
                              {renderStars(favorite.rating)}
                              <span className="text-sm text-gray-600">({favorite.rating})</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                              <MapPin className="w-4 h-4" />
                              <span>{favorite.location}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-blue-600">
                                Từ {favorite.priceFrom.toLocaleString()}đ
                              </span>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/${favorite.type}/${favorite.id}`}>Xem</Link>
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.image || "/placeholder.svg"}
                          alt={review.providerName}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{review.providerName}</h3>
                              <p className="text-sm text-gray-600">{review.service}</p>
                            </div>
                            <span className="text-sm text-gray-500">
                              {format(new Date(review.date), "dd/MM/yyyy", { locale: vi })}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 mb-3">{renderStars(review.rating)}</div>

                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Thông báo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email thông báo</h4>
                        <p className="text-sm text-gray-600">Nhận thông báo qua email</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">SMS thông báo</h4>
                        <p className="text-sm text-gray-600">Nhận thông báo qua SMS</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Thông báo khuyến mãi</h4>
                        <p className="text-sm text-gray-600">Nhận thông tin ưu đãi</p>
                      </div>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Bảo mật
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">Đổi mật khẩu</Button>
                    <Button variant="outline" className="w-full justify-start">Xác thực 2 bước</Button>
                    <Button variant="outline" className="w-full justify-start">Quản lý thiết bị đăng nhập</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Thanh toán
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">Quản lý phương thức thanh toán</Button>
                    <Button variant="outline" className="w-full justify-start">Lịch sử giao dịch</Button>
                    <Button variant="outline" className="w-full justify-start">Hóa đơn & biên lai</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Vùng nguy hiểm</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      Tạm khóa tài khoản
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                      Xóa tài khoản vĩnh viễn
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
