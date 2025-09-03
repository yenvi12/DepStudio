"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Bell, Check, X, Calendar, DollarSign, MessageSquare, AlertTriangle } from "lucide-react"

interface Notification {
  id: number
  type: "booking" | "payment" | "message" | "alert" | "system"
  title: string
  message: string
  time: string
  read: boolean
  priority: "low" | "medium" | "high"
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "booking",
    title: "Đặt lịch mới",
    message: "Nguyễn Thị Lan đã đặt lịch makeup cô dâu cho ngày 20/1",
    time: "5 phút trước",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "payment",
    title: "Thanh toán thành công",
    message: "Đã nhận thanh toán 2.500.000đ từ khách hàng Trần Văn Nam",
    time: "15 phút trước",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "message",
    title: "Tin nhắn mới",
    message: "Lê Thị Hoa: 'Shop có ưu đãi gì cho tháng này không?'",
    time: "30 phút trước",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "alert",
    title: "Cảnh báo tồn kho",
    message: "Sản phẩm 'Foundation Dior' sắp hết hàng",
    time: "1 giờ trước",
    read: false,
    priority: "high",
  },
  {
    id: 5,
    type: "system",
    title: "Cập nhật hệ thống",
    message: "Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày mai",
    time: "2 giờ trước",
    read: true,
    priority: "medium",
  },
]

export function NotificationCenter() {
  const [notificationList, setNotificationList] = useState(notifications)
  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="h-4 w-4" />
      case "payment":
        return <DollarSign className="h-4 w-4" />
      case "message":
        return <MessageSquare className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getIconColor = (type: string, priority: string) => {
    if (priority === "high") return "text-red-500"
    if (priority === "medium") return "text-yellow-500"
    return "text-blue-500"
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Thông báo
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-1" />
              Đọc tất cả
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-1 p-4">
            {notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors hover:bg-gray-50 ${
                  !notification.read ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full bg-gray-100 ${getIconColor(notification.type, notification.priority)}`}
                  >
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <div className="flex items-center gap-2">
                        {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
