"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import {
  Star,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Eye,
  Flag,
  Search,
  Filter,
  ThumbsUp,
  Calendar,
  Building2,
} from "lucide-react"

export function ReviewManagement() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")

  const reviewStats = {
    totalReviews: 1847,
    averageRating: 4.6,
    fiveStars: 1203,
    fourStars: 398,
    threeStars: 156,
    twoStars: 67,
    oneStar: 23,
    flaggedReviews: 12,
  }

  const reviews = [
    {
      id: "RV001",
      customer: "Nguyễn Thị Lan",
      studio: "Bella Studio",
      service: "Makeup cô dâu",
      rating: 5,
      comment:
        "Dịch vụ tuyệt vời! Makeup rất đẹp và tự nhiên. Nhân viên nhiệt tình, chuyên nghiệp. Sẽ quay lại lần sau.",
      date: "2024-01-20",
      status: "published",
      helpful: 15,
      reported: 0,
      response: null,
    },
    {
      id: "RV002",
      customer: "Trần Văn Nam",
      studio: "Glamour Makeup",
      service: "Chụp ảnh cưới",
      rating: 4,
      comment: "Chất lượng ảnh đẹp, góc chụp đa dạng. Tuy nhiên thời gian chờ hơi lâu.",
      date: "2024-01-19",
      status: "published",
      helpful: 8,
      reported: 0,
      response: "Cảm ơn anh đã đánh giá. Chúng tôi sẽ cải thiện thời gian phục vụ.",
    },
    {
      id: "RV003",
      customer: "Lê Thị Hoa",
      studio: "Royal Wedding",
      service: "Thuê váy cưới",
      rating: 2,
      comment: "Váy không đúng như hình, chất liệu kém. Nhân viên thái độ không tốt.",
      date: "2024-01-18",
      status: "flagged",
      helpful: 3,
      reported: 5,
      response: null,
    },
    {
      id: "RV004",
      customer: "Phạm Minh Tuấn",
      studio: "Dream Studio",
      service: "Makeup dự tiệc",
      rating: 5,
      comment: "Rất hài lòng với dịch vụ. Makeup đẹp, bền màu cả ngày. Giá cả hợp lý.",
      date: "2024-01-17",
      status: "published",
      helpful: 12,
      reported: 0,
      response: "Cảm ơn anh đã tin tưởng Dream Studio!",
    },
  ]

  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const getStatusBadge = (status: string) => {
    const config = {
      published: { color: "bg-green-100 text-green-800", label: "Đã xuất bản" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Chờ duyệt" },
      flagged: { color: "bg-red-100 text-red-800", label: "Bị báo cáo" },
      hidden: { color: "bg-gray-100 text-gray-800", label: "Đã ẩn" },
    }
    const { color, label } = config[status as keyof typeof config]
    return <Badge className={color}>{label}</Badge>
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.studio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    return matchesSearch && matchesRating
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Quản lý Đánh giá</h2>
          <p className="text-gray-600 mt-1">Theo dõi và quản lý đánh giá từ khách hàng</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Bộ lọc nâng cao
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-yellow-500 to-orange-500">
            <Star className="h-4 w-4" />
            Báo cáo đánh giá
          </Button>
        </div>
      </div>

      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-100 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 text-sm font-semibold uppercase tracking-wide">Tổng đánh giá</p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">{reviewStats.totalReviews.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+12% tháng này</span>
                </div>
              </div>
              <div className="bg-yellow-500 p-3 rounded-xl">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Đánh giá TB</p>
                <div className="flex items-center mt-2">
                  <p className="text-3xl font-bold text-green-900">{reviewStats.averageRating}</p>
                  <div className="flex ml-2">{getStarRating(Math.round(reviewStats.averageRating))}</div>
                </div>
                <p className="text-green-600 text-sm mt-1">Từ {reviewStats.totalReviews} đánh giá</p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold uppercase tracking-wide">5 sao</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{reviewStats.fiveStars}</p>
                <p className="text-blue-600 text-sm mt-1">
                  {((reviewStats.fiveStars / reviewStats.totalReviews) * 100).toFixed(1)}% tổng số
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <ThumbsUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-semibold uppercase tracking-wide">Bị báo cáo</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{reviewStats.flaggedReviews}</p>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-red-600 text-sm">Cần xem xét</span>
                </div>
              </div>
              <div className="bg-red-500 p-3 rounded-xl">
                <Flag className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          <TabsTrigger value="flagged">Báo cáo</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rating Distribution */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-600" />
                  Phân bố Đánh giá
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stars: 5, count: reviewStats.fiveStars, color: "bg-green-500" },
                    { stars: 4, count: reviewStats.fourStars, color: "bg-blue-500" },
                    { stars: 3, count: reviewStats.threeStars, color: "bg-yellow-500" },
                    { stars: 2, count: reviewStats.twoStars, color: "bg-orange-500" },
                    { stars: 1, count: reviewStats.oneStar, color: "bg-red-500" },
                  ].map((item) => (
                    <div key={item.stars} className="flex items-center gap-4">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium">{item.stars}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${item.color}`}
                          style={{ width: `${(item.count / reviewStats.totalReviews) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-16 text-right">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Rated Studios */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Studio được đánh giá cao
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Bella Studio", rating: 4.9, reviews: 234 },
                    { name: "Glamour Makeup", rating: 4.8, reviews: 189 },
                    { name: "Dream Studio", rating: 4.7, reviews: 156 },
                    { name: "Royal Wedding", rating: 4.6, reviews: 143 },
                  ].map((studio, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{studio.name}</p>
                          <p className="text-sm text-gray-600">{studio.reviews} đánh giá</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-bold">{studio.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          {/* Filters */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm theo khách hàng, studio, nội dung..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Số sao" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả đánh giá</SelectItem>
                    <SelectItem value="5">5 sao</SelectItem>
                    <SelectItem value="4">4 sao</SelectItem>
                    <SelectItem value="3">3 sao</SelectItem>
                    <SelectItem value="2">2 sao</SelectItem>
                    <SelectItem value="1">1 sao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold text-gray-900">{review.customer}</h4>
                            <div className="flex">{getStarRating(review.rating)}</div>
                            {getStatusBadge(review.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {review.studio}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {review.date}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {review.service}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                      {review.response && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                          <p className="text-sm font-medium text-blue-800 mb-1">Phản hồi từ studio:</p>
                          <p className="text-blue-700">{review.response}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.helpful} hữu ích</span>
                        </div>
                        {review.reported > 0 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <Flag className="h-4 w-4" />
                            <span>{review.reported} báo cáo</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Chi tiết đánh giá</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">Mã đánh giá: {review.id}</p>
                              <p className="text-sm text-gray-600">Ngày tạo: {review.date}</p>
                            </div>
                            <div>
                              <p className="font-medium">Khách hàng: {review.customer}</p>
                              <p className="font-medium">Studio: {review.studio}</p>
                              <p className="font-medium">Dịch vụ: {review.service}</p>
                            </div>
                            <div>
                              <p className="font-medium mb-2">Nội dung đánh giá:</p>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                            {review.response && (
                              <div>
                                <p className="font-medium mb-2">Phản hồi từ studio:</p>
                                <p className="text-gray-700">{review.response}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {review.status === "flagged" && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Flag className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-6">
          <Card className="shadow-lg border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-red-100">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Đánh giá bị báo cáo
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {reviews
                  .filter((review) => review.status === "flagged")
                  .map((review) => (
                    <div key={review.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{review.customer}</h4>
                            <div className="flex">{getStarRating(review.rating)}</div>
                            <Badge className="bg-red-100 text-red-800">Bị báo cáo</Badge>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-red-600">
                            <Flag className="h-3 w-3 inline mr-1" />
                            {review.reported} báo cáo vi phạm
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Duyệt
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Ẩn
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
