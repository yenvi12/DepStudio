import * as React from "react"

import { cn } from "../../lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const COLORS = {
  border: "border-[#C1B6A3]",
  background: "bg-[#EFE7DA]",
  text: "text-[#6F5D4F]",
  placeholder: "placeholder:text-[#B3907A]",
  focus: "focus-visible:ring-[#B3907A]",
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm ring-offset-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          COLORS.border,
          COLORS.background,
          COLORS.text,
          COLORS.placeholder,
          COLORS.focus,
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
