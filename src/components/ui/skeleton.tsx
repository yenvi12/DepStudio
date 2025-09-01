import { cn } from "../../lib/utils"

const COLORS = {
  muted: "bg-[#EFE7DA]", // thay đổi nếu bạn có mã màu khác
}

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md", COLORS.muted, className)}
      {...props}
    />
  )
}

export { Skeleton }
