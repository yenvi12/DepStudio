"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { month: "T1", revenue: 12000000 },
  { month: "T2", revenue: 15000000 },
  { month: "T3", revenue: 18000000 },
  { month: "T4", revenue: 22000000 },
  { month: "T5", revenue: 25000000 },
  { month: "T6", revenue: 28000000 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          formatter={(value) => [
            `${Number(value).toLocaleString("vi-VN")}đ`,
            "Doanh thu",
          ]}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
