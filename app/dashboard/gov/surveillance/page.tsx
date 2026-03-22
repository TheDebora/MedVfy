"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { 
  Activity, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Eye, 
  Search, 
  Filter, 
  Download,
  AlertTriangle,
  CheckCircle2,
  MoreVertical,
  Radio,
  Share2,
  Trash2,
  MessageSquare,
  Zap,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SurveillanceEntry {
  id: string
  content: string
  source: string
  region: string
  severity: "critical" | "high" | "moderate" | "low"
  timestamp: string
  isNew?: boolean
}

const initialEntries: SurveillanceEntry[] = [
  { id: "1", content: "Viral post claiming lemon water replaces insulin for Type 1 diabetes.", source: "WhatsApp Viral", region: "Lagos Mainland", severity: "critical", timestamp: "Just now" },
  { id: "2", content: "New 'Ancestral Tonic' being sold in rural markets linked to liver failure reports.", source: "Field Reports", region: "Greater Accra", severity: "high", timestamp: "2 mins ago" },
  { id: "3", content: "Minor claims about vitamin D preventing all cancers appearing on local blogs.", source: "Web Crawler", region: "Abuja FCT", severity: "moderate", timestamp: "5 mins ago" },
  { id: "4", content: "Standard health guidelines being shared correctly in Kumasi districts.", source: "Official Channel", region: "Kumasi Metropolis", severity: "low", timestamp: "12 mins ago" },
  { id: "5", content: "Dangerous misinformation about vaccine ingredients spreading on X Nigeria.", source: "Social API", region: "Nigeria Online", severity: "critical", timestamp: "15 mins ago" },
]

