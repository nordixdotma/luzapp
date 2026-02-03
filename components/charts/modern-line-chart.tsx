"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export interface ModernLineChartProps {
  data: {
    day: string
    users: number
  }[]
  title?: string
  description?: string
  trendPercentage?: number
}

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function ModernLineChart({
  data,
  title = "User Growth",
  description = "Daily new user registrations",
  trendPercentage = 18,
}: ModernLineChartProps) {
  return (
    <Card className="border-black/10 bg-white h-full overflow-hidden">
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-xs">
            {description}
          </CardDescription>
        </div>
        <div className="flex items-center gap-1.5 font-bold text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full shrink-0">
          Up by {trendPercentage}% <TrendingUp className="h-3 w-3" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-users)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/40" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={10}
              stroke="#737373"
            />
             <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={10}
                stroke="#737373"
                width={35}
             />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="users"
              type="natural"
              fill="url(#fillUsers)"
              fillOpacity={0.4}
              stroke="var(--color-users)"
              strokeWidth={2}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
