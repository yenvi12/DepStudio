import React from "react"
import { Link } from "react-router-dom"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, User, Eye, Search, Filter, TrendingUp, Clock } from "lucide-react"

export default function NewsPage() {
  const featuredNews = {
    id: "1",
    title: "Xu hướng chụp ảnh cưới 2024: Phong cách tự nhiên lên ngôi",
    excerpt:
      "Năm 2024 chứng kiến sự trở lại mạnh mẽ của phong cách chụp ảnh cưới tự nhiên, không cầu kỳ nhưng vẫn đầy cảm xúc...",
    content: "",
    image: "/placeholder.svg?height=400&width=800",
    category: "Xu hướng",
    author: "Minh Châu",
    publishDate: "2024-03-15",
    views: 1250,
    readTime: 5,
    featured: true,
  }

  const newsArticles = [
    {
      id: "2",
      title: "Top 10 studio chụp ảnh cưới được yêu thích nhất TP.HCM",
      excerpt: "Danh sách những studio chụp ảnh cưới có chất lượng và dịch vụ tốt nhất tại TP.HCM...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Đánh giá",
      author: "Thu Hà",
      publishDate: "2024-03-14",
      views: 890,
      readTime: 8,
    },
    {
      id: "3",
      title: "Bí quyết chọn makeup artist phù hợp cho ngày cưới",
      excerpt: "Những tiêu chí quan trọng cần lưu ý khi lựa chọn makeup artist cho ngày trọng đại...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Hướng dẫn",
      author: "Lan Anh",
      publishDate: "2024-03-13",
      views: 756,
      readTime: 6,
    },
    {
      id: "4",
      title: "Thuê áo cưới: Những lưu ý quan trọng cô dâu cần biết",
      excerpt: "Hướng dẫn chi tiết về quy trình thuê áo cưới và những điều cần lưu ý...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Hướng dẫn",
      author: "Phương Linh",
      publishDate: "2024-03-12",
      views: 623,
      readTime: 7,
    },
    {
      id: "5",
      title: "Giá cả dịch vụ cưới hỏi: Cập nhật bảng giá mới nhất 2024",
      excerpt: "Tổng hợp bảng giá các dịch vụ cưới hỏi phổ biến tại các thành phố lớn...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Thị trường",
      author: "Hoàng Nam",
      publishDate: "2024-03-11",
      views: 1100,
      readTime: 10,
    },
    {
      id: "6",
      title: "Makeup cô dâu theo phong cách Hàn Quốc đang hot",
      excerpt: "Phong cách makeup Hàn Quốc với vẻ đẹp tự nhiên, trong trẻo đang được nhiều cô dâu lựa chọn...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Xu hướng",
      author: "Mi Ran",
      publishDate: "2024-03-10",
      views: 945,
      readTime: 4,
    },
    {
      id: "7",
      title: "Checklist chuẩn bị đồ cưới cho cô dâu chú rể",
      excerpt: "Danh sách chi tiết những món đồ cần chuẩn bị cho ngày cưới để không bỏ sót gì...",
      image: "/placeholder.svg?height=200&width=300",
      category: "Hướng dẫn",
      author: "Thanh Tú",
      publishDate: "2024-03-09",
      views: 678,
      readTime: 12,
    },
  ]

  const categories = [
    { value: "all", label: "Tất cả" },
    { value: "trend", label: "Xu hướng" },
    { value: "guide", label: "Hướng dẫn" },
    { value: "review", label: "Đánh giá" },
    { value: "market", label: "Thị trường" },
  ]

  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "popular", label: "Phổ biến nhất" },
    { value: "trending", label: "Đang thịnh hành" },
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case "Xu hướng":
        return "bg-purple-500"
      case "Hướng dẫn":
        return "bg-blue-500"
      case "Đánh giá":
        return "bg-green-500"
      case "Thị trường":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("vi-VN")

  return (
    <div className="min-h-screen bg-[#EFE7DA] text-[#6F5D4F]">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#6F5D4F] mb-4">Tin tức & Cẩm nang</h1>
          <p className="text-[#6F5D4F]/70 max-w-2xl mx-auto">
            Cập nhật những xu hướng mới nhất và hướng dẫn hữu ích cho ngày trọng đại của bạn
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white border border-[#C1B6A3]/40 rounded-lg p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#B3907A]" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                className="pl-10 bg-[#EFE7DA] border border-[#C1B6A3]/40 text-[#6F5D4F] placeholder:text-[#6F5D4F]/50"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="bg-[#EFE7DA] border border-[#C1B6A3]/40 text-[#6F5D4F]">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="bg-[#EFE7DA] border border-[#C1B6A3]/40 text-[#6F5D4F]">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="bg-[#B3907A] text-white rounded-md">
              <Filter className="w-4 h-4 mr-2" />
              Lọc
            </Button>
          </div>
        </div>

        {/* Featured Article */}
        <Card className="overflow-hidden rounded-xl bg-white border border-[#C1B6A3]/30 mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={featuredNews.image || "/placeholder.svg"}
                alt={featuredNews.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-full object-cover"
                loading="lazy"
              />
            </div>
            <CardContent className="md:w-1/2 p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className={`${getCategoryColor(featuredNews.category)} text-white`}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {featuredNews.category}
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500 text-white">Nổi bật</Badge>
              </div>
              <h2 className="text-2xl font-bold text-[#6F5D4F] mb-4">{featuredNews.title}</h2>
              <p className="text-[#6F5D4F]/70 mb-6">{featuredNews.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-[#6F5D4F]/70 mb-6">
                <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>{featuredNews.author}</span></div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /><span>{formatDate(featuredNews.publishDate)}</span></div>
                <div className="flex items-center gap-1"><Eye className="w-4 h-4" /><span>{featuredNews.views.toLocaleString()}</span></div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{featuredNews.readTime} phút đọc</span></div>
              </div>
              <Button className="bg-[#B3907A] text-white rounded-md" asChild>
                <Link to={`/news/${featuredNews.id}`}>Đọc tiếp</Link>
              </Button>
            </CardContent>
          </div>
        </Card>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((a) => (
            <Card key={a.id} className="overflow-hidden bg-white border border-[#C1B6A3]/30 rounded-xl hover:shadow-md">
              <div className="relative">
                <img
                  src={a.image || "/placeholder.svg"}
                  alt={a.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={`${getCategoryColor(a.category)} text-white`}>{a.category}</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-[#6F5D4F] line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {a.title}
                </h3>
                <p className="text-[#6F5D4F]/70 text-sm mb-4 line-clamp-3">{a.excerpt}</p>

                <div className="flex items-center gap-4 text-xs text-[#6F5D4F]/60 mb-4">
                  <div className="flex items-center gap-1"><User className="w-3 h-3" /><span>{a.author}</span></div>
                  <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /><span>{formatDate(a.publishDate)}</span></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-[#6F5D4F]/60">
                    <div className="flex items-center gap-1"><Eye className="w-3 h-3" /><span>{a.views}</span></div>
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3" /><span>{a.readTime}p</span></div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border border-[#B3907A] text-[#6F5D4F] hover:bg-[#EFE7DA]/70"
                    asChild
                  >
                    <Link to={`/news/${a.id}`}>Đọc thêm</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="bg-[#EFE7DA] border-[#C1B6A3] text-[#6F5D4F] hover:bg-[#E1DACA]"
          >
            Xem thêm bài viết
          </Button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 rounded-lg p-8 text-center bg-[#EFE7DA] border border-[#C1B6A3]">
          <h3 className="text-2xl font-bold text-[#6F5D4F] mb-4">Đăng ký nhận tin tức</h3>
          <p className="text-[#6F5D4F]/80 mb-6">Nhận thông báo về các bài viết mới nhất qua email</p>
          <div className="max-w-md mx-auto flex gap-2">
            <Input
              placeholder="Nhập email của bạn"
              className="bg-white border border-[#C1B6A3] text-[#6F5D4F] placeholder:text-[#C1B6A3] focus-visible:ring-0 focus-visible:border-[#B3907A]"
            />
            <Button className="bg-[#B3907A] text-white hover:bg-[#6F5D4F]">Đăng ký</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
