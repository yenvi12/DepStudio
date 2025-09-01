import React, { useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { format, isBefore } from "date-fns"
import { vi } from "date-fns/locale"

import {
  CalendarIcon,
  CreditCard,
  Landmark,
  Wallet,
  CheckCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Star,
  MapPin,
  Phone,
  Loader2,
} from "lucide-react"

// Nếu bạn đang import font từ Next, chuyển sang @fontsource hoặc file CSS tĩnh:
// import "/assets/fonts.css"

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const studioId = searchParams.get("studio")
  const makeupId = searchParams.get("makeup")
  const preSelectedService = searchParams.get("service")

  const [date, setDate] = useState(undefined)
  const [step, setStep] = useState(1)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const [selectedService, setSelectedService] = useState(preSelectedService || "")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [depositOption, setDepositOption] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [isPromoApplied, setIsPromoApplied] = useState(false)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
  })

  // Mock provider (thay bằng fetch API nếu có)
  const providerData = {
    id: studioId || makeupId || "1",
    name: studioId ? "Studio Ánh Dương" : "Makeup Artist Linh",
    type: studioId ? "studio" : "makeup",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviews: 156,
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    phone: "0123 456 789",
    email: "contact@provider.com",
  }

  const services = studioId
    ? [
        {
          id: "1",
          name: "Chụp ảnh cưới cơ bản",
          price: 3000000,
          duration: 180,
          description: "Gói chụp ảnh cưới cơ bản với 100 ảnh đã chỉnh sửa",
          includes: ["100 ảnh đã chỉnh sửa", "1 nhiếp ảnh gia", "Trang phục cơ bản", "Makeup nhẹ"],
        },
        {
          id: "2",
          name: "Chụp ảnh cưới cao cấp",
          price: 5000000,
          duration: 300,
          description: "Gói chụp ảnh cưới cao cấp với đầy đủ dịch vụ",
          includes: [
            "200 ảnh đã chỉnh sửa",
            "2 nhiếp ảnh gia",
            "Trang phục cao cấp",
            "Makeup chuyên nghiệp",
            "Album ảnh",
            "USB ảnh gốc",
          ],
          popular: true,
        },
        {
          id: "3",
          name: "Chụp ảnh gia đình",
          price: 2000000,
          duration: 120,
          description: "Gói chụp ảnh gia đình ấm cúng",
          includes: ["50 ảnh đã chỉnh sửa", "1 nhiếp ảnh gia", "Props chụp ảnh"],
        },
      ]
    : [
        {
          id: "1",
          name: "Makeup cô dâu cơ bản",
          price: 800000,
          duration: 90,
          description: "Makeup cô dâu tự nhiên, tươi tắn cho ngày cưới",
          includes: ["Makeup mặt", "Làm tóc cơ bản", "Cài phụ kiện", "Touch-up 1 lần"],
        },
        {
          id: "2",
          name: "Makeup cô dâu cao cấp",
          price: 1500000,
          duration: 120,
          description: "Makeup cô dâu sang trọng với phong cách hiện đại",
          includes: [
            "Makeup mặt chuyên nghiệp",
            "Làm tóc cao cấp",
            "Cài phụ kiện",
            "Touch-up 2 lần",
            "Makeup phù dâu (1 người)",
            "Tặng son touch-up",
          ],
          popular: true,
        },
        {
          id: "3",
          name: "Makeup dự tiệc",
          price: 600000,
          duration: 60,
          description: "Makeup dự tiệc sang trọng, phù hợp mọi sự kiện",
          includes: ["Makeup mặt", "Làm tóc đơn giản", "Touch-up 1 lần"],
        },
      ]

  // Mock booked slots
  const bookedSlots = [
    { date: "2024-01-25", timeSlots: ["08:00-11:00", "14:00-17:00"] },
    { date: "2024-01-26", timeSlots: ["09:00-14:00"] },
  ]

  const generateTimeSlots = (selectedDate) => {
    const slots = []
    const dateString = format(selectedDate, "yyyy-MM-dd")
    const bookedDay = bookedSlots.find((s) => s.date === dateString)

    for (let hour = 8; hour < 18; hour += 2) {
      const startTime = `${String(hour).padStart(2, "0")}:00`
      const endTime = `${String(hour + 2).padStart(2, "0")}:00`
      const range = `${startTime}-${endTime}`

      let status = "available"
      if (bookedDay?.timeSlots.includes(range)) status = "booked"
      if (hour === 16) status = "maintenance"

      slots.push({
        id: `${hour}`,
        time: `${startTime} - ${endTime}`,
        startTime,
        endTime,
        status,
      })
    }
    return slots
  }

  const depositOptions = [
    { id: "full", label: "Thanh toán toàn bộ", description: "Thanh toán 100% giá trị đơn hàng", value: 100 },
    { id: "50", label: "Đặt cọc 50%", description: "Thanh toán 50% trước, 50% sau khi hoàn thành", value: 50 },
    { id: "30", label: "Đặt cọc 30%", description: "Thanh toán 30% trước, 70% sau khi hoàn thành", value: 30 },
  ]

  const paymentMethods = [
    { id: "bank", label: "Chuyển khoản ngân hàng", icon: Landmark },
    { id: "card", label: "Thẻ tín dụng/ghi nợ", icon: CreditCard },
    { id: "momo", label: "Ví MoMo", icon: Wallet },
    { id: "zalopay", label: "ZaloPay", icon: Wallet },
  ]

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const selectedTimeSlotData = selectedTimeSlot && date ? generateTimeSlots(date).find((t) => t.id === selectedTimeSlot) : null
  const selectedDepositData = depositOptions.find((d) => d.id === depositOption)

  const calculateTotal = () => (selectedServiceData ? selectedServiceData.price : 0)
  const calculateDiscount = () => (isPromoApplied ? calculateTotal() * 0.1 : 0)
  const calculateDeposit = () =>
    selectedDepositData ? (calculateTotal() - calculateDiscount()) * (selectedDepositData.value / 100) : 0
  const calculateRemaining = () => calculateTotal() - calculateDiscount() - calculateDeposit()

  const validateStep = (n) => {
    const newErrors = {}
    switch (n) {
      case 1:
        if (!selectedService) newErrors.service = "Vui lòng chọn dịch vụ"
        break
      case 2:
        if (!date) newErrors.date = "Vui lòng chọn ngày"
        if (!selectedTimeSlot) newErrors.timeSlot = "Vui lòng chọn khung giờ"
        break
      case 3:
        if (!depositOption) newErrors.deposit = "Vui lòng chọn hình thức đặt cọc"
        if (!paymentMethod) newErrors.payment = "Vui lòng chọn phương thức thanh toán"
        break
      case 4:
        if (!customerInfo.name.trim()) newErrors.name = "Vui lòng nhập họ tên"
        if (!customerInfo.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại"
        else if (!/^[0-9]{10,11}$/.test(customerInfo.phone.replace(/\s/g, "")))
          newErrors.phone = "Số điện thoại không hợp lệ"
        if (!customerInfo.email.trim()) newErrors.email = "Vui lòng nhập email"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) newErrors.email = "Email không hợp lệ"
        break
      default:
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "NEWUSER10") {
      setIsPromoApplied(true)
      setErrors((p) => ({ ...p, promo: "" }))
    } else {
      setErrors((p) => ({ ...p, promo: "Mã giảm giá không hợp lệ" }))
    }
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((p) => p + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevStep = () => {
    setStep((p) => p - 1)
    setErrors({})
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(4)) return

    setIsSubmitting(true)
    try {
      const bookingData = {
        ...(studioId ? { studioId } : { makeupId }),
        serviceId: selectedService,
        date,
        timeSlotId: selectedTimeSlot,
        paymentMethod,
        depositOption,
        promoCode: isPromoApplied ? promoCode : undefined,
        notes,
        customerInfo,
      }

      // giả lập API
      await new Promise((r) => setTimeout(r, 2000))
      console.log("Booking data:", bookingData)

      // Điều hướng SPA tới trang xác nhận
      navigate(`/booking/confirmation?id=${Date.now()}`)
    } catch (err) {
      console.error("Booking error:", err)
      setErrors({ submit: "Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = date ? generateTimeSlots(date) : []

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Bước 1: Chọn dịch vụ</CardTitle>
              <CardDescription>Chọn dịch vụ bạn muốn đặt lịch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Provider */}
                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-20 h-20 rounded-md overflow-hidden">
                    <img
                      src={providerData.image || "/placeholder.svg"}
                      alt={providerData.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{providerData.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{providerData.rating}</span>
                      <span className="text-muted-foreground">({providerData.reviews} đánh giá)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{providerData.location}</span>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-4">
                  <Label>Chọn dịch vụ</Label>
                  {errors.service && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.service}</AlertDescription>
                    </Alert>
                  )}
                  <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                          selectedService === service.id ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <RadioGroupItem value={service.id} id={`service-${service.id}`} className="hidden" />
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{service.name}</p>
                              {service.popular && <Badge className="bg-blue-600">Phổ biến</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-3 h-3" />
                              <span>
                                {Math.floor(service.duration / 60)}h {service.duration % 60}m
                              </span>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Bao gồm:</p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {service.includes.map((item, idx) => (
                                  <li key={idx} className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-600" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-semibold text-primary text-lg">
                              {service.price.toLocaleString()}đ
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleNextStep} disabled={!selectedService}>
                    Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )

      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Bước 2: Chọn ngày và giờ</CardTitle>
              <CardDescription>Chọn thời gian phù hợp với bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Date */}
                <div className="space-y-2">
                  <Label>Chọn ngày</Label>
                  {errors.date && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.date}</AlertDescription>
                    </Alert>
                  )}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: vi }) : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                          setDate(d)
                          setSelectedTimeSlot("")
                        }}
                        initialFocus
                        disabled={(d) => isBefore(d, new Date())}
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time slots */}
                {date && (
                  <div className="space-y-2">
                    <Label>Chọn khung giờ</Label>
                    {errors.timeSlot && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.timeSlot}</AlertDescription>
                      </Alert>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          type="button"
                          variant={selectedTimeSlot === slot.id ? "default" : "outline"}
                          className={`justify-between h-auto p-4 ${
                            slot.status !== "available" && "opacity-50 cursor-not-allowed"
                          }`}
                          disabled={slot.status !== "available"}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                        >
                          <span className="font-medium">{slot.time}</span>
                          {slot.status === "available" ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              Trống
                            </Badge>
                          ) : slot.status === "booked" ? (
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                              Đã đặt
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                              Bảo trì
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại
                  </Button>
                  <Button onClick={handleNextStep} disabled={!date || !selectedTimeSlot}>
                    Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )

      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Bước 3: Thông tin thanh toán</CardTitle>
              <CardDescription>Chọn phương thức thanh toán và đặt cọc</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Deposit */}
                <div className="space-y-2">
                  <Label>Chọn hình thức đặt cọc</Label>
                  {errors.deposit && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.deposit}</AlertDescription>
                    </Alert>
                  )}
                  <RadioGroup value={depositOption} onValueChange={setDepositOption}>
                    {depositOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                          depositOption === option.id ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => setDepositOption(option.id)}
                      >
                        <RadioGroupItem value={option.id} id={`deposit-${option.id}`} className="hidden" />
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="font-medium">{option.label}</p>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{option.value}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Payment methods */}
                <div className="space-y-2">
                  <Label>Chọn phương thức thanh toán</Label>
                  {errors.payment && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{errors.payment}</AlertDescription>
                    </Alert>
                  )}
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon
                        return (
                          <div
                            key={method.id}
                            className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                              paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border"
                            }`}
                            onClick={() => setPaymentMethod(method.id)}
                          >
                            <RadioGroupItem value={method.id} id={`payment-${method.id}`} className="hidden" />
                            <div className="flex items-center gap-3">
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{method.label}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </RadioGroup>
                </div>

                {/* Promo */}
                <div className="space-y-2">
                  <Label htmlFor="promo">Mã giảm giá (tùy chọn)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="promo"
                      placeholder="Nhập mã giảm giá"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      disabled={isPromoApplied}
                    />
                    <Button type="button" variant="outline" onClick={handleApplyPromo} disabled={!promoCode || isPromoApplied}>
                      {isPromoApplied ? "Đã áp dụng" : "Áp dụng"}
                    </Button>
                  </div>
                  {isPromoApplied && (
                    <p className="text-sm text-green-500 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Mã giảm giá đã được áp dụng (Giảm 10%)
                    </p>
                  )}
                  {errors.promo && <p className="text-sm text-red-500">{errors.promo}</p>}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại
                  </Button>
                  <Button onClick={handleNextStep} disabled={!depositOption || !paymentMethod}>
                    Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )

      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>Bước 4: Thông tin khách hàng</CardTitle>
              <CardDescription>Cung cấp thông tin liên hệ của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      placeholder="Nhập họ và tên"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      placeholder="Nhập số điện thoại"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Ghi chú (tùy chọn)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Nhập yêu cầu đặc biệt hoặc thông tin bổ sung..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại
                  </Button>
                  <Button onClick={handleNextStep}>
                    Tiếp tục <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )

      case 5:
        return (
          <>
            <CardHeader>
              <CardTitle>Bước 5: Xác nhận đặt lịch</CardTitle>
              <CardDescription>Kiểm tra thông tin đặt lịch của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {errors.submit && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errors.submit}</AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="w-20 h-20 rounded-md overflow-hidden">
                    <img
                      src={providerData.image || "/placeholder.svg"}
                      alt={providerData.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{providerData.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{providerData.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>{providerData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Chi tiết đặt lịch</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Dịch vụ:</span>
                        <span className="font-medium">{selectedServiceData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ngày:</span>
                        <span className="font-medium">{date ? format(date, "PPP", { locale: vi }) : ""}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Giờ:</span>
                        <span className="font-medium">{selectedTimeSlotData?.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Khách hàng:</span>
                        <span className="font-medium">{customerInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Điện thoại:</span>
                        <span className="font-medium">{customerInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{customerInfo.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Chi tiết thanh toán</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tổng tiền dịch vụ:</span>
                      <span>{calculateTotal().toLocaleString()}đ</span>
                    </div>
                    {isPromoApplied && (
                      <div className="flex justify-between text-green-500">
                        <span>Giảm giá (10%):</span>
                        <span>-{calculateDiscount().toLocaleString()}đ</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Tổng thanh toán:</span>
                      <span>{(calculateTotal() - calculateDiscount()).toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Đặt cọc ({selectedDepositData?.value}%):</span>
                      <span className="text-primary font-medium">{calculateDeposit().toLocaleString()}đ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Còn lại:</span>
                      <span>{calculateRemaining().toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Phương thức thanh toán</h3>
                  <p>{paymentMethods.find((m) => m.id === paymentMethod)?.label}</p>
                </div>

                {notes && (
                  <div className="space-y-2">
                    <h3 className="font-medium">Ghi chú</h3>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">{notes}</p>
                  </div>
                )}

                <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-medium">Chính sách hủy lịch</h3>
                  <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Hủy trước 48 giờ: Hoàn tiền 100% tiền cọc</li>
                    <li>Hủy trước 24 giờ: Hoàn tiền 50% tiền cọc</li>
                    <li>Hủy trong vòng 24 giờ: Không hoàn tiền cọc</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep} disabled={isSubmitting}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Quay lại
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      "Xác nhận đặt lịch"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại trang chủ
            </Link>
          </Button>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                      s === step
                        ? "bg-primary text-primary-foreground"
                        : s < step
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                  </div>
                  <span className="text-xs mt-2 text-center">
                    {s === 1 ? "Dịch vụ" : s === 2 ? "Thời gian" : s === 3 ? "Thanh toán" : s === 4 ? "Thông tin" : "Xác nhận"}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${((step - 1) / 4) * 100}%` }} />
            </div>
          </div>

          <Card>{renderStepContent()}</Card>
        </div>
      </div>
    </div>
  )
}
