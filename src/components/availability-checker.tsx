"use client"

import { useState } from "react"
import { Calendar } from "../components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { CheckCircle, XCircle, AlertCircle, CalendarIcon, Clock } from "lucide-react"
import { format, isBefore, addDays } from "date-fns"
import { vi } from "date-fns/locale"
import { cn } from "../lib/utils"

interface AvailabilityCheckerProps {
  providerId: string
  providerType: "studio" | "makeup" | "rental"
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

export function AvailabilityChecker({
  providerId,
  providerType,
  workingHours,
  bookedSlots,
  onDateSelect,
  onTimeSlotSelect,
}: AvailabilityCheckerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")

  type WorkingHours = Record<
  string,
  {
    open: string
    close: string
    available: boolean
  }
>

const generateTimeSlots = (
  date: Date,
  workingHours: WorkingHours,
  providerType: "studio" | "makeup" | "rental"
) => {
  const dayName = format(date, "EEEE", { locale: vi }).toLowerCase()
  const workingHour = workingHours[dayName]

  if (!workingHour?.available) return []

  const slots: {
    id: string
    time: string
    startTime: string
    endTime: string
    duration: number
  }[] = []

  const startHour = parseInt(workingHour.open.split(":")[0], 10)
  const endHour = parseInt(workingHour.close.split(":")[0], 10)

  let slotDuration = providerType === "studio" ? 3 : providerType === "makeup" ? 2 : 4

  for (let hour = startHour; hour < endHour; hour += slotDuration) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`
    const endTime = `${(hour + slotDuration).toString().padStart(2, "0")}:00`

    if (hour + slotDuration <= endHour) {
      slots.push({
        id: `${dayName}-${hour}`,
        time: `${startTime} - ${endTime}`,
        startTime,
        endTime,
        duration: slotDuration,
      })
    }
  }

  return slots
}


  // Check slot availability
  const isSlotAvailable = (date: Date, timeSlot: string) => {
    const dateString = format(date, "yyyy-MM-dd")
    const bookedDay = bookedSlots.find((slot) => slot.date === dateString)
    if (!bookedDay) return true
    return !bookedDay.timeSlots.includes(timeSlot)
  }

  // Get availability status for a day
  const getDayAvailability = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd")
    const dayName = format(date, "EEEE", { locale: vi }).toLowerCase()
    const workingHour = workingHours[dayName]

    if (!workingHour?.available) {
      return { status: "closed", label: "Nghỉ", color: "bg-gray-200 text-gray-600" }
    }

    if (isBefore(date, new Date())) {
      return { status: "past", label: "Đã qua", color: "bg-gray-200 text-gray-600" }
    }

    const bookedDay = bookedSlots.find((slot) => slot.date === dateString)
    if (!bookedDay) {
      return { status: "available", label: "Trống", color: "bg-green-100 text-green-800" }
    }

    const totalSlots = generateTimeSlots(date, workingHours, providerType).length
    const bookedSlotsCount = bookedDay.timeSlots.length

    if (bookedSlotsCount >= totalSlots) {
      return { status: "fully-booked", label: "Đã đầy", color: "bg-red-100 text-red-800" }
    } else if (bookedSlotsCount > 0) {
      return { status: "partially-booked", label: "Một phần", color: "bg-yellow-100 text-yellow-800" }
    }

    return { status: "available", label: "Trống", color: "bg-green-100 text-green-800" }
  }

  // Get 7-day summary
  const getWeekAvailability = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(new Date(), i)
      const availability = getDayAvailability(date)
      return {
        date,
        dayName: format(date, "EEE", { locale: vi }),
        dayNumber: format(date, "d"),
        availability,
      }
    })
  }

  // Handlers
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTimeSlot("")
    if (date && onDateSelect) onDateSelect(date)
  }

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot)
    if (onTimeSlotSelect) onTimeSlotSelect(timeSlot)
  }

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate, workingHours, providerType) : []
  const weekAvailability = getWeekAvailability()

  return (
    <div className="space-y-6">
      {/* Week Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Tình trạng 7 ngày tới
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekAvailability.map(({ date, dayName, dayNumber, availability }, i) => {
              const isSelected =
                selectedDate && format(selectedDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
              return (
                <div
                  key={i}
                  onClick={() => handleDateSelect(date)}
                  className={cn(
                    "text-center p-3 rounded-lg border cursor-pointer transition-colors",
                    isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <div className="text-xs text-muted-foreground mb-1">{dayName}</div>
                  <div className="font-medium mb-2">{dayNumber}</div>
                  <Badge className={cn("text-xs", availability.color)}>{availability.label}</Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
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
                available: (date) => getDayAvailability(date).status === "available",
                "partially-booked": (date) => getDayAvailability(date).status === "partially-booked",
                "fully-booked": (date) => getDayAvailability(date).status === "fully-booked",
                closed: (date) => getDayAvailability(date).status === "closed",
              }}
              modifiersStyles={{
                available: { backgroundColor: "#dcfce7", color: "#166534" },
                "partially-booked": { backgroundColor: "#fef3c7", color: "#92400e" },
                "fully-booked": { backgroundColor: "#fecaca", color: "#991b1b" },
                closed: { backgroundColor: "#f3f4f6", color: "#6b7280" },
              }}
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? `Khung giờ - ${format(selectedDate, "dd/MM/yyyy", { locale: vi })}`
                : "Chọn khung giờ"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              timeSlots.length > 0 ? (
                <div className="space-y-3">
                  {timeSlots.map((slot) => {
                    const slotKey = `${slot.startTime}-${slot.endTime}`
                    const isAvailable = isSlotAvailable(selectedDate, slotKey)
                    const isSelected = selectedTimeSlot === slot.id
                    return (
                      <Button
                        key={slot.id}
                        variant={isSelected ? "default" : "outline"}
                        className={cn(
                          "w-full justify-between p-4 h-auto text-sm",
                          !isAvailable && "opacity-50 cursor-not-allowed"
                        )}
                        onClick={() => isAvailable && handleTimeSlotSelect(slot.id)}
                        disabled={!isAvailable}
                      >
                        <div className="flex items-center gap-3">
                          {isAvailable ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="font-medium">{slot.time}</span>
                          <div className="flex items-center gap-1 text-muted-foreground ml-3">
                            <Clock className="w-4 h-4" />
                            <span>{slot.duration}h</span>
                          </div>
                        </div>
                        <Badge className={isAvailable ? "bg-green-600" : "bg-red-600"}>
                          {isAvailable ? "Còn trống" : "Đã đặt"}
                        </Badge>
                      </Button>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                  <p>Không làm việc vào ngày này</p>
                </div>
              )
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="w-8 h-8 mx-auto mb-2" />
                <p>Chọn ngày để xem khung giờ có sẵn</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary */}
      {selectedDate && selectedTimeSlot && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Đã chọn thời gian</span>
            </div>
            <div className="text-sm text-green-700">
              <div>Ngày: {format(selectedDate, "EEEE, dd/MM/yyyy", { locale: vi })}</div>
              <div>Giờ: {timeSlots.find((slot) => slot.id === selectedTimeSlot)?.time}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
