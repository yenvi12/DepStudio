import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Calendar, Clock, MapPin, User, DollarSign, Filter, Search, Eye, Edit, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"

interface Booking {
  id: string
  customer: string
  studio: string
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  amount: number
  location: string
  phone: string
}

const bookings: Booking[] = [
  {
    id: "BK001",
    customer: "Nguyễn Thị Lan",
    studio: "Bella Studio",
    service: "Makeup cô dâu",
    date: "2024-01-20",
    time: "09:00",
    status: "confirmed",
    amount: 2500000,
    location: "Quận 1, TP.HCM",
    phone: "0901234567",
  },
  {
    id: "BK002",
    customer: "Trần Văn Nam",
    studio: "Glamour Makeup",
    service: "Chụp ảnh cưới",
    date: "2024-01-21",
    time: "14:00",
    status: "pending",
    amount: 5000000,
    location: "Quận 3, TP.HCM",
    phone: "0901234568",
  },
  {
    id: "BK003",
    customer: "Lê Thị Hoa",
    studio: "Royal Wedding",
    service: "Thuê váy cưới",
    date: "2024-01-19",
    time: "10:30",
    status: "completed",
    amount: 1500000,
    location: "Quận 7, TP.HCM",
    phone: "0901234569",
  },
  {
    id: "BK004",
    customer: "Phạm Văn Long",
    studio: "Artistic Lens",
    service: "Chụp ảnh kỷ yếu",
    date: "2024-02-05",
    time: "08:30",
    status: "pending",
    amount: 3200000,
    location: "Quận 5, TP.HCM",
    phone: "0901234570",
  },
  {
    id: "BK005",
    customer: "Mai Phương Thảo",
    studio: "Dreamy Photo",
    service: "Makeup dự tiệc",
    date: "2024-02-10",
    time: "17:00",
    status: "cancelled",
    amount: 800000,
    location: "Quận Gò Vấp, TP.HCM",
    phone: "0901234571",
  },
]

export function BookingManagement() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.studio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
      confirmed: { variant: "default" as const, label: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
      completed: { variant: "outline" as const, label: "Hoàn thành", color: "bg-green-100 text-green-800" },
      cancelled: { variant: "destructive" as const, label: "Đã hủy", color: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge className={config.color} variant={config.variant}>
        {config.label}
      </Badge>
    )
  }

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  }

  // Handle actions
  const handleView = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowDetailDialog(true)
  }

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowEditDialog(true)
  }

  const handleCancel = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowCancelDialog(true)
  }

  const handleSaveEdit = () => {
    console.log("Saving changes for booking:", selectedBooking)
    // Here you would implement logic to save the changes, e.g., an API call
    setShowEditDialog(false)
  }

  const handleConfirmCancel = () => {
    console.log("Cancelling booking:", selectedBooking)
    // Here you would implement logic to cancel the booking, e.g., an API call
    setShowCancelDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Quản lý Đặt lịch</h2>
          <p className="text-gray-600 mt-1">Theo dõi và quản lý tất cả đặt lịch trong hệ thống</p>
        </div>
        
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{bookingStats.total}</p>
              <p className="text-sm text-gray-600">Tổng đặt lịch</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-800">{bookingStats.pending}</p>
              <p className="text-sm text-yellow-600">Chờ xác nhận</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-800">{bookingStats.confirmed}</p>
              <p className="text-sm text-blue-600">Đã xác nhận</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-800">{bookingStats.completed}</p>
              <p className="text-sm text-green-600">Hoàn thành</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-800">{bookingStats.cancelled}</p>
              <p className="text-sm text-red-600">Đã hủy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo tên khách hàng, studio, mã đặt lịch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Danh sách Đặt lịch
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead className="font-semibold">Mã đặt lịch</TableHead>
                  <TableHead className="font-semibold">Khách hàng</TableHead>
                  <TableHead className="font-semibold">Studio</TableHead>
                  <TableHead className="font-semibold">Dịch vụ</TableHead>
                  <TableHead className="font-semibold">Thời gian</TableHead>
                  <TableHead className="font-semibold">Trạng thái</TableHead>
                  <TableHead className="font-semibold">Số tiền</TableHead>
                  <TableHead className="font-semibold">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <div className="font-mono font-semibold text-blue-600">{booking.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{booking.customer}</p>
                          <p className="text-sm text-gray-500">{booking.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{booking.studio}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-3 w-3" />
                          {booking.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {booking.service}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">{booking.date}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            {booking.time}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-600">{booking.amount.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleView(booking)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(booking)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {booking.status === "pending" && (
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700" onClick={() => handleCancel(booking)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Booking Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chi tiết Đặt lịch #{selectedBooking?.id}</DialogTitle>
            <DialogDescription>
              Xem thông tin chi tiết của đặt lịch này.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Khách hàng</Label>
                <div className="col-span-3">{selectedBooking.customer} ({selectedBooking.phone})</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Studio</Label>
                <div className="col-span-3">{selectedBooking.studio}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Dịch vụ</Label>
                <div className="col-span-3">{selectedBooking.service}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Thời gian</Label>
                <div className="col-span-3">{selectedBooking.date} lúc {selectedBooking.time}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Trạng thái</Label>
                <div className="col-span-3">{getStatusBadge(selectedBooking.status)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Số tiền</Label>
                <div className="col-span-3">{selectedBooking.amount.toLocaleString("vi-VN")}đ</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Địa chỉ</Label>
                <div className="col-span-3">{selectedBooking.location}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowDetailDialog(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Booking Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa Đặt lịch #{selectedBooking?.id}</DialogTitle>
            <DialogDescription>
              Thay đổi thông tin đặt lịch và lưu lại.
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Khách hàng
                </Label>
                <Input
                  id="customer"
                  defaultValue={selectedBooking.customer}
                  className="col-span-3"
                  // Add onChange handler to update state for editing
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Ngày
                </Label>
                <Input
                  id="date"
                  type="date"
                  defaultValue={selectedBooking.date}
                  className="col-span-3"
                  // Add onChange handler
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Giờ
                </Label>
                <Input
                  id="time"
                  type="time"
                  defaultValue={selectedBooking.time}
                  className="col-span-3"
                  // Add onChange handler
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Trạng thái
                </Label>
                <Select value={selectedBooking.status} onValueChange={(value) => {
                    // This is a mock change, in a real app you'd update state properly
                    console.log("Status changed to", value);
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ xác nhận</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Hủy</Button>
            <Button onClick={handleSaveEdit}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận Hủy Đặt lịch</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn hủy đặt lịch #<span className="font-semibold">{selectedBooking?.id}</span> của khách hàng <span className="font-semibold">{selectedBooking?.customer}</span> không?
              Thao tác này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>Không, giữ lại</Button>
            <Button variant="destructive" onClick={handleConfirmCancel}>Đúng, hủy bỏ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}