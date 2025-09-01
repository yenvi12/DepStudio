"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

// Màu sắc theo hệ màu be–nâu của bạn
const COLORS = {
  bg: "bg-[#EFE7DA]",
  border: "border-[#C1B6A3]",
  text: "text-[#6F5D4F]",
  accent: "bg-[#B3907A] text-white hover:bg-[#a17f6f]",
  offHover: "hover:bg-[#e1daca] hover:text-[#6F5D4F]",
}

const toggleVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2",
  {
    variants: {
      variant: {
        default: `${COLORS.bg} ${COLORS.text} ${COLORS.offHover} data-[state=on]:${COLORS.accent}`,
        outline: `border ${COLORS.border} bg-transparent ${COLORS.offHover} data-[state=on]:${COLORS.accent}`,
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2.5 min-w-9",
        lg: "h-11 px-5 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
