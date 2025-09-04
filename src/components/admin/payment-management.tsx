"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Progress } from "../../components/ui/progress"
import {
  CreditCard,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Search,
  Filter,
  DollarSign,
  Building2,
  Calendar,
  Eye,
  RefreshCw,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"

interface Transaction {
  id: string
  studio: string
  customer: string
  amount: number
  commission: number
  status: "completed" | "pending" | "failed"
  date: string
  time: string
  method: string
  service: string
}

interface PayoutRequest {
  id: string
  studio: string
  amount: number
  requestDate: string
  status: "pending" | "approved" | "rejected"
  bankAccount: string
  bankName: string
}

export function PaymentManagement() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // States for Dialogs
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showViewTransactionDialog, setShowViewTransactionDialog] = useState(false)

  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null)
  const [showViewPayoutDialog, setShowViewPayoutDialog] = useState(false)
  const [showProcessPayoutDialog, setShowProcessPayoutDialog] = useState(false)
  
  const paymentStats = {
    totalRevenue: 125000000,
    pendingPayouts: 15000000,
    completedTransactions: 1250,
    failedTransactions: 23,
    monthlyGrowth: 22,
    commission: 12500000,
  }

  const recentTransactions: Transaction[] = [
    {
      id: "TXN001",
      studio: "Bella Studio",
      customer: "Nguyễn Thị Lan",
      amount: 2500000,
      commission: 250000,
      status: "completed",
      date: "2024-01-20",
      time: "14:30",
      method: "VNPay",
      service: "Makeup cô dâu",
    },
    {
      id: "TXN002",
      studio: "Glamour Makeup",
      customer: "Trần Văn Nam",
      amount: 5000000,
      commission: 500000,
      status: "pending",
      date: "2024-01-20",
      time: "10:15",
      method: "MoMo",
      service: "Chụp ảnh cưới",
    },
    {
      id: "TXN003",
      studio: "Royal Wedding",
      customer: "Lê Thị Hoa",
      amount: 1500000,
      commission: 150000,
      status: "failed",
      date: "2024-01-19",
      time: "16:45",
      method: "Banking",
      service: "Thuê váy cưới",
    },
    {
      id: "TXN004",
      studio: "Dream Studio",
      customer: "Phạm Minh Tuấn",
      amount: 3200000,
      commission: 320000,
      status: "completed",
      date: "2024-01-19",
      time: "09:20",
      method: "VNPay",
      service: "Makeup dự tiệc",
    },
  ]

  const payoutRequests: PayoutRequest[] = [
    {
      id: "PO001",
      studio: "Bella Studio",
      amount: 8500000,
      requestDate: "2024-01-20",
      status: "pending",
      bankAccount: "1234567890",
      bankName: "Vietcombank",
    },
    {
      id: "PO002",
      studio: "Glamour Makeup",
      amount: 6200000,
      requestDate: "2024-01-19",
      status: "approved",
      bankAccount: "0987654321",
      bankName: "BIDV",
    },
  ]

  const getStatusBadge = (status: string) => {
    const config = {
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Hoàn thành" },
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Đang xử lý" },
      failed: { color: "bg-red-100 text-red-800", icon: AlertCircle, label: "Thất bại" },
      approved: { color: "bg-blue-100 text-blue-800", icon: CheckCircle, label: "Đã duyệt" },
      rejected: { color: "bg-red-100 text-red-800", icon: X, label: "Đã từ chối" },
    }
    const { color, icon: Icon, label } = config[status as keyof typeof config]
    return (
      <Badge className={`${color} gap-1`}>
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    )
  }

  const filteredTransactions = recentTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.studio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Event handlers
  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setShowViewTransactionDialog(true)
  }

  const handleRetryTransaction = (transaction: Transaction) => {
    console.log(`Đang thử lại giao dịch thất bại: ${transaction.id}`)
    // Thêm logic API call để xử lý lại giao dịch tại đây
  }

  const handleViewPayout = (payout: PayoutRequest) => {
    setSelectedPayout(payout)
    setShowViewPayoutDialog(true)
  }

  const handleProcessPayout = (payout: PayoutRequest) => {
    setSelectedPayout(payout)
    setShowProcessPayoutDialog(true)
  }

  const handleConfirmProcessPayout = () => {
    console.log(`Đã duyệt yêu cầu rút tiền: ${selectedPayout?.id}`)
    // Thêm logic API call để xử lý duyệt yêu cầu rút tiền
    setShowProcessPayoutDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Quản lý Thanh toán</h2>
          <p className="text-gray-600 mt-1">Theo dõi giao dịch và hoa hồng trong hệ thống</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Xuất báo cáo
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500">
            <CreditCard className="h-4 w-4" />
            Xử lý thanh toán
          </Button>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-semibold uppercase tracking-wide">Tổng doanh thu</p>
                <p className="text-3xl font-bold text-green-900 mt-2">
                  {(paymentStats.totalRevenue / 1000000).toFixed(0)}M
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm font-medium">+{paymentStats.monthlyGrowth}% tháng này</span>
                </div>
              </div>
              <div className="bg-green-500 p-3 rounded-xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold uppercase tracking-wide">Hoa hồng</p>
                <p className="text-3xl font-bold text-blue-900 mt-2">
                  {(paymentStats.commission / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-blue-600 text-sm">10% tổng doanh thu</span>
                </div>
              </div>
              <div className="bg-blue-500 p-3 rounded-xl">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-semibold uppercase tracking-wide">Giao dịch</p>
                <p className="text-3xl font-bold text-purple-900 mt-2">{paymentStats.completedTransactions}</p>
                <div className="flex items-center mt-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 text-sm">Thành công</span>
                </div>
              </div>
              <div className="bg-purple-500 p-3 rounded-xl">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-700 text-sm font-semibold uppercase tracking-wide">Chờ rút tiền</p>
                <p className="text-3xl font-bold text-yellow-900 mt-2">
                  {(paymentStats.pendingPayouts / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-yellow-600 mr-1" />
                  <span className="text-yellow-600 text-sm">Cần xử lý</span>
                </div>
              </div>
              <div className="bg-yellow-500 p-3 rounded-xl">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="overview"
          className="text-black data-[state=active]:bg-amber-100 data-[state=active]:text-black"
          >Tổng quan</TabsTrigger>
          <TabsTrigger value="transactions"
          className="text-black data-[state=active]:bg-amber-100 data-[state=active]:text-black"
          >Giao dịch</TabsTrigger>
          <TabsTrigger value="payouts"
          className="text-black data-[state=active]:bg-amber-100 data-[state=active]:text-black"
          >Rút tiền</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Doanh thu theo tháng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Tháng 1", amount: 125000000, growth: 22 },
                    { month: "Tháng 12", amount: 102000000, growth: 15 },
                    { month: "Tháng 11", amount: 89000000, growth: 8 },
                    { month: "Tháng 10", amount: 82000000, growth: 12 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.month}</p>
                        <p className="text-sm text-gray-600">{(item.amount / 1000000).toFixed(0)}M VNĐ</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          +{item.growth}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { method: "VNPay", percentage: 45, amount: 56250000, color: "bg-blue-500" },
                    { method: "MoMo", percentage: 30, amount: 37500000, color: "bg-pink-500" },
                    { method: "Banking", percentage: 20, amount: 25000000, color: "bg-green-500" },
                    { method: "Khác", percentage: 5, amount: 6250000, color: "bg-gray-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.method}</span>
                        <span className="text-sm text-gray-600">{(item.amount / 1000000).toFixed(1)}M</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={item.percentage} className="flex-1 h-2" />
                        <span className="text-sm font-medium w-12">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Tìm kiếm theo studio, khách hàng, mã giao dịch..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="pending">Đang xử lý</SelectItem>
                    <SelectItem value="failed">Thất bại</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Danh sách Giao dịch
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="font-semibold">Mã GD</TableHead>
                      <TableHead className="font-semibold">Studio</TableHead>
                      <TableHead className="font-semibold">Khách hàng</TableHead>
                      <TableHead className="font-semibold">Dịch vụ</TableHead>
                      <TableHead className="font-semibold">Số tiền</TableHead>
                      <TableHead className="font-semibold">Hoa hồng</TableHead>
                      <TableHead className="font-semibold">Phương thức</TableHead>
                      <TableHead className="font-semibold">Trạng thái</TableHead>
                      <TableHead className="font-semibold">Thời gian</TableHead>
                      <TableHead className="font-semibold">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-50/50">
                        <TableCell>
                          <div className="font-mono font-semibold text-blue-600">{transaction.id}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                              <Building2 className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">{transaction.studio}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.customer}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {transaction.service}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-green-600">
                            {transaction.amount.toLocaleString("vi-VN")}đ
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-blue-600">
                            {transaction.commission.toLocaleString("vi-VN")}đ
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.method === "VNPay"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : transaction.method === "MoMo"
                                  ? "bg-pink-50 text-pink-700 border-pink-200"
                                  : "bg-green-50 text-green-700 border-green-200"
                            }
                          >
                            {transaction.method}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-gray-400" />
                            <div>
                              <div>{transaction.date}</div>
                              <div className="text-gray-500">{transaction.time}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewTransaction(transaction)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {transaction.status === "failed" && (
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleRetryTransaction(transaction)}>
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                Yêu cầu Rút tiền
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã yêu cầu</TableHead>
                    <TableHead>Studio</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Tài khoản</TableHead>
                    <TableHead>Ngân hàng</TableHead>
                    <TableHead>Ngày yêu cầu</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payoutRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono font-semibold text-blue-600">{request.id}</TableCell>
                      <TableCell className="font-medium">{request.studio}</TableCell>
                      <TableCell className="font-semibold text-green-600">
                        {request.amount.toLocaleString("vi-VN")}đ
                      </TableCell>
                      <TableCell className="font-mono">{request.bankAccount}</TableCell>
                      <TableCell>{request.bankName}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {request.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleProcessPayout(request)}>
                                Duyệt
                              </Button>
                              <Button variant="outline" size="sm">
                                Từ chối
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewPayout(request)}>
                            <Eye className="h-4 w-4" />
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

      {/* Dialog to view Transaction details */}
      <Dialog open={showViewTransactionDialog} onOpenChange={setShowViewTransactionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết giao dịch #{selectedTransaction?.id}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết của giao dịch.
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Studio</Label>
                <span className="col-span-3 font-semibold">{selectedTransaction.studio}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Khách hàng</Label>
                <span className="col-span-3">{selectedTransaction.customer}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Số tiền</Label>
                <span className="col-span-3 text-green-600 font-semibold">
                  {selectedTransaction.amount.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Hoa hồng</Label>
                <span className="col-span-3 text-blue-600 font-semibold">
                  {selectedTransaction.commission.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Thời gian</Label>
                <span className="col-span-3">{selectedTransaction.date} {selectedTransaction.time}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Trạng thái</Label>
                <div className="col-span-3">{getStatusBadge(selectedTransaction.status)}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Phương thức</Label>
                <span className="col-span-3">{selectedTransaction.method}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewTransactionDialog(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog to view Payout details */}
      <Dialog open={showViewPayoutDialog} onOpenChange={setShowViewPayoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết yêu cầu rút tiền #{selectedPayout?.id}</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết của yêu cầu rút tiền.
            </DialogDescription>
          </DialogHeader>
          {selectedPayout && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Studio</Label>
                <span className="col-span-3 font-semibold">{selectedPayout.studio}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Số tiền</Label>
                <span className="col-span-3 text-green-600 font-semibold">
                  {selectedPayout.amount.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Tài khoản</Label>
                <span className="col-span-3 font-mono">{selectedPayout.bankAccount}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Ngân hàng</Label>
                <span className="col-span-3">{selectedPayout.bankName}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Ngày yêu cầu</Label>
                <span className="col-span-3">{selectedPayout.requestDate}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Trạng thái</Label>
                <div className="col-span-3">{getStatusBadge(selectedPayout.status)}</div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setShowViewPayoutDialog(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog to process Payout */}
      <Dialog open={showProcessPayoutDialog} onOpenChange={setShowProcessPayoutDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận duyệt yêu cầu rút tiền</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn duyệt yêu cầu rút tiền #<span className="font-semibold">{selectedPayout?.id}</span> này không? Thao tác này sẽ chuyển tiền cho studio và không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProcessPayoutDialog(false)}>Hủy</Button>
            <Button variant="default" onClick={handleConfirmProcessPayout}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}