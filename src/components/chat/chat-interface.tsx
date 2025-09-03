"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Send, Phone, Video, MoreVertical } from "lucide-react"
import { ScrollArea } from "../../components/ui/scroll-area"

interface Message {
  id: number
  sender: "customer" | "shop"
  content: string
  time: string
  read: boolean
}

interface ChatUser {
  id: number
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

const chatUsers: ChatUser[] = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    avatar: "/placeholder.svg",
    lastMessage: "Tôi muốn đặt lịch makeup cho ngày 20/1",
    time: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Trần Văn Nam",
    avatar: "/placeholder.svg",
    lastMessage: "Cảm ơn shop đã hỗ trợ tận tình",
    time: "09:15",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Lê Thị Hoa",
    avatar: "/placeholder.svg",
    lastMessage: "Shop có ưu đãi gì cho tháng này không?",
    time: "08:45",
    unread: 1,
    online: true,
  },
]

const messages: Message[] = [
  {
    id: 1,
    sender: "customer",
    content: "Chào shop, tôi muốn hỏi về dịch vụ makeup cô dâu",
    time: "10:25",
    read: true,
  },
  {
    id: 2,
    sender: "shop",
    content:
      "Chào chị! Shop có nhiều gói makeup cô dâu khác nhau. Chị có thể cho shop biết ngày cưới và yêu cầu cụ thể không ạ?",
    time: "10:26",
    read: true,
  },
  {
    id: 3,
    sender: "customer",
    content: "Tôi cưới ngày 20/1, muốn makeup tự nhiên nhưng vẫn nổi bật. Giá cả như thế nào ạ?",
    time: "10:28",
    read: true,
  },
  {
    id: 4,
    sender: "shop",
    content:
      "Gói makeup cô dâu tự nhiên của shop là 2.500.000đ, bao gồm makeup + làm tóc + thử makeup 1 lần trước đó. Chị có muốn đặt lịch thử không ạ?",
    time: "10:30",
    read: false,
  },
]

export function ChatInterface() {
  const [selectedUser, setSelectedUser] = useState<ChatUser>(chatUsers[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logic gửi tin nhắn
      setNewMessage("")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Tin nhắn</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="space-y-1 p-4">
              {chatUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedUser.id === user.id ? "bg-blue-50 border border-blue-200" : ""
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm truncate">{user.name}</h4>
                        <span className="text-xs text-gray-500">{user.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
                    </div>
                    {user.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {user.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-2">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {selectedUser.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{selectedUser.name}</h3>
                <p className="text-sm text-gray-500">{selectedUser.online ? "Đang hoạt động" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "shop" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "shop" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === "shop" ? "text-blue-100" : "text-gray-500"}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
