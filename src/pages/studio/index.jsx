import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  MapPin,
  Camera,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Calendar as CalendarIcon,
  Shield,
  Users,
} from "lucide-react"

export default function StudiosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10_000_000])
  const [selectedDistricts, setSelectedDistricts] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState("grid") // "grid" | "list"
  const [showFilters, setShowFilters] = useState(false)

  // Mock data
  const studios = [
    {
      id: "1",
      name: "Studio 397",
      rating: 4.8,
      reviewCount: 100,
      location: "Phường Quy Nhơn Nam, Gia Lai",
      district: "quy-nhon-nam",
      priceFrom: 1_000_000,
      image: "/z6882513842164_149634a54892b45ee93ae71e1e6b9949.jpg?height=200&width=300",
      verified: true,
      premium: true,
      services: ["Chụp ảnh cưới", "Chụp ảnh gia đình", "Chụp ảnh doanh nghiệp"],
      specialties: ["Wedding", "Portrait", "Event"],
      completedProjects: 850,
      responseTime: "Trong 2 giờ",
      availability: "available",
      description: "Studio chuyên nghiệp với đội ngũ nhiếp ảnh gia giàu kinh nghiệm",
    },
    {
      id: "2",
      name: "Studio Minh Châu",
      rating: 4.7,
      reviewCount: 89,
      location: "Phường Quy Nhơn Tây, Gia Lai",
      district: "quy-nhon-tay",
      priceFrom: 1_500_000,
      image: "/sddefault.jpg?height=200&width=300",
      verified: true,
      premium: false,
      services: ["Chụp ảnh cưới", "Chụp ảnh thời trang"],
      specialties: ["Wedding", "Fashion"],
      completedProjects: 420,
      responseTime: "Trong 4 giờ",
      availability: "busy",
      description: "Chuyên chụp ảnh cưới với phong cách hiện đại",
    },
    {
      id: "3",
      name: "Studio Hoàng Gia",
      rating: 4.8,
      reviewCount: 156,
      location: "Phường Quy Nhơn Bắc, Gia Lai",
      district: "quy-nhon-bac",
      priceFrom: 3_000_000,
      image: "/Concept-Da-Hoi-Senorita-2-1200x900.jpg?height=200&width=300",
      verified: true,
      premium: true,
      services: ["Chụp ảnh cưới", "Chụp ảnh gia đình", "Chụp ảnh sản phẩm"],
      specialties: ["Wedding", "Family", "Product"],
      completedProjects: 1200,
      responseTime: "Trong 1 giờ",
      availability: "available",
      description: "Studio cao cấp với trang thiết bị hiện đại nhất",
    },
    {
      id: "4",
      name: "Photographer 101",
      rating: 4.9,
      reviewCount: 156,
      location: "Phường Quy Nhơn Nam, Gia Lai",
      district: "quy-nhon-nam",
      priceFrom: 500_000,
      image: "/z6882514508460_988b87823d22374d5c0564a92f2a30b7.jpg?height=200&width=300",
      verified: true,
      premium: true,
      services: ["Chụp ngoại cảnh", "Chụp ảnh couple"],
      specialties: ["Outdoor", "Couple"],
      completedProjects: 1200,
      responseTime: "Trong 1 giờ",
      availability: "available",
      description: "Team photographer vui vẻ, chuyên nghiệp",
    },
    {
      id: "5",
      name: "Photographer AAA",
      rating: 4.6,
      reviewCount: 116,
      location: "Phường Quy Nhơn Nam, Gia Lai",
      district: "quy-nhon-nam",
      priceFrom: 100_000,
      image: "/z6882514943586_b3bc70556ce087a45b3b46128b68cc0b.jpg",
      verified: true,
      premium: true,
      services: ["Chụp ảnh sinh nhật", "Chụp ảnh couple"],
      specialties: ["birthday", "Couple"],
      completedProjects: 1200,
      responseTime: "Trong 1 giờ",
      availability: "available",
      description: "Photographer vui vẻ, chuyên nghiệp, hỗ trợ nhiệt tình",
    },
  ]

  const districts = [
    { id: "quy-nhon-dong", name: "Phường Quy Nhơn Đông" },
    { id: "quy-nhon-bac", name: "Phường Quy Nhơn Bắc" },
    { id: "quy-nhon-nam", name: "Phường Quy Nhơn Nam" },
    { id: "quy-nhon", name: "Phường Quy Nhơn" },
    { id: "quy-nhon-tay", name: "Phường Quy Nhơn Tây" },
  ]

  const services = [
    "Chụp ảnh cưới",
    "Chụp ảnh gia đình",
    "Chụp ảnh doanh nghiệp",
    "Chụp ảnh thời trang",
    "Chụp ảnh sản phẩm",
    "Chụp ảnh sự kiện",
    "Chụp ngoại cảnh",
    "Chụp ảnh couple",
    "Chụp ảnh tết",
    "Chụp ảnh sinh nhật",
  ]

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-[#DDD3C4]"}`}
      />
    ))

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "unavailable":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case "available":
        return "Còn trống"
      case "busy":
        return "Bận"
      case "unavailable":
        return "Không khả dụng"
      default:
        return "Không rõ"
    }
  }

  return (
    <div className="min-h-screen bg-[#EFE7DA]">
      <Header />

      {/* Hero Section */}
      <div className="bg-[#F5F1EB] text-[#6F5D4F] text-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-[40px] md:text-[40px] font-medibold mb-4" style={{ fontFamily: "TQ-Kingston" }}>
            Studio Chụp Ảnh
          </h1>
          <p className="text-[40px] md:text-[30px] mb-6" style={{ fontFamily: "Simplesnails" }}>
            Tìm kiếm studio chụp ảnh chuyên nghiệp cho mọi nhu cầu
          </p>

          {/* Search Bar */}
          <div className="w-full flex justify-center">
            <div className="w-[700px] bg-white border border-[#C1B6A3] rounded-lg p-2 flex items-center shadow-sm mx-auto">
              <Search className="w-5 h-5 text-[#B3907A] ml-3" />
              <Input
                placeholder="Tìm kiếm studio, địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 text-[#6F5D4F] placeholder:text-[#B3907A] bg-transparent"
              />
              <Button className="ml-2 bg-[#6F5D4F] text-white hover:bg-[#5d4c40]">Tìm kiếm</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-4">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Bộ lọc</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="lg:hidden">
                    ✕
                  </Button>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-3">Khoảng giá</h4>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={10_000_000} step={100_000} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()}đ</span>
                    <span>{priceRange[1].toLocaleString()}đ</span>
                  </div>
                </div>

                {/* Districts */}
                <div>
                  <h4 className="font-medium mb-3">Quận/Huyện</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {districts.map((district) => (
                      <div key={district.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={district.id}
                          checked={selectedDistricts.includes(district.id)}
                          onCheckedChange={(checked) => {
                            if (checked) setSelectedDistricts([...selectedDistricts, district.id])
                            else setSelectedDistricts(selectedDistricts.filter((d) => d !== district.id))
                          }}
                        />
                        <label htmlFor={district.id} className="text-sm">
                          {district.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="font-medium mb-3">Dịch vụ</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {services.map((service) => (
                      <div key={service} className="flex items-center space-x-2">
                        <Checkbox
                          id={service}
                          checked={selectedServices.includes(service)}
                          onCheckedChange={(checked) => {
                            if (checked) setSelectedServices([...selectedServices, service])
                            else setSelectedServices(selectedServices.filter((s) => s !== service))
                          }}
                        />
                        <label htmlFor={service} className="text-sm">
                          {service}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h4 className="font-medium mb-3 text-[#6F5D4F]">Bộ lọc nhanh</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" className="border-[#C1B6A3] text-[#6F5D4F] ring-offset-[#EFE7DA]" />
                      <label htmlFor="verified" className="text-sm text-[#6F5D4F]">
                        Đã xác minh
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium" className="border-[#C1B6A3] text-[#6F5D4F] ring-offset-[#EFE7DA]" />
                      <label htmlFor="premium" className="text-sm text-[#6F5D4F]">
                        Premium
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" className="border-[#C1B6A3] text-[#6F5D4F] ring-offset-[#EFE7DA]" />
                      <label htmlFor="available" className="text-sm text-[#6F5D4F]">
                        Còn trống hôm nay
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)} className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                </Button>
                <span className="text-gray-600">Tìm thấy {studios.length} studio</span>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-lg">
                  <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Studios Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {studios.map((studio) => (
                <Card key={studio.id} className="overflow-hidden hover:shadow-md transition-shadow border border-[#E1DACA] bg-[#F9F6F1]">
                  <div className={viewMode === "list" ? "md:flex" : ""}>
                    <div className={`relative ${viewMode === "list" ? "md:w-80" : ""}`}>
                      <img
                        src={studio.image || "/placeholder.svg"}
                        alt={studio.name}
                        width={300}
                        height={200}
                        className={`w-full object-cover ${viewMode === "list" ? "h-48 md:h-full" : "h-48"}`}
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {studio.verified && (
                          <Badge className="bg-[#B3907A] text-white">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {studio.premium && (
                          <Badge className="bg-gradient-to-r from-[#C1B6A3] to-[#6F5D4F] text-white">Premium</Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button variant="ghost" size="sm" className="bg-white/70 hover:bg-white text-[#6F5D4F] rounded-full p-1">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge className={getAvailabilityColor(studio.availability)}>{getAvailabilityText(studio.availability)}</Badge>
                      </div>
                    </div>

                    <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{studio.name}</h3>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {renderStars(studio.rating)}
                            <span className="ml-1 text-sm font-medium">{studio.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({studio.reviewCount} đánh giá)</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{studio.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {studio.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Camera className="w-4 h-4" />
                          {studio.completedProjects} dự án hoàn thành
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          Phản hồi {studio.responseTime}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {studio.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {studio.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{studio.services.length - 3} khác
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Từ </span>
                          <span className="text-lg font-bold text-blue-600">{studio.priceFrom.toLocaleString()}đ</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/studios/${studio.id}`}>Chi tiết</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/booking?studios=${studio.id}`}>
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              Đặt lịch
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Trước
                </Button>
                <Button variant="default">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Sau</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
