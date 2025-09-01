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
  Palette,
  Search,
  Filter,
  Grid3X3,
  List,
  Heart,
  Calendar as CalendarIcon,
  Shield,
  Award,
  Clock,
} from "lucide-react"

export default function MakeupPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 3000000])
  const [selectedDistricts, setSelectedDistricts] = useState([])
  const [selectedServices, setSelectedServices] = useState([])
  const [sortBy, setSortBy] = useState("rating")
  const [viewMode, setViewMode] = useState("grid") // "grid" | "list"
  const [showFilters, setShowFilters] = useState(false)

  // Mock data
  const makeupArtists = [
    {
      id: "1",
      name: "Makeup Artist Linh",
      rating: 4.8,
      reviewCount: 89,
      location: "Quận 3, TP.HCM",
      district: "quan-3",
      priceFrom: 600000,
      image: "/bg4z.jpg?height=200&width=300",
      verified: true,
      premium: true,
      services: ["Makeup cưới", "Makeup dự tiệc", "Làm tóc"],
      specialties: ["Bridal", "Party", "Natural"],
      completedProjects: 450,
      responseTime: "Trong 1 giờ",
      availability: "available",
      experience: "6 năm",
      description: "Chuyên gia trang điểm với phong cách tự nhiên và sang trọng",
      certifications: ["International Makeup Certificate", "Korean Beauty Specialist"],
    },
    {
      id: "2",
      name: "Beauty Artist Mai",
      rating: 4.9,
      reviewCount: 156,
      location: "Quận 1, TP.HCM",
      district: "quan-1",
      priceFrom: 800000,
      image: "/maido_2_OWLJ.jpg?height=200&width=300",
      verified: true,
      premium: true,
      services: ["Makeup cưới", "Makeup nghệ thuật", "Chụp ảnh"],
      specialties: ["Artistic", "Editorial", "Glamour"],
      completedProjects: 680,
      responseTime: "Trong 30 phút",
      availability: "busy",
      experience: "8 năm",
      description: "Makeup artist chuyên nghiệp với phong cách độc đáo",
      certifications: ["Pro Makeup Artist", "Fashion Week Certified"],
    },
    {
      id: "3",
      name: "Trang Điểm Hương",
      rating: 4.7,
      reviewCount: 124,
      location: "Quận 7, TP.HCM",
      district: "quan-7",
      priceFrom: 500000,
      image: "/makeup-1-17395309980871659412839.webp?height=200&width=300",
      verified: true,
      premium: false,
      services: ["Makeup cưới", "Makeup dự tiệc"],
      specialties: ["Traditional", "Modern", "Vintage"],
      completedProjects: 320,
      responseTime: "Trong 2 giờ",
      availability: "available",
      experience: "4 năm",
      description: "Chuyên makeup cưới truyền thống và hiện đại",
      certifications: ["Certified Makeup Artist"],
    },
  ]

  const districts = [
    { id: "quan-1", name: "Quận 1" },
    { id: "quan-3", name: "Quận 3" },
    { id: "quan-7", name: "Quận 7" },
    { id: "quan-10", name: "Quận 10" },
    { id: "binh-thanh", name: "Bình Thạnh" },
    { id: "phu-nhuan", name: "Phú Nhuận" },
  ]

  const services = [
    "Makeup cưới",
    "Makeup dự tiệc",
    "Makeup chụp ảnh",
    "Makeup nghệ thuật",
    "Làm tóc",
    "Makeup sự kiện",
  ]

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-[#DDD3C4]"}`}
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

      {/* Hero */}
      <div className="bg-[#F5F1EB] text-[#6F5D4F] text-center py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-[40px] md:text-[50px] font-medibold mb-4" style={{ fontFamily: "TQ-Kingston" }}>
            Makeup Artist
          </h1>
          <p className="text-[40px] md:text-[30px] mb-6" style={{ fontFamily: "Simplesnails" }}>
            Tìm kiếm makeup artist chuyên nghiệp cho mọi dịp đặc biệt
          </p>

          {/* Search Bar */}
          <div className="w-full flex justify-center">
            <div className="w-[700px] bg-white border border-[#C1B6A3] rounded-lg p-2 flex items-center shadow-sm mx-auto">
              <Search className="w-5 h-5 text-[#B3907A] ml-3" />
              <Input
                placeholder="Tìm kiếm artists, dịch vụ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 text-[#6F5D4F] placeholder:text-[#B3907A] bg-transparent"
              />
              <Button className="ml-2 bg-[#6F5D4F] text-white hover:bg-[#5d4c40]">Tìm kiếm</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
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
                  <Slider value={priceRange} onValueChange={setPriceRange} max={3000000} step={50000} className="mb-2" />
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

                {/* Experience */}
                <div>
                  <h4 className="font-medium mb-3">Kinh nghiệm</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-1-3" />
                      <label htmlFor="exp-1-3" className="text-sm">1-3 năm</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-3-5" />
                      <label htmlFor="exp-3-5" className="text-sm">3-5 năm</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exp-5plus" />
                      <label htmlFor="exp-5plus" className="text-sm">5+ năm</label>
                    </div>
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <h4 className="font-medium mb-3">Bộ lọc nhanh</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="verified" />
                      <label htmlFor="verified" className="text-sm">Đã xác minh</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premium" />
                      <label htmlFor="premium" className="text-sm">Premium</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="available" />
                      <label htmlFor="available" className="text-sm">Còn trống hôm nay</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="certified" />
                      <label htmlFor="certified" className="text-sm">Có chứng chỉ</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(true)} className="lg:hidden">
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                </Button>
                <span className="text-gray-600">Tìm thấy {makeupArtists.length} makeup artist</span>
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
                    <SelectItem value="experience">Kinh nghiệm nhiều nhất</SelectItem>
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

            {/* List/Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"}>
              {makeupArtists.map((artist) => (
                <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className={viewMode === "list" ? "md:flex" : ""}>
                    {/* Image */}
                    <div className={`relative ${viewMode === "list" ? "md:w-80" : ""}`}>
                      <img
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        width={300}
                        height={200}
                        className={`w-full object-cover ${viewMode === "list" ? "h-48 md:h-full" : "h-48"}`}
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {artist.verified && (
                          <Badge className="bg-[#B3907A] text-white">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {artist.premium && (
                          <Badge className="bg-gradient-to-r from-[#C1B6A3] to-[#6F5D4F] text-white">Premium</Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2">
                        <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge className={getAvailabilityColor(artist.availability)}>
                          {getAvailabilityText(artist.availability)}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{artist.name}</h3>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            {renderStars(artist.rating)}
                            <span className="ml-1 text-sm font-medium">{artist.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({artist.reviewCount} đánh giá)</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{artist.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {artist.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Award className="w-4 h-4" />
                          Kinh nghiệm {artist.experience}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Palette className="w-4 h-4" />
                          {artist.completedProjects} dự án hoàn thành
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          Phản hồi {artist.responseTime}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {artist.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {artist.services.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{artist.services.length - 3} khác
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Từ </span>
                          <span className="text-lg font-bold text-pink-600">
                            {artist.priceFrom.toLocaleString()}đ
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/makeup/${artist.id}`}>Chi tiết</Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/booking?makeup=${artist.id}`}>
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
                <Button variant="outline" disabled>Trước</Button>
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
