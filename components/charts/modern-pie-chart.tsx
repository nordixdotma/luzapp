"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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

export interface ModernPieChartProps {
  data: {
    category: string
    value: number
    fill: string
  }[]
  totalValue: number
  title?: string
  description?: string
}

export function ModernPieChart({ 
  data, 
  totalValue,
  title = "Sales by Category",
  description = "Distribution of sales across types" 
}: ModernPieChartProps) {
  
  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    data.forEach((item) => {
      config[item.category.toLowerCase()] = {
        label: item.category,
        color: item.fill,
      }
    })
    return config
  }, [data])

  return (
    <Card className="flex flex-col border-black/10 bg-white h-full overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-2 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[240px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius={60}
              strokeWidth={10}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-lg font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-neutral-500 text-[9px]"
                        >
                          Total Sales
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-[10px] p-4 pt-0 pb-4">
        <div className="grid grid-cols-2 gap-2 w-full">
            {data.map((item) => (
            <div key={item.category} className="flex items-center gap-2">
                <div 
                className="h-2.5 w-2.5 rounded-[2px]" 
                style={{ backgroundColor: item.fill }}
                />
                <span className="text-neutral-500 text-[9px] truncate">{item.category}</span>
                <span className="ml-auto font-medium text-[10px]">{Math.round((item.value / totalValue) * 100)}%</span>
            </div>
            ))}
        </div>
      </CardFooter>
    </Card>
  )
}
