"use client"

import * as React from "react"
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
} from "recharts"
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  DollarSign, 
  FileText, 
  Package, 
  TrendingUp, 
  Users,
  MoreVertical,
  Activity,
  CheckCircle2,
  Calendar as CalendarIcon,
  ChevronDown,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { 
  statsData, 
  revenueChartData, 
  recentTransactions, 
  categoryData, 
  userGrowthData,
  upcomingTasks,
  teamMembers
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { ModernPieChart } from "@/components/charts/modern-pie-chart"
import { ModernLineChart } from "@/components/charts/modern-line-chart"

const iconMap: Record<string, any> = {
  DollarSign,
  Users,
  FileText,
  Package,
  TrendingUp,
}

export default function DashboardPage() {
  const [userData, setUserData] = React.useState<{ fullName: string } | null>(null)

  React.useEffect(() => {
    const userJson = localStorage.getItem("user")
    if (userJson) {
      setUserData(JSON.parse(userJson))
    }
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const firstName = userData?.fullName.split(" ")[0] || "User"

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
    expenses: {
      label: "Expenses",
      color: "#f5f4f3",
    },
  }

  const totalValue = React.useMemo(() => {
    return categoryData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  const [date, setDate] = React.useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 6, 31),
  })
  const [timeframe, setTimeframe] = React.useState("Monthly View")

  return (
    <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* Left Column (2/3) */}
      <div className="lg:col-span-2 flex flex-col gap-3">
        <div className="mb-0.5">
          <h2 className="text-xl font-bold tracking-tight text-black">
            {getGreeting()}, <span className="text-primary">{firstName}</span>
          </h2>
          <p className="text-xs text-neutral-500">
            Here is what is happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {statsData.map((stat) => {
            const Icon = iconMap[stat.iconName] || Activity
            return (
              <Card key={stat.title} className="overflow-hidden border-black/10 bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3.5 px-2">
                  <CardTitle className="text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                    {stat.title}
                  </CardTitle>
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="px-2 pb-3.5">
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    ) : stat.trend === "down" ? (
                      <ArrowDownRight className="h-3 w-3 text-rose-500" />
                    ) : null}
                    <span className={cn(
                      "text-[10px] font-semibold",
                      stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-rose-500" : "text-neutral-500"
                    )}>
                      {stat.trendValue}
                    </span>
                    <span className="text-[10px] text-neutral-500 ml-0.5">
                      vs last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
          {/* Financial Performance Chart */}
          <Card className="border-white/10 bg-black h-full xl:col-span-2">
            <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base text-white">Financial Performance</CardTitle>
                <CardDescription className="text-[10px] text-white/50">
                  Revenue and expenses
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="h-8 px-2 text-[10px] bg-[#f5f4f3] text-black hover:bg-[#f5f4f3]/80 border-none rounded-sm shadow-none focus-visible:ring-0 gap-2 font-medium"
                    >
                      <CalendarIcon className="h-3 w-3 text-black/50" />
                      {timeframe === "Custom" ? (
                        <>
                          {date.from ? format(date.from, "LLL dd, y") : "Start"} -{" "}
                          {date.to ? format(date.to, "LLL dd, y") : "End"}
                        </>
                      ) : (
                        timeframe
                      )}
                      <ChevronDown className="h-3 w-3 text-black/50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#f5f4f3] border-2 border-black/10 rounded-lg" align="end" sideOffset={8}>
                    <div className="p-3 space-y-3">
                      <div className="space-y-2">
                        <h4 className="text-[9px] font-bold uppercase text-black/40 tracking-wider px-1">By Timeframe</h4>
                        <div className="grid grid-cols-2 gap-1.5">
                          {["Daily View", "Weekly View", "Monthly View", "Yearly View"].map((t) => (
                            <Button 
                              key={t}
                              variant="ghost" 
                              className={cn(
                                "h-7 justify-start text-[9px] px-2.5 transition-all rounded-md",
                                timeframe === t ? "bg-primary text-white font-bold shadow-sm" : "bg-black/5 hover:bg-black/10 text-black/70"
                              )}
                              onClick={() => {
                                setTimeframe(t)
                              }}
                            >
                              {t}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 border-t border-black/10 pt-3">
                        <div className="flex items-center justify-between px-1">
                          <h4 className="text-[9px] font-bold uppercase text-black/40 tracking-wider">Custom Filter</h4>
                          {timeframe === "Custom" && (
                            <span className="text-[9px] text-primary font-bold">Active</span>
                          )}
                        </div>
                        <div className="flex flex-col lg:flex-row gap-1 p-1 bg-black/5 rounded-lg">
                          <div className="space-y-0.5 px-0.5 py-0.5">
                            <p className="text-[7px] font-bold text-black/40 uppercase tracking-tight px-1">Start Date</p>
                            <Calendar
                              mode="single"
                              selected={date.from}
                              onSelect={(d) => {
                                setDate(prev => ({ ...prev, from: d }))
                                setTimeframe("Custom")
                              }}
                              className="rounded-md border border-black/10 bg-white text-black p-1 shadow-sm"
                              classNames={{
                                month: "space-y-1",
                                caption: "flex justify-center pt-0 relative items-center h-7",
                                caption_label: "text-[10px] font-bold",
                                nav_button: "h-5 w-5",
                                table: "w-full border-collapse",
                                head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.6rem]",
                                cell: "h-7 w-7 text-center text-xs p-0 relative",
                                day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100",
                              }}
                            />
                          </div>
                          <div className="space-y-0.5 px-0.5 py-0.5">
                            <p className="text-[7px] font-bold text-black/40 uppercase tracking-tight px-1">End Date</p>
                            <Calendar
                              mode="single"
                              selected={date.to}
                              onSelect={(d) => {
                                setDate(prev => ({ ...prev, to: d }))
                                setTimeframe("Custom")
                              }}
                              className="rounded-md border border-black/10 bg-white text-black p-1 shadow-sm"
                              classNames={{
                                month: "space-y-1",
                                caption: "flex justify-center pt-0 relative items-center h-7",
                                caption_label: "text-[10px] font-bold",
                                nav_button: "h-5 w-5",
                                table: "w-full border-collapse",
                                head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.6rem]",
                                cell: "h-7 w-7 text-center text-xs p-0 relative",
                                day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-4 pb-0">
              <ChartContainer config={chartConfig} className="h-[240px] w-full [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-primary/20">
                <BarChart data={revenueChartData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    stroke="#f5f4f3"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#f5f4f3"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                    width={35}
                  />
                  <ChartTooltip content={<ChartTooltipContent className="bg-white border-white/10 **:text-black" />} />
                  <Bar 
                    dataKey="revenue" 
                    fill="var(--color-revenue)" 
                    radius={[2, 2, 0, 0]} 
                    barSize={20}
                  />
                  <Bar 
                    dataKey="expenses" 
                    fill="var(--color-expenses)" 
                    radius={[2, 2, 0, 0]} 
                    barSize={20}
                    fillOpacity={1}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="p-4 pt-0 pb-4">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span>Trending up by 5.2% this month</span>
              </div>
            </CardFooter>
          </Card>

          {/* Category Chart (Pie) */}
          <div className="xl:col-span-1">
            <ModernPieChart 
              data={categoryData} 
              totalValue={totalValue} 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            {/* Team Activity Card */}
            <Card className="border-black/10 bg-white">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-base">Team Activity</CardTitle>
                <CardDescription className="text-xs">
                  {teamMembers.filter(m => m.status === "online").length} members currently active
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-4">
                <div className="grid grid-cols-5 gap-y-4 gap-x-2">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex flex-col items-center gap-1 group cursor-pointer">
                      <div className="relative">
                        <div className={cn(
                          "absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300",
                          member.status === "online" ? "bg-emerald-500/10 scale-110" : 
                          member.status === "away" ? "bg-amber-500/10 scale-110" : "bg-neutral-100 scale-110"
                        )} />
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm relative z-10 transition-transform group-hover:scale-105">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback className="text-[10px] font-bold">{member.avatar}</AvatarFallback>
                        </Avatar>
                        <span className={cn(
                          "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm z-20",
                          member.status === "online" ? "bg-emerald-500" : 
                          member.status === "away" ? "bg-amber-500" : "bg-neutral-300"
                        )} />
                      </div>
                      <div className="flex flex-col items-center min-w-0 w-full relative z-10">
                        <p className="text-[10px] font-bold text-black truncate w-full text-center leading-tight">
                          {member.name.split(" ")[0]}
                        </p>
                        <p className="text-[8px] text-neutral-400 font-medium truncate">
                          {member.lastSeen}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Professional Plan Card */}
            <Card className="border-black/10 bg-primary text-primary-foreground relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Package className="h-16 w-16 -mr-4 -mt-4 rotate-12" />
              </div>
              <CardHeader className="p-4 pb-2 relative z-10">
                <CardTitle className="text-white text-base">Professional Plan</CardTitle>
                <CardDescription className="text-primary-foreground/80 text-[10px] leading-tight text-balance">
                  You're using 80% of your plan's resources.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-1 relative z-10">
                <div className="mb-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                   <div className="h-full bg-white w-[80%]" />
                </div>
                <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90 h-7 text-[10px] font-bold shadow-sm">
                  Upgrade Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Tasks moved to Left Column */}
          <Card className="border-black/10 bg-white">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base">Upcoming Tasks</CardTitle>
              <CardDescription className="text-xs">
                Deadlines for the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-1 pb-1">
              <div className="space-y-2">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer">
                    <div className={cn(
                      "p-1.5 rounded-full shrink-0",
                      task.status === "Pending" ? "bg-amber-100 text-amber-600" :
                      task.status === "Scheduled" ? "bg-blue-100 text-blue-600" :
                      task.status === "In Progress" ? "bg-emerald-100 text-emerald-600" :
                      "bg-neutral-100 text-neutral-600"
                    )}>
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold leading-none truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[10px] text-neutral-500">{task.dueDate}</p>
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded-full font-bold",
                          task.priority === "High" ? "bg-rose-100 text-rose-600" :
                          task.priority === "Medium" ? "bg-amber-100 text-amber-600" :
                          "bg-neutral-100 text-neutral-600"
                        )}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-2 pb-4">
              <Button variant="ghost" className="w-full text-xs h-8 bg-primary text-white cursor-pointer hover:bg-black hover:text-white" size="sm">
                View Task Board
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right Column (1/3) */}
      <div className="flex flex-col gap-3">
        {/* Recent Transactions */}
        <Card className="border-black/10 bg-white h-fit">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <CardDescription className="text-xs">
                Latest sales activity
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-1 pb-1">
            <div className="space-y-2">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={tx.image} alt={tx.client} />
                    <AvatarFallback className="text-[10px]">{tx.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-2 space-y-0.5 min-w-0">
                    <p className="text-xs font-medium leading-none truncate">{tx.client}</p>
                    <p className="text-[10px] text-neutral-500 truncate">
                      {tx.id} • {tx.date}
                    </p>
                  </div>
                  <div className="ml-auto text-right shrink-0">
                    <div className="text-xs font-bold">{tx.amount}</div>
                    <Badge variant={tx.status === "Completed" ? "default" : tx.status === "Pending" ? "secondary" : "outline"} className="text-[9px] py-0 h-3.5 px-1">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-2 pb-4">
            <Button variant="ghost" className="w-full text-xs h-8 bg-primary text-white cursor-pointer hover:bg-black hover:text-white" size="sm">
              View All Transactions
            </Button>
          </CardFooter>
        </Card>

        {/* User Growth Line Chart */}
        <ModernLineChart 
          data={userGrowthData} 
          trendPercentage={18}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
          <Card className="border-black/10 bg-white">
            <CardHeader className="p-4 pb-1.5">
              <CardTitle className="text-xs font-medium uppercase tracking-tight text-neutral-500">System Health</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1.5 pb-4">
              <div className="text-xl font-bold">99.9%</div>
              <p className="text-[10px] text-neutral-500 mt-0.5">All services operational</p>
              <div className="mt-2.5 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[99.9%]"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-black/10 bg-white">
            <CardHeader className="p-4 pb-1.5">
              <CardTitle className="text-xs font-medium uppercase tracking-tight text-neutral-500">Storage Usage</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-1.5 pb-4">
              <div className="text-xl font-bold">45.2 GB</div>
              <p className="text-[10px] text-neutral-500 mt-0.5">of 100 GB available</p>
              <div className="mt-2.5 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[45.2%]"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}
