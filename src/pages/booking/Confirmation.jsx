import React from "react"
import { useSearchParams, Link } from "react-router-dom"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle, Calendar, Clock, MapPin, Phone, Download, Share2, Home
} from "lucide-react"

export default function BookingConfirmationPage() {
  const [searchParams] = useSearchParams()
  const bookingId = searchParams.get("id")

  // Mock booking data – thay bằng fetch API theo bookingId khi cần
  const bookingData = {
    id: bookingId || "BK001",
    status: "confirmed",
    provider: {
      name: "Studio Ánh Dương",
      type: "studio",
      image: "/placeholder.svg?height=100&width=100",
      location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "0123 456 789",
      email: "contact@anhdương.com",
    },
    service: { name: "Chụp ảnh cưới cao cấp", duration: "5 giờ" },
    schedule: { date: "2024-02-15", time: "08:00 - 13:00" },
    customer: { name: "Nguyễn Văn A", phone: "0987 654 321", email: "customer@email.com" },
    payment: {
      total: 5000000, discount: 500000, deposit: 2250000, remaining: 2250000,
      method: "Chuyển khoản ngân hàng", depositPercent: 50,
    },
    notes: "Yêu cầu chụp ảnh ngoại cảnh và studio",
    createdAt: new Date().toISOString(),
  }

  const handleDownloadReceipt = () => {
    // TODO: export PDF / tải hóa đơn
    console.log("Downloading receipt...")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Thông tin đặt lịch",
        text: `Đã đặt lịch ${bookingData.service.name} tại ${bookingData.provider.name}`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h1>
            <p className="text-gray-600">
              Cảm ơn bạn đã đặt lịch. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận chi tiết.
            </p>
          </div>

          {/* Booking Details */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Thông tin đặt lịch</CardTitle>
                <Badge className="bg-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Đã xác nhận
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Mã đặt lịch: #{bookingData.id}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Provider */}
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-16 h-16 rounded-md overflow-hidden">
                  <img
                    src={bookingData.provider.image || "/placeholder.svg"}
                    alt={bookingData.provider.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{bookingData.provider.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{bookingData.provider.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    <span>{bookingData.provider.phone}</span>
                  </div>
                </div>
              </div>

              {/* Service & Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Dịch vụ đã đặt</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dịch vụ:</span>
                      <span className="font-medium">{bookingData.service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thời lượng:</span>
                      <span className="font-medium">{bookingData.service.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Lịch hẹn</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">
                        {new Date(bookingData.schedule.date).toLocaleDateString("vi-VN", {
                          weekday: "long", year: "numeric", month: "long", day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{bookingData.schedule.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Customer */}
              <div className="space-y-4">
                <h4 className="font-medium">Thông tin khách hàng</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Họ tên:</span>
                    <span className="font-medium">{bookingData.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Điện thoại:</span>
                    <span className="font-medium">{bookingData.customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{bookingData.customer.email}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Payment */}
              <div className="space-y-4">
                <h4 className="font-medium">Thông tin thanh toán</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tổng tiền dịch vụ:</span>
                    <span>{bookingData.payment.total.toLocaleString()}đ</span>
                  </div>
                  {bookingData.payment.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{bookingData.payment.discount.toLocaleString()}đ</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Tổng thanh toán:</span>
                    <span>{(bookingData.payment.total - bookingData.payment.discount).toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Đã đặt cọc ({bookingData.payment.depositPercent}%):
                    </span>
                    <span className="text-green-600 font-medium">
                      {bookingData.payment.deposit.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Còn lại:</span>
                    <span className="text-orange-600 font-medium">
                      {bookingData.payment.remaining.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phương thức:</span>
                    <span className="font-medium">{bookingData.payment.method}</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {bookingData.notes && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium">Ghi chú</h4>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{bookingData.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Next steps */}
          <Card className="mb-6">
            <CardHeader><CardTitle>Bước tiếp theo</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Xác nhận từ nhà cung cấp</p>
                    <p className="text-sm text-muted-foreground">
                      Chúng tôi sẽ liên hệ với bạn trong vòng 2-4 giờ để xác nhận chi tiết đặt lịch.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Chuẩn bị cho buổi chụp</p>
                    <p className="text-sm text-muted-foreground">
                      Nhà cung cấp sẽ gửi hướng dẫn chuẩn bị và thông tin chi tiết qua email.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Thanh toán số tiền còn lại</p>
                    <p className="text-sm text-muted-foreground">
                      Thanh toán {bookingData.payment.remaining.toLocaleString()}đ sau khi hoàn thành dịch vụ.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownloadReceipt} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Tải hóa đơn
            </Button>
            <Button onClick={handleShare} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Chia sẻ
            </Button>
            {/* Nếu Button của bạn hỗ trợ asChild (shadcn/ui), giữ như dưới; 
               nếu KHÔNG, bọc Link bên ngoài Button. */}
            <Button asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Về trang chủ
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Cần hỗ trợ?</p>
            <div className="flex justify-center gap-4">
              <Button variant="link" size="sm" asChild>
                <Link to="/help">Trung tâm trợ giúp</Link>
              </Button>
              <Button variant="link" size="sm" asChild>
                <Link to="/contact">Liên hệ hỗ trợ</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
