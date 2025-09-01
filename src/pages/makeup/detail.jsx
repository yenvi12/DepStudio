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
  Star, MapPin, Phone, Mail, Clock, Heart, Share2, Calendar as CalendarIcon,
  Palette, Award, CheckCircle, XCircle, AlertCircle, Shield, Verified,
  MessageCircle, Globe, Instagram, Facebook
} from "lucide-react"
import { format, isBefore } from "date-fns"
import { vi } from "date-fns/locale"

export default function MakeupArtistDetailPage() {
  const { id } = useParams()
  const [selectedDate, setSelectedDate] = useState(null)

  // Mock data
  const makeupData = {
    id,
    name: "Makeup Artist Linh",
    tagline: "Chuyên gia trang điểm cô dâu hàng đầu",
    rating: 4.8,
    reviewCount: 89,
    completedProjects: 450,
    yearsExperience: 6,
    location: "456 Lê Lợi, Quận 3, TP.HCM",
    phone: "0907654321",
    email: "contact@makeuplinh.com",
    website: "https://makeuplinh.com",
    socialMedia: { instagram: "@makeup_linh", facebook: "MakeupArtistLinh" },
    coverImage: "/placeholder.svg?height=400&width=800",
    profileImage: "/placeholder.svg?height=200&width=200",
    verified: true,
    premium: true,
    description:
      "Makeup Artist Linh với hơn 6 năm kinh nghiệm trong ngành làm đẹp, chuyên về makeup cưới và makeup dự tiệc. " +
      "Tôi luôn theo đuổi phong cách trang điểm tự nhiên, tôn lên vẻ đẹp riêng của từng khách hàng.\n\n" +
      "Đã thực hiện hơn 450 dự án thành công với sự hài lòng tuyệt đối từ khách hàng. Tôi cam kết mang đến cho bạn " +
      "vẻ đẹp hoàn hảo nhất trong ngày trọng đại.",
    services: [
      { id: "1", name: "Makeup cô dâu cơ bản", price: 800000, duration: 90, description: "Makeup cô dâu tự nhiên, tươi tắn cho ngày cưới", includes: ["Makeup mặt", "Làm tóc cơ bản", "Cài phụ kiện", "Touch-up 1 lần"], popular: false },
      { id: "2", name: "Makeup cô dâu cao cấp", price: 1500000, duration: 120, description: "Makeup cô dâu sang trọng với phong cách hiện đại", includes: ["Makeup mặt chuyên nghiệp","Làm tóc cao cấp","Cài phụ kiện","Touch-up 2 lần","Makeup phù dâu (1 người)","Tặng son touch-up"], popular: true },
      { id: "3", name: "Makeup dự tiệc", price: 600000, duration: 60, description: "Makeup dự tiệc sang trọng, phù hợp mọi sự kiện", includes: ["Makeup mặt", "Làm tóc đơn giản", "Touch-up 1 lần"], popular: false },
      { id: "4", name: "Makeup chụp ảnh", price: 700000, duration: 75, description: "Makeup chuyên dụng cho chụp ảnh, bền màu", includes: ["Makeup mặt HD", "Làm tóc", "Phù hợp ánh sáng studio"], popular: false },
    ],
    specialties: ["Makeup cưới", "Makeup dự tiệc", "Makeup chụp ảnh", "Makeup sự kiện", "Makeup nghệ thuật", "Làm tóc cô dâu"],
    certifications: [
      "Chứng chỉ Makeup Artist quốc tế",
      "Chứng chỉ Làm tóc chuyên nghiệp",
      "Đào tạo tại Học viện Thẩm mỹ Hàn Quốc",
      "Chứng nhận vệ sinh an toàn thực phẩm",
    ],
    brands: ["MAC", "NARS", "Urban Decay", "Charlotte Tilbury", "Dior", "YSL", "Chanel"],
    workingHours: {
      monday: { open: "09:00", close: "18:00", available: true },
      tuesday: { open: "09:00", close: "18:00", available: true },
      wednesday: { open: "09:00", close: "18:00", available: true },
      thursday: { open: "09:00", close: "18:00", available: true },
      friday: { open: "09:00", close: "18:00", available: true },
      saturday: { open: "08:00", close: "20:00", available: true },
      sunday: { open: "08:00", close: "20:00", available: true },
    },
    bookedSlots: [
      { date: "2024-01-25", timeSlots: ["09:00-10:30", "14:00-16:00"], services: ["Makeup cô dâu cao cấp", "Makeup dự tiệc"], status: "confirmed" },
      { date: "2024-01-26", timeSlots: ["10:00-12:00"], services: ["Makeup cô dâu cao cấp"], status: "confirmed" },
      { date: "2024-01-27", timeSlots: ["09:00-10:30"], services: ["Makeup dự tiệc"], status: "pending" },
    ],
    gallery: Array.from({ length: 6 }).map(() => "/placeholder.svg?height=300&width=400"),
    reviews: [
      { id: "1", customerName: "Nguyễn Thị Mai", rating: 5, date: "2024-01-15", comment: "Makeup rất đẹp và tự nhiên, Linh rất chuyên nghiệp và tận tâm!", avatar: "/placeholder.svg?height=40&width=40", service: "Makeup cô dâu cao cấp", verified: true },
      { id: "2", customerName: "Trần Thị Hoa", rating: 5, date: "2024-01-10", comment: "Makeup bền màu cả ngày, rất hài lòng với dịch vụ.", avatar: "/placeholder.svg?height=40&width=40", service: "Makeup dự tiệc", verified: true },
    ],
  }

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))

  const generateTimeSlots = (date) => {
    const dayName = format(date, "EEEE", { locale: vi }).toLowerCase()
    const wh = makeupData.workingHours[dayName]
    if (!wh?.available) return []

    const slots = []
    const startHour = parseInt(wh.open.split(":")[0], 10)
    const endHour = parseInt(wh.close.split(":")[0], 10)

    // tạo slot 1.5 giờ (90 phút): 09:00-10:30, 11:00-12:30, ...
    for (let hour = startHour; hour < endHour; hour += 2) {
      const startTime = `${String(hour).padStart(2, "0")}:00`
      const endH = hour + 1
      const endM = 30
      const endTime = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`
      slots.push(`${startTime}-${endTime}`)
    }
    return slots
  }

  const isSlotAvailable = (date, timeSlot) => {
    const dateString = format(date, "yyyy-MM-dd")
    const bookedDay = makeupData.bookedSlots.find((slot) => slot.date === dateString)
    if (!bookedDay) return true
    return !bookedDay.timeSlots.includes(timeSlot)
  }

  const getDayStatus = (date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const bookedDay = makeupData.bookedSlots.find((slot) => slot.date === dateString)
    const dayName = format(date, "EEEE", { locale: vi }).toLowerCase()
    const wh = makeupData.workingHours[dayName]
    if (!wh?.available) return "unavailable"
    if (!bookedDay) return "available"

    const totalSlots = generateTimeSlots(date).length
    const booked = bookedDay.timeSlots.length
    if (booked >= totalSlots) return "fully-booked"
    if (booked > 0) return "partially-booked"
    return "available"
  }

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover + Info */}
      <div className="relative h-96 w-full">
        <img src={makeupData.coverImage || "/placeholder.svg"} alt={makeupData.name} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-6 left-6 right-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={makeupData.profileImage || "/placeholder.svg"}
                    alt={makeupData.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                    loading="lazy"
                  />
                  {makeupData.verified && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-600">
                      <Verified className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{makeupData.name}</h1>
                    {makeupData.premium && <Badge className="bg-gradient-to-r from-pink-400 to-purple-500">Premium</Badge>}
                  </div>
                  <p className="text-gray-600 mb-3">{makeupData.tagline}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(makeupData.rating)} <span className="font-medium">{makeupData.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({makeupData.reviewCount} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-pink-600" />
                      <span className="text-sm">{makeupData.completedProjects} dự án</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{makeupData.yearsExperience} năm kinh nghiệm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Quận 3, TP.HCM</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to={`/booking?makeup=${makeupData.id}`}>
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Đặt lịch ngay
                      </Link>
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Nhắn tin
                    </Button>
                    <Button variant="outline" size="icon"><Heart className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon"><Share2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="about">Giới thiệu</TabsTrigger>
                <TabsTrigger value="services">Dịch vụ</TabsTrigger>
                <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
                <TabsTrigger value="gallery">Thư viện</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
              </TabsList>

              {/* About */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader><CardTitle>Về tôi</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{makeupData.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-600" /> Chứng chỉ & Đào tạo
                        </h4>
                        <ul className="space-y-2">
                          {makeupData.certifications.map((cert, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {cert}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Palette className="w-5 h-5 text-pink-600" /> Chuyên môn
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {makeupData.specialties.map((s, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Thương hiệu sử dụng</h4>
                      <div className="flex flex-wrap gap-2">
                        {makeupData.brands.map((b, i) => (
                          <Badge key={i} className="bg-pink-100 text-pink-800 hover:bg-pink-200">{b}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Giờ làm việc</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(makeupData.workingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium capitalize">
                              {day === "monday" ? "Thứ 2" :
                               day === "tuesday" ? "Thứ 3" :
                               day === "wednesday" ? "Thứ 4" :
                               day === "thursday" ? "Thứ 5" :
                               day === "friday" ? "Thứ 6" :
                               day === "saturday" ? "Thứ 7" : "Chủ nhật"}
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

              {/* Services */}
              <TabsContent value="services" className="space-y-4">
                {makeupData.services.map((service) => (
                  <Card key={service.id} className={service.popular ? "border-pink-500 border-2" : ""}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{service.name}</h3>
                            {service.popular && <Badge className="bg-pink-600">Phổ biến nhất</Badge>}
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
                          <div className="text-2xl font-bold text-pink-600 mb-2">{service.price.toLocaleString()}đ</div>
                          <Button asChild>
                            <Link to={`/booking?makeup=${makeupData.id}&service=${service.id}`}>
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              Đặt lịch
                            </Link>
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Bao gồm:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                          {service.includes.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Schedule */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader><CardTitle>Lịch trình & Tình trạng đặt lịch</CardTitle></CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                            available: (d) => getDayStatus(d) === "available",
                            "partially-booked": (d) => getDayStatus(d) === "partially-booked",
                            "fully-booked": (d) => getDayStatus(d) === "fully-booked",
                          }}
                          modifiersStyles={{
                            available: { backgroundColor: "#dcfce7", color: "#166534" },
                            "partially-booked": { backgroundColor: "#fef3c7", color: "#92400e" },
                            "fully-booked": { backgroundColor: "#fecaca", color: "#991b1b" },
                          }}
                        />

                        <div className="mt-4 space-y-2">
                          <h5 className="font-medium text-sm">Chú thích:</h5>
                          <div className="flex flex-wrap gap-4 text-xs">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-200 rounded" /> <span>Còn trống</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-200 rounded" /> <span>Một phần đã đặt</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-200 rounded" /> <span>Đã đầy</span></div>
                          </div>
                        </div>
                      </div>

                      <div>
                        {selectedDate ? (
                          <div>
                            <h4 className="font-medium mb-4">
                              Lịch trình ngày {format(selectedDate, "dd/MM/yyyy", { locale: vi })}
                            </h4>
                            <div className="space-y-3">
                              {timeSlots.length > 0 ? (
                                timeSlots.map((slot) => {
                                  const available = isSlotAvailable(selectedDate, slot)
                                  return (
                                    <div
                                      key={slot}
                                      className={`p-3 rounded-lg border-2 transition-colors ${
                                        available ? "border-green-2 00 bg-green-50 hover:border-green-300"
                                                  : "border-red-200 bg-red-50"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          {available ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                                          <span className="font-medium">{slot}</span>
                                        </div>
                                        <div className="text-right">
                                          {available ? <Badge className="bg-green-600">Còn trống</Badge> : <Badge variant="destructive">Đã đặt</Badge>}
                                        </div>
                                      </div>
                                      {!available && (
                                        <div className="mt-2 text-sm text-gray-600">
                                          <span className="font-medium">Dịch vụ: </span>
                                          {makeupData.bookedSlots.find((b) => b.date === format(selectedDate, "yyyy-MM-dd"))?.services.join(", ")}
                                        </div>
                                      )}
                                    </div>
                                  )
                                })
                              ) : (
                                <div className="text-center py-8 text-gray-500">
                                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                                  <p>Không làm việc vào ngày này</p>
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
              </TabsContent>

              {/* Gallery */}
              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {makeupData.gallery.map((src, i) => (
                    <div key={i} className="relative aspect-square group cursor-pointer">
                      <img src={src || "/placeholder.svg"} alt={`Gallery ${i + 1}`} className="object-cover rounded-lg w-full h-full transition-transform group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews */}
              <TabsContent value="reviews" className="space-y-4">
                {makeupData.reviews.map((r) => (
                  <Card key={r.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={r.avatar || "/placeholder.svg"} alt={r.customerName} />
                          <AvatarFallback>{r.customerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{r.customerName}</h4>
                              {r.verified && (
                                <Badge variant="outline" className="text-xs">
                                  <Shield className="w-3 h-3 mr-1" /> Đã xác minh
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{format(new Date(r.date), "dd/MM/yyyy")}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">{renderStars(r.rating)}</div>
                            <Badge variant="secondary" className="text-xs">{r.service}</Badge>
                          </div>
                          <p className="text-gray-700">{r.comment}</p>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" /> Đặt lịch nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" asChild>
                  <Link to={`/booking?makeup=${makeupData.id}`}>
                    <CalendarIcon className="w-4 h-4 mr-2" /> Đặt lịch ngay
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" /> Tư vấn miễn phí
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Thông tin liên hệ</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-pink-600" /><span>{makeupData.phone}</span></div>
                <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-pink-600" /><span>{makeupData.email}</span></div>
                <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-pink-600" /><span>{makeupData.location}</span></div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-pink-600" />
                  <a href={makeupData.website} className="text-pink-600 hover:underline" target="_blank" rel="noreferrer">Website</a>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Mạng xã hội</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm"><Instagram className="w-4 h-4 mr-1" /> Instagram</Button>
                    <Button variant="outline" size="sm"><Facebook className="w-4 h-4 mr-1" /> Facebook</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Thống kê</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Đánh giá trung bình</span><span className="font-semibold">{makeupData.rating}/5</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Tổng đánh giá</span><span className="font-semibold">{makeupData.reviewCount}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Dự án hoàn thành</span><span className="font-semibold">{makeupData.completedProjects}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Kinh nghiệm</span><span className="font-semibold">{makeupData.yearsExperience} năm</span></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
