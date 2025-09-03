"use client"
import { useEffect, useState } from "react";
import { useHydration } from "../hooks/useHydration";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Camera, Palette, Shirt } from "lucide-react";
import { Link } from "react-router-dom";

const imageUrls = [
  "/duthuyen.jpg",
  "/vay-cuoi-cong-chua-hoang-gia-5.png",
  "/covua.jpg",
  "/sinhnhat.jpg",
  "/tao-dang-chup-anh-voi-hoa-co-phu-kien-9.webp",
  "/bi-quyet-chup-anh-01-01-01-01-01-01-01-1280x720.jpg"
];

export default function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isHydrated = useHydration();

  useEffect(() => {
    if (isHydrated) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isHydrated]);

  return (
    <section
      className="relative h-[90vh] w-full bg-cover bg-center transition-all duration-1000"
      style={{ 
        backgroundImage: isHydrated ? `url(${imageUrls[currentImageIndex]})` : `url(${imageUrls[0]})` 
      }}
    >
      {/* Overlay để text nổi hơn trên ảnh */}
      <div className="absolute inset-0 bg-[#EFE7DA]/20 z-0" />

      {/* Nội dung */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-screen-xl w-full text-center">
          <h1
            className="text-[clamp(24px,5vw,72px)] font-semibold mb-6 text-[#3C2C1E]
              drop-shadow-[0_6px_8px_rgba(0,0,0,0.25)]
              transition-all duration-300 ease-in-out
              hover:scale-[1.02] hover:-translate-y-1"
            style={{ fontFamily: 'TQ-Kingston' }}
          >
            Kết nối bạn <br className="block md:hidden" />
            với những dịch vụ tốt nhất<br className="hidden md:block" />
          </h1>

          <p
            className="text-[clamp(18px,4vw,32px)] font-medium text-[#3C2C1E]/90
              max-w-[90%] md:max-w-[800px] mx-auto text-center leading-snug
              drop-shadow-[0_3px_6px_rgba(0,0,0,0.2)]
              transition-all duration-300 ease-in-out
              hover:scale-[1.01] hover:-translate-y-0.5"
            style={{ fontFamily: 'Simplesnails' }}
          >
            Studio chụp ảnh, makeup artist và thuê trang phục chuyên nghiệp <br className="hidden md:inline" />
            cho mọi sự kiện đặc biệt của bạn
          </p>

          <div className="max-w-2xl mx-auto bg-[#F5F5EB] rounded-lg p-2 flex items-center shadow">
            <Input
              placeholder="Tìm kiếm dịch vụ, địa điểm..."
              className="border-0 focus-visible:ring-0 bg-transparent text-[#6F5D4F] placeholder:text-[#6F5D4F]/50 w-full"
            />
            <Button className="ml-2 bg-[#B3907A] text-white hover:bg-[#A67B63]">
              <Search className="w-4 h-4 mr-2" />
              Tìm kiếm
            </Button>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              className="bg-[#F5F5EB] border border-[#C1B6A3] text-[#6F5D4F] hover:bg-[#E1DACA]"
              asChild
            >
              <Link to="/studios">
                <Camera className="w-4 h-4 mr-2" />
                Studio
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-[#F5F5EB] border border-[#C1B6A3] text-[#6F5D4F] hover:bg-[#E1DACA]"
              asChild
            >
              <Link to="/makeup">
                <Palette className="w-4 h-4 mr-2" />
                Makeup
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-[#F5F5EB] border border-[#C1B6A3] text-[#6F5D4F] hover:bg-[#E1DACA]"
              asChild
            >
              <Link to="/rental">
                <Shirt className="w-4 h-4 mr-2" />
                Thuê đồ
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}