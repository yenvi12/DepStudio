import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#C1B6A3] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#B3907A] text-white hover:bg-[#A97C65]",
        secondary: "border-transparent bg-[#EFE7DA] text-[#6F5D4F] hover:bg-[#E1DACA]",
        destructive: "border-transparent bg-[#B3625B] text-white hover:bg-[#9F4E48]",
        outline: "bg-transparent text-[#6F5D4F] border-[#C1B6A3]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
