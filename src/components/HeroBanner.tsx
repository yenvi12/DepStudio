"use client"
import { Link } from "react-router-dom"

import { useAuth } from "../contexts/auth-context"
import { Button } from "../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Camera, Palette, Shirt, ChevronDown, Bell, User, Settings, LogOut, Heart, Calendar } from "lucide-react"

export function HeroBanner() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-md bg-white">
              <img
                src="/0a8d19ed-3e0f-44a7-b2c3-bed316cbafe5-removebg-preview.png"
                alt="DepStudio Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <span
              className="text-[40px] md:text-[30px] font-bold gradient-text leading-none"
              style={{ fontFamily: "Simplesnails" }}
            >
              DepStudio
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-white/80 transition-colors">
              Trang chủ
            </Link>

            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-white hover:text-white/80 transition-colors">
                <span>Dịch vụ</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 glass-card border-white/20">
                <DropdownMenuItem asChild>
                  <Link to="/studios" className="flex items-center space-x-2 text-white">
                    <Camera className="w-4 h-4" />
                    <span>Studio chụp ảnh</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/makeup" className="flex items-center space-x-2 text-white">
                    <Palette className="w-4 h-4" />
                    <span>Makeup & Trang điểm</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rental" className="flex items-center space-x-2 text-white">
                    <Shirt className="w-4 h-4" />
                    <span>Thuê trang phục</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/promotions" className="text-white hover:text-white/80 transition-colors">
              Ưu đãi
            </Link>
            <Link to="/news" className="text-white hover:text-white/80 transition-colors">
              Tin tức
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Bell className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-white">{user.name}</div>
                      <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500">
                        {user.membershipLevel}
                      </Badge>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-card border-white/20">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center space-x-2 text-white">
                        <User className="w-4 h-4" />
                        <span>Hồ sơ cá nhân</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/bookings" className="flex items-center space-x-2 text-white">
                        <Calendar className="w-4 h-4" />
                        <span>Lịch đã đặt</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites" className="flex items-center space-x-2 text-white">
                        <Heart className="w-4 h-4" />
                        <span>Yêu thích</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center space-x-2 text-white">
                        <Settings className="w-4 h-4" />
                        <span>Cài đặt</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center space-x-2 text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <Button className="bg-gradient-button hover:opacity-90" asChild>
                  <Link to="/register">Đăng ký</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
