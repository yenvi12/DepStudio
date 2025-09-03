"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Plus, Search, Edit, Trash2, Users, Calendar, Star } from "lucide-react"

interface Staff {
  id: number
  name: string
  email: string
  phone: string
  role: string
  specialties: string[]
  rating: number
  totalBookings: number
  status: "active" | "inactive" | "on_leave"
  joinDate: string
  avatar: string
}

const staffMembers: Staff[] = [
  {
    id: 1,
    name: "Nguyễn Thị Mai",
    email: "mai@studio.com",
    phone: "0901234567",
    role: "Makeup Artist",
    specialties: ["Makeup cô dâu", "Makeup dự tiệc"],
    rating: 4.9,
    totalBookings: 156,
    status: "active",
    joinDate: "2023-01-15",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Trần Văn Nam",
    email: "nam@studio.com",
    phone: "0901234568",
    role: "Photographer",
    specialties: ["Chụp ảnh cưới", "Chụp ảnh gia đình"],
    rating: 4.8,
    totalBookings: 89,
    status: "active",
    joinDate: "2023-03-20",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Lê Thị Hoa",
    email: "hoa@studio.com",
    phone: "0901234569",
    role: "Stylist",
    specialties: ["Trang phục cưới", "Phụ kiện"],
    rating: 4.7,
    totalBookings: 67,
    status: "on_leave",
    joinDate: "2023-06-10",
    avatar: "/placeholder.svg",
  },
]

export function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || staff.role === selectedRole
    return matchesSearch && matchesRole
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Đang làm việc</Badge>
      case "inactive":
        return <Badge variant="secondary">Không hoạt động</Badge>
      case "on_leave":
        return <Badge variant="outline">Nghỉ phép</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Staff Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng nhân viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {staffMembers.filter((s) => s.status === "active").length} đang hoạt động
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đặt lịch</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {staffMembers.reduce((total, staff) => total + staff.totalBookings, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Tất cả nhân viên</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá TB</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(staffMembers.reduce((total, staff) => total + staff.rating, 0) / staffMembers.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Từ khách hàng</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm nhân viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Makeup Artist">Makeup Artist</SelectItem>
              <SelectItem value="Photographer">Photographer</SelectItem>
              <SelectItem value="Stylist">Stylist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm nhân viên
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm nhân viên mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="staff-name">Họ và tên</Label>
                <Input id="staff-name" placeholder="Nhập họ và tên" />
              </div>
              <div>
                <Label htmlFor="staff-email">Email</Label>
                <Input id="staff-email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="staff-phone">Số điện thoại</Label>
                <Input id="staff-phone" placeholder="0901234567" />
              </div>
              <div>
                <Label htmlFor="staff-role">Vai trò</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="makeup">Makeup Artist</SelectItem>
                    <SelectItem value="photographer">Photographer</SelectItem>
                    <SelectItem value="stylist">Stylist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Thêm nhân viên</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhân viên</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nhân viên</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Chuyên môn</TableHead>
                <TableHead>Đánh giá</TableHead>
                <TableHead>Đặt lịch</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={staff.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{staff.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {staff.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{staff.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.totalBookings}</TableCell>
                  <TableCell>{getStatusBadge(staff.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
