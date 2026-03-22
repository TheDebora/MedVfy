"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Download,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#0c6a54] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2">NGO Premium</Badge>
          <h1 className="text-3xl font-black tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground font-medium">Real-time monitoring of health misinformation trends.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl border-secondary font-bold gap-2 bg-white">
              <Calendar size={18} />
              Last 30 Days
           </Button>
           <Button className="rounded-xl bg-[#0c6a54] font-bold gap-2 shadow-lg shadow-indigo-200">
              <Download size={18} />
              Export Report
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatsCard 
           title="Total Claims Analyzed" 
           value="24,582" 
           change="+12.5%" 
           isPositive={true} 
           icon={BarChart3} 
           color="text-[#0c6a54]" 
           bg="bg-green-50" 
         />
         <StatsCard 
           title="Dangerous Hits" 
           value="1,204" 
           change="+4.2%" 
           isPositive={false} 
           icon={AlertTriangle} 
           color="text-red-600" 
           bg="bg-red-50" 
         />
         <StatsCard 
           title="Misleading Content" 
           value="3,491" 
           change="-2.1%" 
           isPositive={true} 
           icon={TrendingDown} 
           color="text-amber-600" 
           bg="bg-amber-50" 
         />
         <StatsCard 
           title="Verified Sources" 
           value="19,887" 
           change="+18.7%" 
           isPositive={true} 
           icon={CheckCircle2} 
           color="text-green-600" 
           bg="bg-green-50" 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <Card className="lg:col-span-2 border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-8">
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="text-xl font-black">Misinformation Velocity</h3>
                  <p className="text-sm text-muted-foreground font-medium">Daily volume of analyzed claims vs verified accuracy.</p>
               </div>
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full bg-[#0c6a54]" />
                     <span className="text-xs font-bold text-muted-foreground">Volume</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full bg-green-500" />
                     <span className="text-xs font-bold text-muted-foreground">Accuracy</span>
                  </div>
               </div>
            </div>

            <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
               {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 50].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full flex justify-center gap-0.5">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${h}%` }}
                         className="w-full max-w-[12px] bg-[#0c6a54]/20 group-hover:bg-[#0c6a54] transition-all rounded-t-sm"
                       />
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${h * 0.8}%` }}
                         className="w-full max-w-[12px] bg-green-500/20 group-hover:bg-green-500 transition-all rounded-t-sm"
                       />
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground group-hover:text-foreground">W{i+1}</span>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-6">
            <h3 className="text-xl font-black">Top Misleading Topics</h3>
            <div className="space-y-6">
               <TopicProgress label="Covid-19 Vaccines" value={78} color="bg-[#0c6a54]" count="842" />
               <TopicProgress label="Herbal Cures" value={62} color="bg-primary" count="521" />
               <TopicProgress label="Weight Loss Scams" value={45} color="bg-indigo-400" count="384" />
               <TopicProgress label="Mental Health Myths" value={31} color="bg-indigo-200" count="210" />
            </div>
            <Button variant="ghost" className="w-full rounded-xl font-bold text-primary group">
               View Full Breakdown <TrendingUp size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
         </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Card className="border-none shadow-xl bg-white rounded-3xl p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
               <Users size={24} />
            </div>
            <div className="flex-1">
               <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">NGO Collaborators</h4>
               <p className="text-xl font-black">12 Active Groups</p>
            </div>
            <ArrowUpRight size={20} className="text-green-500" />
         </Card>
         <Card className="border-none shadow-xl bg-white rounded-3xl p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
               <TrendingUp size={24} />
            </div>
            <div className="flex-1">
               <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Community Impact</h4>
               <p className="text-xl font-black">8.4M Reach</p>
            </div>
            <Badge className="bg-green-100 text-green-700">+2.4%</Badge>
         </Card>
      </div>
    </div>
  )
}

function StatsCard({ title, value, change, isPositive, icon: Icon, color, bg }: any) {
  return (
    <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-4">
       <div className="flex items-center justify-between">
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center", bg, color)}>
             <Icon size={24} />
          </div>
          <div className={cn(
            "flex items-center text-xs font-black px-2 py-1 rounded-lg",
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {change}
          </div>
       </div>
       <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground">{title}</h4>
          <p className="text-3xl font-black">{value}</p>
       </div>
    </Card>
  )
}

function TopicProgress({ label, value, color, count }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-sm font-bold">
          <span className="text-muted-foreground truncate">{label}</span>
          <span>{count}</span>
       </div>
       <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn("h-full", color)} 
          />
       </div>
    </div>
  )
}
