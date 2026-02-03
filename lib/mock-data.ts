export interface StatCardData {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  iconName: string;
}

export const statsData: StatCardData[] = [
  {
    title: "Total Revenue",
    value: "$128,430",
    description: "Total earnings this month",
    trend: "up",
    trendValue: "+12.5%",
    iconName: "DollarSign",
  },
  {
    title: "Active Clients",
    value: "2,543",
    description: "New clients added this week",
    trend: "up",
    trendValue: "+4.2%",
    iconName: "Users",
  },
  {
    title: "Pending Invoices",
    value: "42",
    description: "Invoices awaiting payment",
    trend: "down",
    trendValue: "-8.1%",
    iconName: "FileText",
  },
  {
    title: "Total Products",
    value: "856",
    description: "Items across all categories",
    trend: "neutral",
    trendValue: "0%",
    iconName: "Package",
  },
  {
    title: "Conversion Rate",
    value: "14.2%",
    description: "Average conversion score",
    trend: "up",
    trendValue: "+2.1%",
    iconName: "TrendingUp",
  },
];

export const revenueChartData = [
  { month: "Jan", revenue: 4500, expenses: 3200 },
  { month: "Feb", revenue: 5200, expenses: 3500 },
  { month: "Mar", revenue: 4800, expenses: 3100 },
  { month: "Apr", revenue: 6100, expenses: 4000 },
  { month: "May", revenue: 5900, expenses: 3800 },
  { month: "Jun", revenue: 7200, expenses: 4500 },
  { month: "Jul", revenue: 6800, expenses: 4200 },
];

export const recentTransactions = [
  {
    id: "TX-1001",
    client: "Acme Corp",
    amount: "$2,400.00",
    status: "Completed",
    date: "2024-03-24",
    avatar: "AC",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "TX-1002",
    client: "Global Tech",
    amount: "$1,250.00",
    status: "Pending",
    date: "2024-03-23",
    avatar: "GT",
    image: "https://plus.unsplash.com/premium_photo-1733971878518-fee3ce2b7aa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "TX-1003",
    client: "Blue Sky Inc",
    amount: "$850.00",
    status: "Completed",
    date: "2024-03-22",
    avatar: "BS",
    image: "https://plus.unsplash.com/premium_photo-1690294614341-cf346ba0a637?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "TX-1004",
    client: "Innovate Ltd",
    amount: "$3,100.00",
    status: "Processing",
    date: "2024-03-21",
    avatar: "IL",
    image: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "TX-1005",
    client: "Star Systems",
    amount: "$1,800.00",
    status: "Completed",
    date: "2024-03-20",
    avatar: "SS",
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
];

export const categoryData = [
  { category: "Services", value: 450, fill: "hsl(var(--primary))" },
  { category: "Products", value: 300, fill: "#000000" },
  { category: "Subscriptions", value: 200, fill: "#22c55e" },
  { category: "Other", value: 100, fill: "#f5f4f3" },
];

export const userGrowthData = [
  { day: "Mon", users: 120 },
  { day: "Tue", users: 180 },
  { day: "Wed", users: 150 },
  { day: "Thu", users: 240 },
  { day: "Fri", users: 210 },
  { day: "Sat", users: 280 },
  { day: "Sun", users: 260 },
];

export const upcomingTasks = [
  {
    id: 1,
    title: "Quarterly Tax Filing",
    dueDate: "Tomorrow",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Client Meeting: Acme Corp",
    dueDate: "Feb 15, 2024",
    priority: "Medium",
    status: "Scheduled",
  },
  {
    id: 3,
    title: "Product Launch Prep",
    dueDate: "Feb 20, 2024",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Annual Security Audit",
    dueDate: "Mar 01, 2024",
    priority: "Low",
    status: "Planning",
  },
  {
    id: 5,
    title: "Quarterly Board Review",
    dueDate: "Mar 05, 2024",
    priority: "High",
    status: "Planning",
  },
];

export const teamMembers = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Lead Designer",
    status: "online",
    lastSeen: "Just now",
    avatar: "AR",
    image: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Fullstack Dev",
    status: "online",
    lastSeen: "2m ago",
    avatar: "SC",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Marcus Bell",
    role: "Backend Dev",
    status: "away",
    lastSeen: "15m ago",
    avatar: "MB",
    image: "https://plus.unsplash.com/premium_photo-1690294614341-cf346ba0a637?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "PO",
    status: "online",
    lastSeen: "Just now",
    avatar: "ER",
    image: "https://plus.unsplash.com/premium_photo-1733971878518-fee3ce2b7aa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "David Park",
    role: "UX Researcher",
    status: "online",
    lastSeen: "1m ago",
    avatar: "DP",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "David Park",
    role: "UX Researcher",
    status: "online",
    lastSeen: "1m ago",
    avatar: "DP",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "David Park",
    role: "UX Researcher",
    status: "online",
    lastSeen: "1m ago",
    avatar: "DP",
    image: "https://plus.unsplash.com/premium_photo-1733971878518-fee3ce2b7aa6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    name: "David Park",
    role: "UX Researcher",
    status: "online",
    lastSeen: "1m ago",
    avatar: "DP",
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
  },
  {
    id: 10,
    name: "David Park",
    role: "UX Researcher",
    status: "online",
    lastSeen: "1m ago",
    avatar: "DP",
    image: "https://plus.unsplash.com/premium_photo-1690294614341-cf346ba0a637?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    name: "Lisa Wong",
    role: "Marketing Tech",
    status: "offline",
    lastSeen: "2h ago",
    avatar: "LW",
    image: "https://images.unsplash.com/photo-1532170579297-281918c8ae72?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
