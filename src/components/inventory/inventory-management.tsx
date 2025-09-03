"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Plus, Search, AlertTriangle, Package, Edit, Trash2 } from "lucide-react"

interface InventoryItem {
  id: number
  name: string
  category: string
  quantity: number
  minStock: number
  price: number
  supplier: string
  lastUpdated: string
  status: "in_stock" | "low_stock" | "out_of_stock"
}

const inventoryItems: InventoryItem[] = [
  {
    id: 1,
    name: "Foundation Dior",
    category: "Makeup",
    quantity: 15,
    minStock: 5,
    price: 1200000,
    supplier: "Beauty Supply Co.",
    lastUpdated: "2024-01-15",
    status: "in_stock",
  },
  {
    id: 2,
    name: "Váy cưới Princess",
    category: "Trang phục",
    quantity: 3,
    minStock: 2,
    price: 15000000,
    supplier: "Wedding Dress Ltd.",
    lastUpdated: "2024-01-14",
    status: "low_stock",
  },
  {
    id: 3,
    name: "Máy ảnh Canon 5D",
    category: "Thiết bị",
    quantity: 0,
    minStock: 1,
    price: 45000000,
    supplier: "Camera Store",
    lastUpdated: "2024-01-13",
    status: "out_of_stock",
  },
  {
    id: 4,
    name: "Phụ kiện tóc",
    category: "Phụ kiện",
    quantity: 25,
    minStock: 10,
    price: 500000,
    supplier: "Hair Accessories Inc.",
    lastUpdated: "2024-01-15",
    status: "in_stock",
  },
]

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_stock":
        return <Badge variant="default">Còn hàng</Badge>
      case "low_stock":
        return <Badge variant="secondary">Sắp hết</Badge>
      case "out_of_stock":
        return <Badge variant="destructive">Hết hàng</Badge>
      default:
        return <Badge variant="outline">Không xác định</Badge>
    }
  }

  const lowStockItems = inventoryItems.filter((item) => item.status === "low_stock" || item.status === "out_of_stock")

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Cảnh báo tồn kho
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-3">Có {lowStockItems.length} sản phẩm cần bổ sung tồn kho:</p>
            <div className="flex flex-wrap gap-2">
              {lowStockItems.map((item) => (
                <Badge key={item.id} variant="outline" className="text-orange-700 border-orange-300">
                  {item.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Makeup">Makeup</SelectItem>
              <SelectItem value="Trang phục">Trang phục</SelectItem>
              <SelectItem value="Thiết bị">Thiết bị</SelectItem>
              <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product-name">Tên sản phẩm</Label>
                <Input id="product-name" placeholder="Nhập tên sản phẩm" />
              </div>
              <div>
                <Label htmlFor="category">Danh mục</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="makeup">Makeup</SelectItem>
                    <SelectItem value="clothing">Trang phục</SelectItem>
                    <SelectItem value="equipment">Thiết bị</SelectItem>
                    <SelectItem value="accessories">Phụ kiện</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Số lượng</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="min-stock">Tồn kho tối thiểu</Label>
                  <Input id="min-stock" type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <Label htmlFor="price">Giá</Label>
                <Input id="price" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="supplier">Nhà cung cấp</Label>
                <Input id="supplier" placeholder="Tên nhà cung cấp" />
              </div>
              <Button className="w-full">Thêm sản phẩm</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Danh sách tồn kho
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Tồn kho tối thiểu</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Nhà cung cấp</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span className={item.quantity <= item.minStock ? "text-red-600 font-medium" : ""}>
                      {item.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{item.minStock}</TableCell>
                  <TableCell>{item.price.toLocaleString("vi-VN")}đ</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
