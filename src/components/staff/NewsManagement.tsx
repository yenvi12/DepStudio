// src/components/NewsManagement.tsx

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
import { Plus, Edit, Trash2, Upload, X, Eye } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../components/ui/alert-dialog"

// Mock data ban đầu cho danh sách tin tức
const initialNews = [
  {
    id: "N001",
    title: "Khai trương chi nhánh mới",
    content: "Bella Studio vui mừng thông báo khai trương chi nhánh thứ 3 tại quận 7, TP.HCM. Chi nhánh mới được trang bị những thiết bị hiện đại nhất...",
    category: "Sự kiện",
    date: "15/01/2024",
    status: "published",
    image: "https://images.unsplash.com/photo-1517486804595-c2692209d189?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "N002",
    title: "Ưu đãi đặc biệt: Giảm 30% gói chụp ảnh cưới",
    content: "Chào đón mùa cưới, Bella Studio dành tặng quý khách hàng ưu đãi 30% cho gói chụp ảnh cưới. Chương trình áp dụng đến hết tháng 3...",
    category: "Khuyến mãi",
    date: "10/01/2024",
    status: "draft",
    image: "https://images.unsplash.com/photo-1518712798226-c220f18d7f25?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: "N003",
    title: "Ra mắt dịch vụ trang điểm cô dâu kiểu Hàn Quốc",
    content: "Đáp ứng xu hướng làm đẹp mới, chúng tôi chính thức ra mắt dịch vụ makeup cô dâu phong cách Hàn Quốc, nhẹ nhàng và tự nhiên...",
    category: "Dịch vụ mới",
    date: "05/01/2024",
    status: "published",
    image: "https://images.unsplash.com/photo-1549721752-972109437d04?q=80&w=1974&auto=format&fit=crop",
  },
]

