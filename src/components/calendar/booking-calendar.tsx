// src/components/BookingCalendar.tsx

"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { Calendar } from "../../components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../../components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Clock, User, Check, X, Eye } from "lucide-react"

// Interface cho một lịch hẹn chi tiết
interface BookingDetail {
  id: string
  date: string
  time: string
  customerName: string
  customerPhone: string
  service: string
  status: "pending" | "confirmed" | "cancelled"
  details: string
}

// Mock data ban đầu
const initialBookings: BookingDetail[] = [
  {
    id: "B001",
    date: "2025-09-04",
    time: "09:00",
    customerName: "Nguyễn Thị Lan",
    customerPhone: "0912345678",
    service: "Makeup cô dâu",
    status: "pending",
    details: "Gói trang điểm tự nhiên, đi kèm dịch vụ làm tóc đơn giản. Khách hàng có thể đến sớm hơn để thử váy.",
  },
  {
    id: "B002",
    date: "2025-09-04",
    time: "11:00",
    customerName: "Trần Văn Nam",
    customerPhone: "0987654321",
    service: "Chụp ảnh cưới ngoại cảnh",
    status: "confirmed",
    details: "Gói chụp tại Đà Lạt, ekip bao gồm 1 photographer và 1 assistant. Đã thanh toán cọc 50%.",
  },
  {
    id: "B003",
    date: "2025-09-04",
    time: "16:00",
    customerName: "Lê Thị Hoa",
    customerPhone: "0901112233",
    service: "Thuê váy cưới",
    status: "pending",
    details: "Khách hàng muốn thử các mẫu váy ren và váy công chúa.",
  },
  {
    id: "B004",
    date: "2025-09-05",
    time: "10:00",
    customerName: "Phạm Văn Long",
    customerPhone: "0909090909",
    service: "Chụp ảnh gia đình",
    status: "pending",
    details: "Gói chụp cho gia đình 4 người.",
  },
  {
    id: "B005",
    date: "2025-09-05",
    time: "14:00",
    customerName: "Đỗ Mai Anh",
    customerPhone: "0888777666",
    service: "Makeup dự tiệc",
    status: "confirmed",
    details: "Khách muốn makeup tông nâu tây, nhẹ nhàng.",
  },
]

// Component con: Hiển thị chi tiết lịch hẹn trong Dialog
const BookingDetailDialog = ({ booking }: { booking: BookingDetail }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="w-10"><Eye className="h-4 w-4" /></Button>
    </DialogTrigger>
    <DialogContent className="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Chi tiết lịch hẹn</DialogTitle>
        <DialogDescription>
          Thông tin chi tiết về lịch hẹn của khách hàng.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2 gap-4 my-4">
        <div>
          <p className="text-sm text-gray-500">Khách hàng</p>
          <p className="font-semibold">{booking.customerName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Điện thoại</p>
          <p className="font-semibold">{booking.customerPhone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Thời gian</p>
          <p className="font-semibold">{booking.time} | {format(new Date(booking.date), "dd/MM/yyyy")}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Dịch vụ</p>
          <p className="font-semibold">{booking.service}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Mô tả chi tiết</p>
          <p>{booking.details}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-500">Trạng thái</p>
          <Badge variant={booking.status === "confirmed" ? "default" : booking.status === "cancelled" ? "destructive" : "secondary"}>
            {booking.status === "confirmed" ? "Đã xác nhận" : booking.status === "cancelled" ? "Đã hủy" : "Chờ xác nhận"}
          </Badge>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Đóng</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Component con: Hiển thị danh sách tất cả lịch hẹn
const AllBookingsList = ({ bookings, onConfirm, onCancel }: {
  bookings: BookingDetail[],
  onConfirm: (id: string) => void,
  onCancel: (id: string) => void
}) => {
  // Sắp xếp lịch hẹn theo ngày và giờ
  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      if (dateA !== dateB) return dateA - dateB
      return a.time.localeCompare(b.time)
    })
  }, [bookings])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tất cả lịch hẹn</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Dịch vụ</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBookings.map(booking => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.customerName}</TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>{format(new Date(booking.date), "dd/MM/yyyy")}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>
                    <Badge variant={booking.status === "confirmed" ? "default" : booking.status === "cancelled" ? "destructive" : "secondary"}>
                      {booking.status === "confirmed" ? "Đã xác nhận" : booking.status === "cancelled" ? "Đã hủy" : "Chờ xác nhận"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <BookingDetailDialog booking={booking} />
                      {booking.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => onConfirm(booking.id)} className="w-10">
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => onCancel(booking.id)} className="w-10">
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
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
  )
}

// Component chính
export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [bookings, setBookings] = useState<BookingDetail[]>(initialBookings)

  const filteredBookings = useMemo(() => {
    if (!selectedDate) return []
    const dateString = format(selectedDate, "yyyy-MM-dd")
    return bookings.filter(booking => booking.date === dateString)
  }, [selectedDate, bookings])

  const handleConfirmBooking = (id: string) => {
    setBookings(prevBookings => prevBookings.map(booking => booking.id === id ? { ...booking, status: "confirmed" } : booking))
  }

  const handleCancelBooking = (id: string) => {
    setBookings(prevBookings => prevBookings.map(booking => booking.id === id ? { ...booking, status: "cancelled" } : booking))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Chọn ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              locale={vi}
              initialFocus
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Lịch hẹn - {selectedDate ? format(selectedDate, "EEEE, dd/MM", { locale: vi }) : "Chọn một ngày"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
                      booking.status === "confirmed"
                        ? "bg-green-50 border-green-200"
                        : booking.status === "cancelled"
                        ? "bg-red-50 border-red-200"
                        : "bg-orange-50 border-orange-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-medium text-lg">{booking.time}</span>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{booking.customerName}</p>
                            <p className="text-xs text-gray-500">{booking.service}</p>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          booking.status === "confirmed" ? "default" : booking.status === "cancelled" ? "destructive" : "secondary"
                        }
                      >
                        {booking.status === "confirmed" ? "Đã xác nhận" : booking.status === "cancelled" ? "Đã hủy" : "Chờ xác nhận"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <BookingDetailDialog booking={booking} />
                      {booking.status === "pending" && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleConfirmBooking(booking.id)} className="w-10">
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleCancelBooking(booking.id)} className="w-10">
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-10">
                  <p>Không có lịch hẹn nào cho ngày này.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <AllBookingsList bookings={bookings} onConfirm={handleConfirmBooking} onCancel={handleCancelBooking} />
    </div>
  )
}