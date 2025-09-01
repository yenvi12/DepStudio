import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvailabilityChecker } from "@/components/availability-checker"
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Heart,
  Share2,
  Calendar as CalendarIcon,
  Shirt,
  Award,
  CheckCircle,
  Shield,
  Verified,
  MessageCircle,
  Globe,
  Instagram,
  Facebook,
  Package,
} from "lucide-react"
import { format } from "date-fns"

export default function RentalDetailPage() {
  const { id } = useParams()
  const [selectedDate, setSelectedDate] = useState()

  // Mock data cho rental shop
  const rentalData = {
    id,
    name: "Thuê Áo Cưới Hoàng Gia",
    tagline: "Cửa hàng cho thuê trang phục cưới cao cấp",
    rating: 4.7,
    reviewCount: 156,
    totalItems: 500,
    yearsExperience: 8,
    location: "789 Võ Văn Tần, Quận 7, TP.HCM",
    phone: "0909876543",
    email: "contact@hoanggia.com",
    website: "https://hoanggia.com",
    socialMedia: {
      instagram: "@hoanggia_rental",
      facebook: "HoangGiaRental",
    },
    coverImage: "/placeholder.svg?height=400&width=800",
    profileImage: "/placeholder.svg?height=200&width=200",
    verified: true,
    premium: true,
    description: `Thuê Áo Cưới Hoàng Gia được thành lập từ năm 2016 với sứ mệnh mang đến những bộ trang phục cưới đẹp nhất cho các cặp đôi. 
    Chúng tôi có hơn 500 mẫu áo cưới, vest nam và trang phục dự tiệc từ các thương hiệu nổi tiếng trong và ngoài nước.
    
    Với đội ngũ tư vấn chuyên nghiệp và dịch vụ chăm sóc khách hàng tận tâm, chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất 
    cho ngày trọng đại của bạn.`,

    categories: [
      { id: "1", name: "Áo cưới", itemCount: 200, priceRange: [800000, 3000000], description: "Áo cưới cao cấp từ các thương hiệu nổi tiếng", popular: true },
      { id: "2", name: "Vest nam", itemCount: 150, priceRange: [600000, 2500000], description: "Vest nam lịch lãm cho chú rể", popular: true },
      { id: "3", name: "Áo dài", itemCount: 100, priceRange: [400000, 1500000], description: "Áo dài truyền thống Việt Nam", popular: false },
      { id: "4", name: "Trang phục dự tiệc", itemCount: 50, priceRange: [300000, 1200000], description: "Trang phục dự tiệc sang trọng", popular: false },
    ],

    services: [
      "Cho thuê trang phục",
      "Sửa chữa và chỉnh sửa",
      "Tư vấn phong cách",
      "Giao hàng tận nơi",
      "Thử đồ tại nhà",
      "Đo size chuyên nghiệp",
      "Bảo hành và bảo dưỡng",
    ],

    brands: ["Vera Wang", "Pronovias", "Rosa Clara", "Monique Lhuillier", "Local Designer", "Custom Made"],

    features: [
      "Showroom rộng 300m²",
      "Hơn 500 mẫu trang phục",
      "Phòng thử đồ riêng tư",
      "Dịch vụ tư vấn 1-1",
      "Giao hàng miễn phí nội thành",
      "Bảo hiểm trang phục",
    ],

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
      { date: "2024-01-25", timeSlots: ["09:00-13:00", "14:00-18:00"], services: ["Thử áo cưới", "Tư vấn phong cách"], status: "confirmed" },
      { date: "2024-01-26", timeSlots: ["10:00-14:00"], services: ["Thử vest nam"], status: "confirmed" },
    ],

    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],

    reviews: [
      { id: "1", customerName: "Nguyễn Thị Lan", rating: 5, date: "2024-01-15", comment: "Áo cưới rất đẹp, dịch vụ tư vấn tận tình. Rất hài lòng!", avatar: "/placeholder.svg?height=40&width=40", category: "Áo cưới", verified: true },
      { id: "2", customerName: "Trần Văn Nam", rating: 4, date: "2024-01-10", comment: "Vest đẹp, giá cả hợp lý. Sẽ quay lại lần sau.", avatar: "/placeholder.svg?height=40&width=40", category: "Vest nam", verified: true },
    ],

    policies: {
      rental: ["Đặt cọc 30% giá trị trang phục", "Thời gian thuê tối thiểu 3 ngày", "Miễn phí thử đồ trước khi thuê", "Giao nhận tận nơi trong bán kính 10km"],
      return: ["Trả đồ đúng hạn để tránh phí phạt", "Kiểm tra tình trạng trang phục khi trả", "Phí giặt ủi đã bao gồm trong giá thuê", "Bồi thường theo quy định nếu hư hỏng"],
      cancellation: ["Hủy trước 7 ngày: Hoàn 100% tiền cọc", "Hủy trước 3 ngày: Hoàn 50% tiền cọc", "Hủy trong 3 ngày: Không hoàn tiền cọc"],
    },
  }

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Cover Image & Basic Info */}
      <div className="relative h-96 w-full">
        <img src={rentalData.coverImage || "/placeholder.svg"} alt={rentalData.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Profile Card */}
        <div className="absolute bottom-6 left-6 right-6">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <img
                    src={rentalData.profileImage || "/placeholder.svg"}
                    alt={rentalData.name}
                    width={120}
                    height={120}
                    className="rounded-lg object-cover"
                  />
                  {rentalData.verified && (
                    <Badge className="absolute -top-2 -right-2 bg-blue-600">
                      <Verified className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{rentalData.name}</h1>
                    {rentalData.premium && <Badge className="bg-gradient-to-r from-purple-400 to-indigo-500">Premium</Badge>}
                  </div>
                  <p className="text-gray-600 mb-3">{rentalData.tagline}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {renderStars(rentalData.rating)}
                        <span className="font-medium">{rentalData.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({rentalData.reviewCount} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{rentalData.totalItems} sản phẩm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{rentalData.yearsExperience} năm kinh nghiệm</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span className="text-sm">Quận 7, TP.HCM</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to={`/booking?rental=${rentalData.id}`}>
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Đặt lịch thử đồ
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
                <TabsTrigger value="categories">Danh mục</TabsTrigger>
                <TabsTrigger value="schedule">Lịch trình</TabsTrigger>
                <TabsTrigger value="gallery">Thư viện</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
                <TabsTrigger value="policies">Chính sách</TabsTrigger>
              </TabsList>

              {/* About Tab */}
              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Về chúng tôi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">{rentalData.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Shirt className="w-5 h-5 text-purple-600" />
                          Dịch vụ cung cấp
                        </h4>
                        <ul className="space-y-2">
                          {rentalData.services.map((service, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-600" />
                          Đặc điểm nổi bật
                        </h4>
                        <ul className="space-y-2">
                          {rentalData.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Thương hiệu hợp tác</h4>
                      <div className="flex flex-wrap gap-2">
                        {rentalData.brands.map((brand, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                            {brand}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Giờ làm việc</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Object.entries(rentalData.workingHours).map(([day, hours]) => (
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

              {/* Categories Tab */}
              <TabsContent value="categories" className="space-y-4">
                {rentalData.categories.map((category) => (
                  <Card key={category.id} className={category.popular ? "border-purple-500 border-2" : ""}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{category.name}</h3>
                            {category.popular && <Badge className="bg-purple-600">Phổ biến nhất</Badge>}
                          </div>
                          <p className="text-gray-600 mb-3">{category.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                              <Package className="w-4 h-4" />
                              {category.itemCount} sản phẩm
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600 mb-2">
                            {category.priceRange[0].toLocaleString()}đ - {category.priceRange[1].toLocaleString()}đ
                          </div>
                          <Button asChild>
                            <Link to={`/booking?rental=${rentalData.id}&category=${category.id}`}>
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              Đặt lịch thử
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Schedule Tab */}
              <TabsContent value="schedule" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Kiểm tra lịch trình & Đặt lịch thử đồ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AvailabilityChecker
                      providerId={rentalData.id}
                      providerType="rental"
                      workingHours={rentalData.workingHours}
                      bookedSlots={rentalData.bookedSlots}
                      onDateSelect={setSelectedDate}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {rentalData.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square group cursor-pointer">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Gallery ${index + 1}`}
                        className="object-cover rounded-lg w-full h-full transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-4">
                {rentalData.reviews.map((review) => (
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
                              {review.category}
                            </Badge>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Policies Tab */}
              <TabsContent value="policies" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shirt className="w-5 h-5 text-blue-600" />
                        Chính sách thuê
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {rentalData.policies.rental.map((policy, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {policy}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-green-600" />
                        Chính sách trả đồ
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {rentalData.policies.return.map((policy, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {policy}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-red-600" />
                        Chính sách hủy
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {rentalData.policies.cancellation.map((policy, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                            {policy}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
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
                  <Link to={`/booking?rental=${rentalData.id}`}>
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Đặt lịch thử đồ
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
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span>{rentalData.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-600" />
                  <span>{rentalData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  <span>{rentalData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <a href={rentalData.website} className="text-purple-600 hover:underline" target="_blank" rel="noreferrer">
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
                  <span className="font-semibold">{rentalData.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng đánh giá</span>
                  <span className="font-semibold">{rentalData.reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng sản phẩm</span>
                  <span className="font-semibold">{rentalData.totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kinh nghiệm</span>
                  <span className="font-semibold">{rentalData.yearsExperience} năm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
