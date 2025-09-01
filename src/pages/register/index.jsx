import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Mail, Lock, User, Phone, Camera, Check } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()

  const passwordRequirements = [
    { text: "Ít nhất 8 ký tự", met: formData.password.length >= 8 },
    { text: "Có chữ hoa", met: /[A-Z]/.test(formData.password) },
    { text: "Có chữ thường", met: /[a-z]/.test(formData.password) },
    { text: "Có số", met: /\d/.test(formData.password) },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        setError("Vui lòng điền đầy đủ thông tin")
        return
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError("Email không hợp lệ")
        return
      }
      if (!/^[0-9]{10}$/.test(formData.phone)) {
        setError("Số điện thoại không hợp lệ")
        return
      }
    }
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      return
    }
    if (!passwordRequirements.every((req) => req.met)) {
      setError("Mật khẩu không đáp ứng yêu cầu")
      return
    }
    if (!formData.agreeTerms) {
      setError("Vui lòng đồng ý với điều khoản sử dụng")
      return
    }

    try {
      await register(formData)
      navigate("/")
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.")
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex items-center justify-center p-4 pt-20">
        <Card className="w-full max-w-md glass-card border-white/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-button rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold gradient-text">Đăng ký</CardTitle>
            <CardDescription className="text-white/70">Tạo tài khoản DepStudio mới</CardDescription>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Bước {step}/2</span>
                <span>{step === 1 ? "Thông tin cơ bản" : "Bảo mật"}</span>
              </div>
              <Progress value={step * 50} className="h-2" />
            </div>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={
                step === 2
                  ? handleSubmit
                  : (e) => {
                      e.preventDefault()
                      handleNextStep()
                    }
              }
              className="space-y-4"
            >
              {error && (
                <Alert className="bg-red-500/20 border-red-500/30 text-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Họ và tên
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Số điện thoại
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0901234567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-button hover:opacity-90">
                    Tiếp tục
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Mật khẩu
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-white/50 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white text-sm">Yêu cầu mật khẩu:</Label>
                    <div className="space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Check className={`h-3 w-3 ${req.met ? "text-green-400" : "text-white/30"}`} />
                          <span className={req.met ? "text-green-400" : "text-white/70"}>{req.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Xác nhận mật khẩu
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-white/50 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 h-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="agreeTerms"
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => handleInputChange("agreeTerms", e.target.checked)}
                      className="rounded border-white/20 bg-white/10"
                    />
                    <Label htmlFor="agreeTerms" className="text-sm text-white/70">
                      Tôi đồng ý với{" "}
                      <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                        điều khoản sử dụng
                      </Link>{" "}
                      và{" "}
                      <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                        chính sách bảo mật
                      </Link>
                    </Label>
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => setStep(1)}
                    >
                      Quay lại
                    </Button>
                    <Button type="submit" className="flex-1 bg-gradient-button hover:opacity-90" disabled={isLoading}>
                      {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                  </div>
                </>
              )}
            </form>

            {step === 1 && (
              <>
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-transparent px-2 text-white/70">Hoặc đăng ký với</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Google
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      Facebook
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="text-white/70">Đã có tài khoản? </span>
                  <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                    Đăng nhập ngay
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
