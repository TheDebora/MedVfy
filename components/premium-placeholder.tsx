"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Layers, Zap, Info, ShieldCheck, Database, Search, BarChart3, Globe, Map, MessageSquare, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const featureData: Record<string, { title: string, icon: any, desc: string, badge: string, color: string }> = {
  "/dashboard/bulk-verify": { title: "Bulk Verification", icon: Layers, desc: "Process thousands of health claims simultaneously with AI batch processing.", badge: "NGO Premium", color: "bg-[#0c6a54]" },
  "/dashboard/analytics": { title: "Analytics Dashboard", icon: BarChart3, desc: "Real-time insights into misinformation trends and platform impact.", badge: "NGO Premium", color: "bg-[#0c6a54]" },
  "/dashboard/insights": { title: "Community Insights", icon: Search, desc: "Deep-dive analysis into demographic health misinformation patterns.", badge: "NGO Premium", color: "bg-[#0c6a54]" },
  "/dashboard/training": { title: "Training Module", icon: BookOpen, desc: "Certified training materials for health educators and community leaders.", badge: "NGO Premium", color: "bg-[#0c6a54]" },
  "/dashboard/branding": { title: "Branding Settings", icon: Zap, desc: "Customize the verification toolkit with your organization's identity.", badge: "NGO Premium", color: "bg-[#0c6a54]" },
  "/dashboard/heatmap": { title: "Misinformation Heatmap", icon: Map, desc: "Live geospatial visualization of viral health misinformation outbreaks.", badge: "Gov Tier", color: "bg-slate-900" },
  "/dashboard/surveillance": { title: "Live Surveillance Feed", icon: Globe, desc: "High-level monitoring of social channels for emerging health threats.", badge: "Gov Tier", color: "bg-slate-900" },
  "/dashboard/counter-messaging": { title: "Counter Messaging Tool", icon: MessageSquare, desc: "Rapid response system for deploying verified facts to affected regions.", badge: "Gov Tier", color: "bg-slate-900" },
  "/dashboard/api-access": { title: "Enterprise API Access", icon: Database, desc: "Direct secure access to MedVfy's verification engine for national systems.", badge: "Gov Tier", color: "bg-slate-900" },
  "/dashboard/knowledge-base": { title: "Gov Knowledge Base", icon: BookOpen, desc: "Classified repository of verified medical research and policy guides.", badge: "Gov Tier", color: "bg-slate-900" },
}

export default function PremiumPlaceholder() {
  const pathname = usePathname()
  const data = featureData[pathname] || { title: "Premium Feature", icon: ShieldCheck, desc: "This advanced toolkit is part of our institutional tier.", badge: "Institutional", color: "bg-primary" }
  const Icon = data.icon

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className={cn("rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px]", data.color)}>
            {data.badge}
          </Badge>
          <h1 className="text-3xl font-black tracking-tight">{data.title}</h1>
        </div>
        <div className="flex -space-x-2">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center overflow-hidden">
                <div className="h-full w-full bg-primary/20 animate-pulse" />
             </div>
           ))}
           <div className="h-10 px-4 rounded-full border-2 border-white bg-primary text-white text-[10px] font-black flex items-center">
              +12 EXPERTS ACTIVE
           </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <Card className="md:col-span-2 border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden min-h-[400px] flex flex-col items-center justify-center p-12 text-center space-y-6">
            <div className={cn("h-24 w-24 rounded-3xl flex items-center justify-center text-white shadow-xl", data.color)}>
               <Icon size={48} />
            </div>
            <div className="space-y-4 max-w-sm">
               <h3 className="text-2xl font-black italic uppercase tracking-tighter">Initialising {data.title}...</h3>
               <p className="text-muted-foreground font-medium">{data.desc}</p>
            </div>
            <div className="w-full max-w-xs h-2 bg-secondary rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "60%" }}
                 transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                 className={cn("h-full", data.color)} 
               />
            </div>
         </Card>

         <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-4">
               <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <BarChart3 size={20} />
               </div>
               <div>
                  <h4 className="font-black text-sm uppercase tracking-widest">Active nodes</h4>
                  <p className="text-2xl font-black text-primary">2,482</p>
               </div>
            </Card>
            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-4">
               <div className="h-10 w-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <Globe size={20} />
               </div>
               <div>
                  <h4 className="font-black text-sm uppercase tracking-widest">Global Reach</h4>
                  <p className="text-2xl font-black text-green-600">94.2%</p>
               </div>
            </Card>
            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-4">
                <div className="h-10 w-10 rounded-xl bg-[#0c6a54]/10 text-[#0c6a54] flex items-center justify-center">
                  <Zap size={20} />
               </div>
               <div>
                  <h4 className="font-black text-sm uppercase tracking-widest">API Latency</h4>
                   <p className="text-2xl font-black text-[#0c6a54]">14ms</p>
               </div>
            </Card>
         </div>
      </div>

       <div className="p-6 rounded-[2rem] bg-[#0c6a54]/5 border border-[#0c6a54]/10 flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
             <Info size={20} className="text-[#0c6a54]" />
          </div>
          <div className="space-y-1">
             <h4 className="text-sm font-black text-[#0c6a54] uppercase tracking-widest">Developer Note</h4>
             <p className="text-sm font-medium text-[#0c6a54]/80 leading-relaxed">
               This is a premium module designed for institutional scale. In this demo, the interface simulates secure data connectivity and AI initialization protocols specific to your {data.badge} role.
            </p>
         </div>
      </div>
    </div>
  )
}
