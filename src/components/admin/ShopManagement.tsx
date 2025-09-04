import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import {
  Building2,
  Filter,
  Store,
  CheckCircle,
  AlertTriangle,
  Shield,
  Eye,
  Edit,
  Star,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"

export function ShopManagement() {
  interface Shop {
    name: string
    owner: string
    location: string
    status: "active" | "pending" | "blocked"
    revenue: number
    rating: number
  }

  interface Service {
    id: number
    name: string
    shop: string
    status: "pending" | "approved" | "rejected"
  }

  const [shops, setShops] = useState<Shop[]>([
    {
      name: "Bella Studio",
      owner: "Nguyễn Thị Mai",
      location: "Quận 1, TP.HCM",
      status: "active",
      revenue: 15000000,
      rating: 4.8,
    },
    {
      name: "Glamour Makeup",
      owner: "Trần Văn Nam",
      location: "Quận 3, TP.HCM",
      status: "active",
      revenue: 12000000,
      rating: 4.6,
    },
    {
      name: "Royal Wedding",
      owner: "Lê Thị Hoa",
      location: "Quận 7, TP.HCM",
      status: "pending",
      revenue: 8000000,
      rating: 4.2,
    },
  ])

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Gói Makeup Cơ bản", shop: "Bella Studio", status: "pending" },
    { id: 2, name: "Gói Chụp ảnh cưới", shop: "Royal Wedding", status: "pending" },
    { id: 3, name: "Trang điểm dạ hội", shop: "Glamour Makeup", status: "approved" },
  ])

  const [openAdd, setOpenAdd] = useState(false)
  const [newShop, setNewShop] = useState<Shop>({
    name: "",
    owner: "",
    location: "",
    status: "pending",
    revenue: 0,
    rating: 0,
  })

  const [openServices, setOpenServices] = useState(false)

  const handleAddShop = () => {
    if (!newShop.name || !newShop.owner) return
    setShops([...shops, newShop])
    setNewShop({ name: "", owner: "", location: "", status: "pending", revenue: 0, rating: 0 })
    setOpenAdd(false)
  }

  const handleServiceAction = (id: number, action: "approved" | "rejected") => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, status: action } : s))
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Quản lý Studio</h2>
          <p className="text-gray-600 mt-1">
            Giám sát và quản lý tất cả studio trong hệ thống
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Lọc
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500"
            onClick={() => setOpenAdd(true)}
          >
            <Building2 className="h-4 w-4" />
            Thêm Studio
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => setOpenServices(true)}>
            <Shield className="h-4 w-4" />
            Duyệt dịch vụ
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Tổng Studio</p>
                <p className="text-3xl font-bold text-blue-900">{shops.length}</p>
              </div>
              <Store className="h-12 w-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Đang hoạt động</p>
                <p className="text-3xl font-bold text-green-900">
                  {shops.filter((s) => s.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Chờ duyệt</p>
                <p className="text-3xl font-bold text-yellow-900">
                  {shops.filter((s) => s.status === "pending").length}
                </p>
              </div>
              <AlertTriangle className="h-12 w-12 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Tạm khóa</p>
                <p className="text-3xl font-bold text-red-900">
                  {shops.filter((s) => s.status === "blocked").length}
                </p>
              </div>
              <Shield className="h-12 w-12 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shop Management Table */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Danh sách Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  <TableHead>Studio</TableHead>
                  <TableHead>Chủ sở hữu</TableHead>
                  <TableHead>Địa điểm</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Doanh thu</TableHead>
                  <TableHead>Đánh giá</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shops.map((shop, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <Store className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{shop.name}</p>
                          <p className="text-sm text-gray-500">Studio makeup & photo</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{shop.owner.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{shop.owner}</span>
                      </div>
                    </TableCell>
                    <TableCell>{shop.location}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          shop.status === "active"
                            ? "bg-green-100 text-green-800"
                            : shop.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {shop.status === "active"
                          ? "Hoạt động"
                          : shop.status === "pending"
                          ? "Chờ duyệt"
                          : "Tạm khóa"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {shop.revenue.toLocaleString("vi-VN")}đ
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{shop.rating}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog thêm studio */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm Studio mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Tên studio"
              value={newShop.name}
              onChange={(e) => setNewShop({ ...newShop, name: e.target.value })}
            />
            <Input
              placeholder="Chủ sở hữu"
              value={newShop.owner}
              onChange={(e) => setNewShop({ ...newShop, owner: e.target.value })}
            />
            <Input
              placeholder="Địa điểm"
              value={newShop.location}
              onChange={(e) => setNewShop({ ...newShop, location: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAdd(false)}>Hủy</Button>
            <Button onClick={handleAddShop}>Thêm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog duyệt dịch vụ */}
      <Dialog open={openServices} onOpenChange={setOpenServices}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Dịch vụ chờ duyệt</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {services.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between border rounded p-2"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.shop}</p>
                  <p className="text-xs text-gray-400">Trạng thái: {s.status}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-green-500 text-white"
                    onClick={() => handleServiceAction(s.id, "approved")}
                  >
                    Duyệt
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500 text-white"
                    onClick={() => handleServiceAction(s.id, "rejected")}
                  >
                    Từ chối
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