export function NewsManagement() {
  const [news, setNews] = useState(initialNews)
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    category: "",
    image: null as string | null,
  })
  const [editingArticle, setEditingArticle] = useState(null as any | null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Hàm xử lý tải ảnh lên
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isEditing) {
          setEditingArticle({ ...editingArticle, image: reader.result as string })
        } else {
          setNewArticle({ ...newArticle, image: reader.result as string })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Hàm xóa ảnh đã chọn
  const removeImage = (isEditing = false) => {
    if (isEditing) {
      setEditingArticle({ ...editingArticle, image: null })
    } else {
      setNewArticle({ ...newArticle, image: null })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Hàm xử lý việc thêm tin tức mới
  const handleAddNews = () => {
    if (newArticle.title && newArticle.content && newArticle.category) {
      const articleToAdd = {
        ...newArticle,
        id: "N" + (news.length + 1).toString().padStart(3, '0'),
        date: new Date().toLocaleDateString("vi-VN"),
        status: "published",
        image: newArticle.image || "https://via.placeholder.com/400",
      }
      setNews([...news, articleToAdd])
      setNewArticle({ title: "", content: "", category: "", image: null })
    }
  }

  // Hàm xử lý việc chỉnh sửa tin tức
  const handleUpdateNews = () => {
    if (editingArticle) {
      setNews(news.map(n => n.id === editingArticle.id ? editingArticle : n))
      setEditingArticle(null)
    }
  }

  // Hàm xử lý việc xóa tin tức
  const handleDeleteNews = (id: string) => {
    setNews(news.filter(n => n.id !== id))
  }

  // Component Dialog dạng thanh trượt để thêm tin tức mới
  const AddNewsDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus className="mr-2 h-4 w-4" /> Thêm tin tức</Button>
      </DialogTrigger>
      <DialogContent className="fixed right-1/2 top-1/2 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 animate-slideInRight overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Thêm tin tức mới</DialogTitle>
          <DialogDescription>Tạo bài viết tin tức cho khách hàng</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="news-title">Tiêu đề</Label>
            <Input id="news-title" placeholder="Nhập tiêu đề tin tức" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="news-content">Nội dung</Label>
            <Textarea id="news-content" placeholder="Nội dung tin tức" className="min-h-32" value={newArticle.content} onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="news-category">Danh mục</Label>
            <Select value={newArticle.category} onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}>
              <SelectTrigger id="news-category"><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Khuyến mãi">Khuyến mãi</SelectItem>
                <SelectItem value="Dịch vụ mới">Dịch vụ mới</SelectItem>
                <SelectItem value="Sự kiện">Sự kiện</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="news-image">Hình ảnh</Label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input ref={fileInputRef} id="news-image" type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e)} />
              {newArticle.image ? (
                <div className="relative group">
                  <img src={newArticle.image} alt="Preview" className="w-full h-40 object-cover rounded-md" />
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
            <Button className="w-full" onClick={handleAddNews}>Đăng tin tức</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Component Dialog để xem chi tiết tin tức
  const ViewNewsDialog = ({ article }: { article: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-10"><Eye className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{article.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <span>{article.date}</span>
            <Badge>{article.category}</Badge>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <img src={article.image} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-lg" />
          <p className="whitespace-pre-wrap text-gray-700">{article.content}</p>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Component Dialog để chỉnh sửa tin tức
  const EditNewsDialog = ({ article }: { article: any }) => (
    <Dialog open={editingArticle?.id === article.id} onOpenChange={(isOpen) => !isOpen && setEditingArticle(null)}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setEditingArticle(article)}><Edit className="h-4 w-4" /></Button>
      </DialogTrigger>
      <DialogContent className="fixed right-1/2 top-1/2 h-full w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 animate-slideInRight overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa tin tức</DialogTitle>
          <DialogDescription>Cập nhật bài viết tin tức</DialogDescription>
        </DialogHeader>
        {editingArticle && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Tiêu đề</Label>
              <Input id="edit-title" value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-content">Nội dung</Label>
              <Textarea id="edit-content" className="min-h-32" value={editingArticle.content} onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="edit-category">Danh mục</Label>
              <Select value={editingArticle.category} onValueChange={(value) => setEditingArticle({ ...editingArticle, category: value })}>
                <SelectTrigger id="edit-category"><SelectValue placeholder="Chọn danh mục" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Khuyến mãi">Khuyến mãi</SelectItem>
                  <SelectItem value="Dịch vụ mới">Dịch vụ mới</SelectItem>
                  <SelectItem value="Sự kiện">Sự kiện</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-image">Hình ảnh</Label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
                <input ref={fileInputRef} id="edit-image" type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, true)} />
                {editingArticle.image ? (
                  <div className="relative group">
                    <img src={editingArticle.image} alt="Preview" className="w-full h-40 object-cover rounded-md" />
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
              <Select value={editingArticle.status} onValueChange={(value) => setEditingArticle({ ...editingArticle, status: value })}>
                <SelectTrigger id="edit-status"><SelectValue placeholder="Chọn trạng thái" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Đã đăng</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setEditingArticle(null)}>Hủy</Button>
              <Button onClick={handleUpdateNews}>Cập nhật</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  // Component Alert Dialog để xác nhận xóa
  const DeleteNewsAlert = ({ id }: { id: string }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-10"><Trash2 className="h-4 w-4" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn muốn xóa?</AlertDialogTitle>
          <AlertDialogDescription>Thao tác này sẽ xóa vĩnh viễn bài viết khỏi hệ thống.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteNews(id)}>Xóa</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý tin tức</h2>
        <AddNewsDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article) => (
          <Card key={article.id} className="overflow-hidden">
            <div className="h-48 w-full">
              <img src={article.image || "https://via.placeholder.com/400"} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{article.title}</CardTitle>
              <CardDescription className="flex justify-between items-center">
                <span>{article.date}</span>
                <Badge>{article.category}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.content}</p>
              <div className="flex justify-between items-center">
                <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status === "published" ? "Đã đăng" : "Bản nháp"}</Badge>
                <div className="flex gap-2">
                  <ViewNewsDialog article={article} />
                  <EditNewsDialog article={article} />
                  <DeleteNewsAlert id={article.id} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}