export default function SurveillanceFeedPage() {
  const [entries, setEntries] = React.useState<SurveillanceEntry[]>(initialEntries)
  const [isPaused, setIsPaused] = React.useState(false)

  React.useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const newEntry: SurveillanceEntry = {
        id: Math.random().toString(36).substr(2, 9),
        content: [
           "New report of unregulated health supplements in Kano Central.",
           "Viral TikTok claims tooth decay can be reversed with essential oils in Accra.",
           "Fake ministry announcement about mandatory vaccinations appearing on FB Ghana.",
           "Misleading stats about mortality rates in Port Harcourt hospitals.",
           "Verified clinic guide on handling heat waves in Kumasi."
        ][Math.floor(Math.random() * 5)],
        source: ["Facebook", "Web Scraping", "Field Agent", "Telegram Feed"][Math.floor(Math.random() * 4)],
        region: ["Lagos State", "Greater Accra", "Abuja FCT", "Kumasi"][Math.floor(Math.random() * 4)],
        severity: ["critical", "high", "moderate", "low"][Math.floor(Math.random() * 4)] as any,
        timestamp: "Just now",
        isNew: true
      }
      
      setEntries(prev => [newEntry, ...prev.map(e => ({ ...e, isNew: false }))].slice(0, 15))
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical": return <Badge className="bg-red-600 text-white rounded-lg px-2 border-none font-black text-[10px] uppercase animate-pulse">Critical</Badge>
      case "high": return <Badge className="bg-orange-500 text-white rounded-lg px-2 border-none font-black text-[10px] uppercase">High Risk</Badge>
      case "moderate": return <Badge className="bg-amber-100 text-amber-700 rounded-lg px-2 border-none font-black text-[10px] uppercase">Moderate</Badge>
      case "low": return <Badge className="bg-green-100 text-green-700 rounded-lg px-2 border-none font-black text-[10px] uppercase">Nominal</Badge>
      default: return null
    }
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#071F18] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2 border border-white/10">Gov-Institutional Tier</Badge>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-xl bg-[#0c6a54] flex items-center justify-center text-white shadow-lg shadow-[#0c6a54]/20">
                <Radio size={20} className="animate-pulse" />
             </div>
             <h1 className="text-3xl font-black tracking-tight text-[#071F18] italic uppercase">Live Surveillance Feed</h1>
          </div>
          <p className="text-muted-foreground font-medium italic">Continuous monitoring of national health information vectors.</p>
        </div>
        <div className="flex gap-2">
           <Button 
             onClick={() => setIsPaused(!isPaused)}
             variant="outline" 
             className={cn(
               "rounded-xl border-[#E8F4F0] font-bold gap-2 bg-white",
               isPaused && "bg-amber-50 border-amber-200 text-amber-600"
             )}
           >
              {isPaused ? <Zap size={18} /> : <Loader2 className="animate-spin" size={18} />}
              {isPaused ? "Resume Stream" : "Stream Active"}
           </Button>
           <Button className="rounded-xl bg-[#071F18] font-bold gap-2 shadow-lg shadow-[#0c6a54]/10">
              <Download size={18} />
              Export Logs
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
         <div className="xl:col-span-3 space-y-4">
            <AnimatePresence mode="popLayout">
               {entries.map((entry) => (
                 <motion.div
                   key={entry.id}
                   layout
                   initial={{ opacity: 0, x: -20, scale: 0.95 }}
                   animate={{ opacity: 1, x: 0, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                   className={cn(
                     "group relative p-6 rounded-[2rem] border transition-all hover:shadow-2xl hover:shadow-[#0c6a54]/10 bg-white",
                     entry.isNew ? "border-[#0c6a54]/20 bg-[#0c6a54]/5 shadow-xl shadow-[#0c6a54]/5" : "border-[#E8F4F0]"
                   )}
                 >
                    {entry.isNew && (
                      <div className="absolute top-6 right-6 h-2 w-2 rounded-full bg-[#0c6a54] animate-ping" />
                    )}
                    
                    <div className="flex flex-col md:flex-row gap-6">
                       <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-3">
                             {getSeverityBadge(entry.severity)}
                             <span className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                                <Clock size={12} /> {entry.timestamp}
                             </span>
                             <span className="text-xs font-black uppercase tracking-widest text-[#0c6a54] flex items-center gap-1">
                                <Radio size={12} /> {entry.source}
                             </span>
                          </div>
                          
                          <p className="text-lg font-bold tracking-tight text-[#071F18] leading-snug">
                             "{entry.content}"
                          </p>

                          <div className="flex flex-wrap gap-4 text-xs font-bold text-muted-foreground items-center">
                             <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border">
                                <MapPin size={14} className="text-red-500" />
                                {entry.region}
                             </div>
                             <div className="flex items-center gap-1.5 bg-[#0c6a54]/5 px-3 py-1 rounded-full border border-[#0c6a54]/20 text-[#0c6a54]">
                                <Eye size={14} />
                                Predicted Reach: {(Math.random() * 50).toFixed(1)}k
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex md:flex-col gap-2 justify-end">
                          <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 hover:bg-secondary">
                             <MessageSquare size={18} className="text-secondary-foreground/40" />
                          </Button>
                          <Button size="icon" variant="ghost" className="rounded-xl h-10 w-10 hover:bg-secondary">
                             <Share2 size={18} className="text-secondary-foreground/40" />
                          </Button>
                          <Link href="/dashboard/gov/counter-messaging">
                             <Button 
                               className="bg-[#071F18] text-white font-bold h-10 rounded-xl px-6 hover:bg-[#0c6a54] transition-colors w-full md:w-auto shadow-lg shadow-[#0c6a54]/10"
                             >
                                Action
                             </Button>
                          </Link>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>

         <div className="space-y-6">
            <Card className="border-none shadow-xl bg-[#071F18] text-white rounded-[2.5rem] p-8 space-y-6 overflow-hidden relative">
               <div className="absolute top-0 right-0 h-40 w-40 bg-[#0c6a54]/10 rounded-bl-full" />
               <h3 className="text-sm font-black uppercase tracking-widest border-b border-white/10 pb-3">Session Stats</h3>
               <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#0c6a54]/60">Claims Logged</p>
                     <p className="text-3xl font-black">1.2k</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-[#0c6a54]/60">Active Alerts</p>
                     <p className="text-3xl font-black text-red-500">14</p>
                  </div>
               </div>
               <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                     <span>Threat Velocity</span>
                     <span className="text-red-400">Increasing</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                       animate={{ width: ["40%", "85%", "60%"] }}
                       transition={{ duration: 4, repeat: Infinity }}
                       className="h-full bg-red-600"
                     />
                  </div>
               </div>
            </Card>

            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest italic flex items-center gap-2">
                  <ShieldAlert size={16} className="text-red-600" />
                  Priority Filters
               </h3>
               <div className="space-y-3">
                  <FilterToggle label="Critical Danger" active={true} color="bg-red-600" />
                  <FilterToggle label="High Reach Viral" active={true} color="bg-[#0c6a54]" />
                  <FilterToggle label="Regional Spike" active={false} color="bg-amber-500" />
                  <FilterToggle label="Official Mentions" active={false} color="bg-green-500" />
               </div>
            </Card>

            <Button className="w-full h-14 rounded-2xl bg-[#0c6a54] text-white font-black uppercase tracking-widest shadow-xl shadow-[#0c6a54]/20">
               Access Full Archive
            </Button>
         </div>
      </div>
    </div>
  )
}

function FilterToggle({ label, active, color }: any) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer",
      active ? "bg-white border-slate-200 shadow-md" : "bg-slate-50 border-transparent opacity-60"
    )}>
       <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full", color)} />
          <span className="text-xs font-black uppercase tracking-widest">{label}</span>
       </div>
       <div className={cn(
         "h-4 w-4 rounded-full border-2",
         active ? "bg-[#0c6a54] border-[#0c6a54] flex items-center justify-center" : "border-slate-300"
       )}>
          {active && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
       </div>
    </div>
  )
}
