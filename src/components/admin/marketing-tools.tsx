"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import {
  Zap,
  Mail,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Gift,
  Send,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
} from "lucide-react"

export function MarketingTools() {
  const [selectedTab, setSelectedTab] = useState("campaigns")

  const campaigns = [
    {
      id: "CAM001",
      name: "Khuyến mãi Tết 2024",
      type: "promotion",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      budget: 5000000,
      spent: 2300000,
      reach: 15420,
      clicks: 892,
      conversions: 45,
    },
    {
      id: "CAM002",
      name: "Email Marketing - Valentine",
      type: "email",
      status: "scheduled",
      startDate: "2024-02-10",
      endDate: "2024-02-14",
      budget: 2000000,
      spent: 0,
      reach: 0,
      clicks: 0,
      conversions: 0,
    },
    {
      id: "CAM003",
      name: "Quảng cáo Facebook - Makeup cô dâu",
      type: "social",
      status: "completed",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      budget: 8000000,
      spent: 7850000,
      reach: 45230,
      clicks: 2340,
      conversions: 156,
    },
  ]

  const emailTemplates = [
    {
      id: "ET001",
      name: "Chào mừng khách hàng mới",
      subject: "Chào mừng bạn đến với hệ thống booking studio!",
      type: "welcome",
      status: "active",
      openRate: 68.5,
      clickRate: 12.3,
    },
    {
      id: "ET002",
      name: "Nhắc nhở đặt lịch",
      subject: "Đừng quên cuộc hẹn của bạn vào ngày mai",
      type: "reminder",
      status: "active",
      openRate: 85.2,
      clickRate: 23.7,
    },
    {
      id: "ET003",
      name: "Ưu đãi đặc biệt",
      subject: "🎉 Giảm giá 30% cho tất cả dịch vụ makeup",
      type: "promotion",
      status: "draft",
      openRate: 0,
      clickRate: 0,
    },
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      active: { color: "bg-green-100 text-green-800", label: "Đang chạy" },
      scheduled: { color: "bg-blue-100 text-blue-800", label: "Đã lên lịch" },
      completed: { color: "bg-gray-100 text-gray-800", label: "Hoàn thành" },
      paused: { color: "bg-yellow-100 text-yellow-800", label: "Tạm dừng" },
      draft: { color: "bg-gray-100 text-gray-800", label: "Bản nháp" },
    }
    const { color, label } = config[status as keyof typeof config]
    return <Badge className={color}>{label}</Badge>
  }

  const getCampaignIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "promotion":
        return <Gift className="h-4 w-4" />
      default:
        return <Megaphone className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Công cụ Marketing</h2>
          <p className="text-gray-600 mt-1">Quản lý chiến dịch marketing và quảng cáo</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Báo cáo
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
            <Plus className="h-4 w-4" />
            Tạo chiến dịch
          </Button>
        </div>
      </div>

      {/* Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-semibold uppercase tracking-wide">Chiến dịch</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">{campaigns.length}</p>
                <p className="text-purple-600 text-sm mt-1">
                  {campaigns.filter((c) => c.status === "active").length} đang chạy
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <Megaphone className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Tổng tiếp cận</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">
                  {campaigns.reduce((sum, c) => sum + c.reach, 0).toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+25% tháng này</span>
                </div>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Chuyển đổi</p>
                <p className="text-3xl font-bold text-green-900 mt-2">
                  {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                </p>
                <p className="text-green-600 text-sm mt-1">
                  {(
                    (campaigns.reduce((sum, c) => sum + c.conversions, 0) /
                      campaigns.reduce((sum, c) => sum + c.clicks, 0)) *
                    100
                  ).toFixed(1)}
                  % tỷ lệ chuyển đổi
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-wide">Chi phí</p>
                <p className="text-3xl font-bold text-orange-900 mt-2">
                  {(campaigns.reduce((sum, c) => sum + c.spent, 0) / 1000000).toFixed(1)}M
                </p>
                <p className="text-orange-600 text-sm mt-1">
                  {(
                    (campaigns.reduce((sum, c) => sum + c.spent, 0) / campaigns.reduce((sum, c) => sum + c.budget, 0)) *
                    100
                  ).toFixed(0)}
                  % ngân sách
                </p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="campaigns">Chiến dịch</TabsTrigger>
          <TabsTrigger value="email">Email Marketing</TabsTrigger>
          <TabsTrigger value="social">Mạng xã hội</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-purple-600" />
                Danh sách Chiến dịch
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                          {getCampaignIcon(campaign.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{campaign.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                            <span>
                              <Calendar className="h-3 w-3 inline mr-1" />
                              {campaign.startDate} - {campaign.endDate}
                            </span>
                            <span>Ngân sách: {campaign.budget.toLocaleString("vi-VN")}đ</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(campaign.status)}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Stats */}
                    <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{campaign.reach.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Tiếp cận</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{campaign.clicks.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Clicks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{campaign.conversions}</p>
                        <p className="text-sm text-gray-600">Chuyển đổi</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {((campaign.spent / campaign.budget) * 100).toFixed(0)}%
                        </p>
                        <p className="text-sm text-gray-600">Ngân sách</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Email Templates */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Email Templates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                        </div>
                        {getStatusBadge(template.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Tỷ lệ mở: </span>
                          <span className="font-medium">{template.openRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Tỷ lệ click: </span>
                          <span className="font-medium">{template.clickRate}%</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Chỉnh sửa
                        </Button>
                        <Button variant="outline" size="sm">
                          <Send className="h-4 w-4 mr-1" />
                          Gửi test
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create Email Campaign */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  Tạo Email Campaign
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="campaign-name">Tên chiến dịch</Label>
                    <Input id="campaign-name" placeholder="Nhập tên chiến dịch" />
                  </div>
                  <div>
                    <Label htmlFor="email-subject">Tiêu đề email</Label>
                    <Input id="email-subject" placeholder="Tiêu đề email" />
                  </div>
                  <div>
                    <Label htmlFor="target-audience">Đối tượng mục tiêu</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn đối tượng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tất cả khách hàng</SelectItem>
                        <SelectItem value="new">Khách hàng mới</SelectItem>
                        <SelectItem value="returning">Khách hàng cũ</SelectItem>
                        <SelectItem value="vip">Khách hàng VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="email-content">Nội dung email</Label>
                    <Textarea id="email-content" placeholder="Nội dung email..." className="min-h-32" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="schedule" />
                    <Label htmlFor="schedule">Lên lịch gửi</Label>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4 mr-2" />
                    Tạo chiến dịch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Social Media Accounts */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-600" />
                  Tài khoản Mạng xã hội
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { platform: "Facebook", connected: true, followers: "12.5K", engagement: "4.2%" },
                    { platform: "Instagram", connected: true, followers: "8.9K", engagement: "6.1%" },
                    { platform: "TikTok", connected: false, followers: "0", engagement: "0%" },
                    { platform: "YouTube", connected: true, followers: "3.2K", engagement: "2.8%" },
                  ].map((account, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {account.platform.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{account.platform}</p>
                          <p className="text-sm text-gray-600">
                            {account.followers} followers • {account.engagement} engagement
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {account.connected ? (
                          <Badge className="bg-green-100 text-green-800">Đã kết nối</Badge>
                        ) : (
                          <Button size="sm" variant="outline">
                            Kết nối
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Post Scheduler */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Lên lịch đăng bài
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="post-content">Nội dung bài đăng</Label>
                    <Textarea id="post-content" placeholder="Viết nội dung bài đăng..." className="min-h-24" />
                  </div>
                  <div>
                    <Label htmlFor="post-platform">Nền tảng</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nền tảng" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="all">Tất cả nền tảng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="post-date">Ngày đăng</Label>
                      <Input id="post-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="post-time">Giờ đăng</Label>
                      <Input id="post-time" type="time" />
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Lên lịch đăng bài
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign Performance */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Hiệu suất Chiến dịch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{campaign.name}</h4>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">CTR</p>
                          <p className="font-bold">
                            {campaign.clicks > 0 ? ((campaign.clicks / campaign.reach) * 100).toFixed(2) : 0}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">CPC</p>
                          <p className="font-bold">
                            {campaign.clicks > 0 ? (campaign.spent / campaign.clicks).toLocaleString("vi-VN") : 0}đ
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">ROAS</p>
                          <p className="font-bold">
                            {campaign.conversions > 0
                              ? ((campaign.conversions * 2500000) / campaign.spent).toFixed(1)
                              : 0}
                            x
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ROI Analysis */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Phân tích ROI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">
                      {(
                        ((campaigns.reduce((sum, c) => sum + c.conversions, 0) * 2500000) /
                          campaigns.reduce((sum, c) => sum + c.spent, 0) -
                          1) *
                        100
                      ).toFixed(1)}
                      %
                    </p>
                    <p className="text-gray-600">ROI trung bình</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Tổng chi phí:</span>
                      <span className="font-medium">
                        {campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doanh thu ước tính:</span>
                      <span className="font-medium text-green-600">
                        {(campaigns.reduce((sum, c) => sum + c.conversions, 0) * 2500000).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-medium">Lợi nhuận:</span>
                      <span className="font-bold text-green-600">
                        {(
                          campaigns.reduce((sum, c) => sum + c.conversions, 0) * 2500000 -
                          campaigns.reduce((sum, c) => sum + c.spent, 0)
                        ).toLocaleString("vi-VN")}
                        đ
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
