"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const COLORS = {
  background: "bg-[#EFE7DA]",
  foreground: "text-[#6F5D4F]",
  border: "border-[#C1B6A3]",
  shadow: "shadow-lg",
  muted: "bg-[#E1DACA] text-[#6F5D4F]",
  primary: "bg-[#B3907A] text-white",
}

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]} // "light" | "dark" | "system"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `group toast ${COLORS.background} ${COLORS.foreground} ${COLORS.border} ${COLORS.shadow}`,
          description: "group-[.toast]:text-[#6F5D4F]",
          actionButton: COLORS.primary,
          cancelButton: COLORS.muted,
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
