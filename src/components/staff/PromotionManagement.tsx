// src/components/PromotionManagement.tsx

"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Plus, Edit, Trash2, Upload, X } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../components/ui/alert-dialog"

const initialPromotions = [
  {
    id: "P001",
    title: "Giảm giá 20% - Tết 2024",
    code: "TET2024",
    discount: 20,
    description: "Giảm giá 20% cho tất cả dịch vụ chụp ảnh và makeup trong dịp Tết.",
    status: "active",
    image: "https://images.unsplash.com/photo-1542838118-243642d997a6?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "P002",
    title: "Miễn phí Váy cưới - Mùa hè",
    code: "SUMMERFREE",
    discount: 100,
    description: "Miễn phí thuê váy cưới trị giá 5 triệu đồng cho các gói chụp ảnh cưới mùa hè.",
    status: "inactive",
    image: "https://images.unsplash.com/photo-1587372778848-6a56a008c359?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "P003",
    title: "Giảm 50% - Black Friday",
    code: "BF50OFF",
    discount: 50,
    description: "Ưu đãi 50% cho tất cả dịch vụ trong ngày Black Friday.",
    status: "active",
    image: "https://images.unsplash.com/photo-1517726487042-f58c7343e5c9?q=80&w=1974&auto=format&fit=crop",
  },
]

export function PromotionManagement() {
  const [promotions, setPromotions] = useState(initialPromotions)
  const [newPromotion, setNewPromotion] = useState({
    title: "",
    code: "",
    discount: "",
    description: "",
    image: null as string | null,
  })
  const [editingPromotion, setEditingPromotion] = useState(null as any | null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isEditing) {
          setEditingPromotion({ ...editingPromotion, image: reader.result as string })
        } else {
          setNewPromotion({ ...newPromotion, image: reader.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (isEditing = false) => {
    if (isEditing) {
      setEditingPromotion({ ...editingPromotion, image: null })
    } else {
      setNewPromotion({ ...newPromotion, image: null })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddPromotion = () => {
    if (newPromotion.title && newPromotion.code && newPromotion.discount) {
      const promotionToAdd = {
        ...newPromotion,
        id: "P" + (promotions.length + 1).toString().padStart(3, '0'),
        discount: parseFloat(newPromotion.discount),
        status: "active",
        image: newPromotion.image || "https://via.placeholder.com/200",
      }
      setPromotions([...promotions, promotionToAdd])
      setNewPromotion({ title: "", code: "", discount: "", description: "", image: null })
    }
  }

  const handleUpdatePromotion = () => {
    if (editingPromotion) {
      setPromotions(promotions.map(p => p.id === editingPromotion.id ? { ...editingPromotion, discount: parseFloat(editingPromotion.discount) } : p))
      setEditingPromotion(null)
    }
  }

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id))
  }

  // Component Dialog dạng thanh trượt để tạo ưu đãi mới
  const AddPromotionDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" /> Tạo ưu đãi</Button>
      </DialogTrigger>
      <DialogContent className="fixed right-1/2 top-1/2 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 animate-slideInRight overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tạo ưu đãi mới</DialogTitle>
          <DialogDescription>Tạo chương trình ưu đãi cho khách hàng</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="promo-title">Tiêu đề ưu đãi</Label>
            <Input id="promo-title" placeholder="Nhập tiêu đề" value={newPromotion.title} onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="promo-code">Mã ưu đãi</Label>
            <Input id="promo-code" placeholder="Nhập mã" value={newPromotion.code} onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="promo-discount">Phần trăm giảm giá</Label>
            <Input id="promo-discount" type="number" placeholder="%" value={newPromotion.discount} onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="promo-description">Mô tả</Label>
            <Textarea id="promo-description" placeholder="Mô tả ưu đãi" value={newPromotion.description} onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="promo-image">Hình ảnh</Label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input ref={fileInputRef} id="promo-image" type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e)} />
              {newPromotion.image ? (
                <div className="relative group">
                  <img src={newPromotion.image} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                  <Button type="button" onClick={() => removeImage()} className="absolute top-2 right-2 rounded-full h-8 w-8 p-0 bg-white/70 hover:bg-white text-gray-800">
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
          <DialogClose asChild>
            <Button className="w-full" onClick={handleAddPromotion}>Tạo ưu đãi</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Component Dialog dạng thanh trượt để chỉnh sửa ưu đãi
  const EditPromotionDialog = ({ promotion }: { promotion: any }) => (
    <Dialog open={editingPromotion?.id === promotion.id} onOpenChange={(isOpen) => !isOpen && setEditingPromotion(null)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setEditingPromotion(promotion)}><Edit className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="fixed right-1/2 top-1/2 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 animate-slideInRight overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa ưu đãi</DialogTitle>
          <DialogDescription>Cập nhật thông tin ưu đãi</DialogDescription>
        </DialogHeader>
        {editingPromotion && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Tiêu đề ưu đãi</Label>
              <Input id="edit-title" value={editingPromotion.title} onChange={(e) => setEditingPromotion({ ...editingPromotion, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-code">Mã ưu đãi</Label>
              <Input id="edit-code" value={editingPromotion.code} onChange={(e) => setEditingPromotion({ ...editingPromotion, code: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-discount">Phần trăm giảm giá</Label>
              <Input id="edit-discount" type="number" value={editingPromotion.discount} onChange={(e) => setEditingPromotion({ ...editingPromotion, discount: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea id="edit-description" value={editingPromotion.description} onChange={(e) => setEditingPromotion({ ...editingPromotion, description: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-image">Hình ảnh</Label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <input ref={fileInputRef} id="edit-image" type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, true)} />
                {editingPromotion.image ? (
                  <div className="relative group">
                    <img src={editingPromotion.image} alt="Preview" className="w-full h-40 object-cover rounded-md" />
                    <Button type="button" onClick={() => removeImage(true)} className="absolute top-2 right-2 rounded-full h-8 w-8 p-0 bg-white/70 hover:bg-white text-gray-800">
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
              <Label htmlFor="edit-status">Trạng thái</Label>
              <Select
                value={editingPromotion.status}
                onValueChange={(value) => setEditingPromotion({ ...editingPromotion, status: value })}
              >
                <SelectTrigger id="edit-status">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Đang hoạt động</SelectItem>
                  <SelectItem value="inactive">Hết hạn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditingPromotion(null)}>Hủy</Button>
              <Button onClick={handleUpdatePromotion}>Cập nhật</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  const DeletePromotionAlert = ({ id }: { id: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm"><Trash2 className="h-4 w-4" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>Thao tác này sẽ xóa vĩnh viễn ưu đãi khỏi hệ thống.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeletePromotion(id)}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý ưu đãi</h2>
        <AddPromotionDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <Card key={promo.id} className="group overflow-hidden relative">
            <div className="h-48 w-full">
              <img src={promo.image || "https://via.placeholder.com/200"} alt={promo.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{promo.title}</CardTitle>
              <CardDescription className="flex justify-between items-center text-gray-500">
                Mã: <span className="font-semibold text-gray-900">{promo.code}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-600 mb-4">{promo.description}</p>
              <div className="flex justify-between items-center">
                <Badge variant={promo.status === "active" ? "default" : "secondary"}>{promo.status === "active" ? "Đang hoạt động" : "Hết hạn"}</Badge>
                <div className="flex gap-2">
                  <EditPromotionDialog promotion={promo} />
                  <DeletePromotionAlert id={promo.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}