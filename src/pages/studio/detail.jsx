import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"

import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  Camera,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  Verified,
  MessageCircle,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react"

import { format, isAfter, isBefore } from "date-fns"
import { vi } from "date-fns/locale"

export default function StudioDetailPage() {
  const { id } = useParams()
  const [selectedDate, setSelectedDate] = useState()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")

  // Mock data cho studio
  const studioData = {
    id,
    name: "Studio Ánh Dương",
    tagline: "Chuyên gia nhiếp ảnh cưới hàng đầu",
    rating: 4.9,
    reviewCount: 127,
    completedProjects: 850,
    yearsExperience: 8,
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    phone: "0901234567",
    email: "contact@anhdương.com",
    website: "https://anhdương.com",
    socialMedia: { instagram: "@anhdương_studio", facebook: "AnhDuongStudio" },
    coverImage: "/anh-duong-studio-918172.jpg?height=400&width=800",
    profileImage: "/anh-duong-studio-918172.jpg?height=200&width=200",
    verified: true,
    premium: true,
    description: `Studio Ánh Dương được thành lập từ năm 2016 với đội ngũ nhiếp ảnh gia chuyên nghiệp và giàu kinh nghiệm. 
Chúng tôi chuyên cung cấp dịch vụ chụp ảnh cưới, gia đình và doanh nghiệp với phong cách hiện đại, tự nhiên và nghệ thuật.

Với hơn 8 năm kinh nghiệm và đã thực hiện hơn 850 dự án thành công, chúng tôi cam kết mang đến cho khách hàng những bức ảnh đẹp nhất, 
lưu giữ những khoảnh khắc đáng nhớ trong cuộc đời.`,
    services: [
      {
        id: "1",
        name: "Chụp ảnh cưới cơ bản",
        price: 3000000,
        duration: 180,
        description: "Gói chụp ảnh cưới cơ bản với 100 ảnh đã chỉnh sửa",
        includes: ["100 ảnh đã chỉnh sửa", "1 nhiếp ảnh gia", "Trang phục cơ bản", "Makeup nhẹ"],
        popular: false,
      },
      {
        id: "2",
        name: "Chụp ảnh cưới cao cấp",
        price: 5000000,
        duration: 300,
        description: "Gói chụp ảnh cưới cao cấp với đầy đủ dịch vụ",
        includes: [
          "200 ảnh đã chỉnh sửa",
          "2 nhiếp ảnh gia",
          "Trang phục cao cấp",
          "Makeup chuyên nghiệp",
          "Album ảnh",
          "USB ảnh gốc",
        ],
        popular: true,
      },
      {
        id: "3",
        name: "Chụp ảnh gia đình",
        price: 2000000,
        duration: 120,
        description: "Gói chụp ảnh gia đình ấm cúng",
        includes: ["50 ảnh đã chỉnh sửa", "1 nhiếp ảnh gia", "Props chụp ảnh"],
        popular: false,
      },
    ],
    team: [
      {
        id: "1",
        name: "Nguyễn Minh Anh",
        role: "Nhiếp ảnh gia chính",
        experience: "8 năm",
        specialties: ["Chụp ảnh cưới", "Portrait"],
        avatar: "/placeholder.svg?height=80&width=80",
        bio: "Nhiếp ảnh gia với hơn 8 năm kinh nghiệm, chuyên về chụp ảnh cưới và portrait",
      },
      {
        id: "2",
        name: "Trần Thị Linh",
        role: "Makeup Artist",
        experience: "6 năm",
        specialties: ["Makeup cưới", "Makeup dự tiệc"],
        avatar: "/placeholder.svg?height=80&width=80",
        bio: "Makeup artist chuyên nghiệp với phong cách tự nhiên và sang trọng",
      },
      {
        id: "3",
        name: "Lê Văn Đức",
        role: "Nhiếp ảnh gia phụ",
        experience: "4 năm",
        specialties: ["Chụp ảnh sự kiện", "Chụp ảnh gia đình"],
        avatar: "/placeholder.svg?height=80&width=80",
        bio: "Nhiếp ảnh gia trẻ năng động với góc nhìn sáng tạo",
      },
    ],
    equipment: [
      "Canon EOS R5",
      "Sony A7R IV",
      "Lens 24-70mm f/2.8",
      "Lens 85mm f/1.4",
      "Đèn studio Profoto",
      "Drone DJI Mavic 3",
      "Gimbal DJI Ronin",
    ],
    achievements: [
      "Top 10 Studio chụp ảnh cưới TP.HCM 2023",
      "Giải thưởng Nhiếp ảnh xuất sắc 2022",
      "Chứng nhận ISO 9001:2015",
      "Đối tác chính thức Canon Việt Nam",
    ],
    workingHours: {
      monday: { open: "08:00", close: "18:00", available: true },
      tuesday: { open: "08:00", close: "18:00", available: true },
      wednesday: { open: "08:00", close: "18:00", available: true },
      thursday: { open: "08:00", close: "18:00", available: true },
      friday: { open: "08:00", close: "18:00", available: true },
      saturday: { open: "08:00", close: "20:00", available: true },
      sunday: { open: "08:00", close: "20:00", available: true },
    },
    bookedSlots: [
      { date: "2024-01-25", timeSlots: ["08:00-11:00", "14:00-17:00"], services: ["Chụp ảnh cưới cao cấp", "Chụp ảnh gia đình"], status: "confirmed" },
      { date: "2024-01-26", timeSlots: ["09:00-14:00"], services: ["Chụp ảnh cưới cao cấp"], status: "confirmed" },
      { date: "2024-01-27", timeSlots: ["08:00-11:00"], services: ["Chụp ảnh gia đình"], status: "pending" },
    ],
    gallery: Array.from({ length: 8 }).map(() => "/placeholder.svg?height=300&width=400"),
    reviews: [
      {
        id: "1",
        customerName: "Nguyễn Thị Lan",
        rating: 5,
        date: "2024-01-15",
        comment: "Dịch vụ tuyệt vời, ảnh đẹp, nhân viên nhiệt tình. Rất hài lòng với kết quả!",
        avatar: "/placeholder.svg?height=40&width=40",
        service: "Chụp ảnh cưới cao cấp",
        verified: true,
      },
      {
        id: "2",
        customerName: "Trần Văn Nam",
        rating: 4,
        date: "2024-01-10",
        comment: "Chất lượng ảnh tốt, giá cả hợp lý. Sẽ quay lại lần sau.",
        avatar: "/placeholder.svg?height=40&width=40",
        service: "Chụp ảnh gia đình",
        verified: true,
      },
    ],
  }

  // Tạo time slots dựa trên working hours
  const generateTimeSlots = (date) => {
    const dayName = format(date, "EEEE", { locale: vi }).toLowerCase()
    const workingHour = studioData.workingHours[dayName]
    if (!workingHour?.available) return []
    const slots = []
    const startHour = parseInt(workingHour.open.split(":")[0], 10)
    const endHour = parseInt(workingHour.close.split(":")[0], 10)
    for (let hour = startHour; hour < endHour; hour += 3) {
      const startTime = `${String(hour).padStart(2, "0")}:00`
      const endTime = `${String(hour + 3).padStart(2, "0")}:00`
      slots.push(`${startTime}-${endTime}`)
    }
    return slots
  }

  // Kiểm tra slot có available không
  const isSlotAvailable = (date, timeSlot) => {
    const dateString = format(date, "yyyy-MM-dd")
    const bookedDay = studioData.bookedSlots.find((slot) => slot.date === dateString)
    if (!bookedDay) return true
    return !bookedDay.timeSlots.includes(timeSlot)
  }

  // Lấy trạng thái của ngày
  const getDayStatus = (date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const bookedDay = studioData.bookedSlots.find((slot) => slot.date === dateString)
    if (!bookedDay) return "available"
    const totalSlots = generateTimeSlots(date).length
    const booked = bookedDay.timeSlots.length
    if (booked >= totalSlots) return "fully-booked"
    if (booked > 0) return "partially-booked"
    return "available"
  }

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover Image & Basic Info */}
      <div className="relative h-96 w-full">
        <img src={studioData.coverImage || "/placeholder.svg"} alt={studioData.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Studio Profile Card */}
        <div className="absolute bottom-6 left-6 right-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={studioData.profileImage || "/placeholder.svg"}
                    alt={studioData.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  {studioData.verified && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-600">
                      <Verified className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{studioData.name}</h1>
                    {studioData.premium && <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">Premium</Badge>}
                  </div>
                  <p className="text-gray-600 mb-3">{studioData.tagline}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(studioData.rating)}
                        <span className="font-medium">{studioData.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({studioData.reviewCount} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">{studioData.completedProjects} dự án</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{studioData.yearsExperience} năm kinh nghiệm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Quận 1, TP.HCM</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to={`/booking?studio=${studioData.id}`}>
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Đặt lịch ngay
                      </Link>
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Nhắn tin
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="about">Giới thiệu</TabsTrigger>
                <TabsTrigger value="services">Dịch vụ</TabsTrigger>
                <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
                <TabsTrigger value="team">Đội ngũ</TabsTrigger>
                <TabsTrigger value="gallery">Thư viện</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Về chúng tôi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{studioData.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-600" />
                          Thành tích & Chứng nhận
                        </h4>
                        <ul className="space-y-2">
                          {studioData.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Camera className="w-5 h-5 text-blue-600" />
                          Thiết bị chuyên nghiệp
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {studioData.equipment.map((item, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Giờ làm việc</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(studioData.workingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium capitalize">
                              {day === "monday"
                                ? "Thứ 2"
                                : day === "tuesday"
                                ? "Thứ 3"
                                : day === "wednesday"
                                ? "Thứ 4"
                                : day === "thursday"
                                ? "Thứ 5"
                                : day === "friday"
                                ? "Thứ 6"
                                : day === "saturday"
                                ? "Thứ 7"
                                : "Chủ nhật"}
                            </span>
                            <span className={`text-sm ${hours.available ? "text-green-600" : "text-red-600"}`}>
                              {hours.available ? `${hours.open} - ${hours.close}` : "Nghỉ"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Services Tab */}
              <TabsContent value="services" className="space-y-4">
                {studioData.services.map((service) => (
                  <Card key={service.id} className={service.popular ? "border-blue-500 border-2" : ""}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{service.name}</h3>
                            {service.popular && <Badge className="bg-blue-600">Phổ biến nhất</Badge>}
                          </div>
                          <p className="text-gray-600 mb-3">{service.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {Math.floor(service.duration / 60)}h {service.duration % 60}m
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-2">{service.price.toLocaleString()}đ</div>
                          <Button asChild>
                            <Link to={`/booking?studio=${studioData.id}&service=${service.id}`}>
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              Đặt lịch
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Bao gồm:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          {service.includes.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch trình & Tình trạng đặt lịch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Calendar */}
                      <div>
                        <h4 className="font-medium mb-4">Chọn ngày để xem lịch trình</h4>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => isBefore(date, new Date())}
                          locale={vi}
                          className="rounded-md border"
                          modifiers={{
                            available: (date) => getDayStatus(date) === "available",
                            "partially-booked": (date) => getDayStatus(date) === "partially-booked",
                            "fully-booked": (date) => getDayStatus(date) === "fully-booked",
                          }}
                          modifiersStyles={{
                            available: { backgroundColor: "#dcfce7", color: "#166534" },
                            "partially-booked": { backgroundColor: "#fef3c7", color: "#92400e" },
                            "fully-booked": { backgroundColor: "#fecaca", color: "#991b1b" },
                          }}
                        />

                        {/* Legend */}
                        <div className="mt-4 space-y-2">
                          <h5 className="font-medium text-sm">Chú thích:</h5>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-200 rounded" />
                              <span>Còn trống</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-yellow-200 rounded" />
                              <span>Một phần đã đặt</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-red-200 rounded" />
                              <span>Đã đầy</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div>
                        {selectedDate ? (
                          <div>
                            <h4 className="font-medium mb-4">Lịch trình ngày {format(selectedDate, "dd/MM/yyyy", { locale: vi })}</h4>
                            <div className="space-y-3">
                              {timeSlots.length > 0 ? (
                                timeSlots.map((slot) => {
                                  const isAvailable = isSlotAvailable(selectedDate, slot)
                                  return (
                                    <div
                                      key={slot}
                                      className={`p-3 rounded-lg border-2 transition-colors ${
                                        isAvailable ? "border-green-200 bg-green-50 hover:border-green-300" : "border-red-200 bg-red-50"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="flex items-center gap-2">
                                            {isAvailable ? (
                                              <CheckCircle className="w-5 h-5 text-green-600" />
                                            ) : (
                                              <XCircle className="w-5 h-5 text-red-600" />
                                            )}
                                            <span className="font-medium">{slot}</span>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          {isAvailable ? <Badge className="bg-green-600">Còn trống</Badge> : <Badge variant="destructive">Đã đặt</Badge>}
                                        </div>
                                      </div>
                                      {!isAvailable && (
                                        <div className="mt-2 text-sm text-gray-600">
                                          <span className="font-medium">Dịch vụ: </span>
                                          {studioData.bookedSlots.find((b) => b.date === format(selectedDate, "yyyy-MM-dd"))?.services.join(", ")}
                                        </div>
                                      )}
                                    </div>
                                  )
                                })
                              ) : (
                                <div className="text-center py-8 text-gray-500">
                                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                                  <p>Studio không làm việc vào ngày này</p>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <CalendarIcon className="w-8 h-8 mx-auto mb-2" />
                            <p>Chọn ngày để xem lịch trình chi tiết</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lịch đã đặt sắp tới</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studioData.bookedSlots
                        .filter((booking) => isAfter(new Date(booking.date), new Date()))
                        .map((booking, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <CalendarIcon className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">{format(new Date(booking.date), "EEEE, dd/MM/yyyy", { locale: vi })}</span>
                              </div>
                              <Badge
                                className={
                                  booking.status === "confirmed" ? "bg-green-600" : booking.status === "pending" ? "bg-yellow-600" : "bg-gray-600"
                                }
                              >
                                {booking.status === "confirmed" ? "Đã xác nhận" : booking.status === "pending" ? "Chờ xác nhận" : "Đã hủy"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Khung giờ: </span>
                                {booking.timeSlots.join(", ")}
                              </div>
                              <div>
                                <span className="font-medium">Dịch vụ: </span>
                                {booking.services.join(", ")}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Team Tab */}
              <TabsContent value="team" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {studioData.team.map((member) => (
                    <Card key={member.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-blue-600 font-medium">{member.role}</p>
                            <p className="text-sm text-gray-600 mb-3">{member.bio}</p>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Award className="w-4 h-4 text-green-600" />
                                <span>Kinh nghiệm: {member.experience}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Chuyên môn: </span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {member.specialties.map((specialty, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {studioData.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square group cursor-pointer">
                      <img src={image || "/placeholder.svg"} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover rounded-lg transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                {studioData.reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.customerName} />
                          <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{review.customerName}</h4>
                              {review.verified && (
                                <Badge variant="outline" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Đã xác minh
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{format(new Date(review.date), "dd/MM/yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                            <Badge variant="secondary" className="text-xs">
                              {review.service}
                            </Badge>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Booking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Đặt lịch nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" asChild>
                  <Link to={`/booking?studio=${studioData.id}`}>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Đặt lịch ngay
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Tư vấn miễn phí
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <span>{studioData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>{studioData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>{studioData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <a href={studioData.website} className="text-blue-600 hover:underline">
                    Website
                  </a>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Mạng xã hội</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Instagram className="w-4 h-4 mr-1" />
                      Instagram
                    </Button>
                    <Button variant="outline" size="sm">
                      <Facebook className="w-4 h-4 mr-1" />
                      Facebook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Thống kê</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Đánh giá trung bình</span>
                  <span className="font-semibold">{studioData.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng đánh giá</span>
                  <span className="font-semibold">{studioData.reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dự án hoàn thành</span>
                  <span className="font-semibold">{studioData.completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kinh nghiệm</span>
                  <span className="font-semibold">{studioData.yearsExperience} năm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
