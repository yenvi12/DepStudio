"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Switch } from "../../components/ui/switch"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import {
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Smartphone,
  UserX,
  Activity,
  Clock,
  MapPin,
} from "lucide-react"

export function SecuritySettings() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [showApiKey, setShowApiKey] = useState(false)

  const securityStats = {
    totalLogins: 2847,
    failedAttempts: 23,
    blockedIPs: 5,
    activeUsers: 1250,
    suspiciousActivity: 8,
  }

  const loginAttempts = [
    {
      id: 1,
      user: "admin@system.com",
      ip: "192.168.1.100",
      location: "TP.HCM, Vietnam",
      device: "Chrome on Windows",
      status: "success",
      timestamp: "2024-01-20 14:30:25",
    },
    {
      id: 2,
      user: "hacker@evil.com",
      ip: "45.123.45.67",
      location: "Unknown",
      device: "Bot/Crawler",
      status: "blocked",
      timestamp: "2024-01-20 14:25:12",
    },
    {
      id: 3,
      user: "shop@bella.com",
      ip: "192.168.1.105",
      location: "Hà Nội, Vietnam",
      device: "Safari on iPhone",
      status: "success",
      timestamp: "2024-01-20 14:20:45",
    },
  ]

  const blockedIPs = [
    { ip: "45.123.45.67", reason: "Brute force attack", blockedAt: "2024-01-20 14:25:12", attempts: 50 },
    { ip: "123.456.78.90", reason: "Suspicious activity", blockedAt: "2024-01-20 12:15:30", attempts: 25 },
    { ip: "98.76.54.32", reason: "Multiple failed logins", blockedAt: "2024-01-20 10:45:18", attempts: 15 },
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      success: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Thành công" },
      failed: { color: "bg-red-100 text-red-800", icon: AlertTriangle, label: "Thất bại" },
      blocked: { color: "bg-red-100 text-red-800", icon: UserX, label: "Bị chặn" },
    }
    const { color, icon: Icon, label } = config[status as keyof typeof config]
    return (
      <Badge className={`${color} gap-1`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Cài đặt Bảo mật</h2>
          <p className="text-gray-600 mt-1">Quản lý bảo mật và quyền truy cập hệ thống</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Activity className="h-4 w-4" />
            Nhật ký hoạt động
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-red-500 to-pink-500">
            <Shield className="h-4 w-4" />
            Quét bảo mật
          </Button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Đăng nhập</p>
                <p className="text-3xl font-bold text-green-900 mt-2">{securityStats.totalLogins}</p>
                <p className="text-green-600 text-sm mt-1">Hôm nay</p>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-700 text-sm font-semibold uppercase tracking-wide">Thất bại</p>
                <p className="text-3xl font-bold text-red-900 mt-2">{securityStats.failedAttempts}</p>
                <p className="text-red-600 text-sm mt-1">24h qua</p>
              </div>
              <div className="bg-red-500 p-3 rounded-xl">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-semibold uppercase tracking-wide">IP bị chặn</p>
                <p className="text-3xl font-bold text-orange-900 mt-2">{securityStats.blockedIPs}</p>
                <p className="text-orange-600 text-sm mt-1">Đang hoạt động</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-xl">
                <UserX className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Người dùng</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">{securityStats.activeUsers}</p>
                <p className="text-blue-600 text-sm mt-1">Đang online</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <Activity className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-semibold uppercase tracking-wide">Cảnh báo</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">{securityStats.suspiciousActivity}</p>
                <p className="text-purple-600 text-sm mt-1">Hoạt động đáng nghi</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="access">Kiểm soát truy cập</TabsTrigger>
          <TabsTrigger value="monitoring">Giám sát</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Status */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Tình trạng Bảo mật
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    { name: "Firewall", status: "active", description: "Đang hoạt động bình thường" },
                    { name: "SSL Certificate", status: "active", description: "Hết hạn: 15/12/2024" },
                    { name: "2FA", status: "active", description: "Bắt buộc cho admin" },
                    { name: "Backup", status: "active", description: "Lần cuối: 2 giờ trước" },
                    { name: "Antivirus", status: "warning", description: "Cần cập nhật" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "active" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <Badge variant={item.status === "active" ? "default" : "secondary"}>
                        {item.status === "active" ? "Hoạt động" : "Cảnh báo"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Login Attempts */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Đăng nhập Gần đây
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {loginAttempts.map((attempt) => (
                    <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            attempt.status === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                          }`}
                        >
                          {attempt.status === "success" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{attempt.user}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span>{attempt.ip}</span>
                            <span>•</span>
                            <span>{attempt.device}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(attempt.status)}
                        <p className="text-xs text-gray-500 mt-1">{attempt.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Access Control Settings */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-600" />
                  Kiểm soát Truy cập
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Xác thực 2 yếu tố (2FA)</Label>
                    <p className="text-sm text-gray-500">Bắt buộc 2FA cho tất cả admin</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Khóa tài khoản tự động</Label>
                    <p className="text-sm text-gray-500">Khóa sau 5 lần đăng nhập sai</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Phiên đăng nhập</Label>
                    <p className="text-sm text-gray-500">Tự động đăng xuất sau 24h</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Whitelist IP</Label>
                    <p className="text-sm text-gray-500">Chỉ cho phép IP được phê duyệt</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* API Security */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-orange-600" />
                  Bảo mật API
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="api-key">API Key chính</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="api-key"
                      type={showApiKey ? "text" : "password"}
                      value="sk-1234567890abcdef..."
                      readOnly
                      className="font-mono"
                    />
                    <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="rate-limit">Rate Limit</Label>
                  <Select>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="1000 requests/hour" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">100 requests/hour</SelectItem>
                      <SelectItem value="500">500 requests/hour</SelectItem>
                      <SelectItem value="1000">1000 requests/hour</SelectItem>
                      <SelectItem value="5000">5000 requests/hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Tạo API Key mới
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Vô hiệu hóa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Blocked IPs */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="flex items-center gap-2">
                <UserX className="h-5 w-5 text-red-600" />
                IP bị Chặn
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Địa chỉ IP</TableHead>
                    <TableHead>Lý do</TableHead>
                    <TableHead>Số lần thử</TableHead>
                    <TableHead>Thời gian chặn</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockedIPs.map((ip, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{ip.ip}</TableCell>
                      <TableCell>{ip.reason}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{ip.attempts}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{ip.blockedAt}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Bỏ chặn
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Giám sát Hoạt động
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Địa chỉ IP</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Thiết bị</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thời gian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginAttempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell className="font-medium">{attempt.user}</TableCell>
                      <TableCell className="font-mono">{attempt.ip}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          {attempt.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Smartphone className="h-3 w-3 text-gray-400" />
                          {attempt.device}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(attempt.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3 text-gray-400" />
                          {attempt.timestamp}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Policy */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  Chính sách Mật khẩu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="min-length">Độ dài tối thiểu</Label>
                  <Input id="min-length" type="number" defaultValue="8" className="mt-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="uppercase" defaultChecked />
                    <Label htmlFor="uppercase">Yêu cầu chữ hoa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="numbers" defaultChecked />
                    <Label htmlFor="numbers">Yêu cầu số</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="special" defaultChecked />
                    <Label htmlFor="special">Yêu cầu ký tự đặc biệt</Label>
                  </div>
                </div>
                <div>
                  <Label htmlFor="expiry">Thời hạn mật khẩu (ngày)</Label>
                  <Input id="expiry" type="number" defaultValue="90" className="mt-2" />
                </div>
              </CardContent>
            </Card>

            {/* Security Notifications */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Thông báo Bảo mật
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Email cảnh báo</Label>
                    <p className="text-sm text-gray-500">Gửi email khi có hoạt động đáng nghi</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">SMS cảnh báo</Label>
                    <p className="text-sm text-gray-500">Gửi SMS cho admin khi có tấn công</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Slack thông báo</Label>
                    <p className="text-sm text-gray-500">Gửi thông báo qua Slack</p>
                  </div>
                  <Switch />
                </div>
                <div>
                  <Label htmlFor="admin-email">Email admin</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@system.com" className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
