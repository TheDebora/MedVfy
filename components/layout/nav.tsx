"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  ShieldCheck, 
  FileText, 
  AlertTriangle, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Bell, 
  User, 
  Menu, 
  X,
  Shield,
  Layers,
  BarChart3,
  Search,
  MessageSquare,
  Globe,
  Database,
  Map,
  Activity,
  Zap,
  BookOpen
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useUserRole, UserRole } from "@/hooks/use-user-role"

interface NavItem {
  name: string
  href: string
  icon: any
  roles?: UserRole[]
}

const navItems: NavItem[] = [
  // Free Features
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Verify Claim", href: "/verify", icon: ShieldCheck },
  { name: "Medical Records", href: "/dashboard/records", icon: FileText },
  { name: "Emergency SOS", href: "/dashboard/emergency", icon: AlertTriangle },
  { name: "Privacy Settings", href: "/dashboard/privacy", icon: Settings },
  
  // NGO Features
  { name: "Bulk Verification", href: "/dashboard/ngo/upload", icon: Layers, roles: ["NGO", "Government"] },
  { name: "Analytics", href: "/dashboard/ngo/analytics", icon: BarChart3, roles: ["NGO", "Government"] },
  { name: "Insights", href: "/dashboard/ngo/insights", icon: Search, roles: ["NGO", "Government"] },
  { name: "Training", href: "/dashboard/ngo/training", icon: BookOpen, roles: ["NGO", "Government"] },
  { name: "Branding", href: "/dashboard/ngo/branding", icon: Zap, roles: ["NGO", "Government"] },

  // Government Features
  { name: "Heatmap", href: "/dashboard/gov/heatmap", icon: Map, roles: ["Government"] },
  { name: "Surveillance", href: "/dashboard/gov/surveillance", icon: Activity, roles: ["Government"] },
  { name: "Counter Messaging", href: "/dashboard/gov/counter-messaging", icon: MessageSquare, roles: ["Government"] },
  { name: "API Access", href: "/dashboard/gov/api-access", icon: Globe, roles: ["Government"] },
  { name: "Knowledge Base", href: "/dashboard/gov/knowledge-base", icon: Database, roles: ["Government"] },
]

export function Sidebar({ className, onMobileClose }: { className?: string, onMobileClose?: () => void }) {
  const pathname = usePathname()
  const { role } = useUserRole()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  // Filter items based on role
  const filteredItems = navItems.filter(item => 
    !item.roles || item.roles.includes(role)
  )

  const freeItems = filteredItems.filter(item => !item.roles)
  const ngoItems = filteredItems.filter(item => item.roles?.includes("NGO") && !item.roles.includes("Free"))
  const govtItems = filteredItems.filter(item => item.roles?.includes("Government") && !item.roles.includes("NGO"))

  return (
    <motion.div 
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "flex flex-col h-full bg-white border-r transition-all duration-300 relative group",
        className
      )}
    >
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
           <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
             <Shield size={24} />
           </div>
           {!isCollapsed && (
             <span className="text-xl font-black tracking-tight text-foreground">MedVfy</span>
           )}
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex rounded-xl hover:bg-secondary/80 text-muted-foreground"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <div className="flex-1 px-4 py-2 space-y-6 overflow-y-auto no-scrollbar">
        <div className="space-y-1">
          {freeItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} onClick={onMobileClose}>
                <div className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all relative group",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}>
                  <item.icon size={20} className={cn("shrink-0", isActive ? "text-white" : "group-hover:text-primary")} />
                  {!isCollapsed && <span>{item.name}</span>}
                  {isActive && !isCollapsed && (
                    <motion.div layoutId="active-pill" className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </div>
              </Link>
            )
          })}
        </div>

        {role !== "Free" && ngoItems.length > 0 && (
          <div className="space-y-2">
            {!isCollapsed && <p className="px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">NGO Premium</p>}
            <div className="space-y-1">
              {ngoItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} onClick={onMobileClose}>
                    <div className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all relative group",
                        isActive 
                          ? "bg-[#0c6a54] text-white shadow-lg shadow-[#0c6a54]/20" 
                          : "text-muted-foreground hover:bg-[#0c6a54]/5 hover:text-[#0c6a54]"
                    )}>
                      <item.icon size={20} className="shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {role === "Government" && govtItems.length > 0 && (
          <div className="space-y-2">
            {!isCollapsed && <p className="px-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">Government Tier</p>}
            <div className="space-y-1">
              {govtItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href} onClick={onMobileClose}>
                    <div className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all relative group",
                      isActive 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                        : "text-muted-foreground hover:bg-slate-100 hover:text-slate-900"
                    )}>
                      <item.icon size={20} className="shrink-0" />
                      {!isCollapsed && <span>{item.name}</span>}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-2xl bg-secondary/30",
          isCollapsed ? "justify-center" : ""
        )}>
          <div className="h-10 w-10 rounded-xl bg-white border shadow-sm flex items-center justify-center shrink-0">
            <User size={20} className="text-muted-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black truncate">Demo User</p>
              <p className="text-[10px] text-muted-foreground truncate">{role} Plan</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Navbar({ onMobileOpen }: { onMobileOpen: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { role } = useUserRole()
  
  const getPageTitle = () => {
    const item = navItems.find(item => item.href === pathname)
    return item ? item.name : "Dashboard"
  }

  const getRoleBadge = () => {
    switch(role) {
      case "Free": return "Free Plan"
      case "NGO": return "NGO Premium"
      case "Government": return "Government Tier"
      default: return "Free Plan"
    }
  }

  const getRoleColor = () => {
    switch(role) {
      case "Free": return "bg-primary/10 text-primary border-primary/20"
      case "NGO": return "bg-[#0c6a54]/10 text-[#0c6a54] border-[#0c6a54]/20"
      case "Government": return "bg-slate-900 text-white border-slate-900"
      default: return "bg-primary/10 text-primary"
    }
  }

  return (
    <header className="h-20 bg-white/50 backdrop-blur-md border-b flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMobileOpen}
          className="lg:hidden rounded-xl h-10 w-10 bg-secondary/80"
        >
          <Menu size={20} />
        </Button>
        <div className="flex flex-col">
          <h2 className="text-lg font-black tracking-tight text-foreground">{getPageTitle()}</h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full", getRoleColor())}>
              {getRoleBadge()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {role === "Free" && (
           <Button variant="ghost" className="hidden sm:flex rounded-xl gap-2 font-bold text-sm bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors">
              <Zap size={16} fill="currentColor" />
              <span>Upgrade</span>
           </Button>
        )}
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-secondary/50 text-muted-foreground relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-red-500 rounded-full border-2 border-white" />
          </Button>
          <Button onClick={() => router.push("/")} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-secondary/50 text-muted-foreground">
            <User size={20} />
          </Button>
        </div>
      </div>
    </header>
  )
}
