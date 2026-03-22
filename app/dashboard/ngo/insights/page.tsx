"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Search, 
  Map, 
  Globe, 
  Info, 
  ArrowRight, 
  PieChart, 
  Target, 
  Users,
  MessageSquare,
  Activity
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const hotspots = [
  { id: 1, region: "Lagos State", country: "Nigeria", activeClaims: 1240, veracity: 32, status: "Critical", x: "35%", y: "45%" },
  { id: 2, region: "Greater Accra", country: "Ghana", activeClaims: 850, veracity: 48, status: "Warning", x: "55%", y: "70%" },
  { id: 3, region: "Abuja FCT", country: "Nigeria", activeClaims: 420, veracity: 65, status: "Stable", x: "75%", y: "30%" },
  { id: 4, region: "Kumasi", country: "Ghana", activeClaims: 310, veracity: 52, status: "Warning", x: "15%", y: "60%" },
  { id: 5, region: "Rivers State", country: "Nigeria", activeClaims: 150, veracity: 88, status: "Safe", x: "45%", y: "25%" }
]

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#0c6a54] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2">NGO Premium</Badge>
          <h1 className="text-3xl font-black tracking-tight">Community Insights</h1>
          <p className="text-muted-foreground font-medium">Deep-dive into regional misinformation hotspots and demographic trends.</p>
        </div>
        <Button className="rounded-xl bg-[#0c6a54] font-bold gap-2 shadow-lg shadow-indigo-200">
          <Target size={18} />
          Targeted Response
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black italic uppercase tracking-tighter">Regional Hotspots</h3>
               <Badge variant="outline" className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-red-50 text-red-600 border-red-100">
                  Critical Alert
               </Badge>
            </div>
            
            <div className="space-y-4">
               {hotspots.map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 rounded-3xl bg-secondary/20 hover:bg-secondary/40 transition-all group">
                    <div className="h-12 w-12 rounded-2xl bg-white border shadow-sm flex items-center justify-center text-[#0c6a54] group-hover:bg-[#0c6a54] group-hover:text-white transition-colors">
                       <Map size={24} />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-black uppercase tracking-tight">{item.region}</h4>
                          <span className={cn(
                             "text-[10px] font-black uppercase px-2 py-0.5 rounded-full",
                             item.veracity < 40 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                          )}>{item.status}</span>
                       </div>
                       <div className="h-1.5 w-full bg-white rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-[#0c6a54]" style={{ width: `${item.veracity}%` }} />
                       </div>
                       <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                          <span>Intensity: {100 - item.veracity}%</span>
                          <span>{item.activeClaims} Claims Flagged</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </Card>

         <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-[#0c6a54]/5 rounded-bl-full -z-10 opacity-50" />
            
            <div className="space-y-2">
               <h3 className="text-xl font-black italic uppercase tracking-tighter">Demographic Impact</h3>
               <p className="text-sm text-muted-foreground font-medium">Propensity to believe unverified claims across age groups.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <DemographicStat label="18-24" value={34} icon={Users} color="#0c6a54" />
               <DemographicStat label="25-44" value={58} icon={Users} color="#0c6a54" />
               <DemographicStat label="45-64" value={72} icon={Users} color="#0c6a54" />
               <DemographicStat label="65+" value={89} icon={Users} color="#0c6a54" />
            </div>

            <div className="p-6 rounded-3xl bg-secondary/30 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl bg-white border flex items-center justify-center text-primary">
                     <MessageSquare size={16} />
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest">Active Channels</h4>
               </div>
               <div className="flex flex-wrap gap-2">
                  {["WhatsApp", "Telegram", "Facebook", "Local Radio", "Word of Mouth"].map((tag, i) => (
                     <Badge key={i} className="bg-white text-indigo-900 border font-bold hover:bg-indigo-50">
                        {tag}
                     </Badge>
                  ))}
               </div>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <InsightCard 
           title="Misinformation Vectors" 
           desc="Religious beliefs and ancestral cures are the primary drivers this month."
           icon={Globe}
         />
         <InsightCard 
           title="Platform Resilience" 
           desc="Verification adoption is up 14% in coastal regions following NGO outreach."
           icon={Activity}
         />
         <InsightCard 
           title="Emerging Patterns" 
           desc="Anti-vaccination claims are shifting from COVID to childhood immunizations."
           icon={PieChart}
         />
      </div>
    </div>
  )
}

function DemographicStat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="p-6 rounded-3xl border-2 border-dashed border-indigo-100 bg-white space-y-3">
       <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
             <Icon size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-indigo-600">{value}%</span>
       </div>
       <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label} YRS</p>
    </div>
  )
}

function InsightCard({ title, desc, icon: Icon }: any) {
  return (
    <Card className="border-none shadow-xl bg-white rounded-3xl p-6 space-y-4 group hover:shadow-2xl transition-all cursor-pointer">
       <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Icon size={24} />
       </div>
       <div className="space-y-1">
          <h4 className="font-black text-sm uppercase tracking-widest">{title}</h4>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed">{desc}</p>
       </div>
       <div className="flex items-center text-indigo-600 text-[10px] font-black uppercase tracking-widest gap-2">
          Read Analysis <ArrowRight size={14} />
       </div>
    </Card>
  )
}
