"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import {
  CreditCard,
  FileText,
  Home,
  LogOut,
  Menu,
  Package,
  Settings,
  ShoppingCart,
  Users,
  Users2,
  X,
  Store,
  Receipt,
  Box,
  Wallet,
  FolderOpen,
} from "lucide-react"

import { logoutUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Loader } from "@/components/loader"

// Define the sidebar item interface
interface SidebarItem {
  title: string
  icon: React.ElementType
  path: string
  description: string
}

// Define the sidebar group interface
interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

// Update the dashboardItem to use static strings
const dashboardItem: SidebarItem = {
  title: "Dashboard",
  icon: Home,
  path: "/dashboard",
  description: "KPI overview, charts, Top 10 clients",
}

// Update the sidebarGroups to use static strings
const sidebarGroups: SidebarGroup[] = [
  {
    label: "Sales & CRM",
    items: [
      {
        title: "Clients",
        icon: Users,
        path: "/clients",
        description: "CRM Lite: add/edit/delete; billing history",
      },
      {
        title: "Products",
        icon: Package,
        path: "/products",
        description: "Product catalog and management",
      },
      {
        title: "Inventory",
        icon: Box,
        path: "/inventory",
        description: "Inventory and stock movements",
      },
    ],
  },
  {
    label: "Documents",
    items: [
      {
        title: "Quotes",
        icon: FileText,
        path: "/quotes",
        description: "Create/edit; AI assistant",
      },
      {
        title: "Invoices",
        icon: FileText,
        path: "/invoices",
        description: "Convert quotes; status tracking",
      },
      {
        title: "Payments",
        icon: CreditCard,
        path: "/payments",
        description: "Record payments",
      },
      {
        title: "Credit Notes",
        icon: Receipt,
        path: "/credit-notes",
        description: "Credit note management",
      },
    ],
  },
  {
    label: "Purchases",
    items: [
      {
        title: "Suppliers",
        icon: Store,
        path: "/suppliers",
        description: "Supplier management",
      },
      {
        title: "Purchase Orders",
        icon: ShoppingCart,
        path: "/purchases",
        description: "Purchase orders and tracking",
      },
      {
        title: "Expenses",
        icon: Wallet,
        path: "/expenses",
        description: "Expense management",
      },
    ],
  },
  {
    label: "My Luz",
    items: [
      {
        title: "Settings",
        icon: Settings,
        path: "/settings",
        description: "Company info, PDF, taxes, language",
      },
      {
        title: "Team Management",
        icon: Users2,
        path: "/users",
        description: "Invite members; role-based permissions",
      },
      {
        title: "My Folder",
        icon: FolderOpen,
        path: "/my-folder",
        description: "Manage your personal folder",
      },
    ],
  },
]

// Helper component for Sidebar Item
const SidebarNavItem = ({
  item,
  pathname,
  collapsed,
  isMobileSidebar,
}: {
  item: SidebarItem
  pathname: string
  collapsed: boolean
  isMobileSidebar: boolean
}) => {
  const isActive = pathname === item.path
  
  return (
    <Link href={item.path} className="block">
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start h-auto py-2.5 text-sm text-black/80 cursor-pointer transition-colors relative",
          !isActive && "hover:bg-[#e8e7e7] hover:text-black",
          collapsed && !isMobileSidebar ? "justify-center px-2" : "px-3",
          isActive && "bg-primary/15 text-primary hover:bg-primary/15 hover:text-primary",
        )}
      >
        {isActive && (
          <div className="absolute right-0 top-[15%] bottom-[15%] w-1 bg-primary rounded-l-full" />
        )}
        <item.icon className={cn("h-5.5 w-5.5", collapsed && !isMobileSidebar ? "" : "mr-2.5")} />
        {(!collapsed || isMobileSidebar) && <span>{item.title}</span>}
        {collapsed && !isMobileSidebar && <span className="sr-only">{item.title}</span>}
      </Button>
    </Link>
  )
}

// Helper component for Sidebar Logout Button
const SidebarLogoutButton = ({
  collapsed,
  onClick,
}: {
  collapsed: boolean
  onClick: () => void
}) => (
  <Button
    className={cn(
      "w-full justify-start h-auto py-2.5 text-sm bg-black text-white hover:bg-red-500 hover:text-white mt-6 cursor-pointer border-none outline-hidden",
      collapsed ? "justify-center px-2" : "px-3",
    )}
    onClick={onClick}
  >
    <LogOut className={cn("h-5.5 w-5.5", collapsed ? "" : "mr-2.5")} />
    {!collapsed && <span>Logout</span>}
    {collapsed && <span className="sr-only">Logout</span>}
  </Button>
)

