"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "../../lib/utils"
import { buttonVariants } from "../../components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center text-[#6F5D4F]",
        caption_label: "text-base font-medium text-[#6F5D4F]",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 text-[#6F5D4F] hover:bg-[#EFE7DA] hover:text-[#B3907A]"
        ),
        nav_button_previous: "absolute left-1 text-[#6F5D4F]",
        nav_button_next: "absolute right-1 text-[#6F5D4F]",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-[#6F5D4F] w-9 h-9 text-xs font-normal text-center",
        row: "flex w-full mt-1",
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative",
          "focus-within:relative focus-within:z-20"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal rounded-md transition-colors",
          "text-[#6F5D4F] hover:bg-[#EFE7DA] hover:text-[#B3907A]"
        ),
        day_selected:
          "bg-[#B3907A] text-white hover:bg-[#A97C65] hover:text-white rounded-md",
        day_today:
          "border border-[#C1B6A3] text-[#6F5D4F] rounded-md",
        day_outside:
          "text-[#6F5D4F] opacity-30",
        day_disabled: "text-[#6F5D4F] opacity-40",
        day_range_middle: "bg-[#F5F5EB] text-[#6F5D4F]",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
