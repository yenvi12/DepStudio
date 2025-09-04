// src/components/ServiceManagement.tsx

"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Plus, Eye, Edit, Trash2, Camera, Upload, X } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../components/ui/alert-dialog"

// Mock data ban đầu cho danh sách dịch vụ
const initialServices = [
  {
    id: "SV001",
    name: "Chụp ảnh cưới",
    price: 5000000,
    bookings: 120,
    status: "active",
    type: "Chụp ảnh",
    description: "Gói chụp ảnh cưới ngoại cảnh và tại studio chuyên nghiệp.",
    image: "https://images.unsplash.com/photo-1544158428-f68285519889?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "SV002",
    name: "Makeup cô dâu",
    price: 1500000,
    bookings: 85,
    status: "active",
    type: "Makeup",
    description: "Trang điểm cô dâu theo phong cách tự nhiên, Hàn Quốc hoặc phương Tây.",
    image: "https://images.unsplash.com/photo-1522337626463-548c263595cc?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "SV003",
    name: "Thuê váy cưới",
    price: 3000000,
    bookings: 45,
    status: "inactive",
    type: "Trang phục",
    description: "Cho thuê các mẫu váy cưới thiết kế cao cấp, đa dạng phong cách.",
    image: "https://images.unsplash.com/photo-1588267205479-7a0e3c09b8b0?q=80&w=1974&auto=format&fit=crop",
  },
]

