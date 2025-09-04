import { useState } from "react"
import {
  Card,
  CardContent,
} from "../../components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs"
import {
  Users,
  UserCheck,
  TrendingUp,
  Search,
  Eye,
  Edit,
} from "lucide-react"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog"

interface User {
  id: number
  name: string
  email: string
  role: "customer" | "owner"
  joinDate: string
  lastActive: string
  status: "active" | "blocked"
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Nguyễn Thị Lan",
      email: "lan@email.com",
      role: "customer",
      joinDate: "2024-01-10",
      lastActive: "2 giờ trước",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Văn Nam",
      email: "nam@studio.com",
      role: "owner",
      joinDate: "2023-12-15",
      lastActive: "1 ngày trước",
      status: "active",
    },
  ])

  const [search, setSearch] = useState<string>("")
  const [tab, setTab] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [form, setForm] = useState<{ name: string; email: string }>({ name: "", email: "" })

  // Filter users
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  const visibleUsers = filteredUsers.filter((u) => {
    if (tab === "customers") return u.role === "customer"
    if (tab === "owners") return u.status === "blocked"
    return true
  })

  const handleBlockToggle = (id: number) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "blocked" : "active" }
          : u
      )
    )
  }

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email })
    setSelectedUser(user)
    setIsEdit(true)
  }

  const handleSave = () => {
    if (!selectedUser) return
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id ? { ...u, name: form.name, email: form.email } : u
      )
    )
    setIsEdit(false)
    setSelectedUser(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Quản lý Người dùng
          </h2>
          <p className="text-gray-600 mt-1">
            Quản lý tài khoản khách hàng và chủ studio
          </p>
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Tìm kiếm người dùng..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" />
            Tìm kiếm
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 rounded-lg">
          <TabsTrigger
            value="all"
            className="text-black data-[state=active]:bg-amber-100 data-[state=active]:text-black"
          >
            Tất cả
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="text-black data-[state=active]:bg-amber-100 data-[state=active]:text-black"
          >
            Khách hàng
          </TabsTrigger>
          <TabsTrigger
            value="owners"
            className="text-black data-[state=active]:bg-amber-100 data-[state=active]:text-black"
          >
            Bị khóa
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={tab} className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">
                      Tổng người dùng
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                      {users.length}
                    </p>
                  </div>
                  <Users className="h-12 w-12 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">
                      Hoạt động
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                      {users.filter((u) => u.status === "active").length}
                    </p>
                  </div>
                  <UserCheck className="h-12 w-12 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">
                      Bị khóa
                    </p>
                    <p className="text-3xl font-bold text-purple-900">
                      {users.filter((u) => u.status === "blocked").length}
                    </p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Table */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Người dùng</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Ngày tham gia</TableHead>
                    <TableHead>Hoạt động cuối</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "owner" ? "default" : "secondary"
                          }
                        >
                          {user.role === "owner"
                            ? "Chủ studio"
                            : "Khách hàng"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-gray-600">
                        {user.lastActive}
                      </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800">
                            Hoạt động
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">
                            Bị khóa
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleBlockToggle(user.id)}
                          >
                            {user.status === "active" ? "Khóa" : "Mở khóa"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog chi tiết hoặc chỉnh sửa */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEdit ? "Chỉnh sửa người dùng" : "Chi tiết người dùng"}
            </DialogTitle>
          </DialogHeader>

          {selectedUser && !isEdit && (
            <div className="space-y-2">
              <p><b>Tên:</b> {selectedUser.name}</p>
              <p><b>Email:</b> {selectedUser.email}</p>
              <p><b>Vai trò:</b> {selectedUser.role}</p>
              <p><b>Trạng thái:</b> {selectedUser.status}</p>
            </div>
          )}

          {selectedUser && isEdit && (
            <div className="space-y-4">
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tên người dùng"
              />
              <Input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
              />
            </div>
          )}

          <DialogFooter>
            {isEdit ? (
              <>
                <Button onClick={() => setIsEdit(false)} variant="outline">
                  Hủy
                </Button>
                <Button onClick={handleSave}>Lưu</Button>
              </>
            ) : (
              <Button onClick={() => setSelectedUser(null)}>Đóng</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
