"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  FileText, 
  Activity, 
  Clock, 
  Users, 
  ShieldCheck, 
  Lock, 
  ArrowUpRight,
  TrendingUp,
  MoreHorizontal,
  AlertTriangle
} from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
  { 
    title: "Total Records", 
    value: "1,284", 
    change: "+12.5%", 
    icon: FileText, 
    color: "text-[#0c6a54]", 
    bg: "bg-[#0c6a54]/10" 
  },
  { 
    title: "Verified Claims", 
    value: "942", 
    change: "+4.2%", 
    icon: ShieldCheck, 
    color: "text-[#2ECC9A]", 
    bg: "bg-[#2ECC9A]/10" 
  },
  { 
    title: "Emergency Contacts", 
    value: "6", 
    change: "Active", 
    icon: Users, 
    color: "text-amber-600", 
    bg: "bg-amber-100/50" 
  },
  { 
    title: "Privacy Status", 
    value: "Protected", 
    change: "Encrypted", 
    icon: Lock, 
    color: "text-[#0c6a54]", 
    bg: "bg-[#0c6a54]/10" 
  },
]

export default function DashboardPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground md:text-3xl">
            Welcome back, <span className="text-primary italic">John!</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here's a summary of your health safety network.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="rounded-2xl border-none bg-white shadow-sm font-bold">
              Download Report
           </Button>
           <Button className="rounded-2xl shadow-xl shadow-primary/20 font-bold px-6">
              Invite Family
           </Button>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden relative">
              <div className={`absolute top-0 left-0 w-1 h-full ${stat.color.replace('text', 'bg')}`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                  <stat.icon size={16} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2">
                   <span className={cn(
                     "text-[10px] font-bold px-1.5 py-0.5 rounded-lg",
                      stat.change.includes('+') ? "bg-[#2ECC9A]/10 text-[#0c6a54]" : "bg-amber-100 text-amber-600"
                   )}>
                     {stat.change}
                   </span>
                   <span className="text-[10px] text-muted-foreground font-medium">from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Recent Record Updates</CardTitle>
              <CardDescription>System-wide health data synchronization</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="rounded-xl">
               <MoreHorizontal size={20} />
            </Button>
          </CardHeader>
          <CardContent className="px-0">
             <div className="divide-y">
                {[
                  { title: "CBC Report", provider: "Metro Health", date: "2 hours ago", status: "Verified", color: "bg-[#0c6a54]" },
                  { title: "X-Ray Results", provider: "Dental Hub", date: "Yesterday", status: "Verified", color: "bg-[#2ECC9A]" },
                  { title: "Flu Vaccination", provider: "City Clinic", date: "3 days ago", status: "Verified", color: "bg-[#0c6a54]" },
                  { title: "Blood Pressure", provider: "Self Entry", date: "May 12, 2024", status: "Manual", color: "bg-amber-500" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className={`h-10 w-10 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg`}>
                          <FileText size={18} />
                       </div>
                       <div>
                          <p className="text-sm font-bold">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.provider} • {item.date}</p>
                       </div>
                    </div>
                    <Badge variant="outline" className="rounded-xl border-none bg-secondary text-[10px] font-bold uppercase tracking-wider">
                      {item.status}
                    </Badge>
                  </div>
                ))}
             </div>
             <div className="p-4 flex justify-center">
                <Button variant="link" className="text-primary text-xs font-bold">View all records</Button>
             </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-primary text-white overflow-hidden relative group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
             <CardHeader>
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-2">
                   <Activity size={20} />
                </div>
                <CardTitle className="text-xl font-bold">Health Score</CardTitle>
                <CardDescription className="text-white/70">Your health network status</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="flex items-end gap-2">
                   <span className="text-5xl font-black">94</span>
                   <span className="text-xl font-bold opacity-70 mb-1">/100</span>
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-4 overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "94%" }}
                     transition={{ duration: 1, delay: 0.5 }}
                     className="bg-white h-full" 
                   />
                </div>
                <p className="text-[10px] mt-4 font-bold uppercase tracking-widest opacity-70 flex items-center gap-2">
                   <TrendingUp size={12} /> Improving consistently
                </p>
             </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
             <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Emergency Alerts</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-red-50 border border-red-100">
                   <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-red-500 flex items-center justify-center text-white">
                         <AlertTriangle size={16} />
                      </div>
                      <span className="text-xs font-bold text-red-600 uppercase tracking-tight">SOS READY</span>
                   </div>
                   <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </div>
                <p className="text-xs text-muted-foreground text-center">Your emergency broadcast is configured with 6 trusted contacts.</p>
                <Button variant="ghost" className="w-full text-xs font-bold rounded-xl h-10 border border-dashed border-muted underline-offset-4 hover:underline">
                   Edit Emergency Settings
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
