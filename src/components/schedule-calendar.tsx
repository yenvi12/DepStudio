"use client"
import { useState } from "react"
import { Calendar } from "../components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { CheckCircle, XCircle, AlertCircle, CalendarIcon } from "lucide-react"
import { format, isBefore } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "../lib/utils"

interface ScheduleCalendarProps {
  workingHours: Record<string, { open: string; close: string; available: boolean }>
  bookedSlots: Array<{
    date: string
    timeSlots: string[]
    services: string[]
    status: string
  }>
  onDateSelect?: (date: Date) => void
  onTimeSlotSelect?: (timeSlot: string) => void
}

export function ScheduleCalendar({
  workingHours,
  bookedSlots,
  onDateSelect,
  onTimeSlotSelect,
}: ScheduleCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
const generateTimeSlots = (date: Date) => {
  const dayName = format(date, "EEEE", { locale: vi }).toLowerCase()
  const workingHour = workingHours[dayName]
  if (!workingHour?.available) return []

  const slots: string[] = []
  const startHour = parseInt(workingHour.open.split(":")[0])
  const endHour = parseInt(workingHour.close.split(":")[0])

  for (let hour = startHour; hour < endHour; hour += 2) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`

    // đảm bảo endTime không vượt quá giờ đóng cửa
    const nextHour = Math.min(hour + 2, endHour)
    const endTime = `${nextHour.toString().padStart(2, "0")}:00`

    slots.push(`${startTime}-${endTime}`)
  }

  return slots
}


  const isSlotAvailable = (date: Date, timeSlot: string) => {
    const dateString = format(date, "yyyy-MM-dd")
    const bookedDay = bookedSlots.find((slot) => slot.date === dateString)
    return !bookedDay || !bookedDay.timeSlots.includes(timeSlot)
  }

  const getDayStatus = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const bookedDay = bookedSlots.find((slot) => slot.date === dateString)
    const dayName = format(date, "EEEE", { locale: vi }).toLowerCase()
    const workingHour = workingHours[dayName]
    if (!workingHour?.available) return "closed"
    if (!bookedDay) return "available"

    const totalSlots = generateTimeSlots(date).length
    const bookedCount = bookedDay.timeSlots.length
    if (bookedCount >= totalSlots) return "fully-booked"
    if (bookedCount > 0) return "partially-booked"
    return "available"
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTimeSlot("")
    onDateSelect?.(date!)
  }

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot)
    onTimeSlotSelect?.(slot)
  }

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card className="border bg-white rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle>Chọn ngày</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => isBefore(date, new Date())}
            locale={vi}
            className="rounded-md border"
            modifiers={{
              available: (date) => getDayStatus(date) === "available",
              "partially-booked": (date) => getDayStatus(date) === "partially-booked",
              "fully-booked": (date) => getDayStatus(date) === "fully-booked",
              closed: (date) => getDayStatus(date) === "closed",
            }}
            modifiersStyles={{
              available: { backgroundColor: "#dcfce7", color: "#166534" },
              "partially-booked": { backgroundColor: "#fef3c7", color: "#92400e" },
              "fully-booked": { backgroundColor: "#fecaca", color: "#991b1b" },
              closed: { backgroundColor: "#f3f4f6", color: "#6b7280" },
            }}
          />

          {/* Legend */}
          <div className="mt-4 space-y-2">
            <h5 className="font-medium text-sm">Chú thích:</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border border-green-500 rounded" />
                <span>Còn trống</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-100 border border-yellow-500 rounded" />
                <span>Một phần</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-100 border border-red-500 rounded" />
                <span>Đã đầy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-100 border border-gray-400 rounded" />
                <span>Nghỉ</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card className="border bg-white rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle>
            {selectedDate
              ? `Khung giờ - ${format(selectedDate, "dd/MM/yyyy", { locale: vi })}`
              : "Chọn khung giờ"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            <div className="space-y-3">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot) => {
                  const isAvailable = isSlotAvailable(selectedDate, slot)
                  const isSelected = selectedTimeSlot === slot
                  return (
                    <Button
                      key={slot}
                      variant={isSelected ? "default" : "outline"}
                      className={cn(
                        "w-full justify-between p-4 h-auto text-sm",
                        isAvailable
                          ? "text-black"
                          : "opacity-50 cursor-not-allowed text-gray-500"
                      )}
                      onClick={() => isAvailable && handleTimeSlotSelect(slot)}
                      disabled={!isAvailable}
                    >
                      <div className="flex items-center gap-3">
                        {isAvailable ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-medium">{slot}</span>
                      </div>
                      <Badge
                        className={isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                      >
                        {isAvailable ? "Còn trống" : "Đã đặt"}
                      </Badge>
                    </Button>
                  )
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>Không làm việc vào ngày này</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarIcon className="w-8 h-8 mx-auto mb-2" />
              <p>Chọn ngày để xem khung giờ</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
