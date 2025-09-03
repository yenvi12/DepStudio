"use client"

import { useState } from "react"
import { Calendar } from "../../components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Clock, User } from "lucide-react"

interface BookingSlot {
  time: string
  customer: string
  service: string
  status: "booked" | "available" | "blocked"
}

const timeSlots: BookingSlot[] = [
  { time: "08:00", customer: "", service: "", status: "available" },
  { time: "09:00", customer: "Nguyễn Thị Lan", service: "Makeup cô dâu", status: "booked" },
  { time: "10:00", customer: "", service: "", status: "available" },
  { time: "11:00", customer: "Trần Văn Nam", service: "Chụp ảnh", status: "booked" },
  { time: "14:00", customer: "", service: "", status: "available" },
  { time: "15:00", customer: "", service: "", status: "blocked" },
  { time: "16:00", customer: "Lê Thị Hoa", service: "Thuê váy", status: "booked" },
]

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Chọn ngày</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Lịch hẹn - {selectedDate?.toLocaleDateString("vi-VN")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all hover:shadow-sm ${
                  slot.status === "booked"
                    ? "bg-red-50 border-red-200"
                    : slot.status === "blocked"
                      ? "bg-gray-50 border-gray-200"
                      : "bg-green-50 border-green-200 hover:bg-green-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium">{slot.time}</span>
                    {slot.status === "booked" && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{slot.customer}</p>
                          <p className="text-xs text-gray-500">{slot.service}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={
                      slot.status === "booked" ? "destructive" : slot.status === "blocked" ? "secondary" : "default"
                    }
                  >
                    {slot.status === "booked" ? "Đã đặt" : slot.status === "blocked" ? "Khóa" : "Trống"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
