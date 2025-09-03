"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { ScrollArea } from "../../components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import { Bell, Check, X, Calendar, DollarSign, MessageSquare, AlertTriangle, Settings } from "lucide-react"

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

export function NotificationButton() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id))
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
    if (priority === "high") return "text-red-500 bg-red-50"
    if (priority === "medium") return "text-yellow-500 bg-yellow-50"
    return "text-blue-500 bg-blue-50"
  }

  const getPriorityDot = (priority: string) => {
    if (priority === "high") return "bg-red-500"
    if (priority === "medium") return "bg-yellow-500"
    return "bg-blue-500"
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <>
              {/* Animated notification dot */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-xs font-bold">{unreadCount > 9 ? "9+" : unreadCount}</span>
              </div>
              {/* Ripple effect */}
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-75"></div>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 p-0 shadow-2xl border-0 bg-white/95 backdrop-blur-md"
        sideOffset={8}
      >
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Thông báo</h3>
                <p className="text-sm text-gray-500">
                  {unreadCount > 0 ? `${unreadCount} thông báo mới` : "Không có thông báo mới"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Check className="h-4 w-4 mr-1" />
                Đọc tất cả
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-96">
          {notificationList.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Không có thông báo</p>
              <p className="text-sm text-gray-400 mt-1">Tất cả thông báo sẽ hiển thị ở đây</p>
            </div>
          ) : (
            <div className="p-2">
              {notificationList.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`group relative p-4 rounded-xl mb-2 transition-all duration-200 hover:shadow-md cursor-pointer ${
                    !notification.read
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
                      : "bg-gray-50/50 hover:bg-gray-100/50"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  {/* Priority indicator */}
                  {!notification.read && (
                    <div
                      className={`absolute left-2 top-4 w-1 h-12 rounded-full ${getPriorityDot(notification.priority)}`}
                    ></div>
                  )}

                  <div className="flex items-start gap-3 ml-2">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${getIconColor(notification.type, notification.priority)}`}>
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {notification.time}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                markAsRead(notification.id)
                              }}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="absolute right-3 top-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50/50">
          <Button
            variant="ghost"
            className="w-full justify-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Settings className="h-4 w-4" />
            Cài đặt thông báo
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