export function ServiceManagement() {
  const [services, setServices] = useState(initialServices)
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    image: null as string | null, // Cập nhật kiểu dữ liệu để hỗ trợ upload
    file: null as File | null,
  })
  const [editingService, setEditingService] = useState(null as any | null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hàm xử lý việc tải ảnh lên
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (editingService) {
          setEditingService({ ...editingService, image: reader.result as string, file })
        } else {
          setNewService({ ...newService, image: reader.result as string, file })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Hàm xóa ảnh đã chọn
  const removeImage = () => {
    if (editingService) {
      setEditingService({ ...editingService, image: null, file: null })
    } else {
      setNewService({ ...newService, image: null, file: null })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Hàm xử lý việc thêm dịch vụ mới
  const handleAddService = () => {
    if (newService.name && newService.price && newService.type) {
      const serviceToAdd = {
        ...newService,
        id: "SV" + (services.length + 1).toString().padStart(3, '0'),
        price: parseFloat(newService.price),
        bookings: 0,
        status: "active",
        image: newService.image || "https://via.placeholder.com/150",
      }
      setServices([...services, serviceToAdd])
      // Reset form
      setNewService({ name: "", price: "", type: "", description: "", image: null, file: null })
    }
  }

  // Hàm xử lý việc chỉnh sửa dịch vụ
  const handleUpdateService = () => {
    if (editingService) {
      setServices(services.map(sv => sv.id === editingService.id ? { ...editingService, price: parseFloat(editingService.price) } : sv))
      setEditingService(null) // Đóng dialog
    }
  }

  // Hàm xử lý việc xóa dịch vụ
  const handleDeleteService = (id: string) => {
    setServices(services.filter(sv => sv.id !== id))
  }

  // Component Dialog để thêm dịch vụ mới
  const AddServiceDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Thêm dịch vụ
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm dịch vụ mới</DialogTitle>
          <DialogDescription>Tạo dịch vụ mới cho studio của bạn</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="service-name">Tên dịch vụ</Label>
            <Input id="service-name" placeholder="Nhập tên dịch vụ" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="service-price">Giá dịch vụ</Label>
            <Input id="service-price" type="number" placeholder="Nhập giá" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="service-type">Loại dịch vụ</Label>
            <Select value={newService.type} onValueChange={(value) => setNewService({ ...newService, type: value })}>
              <SelectTrigger id="service-type"><SelectValue placeholder="Chọn loại dịch vụ" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Chụp ảnh">Chụp ảnh</SelectItem>
                <SelectItem value="Makeup">Makeup</SelectItem>
                <SelectItem value="Trang phục">Trang phục</SelectItem>
                <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="service-image">Hình ảnh</Label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input ref={fileInputRef} id="service-image" type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
              {newService.image ? (
                <div className="relative group">
                  <img src={newService.image} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                  <Button type="button" onClick={removeImage} className="absolute top-2 right-2 rounded-full h-8 w-8 p-0 bg-white/70 hover:bg-white text-gray-800">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-8 h-8 mb-2" />
                  <span>Kéo & thả hoặc click để tải ảnh lên</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="service-description">Mô tả</Label>
            <Textarea id="service-description" placeholder="Mô tả chi tiết về dịch vụ..." value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
          </div>
          <DialogClose asChild>
            <Button className="w-full" onClick={handleAddService}>Tạo dịch vụ</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Component Dialog để xem chi tiết dịch vụ
  const ViewServiceDialog = ({ service }: { service: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chi tiết dịch vụ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img src={service.image} alt={service.name} className="w-full h-64 object-cover rounded-lg" />
          <div>
            <h3 className="text-xl font-bold">{service.name}</h3>
            <p className="text-sm text-gray-500">{service.type}</p>
          </div>
          <p className="text-2xl font-semibold text-blue-600">{service.price.toLocaleString("vi-VN")}đ</p>
          <p className="text-gray-700">{service.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Số lượt đặt: {service.bookings}</span>
            <span>Trạng thái: <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status === "active" ? "Hoạt động" : "Ngừng hoạt động"}</Badge></span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Component Dialog để chỉnh sửa dịch vụ
  const EditServiceDialog = ({ service }: { service: any }) => (
    <Dialog open={editingService?.id === service.id} onOpenChange={(isOpen) => !isOpen && setEditingService(null)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setEditingService(service)}><Edit className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa dịch vụ</DialogTitle>
          <DialogDescription>Cập nhật thông tin dịch vụ của bạn</DialogDescription>
        </DialogHeader>
        {editingService && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Tên dịch vụ</Label>
              <Input id="edit-name" value={editingService.name} onChange={(e) => setEditingService({ ...editingService, name: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-price">Giá dịch vụ</Label>
              <Input id="edit-price" type="number" value={editingService.price} onChange={(e) => setEditingService({ ...editingService, price: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-type">Loại dịch vụ</Label>
              <Select value={editingService.type} onValueChange={(value) => setEditingService({ ...editingService, type: value })}>
                <SelectTrigger id="edit-type"><SelectValue placeholder="Chọn loại dịch vụ" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chụp ảnh">Chụp ảnh</SelectItem>
                  <SelectItem value="Makeup">Makeup</SelectItem>
                  <SelectItem value="Trang phục">Trang phục</SelectItem>
                  <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-image">Hình ảnh</Label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <input ref={fileInputRef} id="edit-image" type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                {editingService.image ? (
                  <div className="relative group">
                    <img src={editingService.image} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                    <Button type="button" onClick={removeImage} className="absolute top-2 right-2 rounded-full h-8 w-8 p-0 bg-white/70 hover:bg-white text-gray-800">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <Upload className="w-8 h-8 mb-2" />
                    <span>Kéo & thả hoặc click để tải ảnh lên</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea id="edit-description" value={editingService.description} onChange={(e) => setEditingService({ ...editingService, description: e.target.value })} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditingService(null)}>Hủy</Button>
              <Button onClick={handleUpdateService}>Cập nhật</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  // Component Alert Dialog để xác nhận xóa
  const DeleteServiceAlert = ({ id }: { id: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>Thao tác này sẽ xóa vĩnh viễn dịch vụ khỏi hệ thống.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteService(id)}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý dịch vụ</h2>
        <AddServiceDialog />
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên dịch vụ</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Số lượng đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((sv) => (
                <TableRow key={sv.id}>
                  <TableCell>
                    <img src={sv.image} alt={sv.name} className="w-16 h-16 object-cover rounded-md" />
                  </TableCell>
                  <TableCell className="font-medium">{sv.name}</TableCell>
                  <TableCell>{sv.type}</TableCell>
                  <TableCell>{sv.price.toLocaleString("vi-VN")}đ</TableCell>
                  <TableCell>{sv.bookings}</TableCell>
                  <TableCell>
                    <Badge variant={sv.status === "active" ? "default" : "secondary"}>
                      {sv.status === "active" ? "Hoạt động" : "Ngừng hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ViewServiceDialog service={sv} />
                      <EditServiceDialog service={sv} />
                      <DeleteServiceAlert id={sv.id} />
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