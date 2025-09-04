// src/pages/Home.jsx
import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import HeroBanner from "../components/HeroBanner"
import {
  Camera,
  Palette,
  Shirt,
  Star,
  MapPin,
  Users,
  Award,
  TrendingUp,
  Gift,
  Calendar,
  Shield,
} from "lucide-react"
import { Link } from "react-router-dom"
import "../styles/fonts.css";
import { Search } from "lucide-react";
export default function Home() {
  const featuredServices = [
    {
      id: "1",
      name: "Studio Ánh Dương",
      type: "studio",
      rating: 4.9,
      reviews: 127,
      location: "Quận 1, TP.HCM",
      price: "2,000,000",
      image: "/anh-duong-studio-918172.jpg?height=200&width=300",
      verified: true,
      specialties: ["Chụp ảnh cưới", "Gia đình"],
    },
    {
      id: "2",
      name: "Makeup Artist Linh",
      type: "makeup",
      rating: 4.8,
      reviews: 89,
      location: "Quận 3, TP.HCM",
      price: "800,000",
      image: "/bg4z.jpg?height=200&width=300",
      verified: true,
      specialties: ["Makeup cưới", "Makeup dự tiệc"],
    },
    {
      id: "3",
      name: "Thuê Áo Cưới Hoàng Gia",
      type: "rental",
      rating: 4.7,
      reviews: 156,
      location: "Quận 7, TP.HCM",
      price: "1,500,000",
      image: "/ee9ac0b5e6bd00e359ac-600x759-1.jpg?height=200&width=300",
      verified: true,
      specialties: ["Áo cưới", "Vest nam"],
    },
  ]

  const promotions = [
    {
      id: "1",
      title: "Giảm 20% cho khách hàng mới",
      description: "Áp dụng cho tất cả dịch vụ chụp ảnh cưới",
      discount: "20%",
      validUntil: "31/03/2024",
      image: "/vay-cuoi-cong-chua-hoang-gia-1.png?height=150&width=250",
    },
    {
      id: "2",
      title: "Combo makeup + thuê đồ",
      description: "Tiết kiệm đến 25% khi đặt combo",
      discount: "25%",
      validUntil: "15/04/2024",
      image: "/bang-gia-cho-thue-vay-cuoi.jpg?height=150&width=250",
    },
  ]

  const stats = [
    { label: "Nhà cung cấp", value: "500+", icon: Users },
    { label: "Khách hàng hài lòng", value: "10,000+", icon: Award },
    { label: "Dự án hoàn thành", value: "25,000+", icon: Camera },
    { label: "Đánh giá 5 sao", value: "95%", icon: Star },
  ]

  return (
    <div className="min-h-screen bg-[#F5F1EB]">
      {/* <Header /> */}
      <Header />
      {/* Hero */}
      <HeroBanner />

      {/* Stats */}
      <section className="py-16 bg-[#F5F1EB]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#C1B6A3] rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#6F5D4F] mb-2">{stat.value}</div>
                <div className="text-[#6F5D4F]/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-[#EFE7DA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6F5D4F] mb-4">Dịch vụ nổi bật</h2>
            <p className="text-[#6F5D4F]/70 max-w-2xl mx-auto">
              Khám phá những nhà cung cấp dịch vụ được đánh giá cao nhất trên nền tảng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <Card
                key={service.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-[#F8F5F0] border border-[#D8CEC2]"
              >
                <div className="relative">
                  {/* next/image -> img */}
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    width={300}
                    height={200}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  {service.verified && (
                    <Badge className="absolute top-2 left-2 bg-[#B3907A] text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Đã xác minh
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="absolute top-2 right-2 bg-[#C1B6A3] text-white"
                  >
                    {service.type === "studio"
                      ? "Studio"
                      : service.type === "makeup"
                      ? "Makeup"
                      : "Thuê đồ"}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#6F5D4F]">
                    {service.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-[#6F5D4F]">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-sm text-[#6F5D4F]/60">
                      ({service.reviews} đánh giá)
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-[#6F5D4F]/70 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {service.location}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.specialties.map((s, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-xs bg-[#EFE7DA] text-[#6F5D4F] border-[#C1B6A3]"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-[#B3907A]">
                      {service.price}đ
                    </div>

                    {/* Nếu Button của bạn hỗ trợ asChild (shadcn), giữ nguyên: */}
                    <Button
                      size="sm"
                      className="bg-[#6F5D4F] text-white hover:bg-[#5d4c40] hover:text-white"
                      asChild
                    >
                      <Link to={`/${service.type}/${service.id}`}>Xem chi tiết</Link>
                    </Button>

                    {/* Nếu Button của bạn KHÔNG hỗ trợ asChild, dùng:
                    <Link to={`/${service.type}/${service.id}`}>
                      <Button size="sm" className="bg-[#6F5D4F] text-white hover:bg-[#5d4c40]">
                        Xem chi tiết
                      </Button>
                    </Link>
                    */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="bg-[#F8F5F0] border border-[#C1B6A3] text-[#6F5D4F] hover:bg-[#EDE6DD]"
            >
              Xem tất cả dịch vụ
            </Button>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-16 bg-[#EFE7DA]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#6F5D4F] mb-2">Ưu đãi hot</h2>
              <p className="text-[#6F5D4F]/70">Đừng bỏ lỡ những ưu đãi hấp dẫn</p>
            </div>

            <Button
              variant="outline"
              className="bg-[#F8F5F0] border border-[#C1B6A3] text-[#6F5D4F] hover:bg-[#EDE6DD]"
              asChild
            >
              <Link to="/promotions">
                Xem tất cả
                <TrendingUp className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promotions.map((promo) => (
              <Card key={promo.id} className="overflow-hidden bg-[#F8F5F0] border border-[#D8CEC2]">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={promo.image || "/placeholder.svg"}
                      alt={promo.title}
                      width={250}
                      height={150}
                      loading="lazy"
                      className="w-full h-32 md:h-full object-cover"
                    />
                  </div>
                  <CardContent className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#B3907A] text-white">
                        <Gift className="w-3 h-3 mr-1" />-{promo.discount}
                      </Badge>
                      <span className="text-sm text-[#6F5D4F]/60">Đến {promo.validUntil}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[#6F5D4F]">
                      {promo.title}
                    </h3>
                    <p className="text-[#6F5D4F]/70 text-sm mb-4">{promo.description}</p>
                    <Button className="bg-[#6F5D4F] text-white hover:bg-[#5d4c40]" size="sm">
                      Sử dụng ngay
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#F5F1EB]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#6F5D4F] mb-4">Cách thức hoạt động</h2>
            <p className="text-[#6F5D4F]/70 max-w-2xl mx-auto">
              Đặt lịch dịch vụ chỉ với 3 bước đơn giản
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#C1B6A3] flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#6F5D4F]">1. Tìm kiếm</h3>
              <p className="text-[#6F5D4F]/70">
                Tìm kiếm và so sánh các dịch vụ phù hợp với nhu cầu của bạn
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#B3907A] flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#6F5D4F]">2. Đặt lịch</h3>
              <p className="text-[#6F5D4F]/70">
                Chọn thời gian phù hợp và xác nhận thông tin đặt lịch
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#6F5D4F] flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#6F5D4F]">3. Trải nghiệm</h3>
              <p className="text-[#6F5D4F]/70">
                Tận hưởng dịch vụ chất lượng cao và để lại đánh giá
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#EFE7DA]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#6F5D4F]">
            Bạn là nhà cung cấp dịch vụ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[#6F5D4F]/80">
            Tham gia nền tảng của chúng tôi để tiếp cận hàng nghìn khách hàng tiềm năng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="bg-[#C1B6A3] border-none text-white hover:brightness-110"
              size="lg"
            >
              Đăng ký làm đối tác
            </Button>
            <Button
              variant="outline"
              className="bg-[#B3907A] border-none text-white hover:brightness-110"
              size="lg"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F5F1EB] text-[#6F5D4F] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-[#B3907A] rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-[#6F5D4F]">BookingHub</span>
              </div>
              <p className="text-sm text-[#6F5D4F]/80">
                Nền tảng kết nối khách hàng với các dịch vụ chụp ảnh, makeup và thuê trang phục
                chuyên nghiệp.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
              <ul className="space-y-2 text-[#6F5D4F]/80 text-sm">
                <li><Link to="/studios" className="hover:text-[#6F5D4F]">Studio chụp ảnh</Link></li>
                <li><Link to="/makeup" className="hover:text-[#6F5D4F]">Makeup & Trang điểm</Link></li>
                <li><Link to="/rental" className="hover:text-[#6F5D4F]">Thuê trang phục</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-[#6F5D4F]/80 text-sm">
                <li><Link to="/help" className="hover:text-[#6F5D4F]">Trung tâm trợ giúp</Link></li>
                <li><Link to="/contact" className="hover:text-[#6F5D4F]">Liên hệ</Link></li>
                <li><Link to="/terms" className="hover:text-[#6F5D4F]">Điều khoản</Link></li>
                <li><Link to="/privacy" className="hover:text-[#6F5D4F]">Bảo mật</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Kết nối</h3>
              <ul className="space-y-2 text-[#6F5D4F]/80 text-sm">
                <li>Email: support@bookinghub.vn</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: 123 Nguyễn Huệ, Q1, TP.HCM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#C1B6A3] mt-8 pt-6 text-center text-sm text-[#6F5D4F]/70">
            <p>&copy; 2024 BookingHub. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