export function PersistentLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userData, setUserData] = useState<{ fullName: string; role: string } | null>(null)
  const [companyName, setCompanyName] = useState("Company")
  const [currentPageTitle, setCurrentPageTitle] = useState("")
  const [animate, setAnimate] = useState(false)
  const [loading, setLoading] = useState(true)



  // Check if the current path is a dashboard path
  const isAuthPage = pathname === "/login" || pathname === "/register"
  const isDashboardPath = !isAuthPage && pathname !== "/"

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Get user data from localStorage
    const userJson = localStorage.getItem("user")
    if (userJson) {
      const user = JSON.parse(userJson)
      setUserData({
        fullName: user.fullName || "User",
        role: user.role || "Admin",
      })
    } else if (isDashboardPath) {
      // Redirect to login if no user data and on a dashboard path
      router.push("/login")
    }

    // Get company data from localStorage
    const companyJson = localStorage.getItem("company")
    if (companyJson) {
      const company = JSON.parse(companyJson)
      setCompanyName(company.name || "Company")
    }

    // Set current page title based on pathname
    // Check dashboard item first
    if (pathname === dashboardItem.path) {
      setCurrentPageTitle(dashboardItem.title)
    } else {
      // Check all groups
      for (const group of sidebarGroups) {
        const item = group.items.find((item) => item.path === pathname)
        if (item) {
          setCurrentPageTitle(item.title)
          break
        }
      }
    }
  }, [pathname, router])

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileOpen(false)

    // Reset animation state when navigating
    setAnimate(false)

    // Trigger animation after a short delay
    const timer = setTimeout(() => {
      setAnimate(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname])

  const handleLogout = () => {
    logoutUser()
    router.push("/login")
  }


  // Show loader while loading
  if (loading) {
    return <Loader />
  }

  // If not a dashboard path, just render children
  if (!isDashboardPath) {
    return <>{children}</>
  }

  // Sidebar content component to avoid duplication
  const SidebarContent = ({ isMobileSidebar = false }: { isMobileSidebar?: boolean }) => (
    <>
      {/* Toggle button - only show on desktop sidebar */}
      {!isMobileSidebar && (
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-center mb-3 h-auto py-2.5 text-black/40 hover:bg-primary/10 hover:text-primary border border-black/20 hover:border-primary cursor-pointer",
            collapsed ? "px-2" : "px-3",
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      )}

      {/* Dashboard item (standalone) */}
      <div className="space-y-1.5 mb-2">
        <SidebarNavItem
          item={dashboardItem}
          pathname={pathname}
          collapsed={collapsed}
          isMobileSidebar={isMobileSidebar}
        />
      </div>

      {/* Grouped items */}
      {sidebarGroups.map((group) => (
        <div key={group.label} className="mb-2">
          {/* Group label - hide when collapsed */}
          {(!collapsed || isMobileSidebar) && (
            <div className="px-3 mb-1">
              <p className="text-xs font-medium text-neutral-400">{group.label}</p>
            </div>
          )}

          {/* Group items */}
          <div className="space-y-1">
            {group.items.map((item) => (
              <SidebarNavItem
                key={item.path}
                item={item}
                pathname={pathname}
                collapsed={collapsed}
                isMobileSidebar={isMobileSidebar}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className="flex h-screen flex-col md:flex-row bg-[#f5f4f3] overflow-hidden dashboard-layout max-h-screen">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col bg-[#f5f4f3] text-slate-900 transition-all duration-300",
          collapsed ? "md:w-14" : "md:w-52",
        )}
      >
        <div className="flex flex-col h-full p-2 pr-0">
          {/* Company name at top of sidebar - centered and moved down */}
          <div className={cn("flex justify-center items-center mb-6 mt-4", collapsed ? "px-2" : "px-3")}>
            <h2
              className={cn(
                "font-semibold transition-all duration-300 text-slate-900 text-center",
                collapsed ? "text-xs" : "text-xl",
              )}
            >
              {collapsed ? companyName.substring(0, 1) : companyName}
            </h2>
          </div>

          {/* Container for navigation and logout to keep them together */}
          <div className="min-h-0 flex flex-col overflow-x-hidden">
            {/* Sidebar content - with hidden scrollbar */}
            <div className="relative flex-1 overflow-hidden max-h-[calc(100vh-160px)]">
              <div className="overflow-y-auto overflow-x-hidden hide-scrollbar h-full pb-9">
                <SidebarContent />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#f5f4f3] to-transparent pointer-events-none"></div>
            </div>

            <SidebarLogoutButton collapsed={collapsed} onClick={handleLogout} />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar - Sheet component */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[80%] max-w-[300px] [&>button]:hidden bg-[#f5f4f3] text-slate-900 pr-2">
          <div className="flex flex-col h-full p-2">
            {/* Company name and close button */}
            <div className="flex items-center justify-between mb-6 mt-4 px-3">
              <h2 className="text-xl font-semibold text-slate-900">{companyName}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                className="text-slate-600 hover:bg-slate-100 hover:text-black cursor-pointer"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Container for navigation and logout to keep them together */}
            <div className="flex flex-col h-full overflow-x-hidden">
              {/* Mobile sidebar content - with flex-1 to push logout to bottom and hidden scrollbar */}
              <div className="relative flex-1 overflow-hidden max-h-[calc(100vh-120px)]">
                <div className="overflow-y-auto overflow-x-hidden hide-scrollbar h-full pb-10">
                  <SidebarContent isMobileSidebar={true} />
                </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#f5f4f3] to-transparent pointer-events-none"></div>
              </div>

              <SidebarLogoutButton collapsed={false} onClick={handleLogout} />
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div
        className={`flex flex-1 flex-col overflow-hidden bg-white transition-all duration-700 ease-out md:rounded-lg md:m-2 ${
          animate ? "opacity-100 scale-100 transform-none" : "opacity-0 scale-0 transform origin-center"
        }`}
      >
        {/* Header - no rounded corners on mobile */}
        <header className="flex items-center justify-between border-b border-[#f5f4f3] bg-white px-4 py-3 md:rounded-t-lg">
          <div className="flex items-center">
            {/* Mobile menu button - only visible on mobile */}
            <Button variant="ghost" size="icon" className="mr-2 md:hidden cursor-pointer" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg md:text-xl font-bold truncate">{currentPageTitle}</h1>
          </div>
          {userData && (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="font-medium truncate max-w-[120px] md:max-w-none">{userData.fullName}</p>
                <p className="text-xs text-muted-foreground">{userData.role}</p>
              </div>
              <span className="hidden sm:block text-[#f5f4f3]">|</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {userData.fullName.charAt(0)}
              </div>
            </div>
          )}
        </header>

        {/* Main content with styled scrollbar */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 overscroll-none hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  )
}
