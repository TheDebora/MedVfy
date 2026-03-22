"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Map as MapIcon, 
  MapPin, 
  ShieldAlert, 
  Layers, 
  Globe, 
  Filter, 
  Download,
  Search,
  Zap,
  Maximize2,
  Navigation,
  AlertTriangle,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const regions = [
  { id: 1, name: "Lagos State", status: "Critical", intensity: 92, x: "32%", y: "45%", color: "bg-red-500" },
  { id: 2, name: "Greater Accra", status: "High", intensity: 74, x: "55%", y: "72%", color: "bg-red-500" },
  { id: 3, name: "Abuja FCT", status: "Moderate", intensity: 48, x: "78%", y: "30%", color: "bg-amber-500" },
  { id: 4, name: "Kumasi Metropolis", status: "Moderate", intensity: 55, x: "15%", y: "60%", color: "bg-amber-500" },
  { id: 5, name: "Port Harcourt", status: "Low", intensity: 22, x: "42%", y: "20%", color: "bg-green-500" }
]

export default function HeatmapPage() {
  const [selectedRegion, setSelectedRegion] = React.useState<any>(null)

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#071F18] text-white rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2 border border-white/10">Gov-Institutional Tier</Badge>
          <div className="flex items-center gap-2">
             <div className="h-6 w-1 bg-[#0c6a54] rounded-full animate-pulse" />
             <h1 className="text-3xl font-black tracking-tight text-[#071F18] italic uppercase">Global Heatmap</h1>
          </div>
          <p className="text-muted-foreground font-medium">National-level misinformation surveillance and intensity mapping.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl border-[#E8F4F0] bg-white font-black uppercase text-[10px] tracking-widest gap-2 shadow-sm">
              <Layers size={14} />
              Switch Layers
           </Button>
           <Button className="rounded-xl bg-[#071F18] font-bold gap-2 shadow-lg shadow-[#0c6a54]/10">
              <Navigation size={18} />
              Geofence Alert
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 h-full min-h-[600px]">
         <Card className="xl:col-span-3 border-none shadow-2xl bg-[#071F18] rounded-[2.5rem] relative overflow-hidden group">
            {/* Mock Map Background Grid */}
            <div className="absolute inset-0 opacity-20" 
                 style={{ backgroundImage: 'radial-gradient(#0c6a54 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            {/* Map UI Content */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-full h-full p-12">
                  <div className="absolute inset-x-12 inset-y-12 border border-[#0c6a54]/20 rounded-[2rem] bg-[#071F18]/50 backdrop-blur-sm overflow-hidden border-dashed">
                     {/* The Map Visualization */}
                     <svg className="w-full h-full opacity-40" viewBox="0 0 1000 600" fill="none">
                        <path d="M150,200 Q250,150 350,220 T550,180 T800,250 T900,450 T750,550 T450,480 T150,200" fill="#0C6A54" fillOpacity="0.2" stroke="#0c6a54" strokeWidth="2" />
                        <path d="M200,300 Q300,350 400,300 T600,350 T800,320" stroke="#0c6a54" strokeWidth="1" strokeDasharray="4 4" />
                     </svg>

                     {/* Hotspot Indicators */}
                     {regions.map((region) => (
                       <motion.div 
                         key={region.id}
                         initial={{ scale: 0, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         whileHover={{ scale: 1.2 }}
                         onClick={() => setSelectedRegion(region)}
                         className={cn(
                           "absolute cursor-pointer group/pin",
                           selectedRegion?.id === region.id ? "z-20" : "z-10"
                         )}
                         style={{ left: region.x, top: region.y }}
                       >
                          <div className={cn(
                            "h-5 w-5 rounded-full ring-4 ring-slate-900 relative",
                            region.color
                          )}>
                             <div className={cn("absolute inset-0 rounded-full animate-ping opacity-75", region.color)} />
                          </div>
                          
                          <AnimatePresence>
                             {selectedRegion?.id === region.id && (
                               <motion.div 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-white text-slate-900 rounded-2xl p-4 shadow-2xl border border-slate-100"
                               >
                                  <h4 className="font-black text-xs uppercase tracking-widest mb-2">{region.name}</h4>
                                  <div className="space-y-2">
                                     <div className="flex justify-between text-[10px] font-bold">
                                        <span className="text-muted-foreground">Intensity</span>
                                        <span className="text-red-600">{region.intensity}%</span>
                                     </div>
                                     <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-600" style={{ width: `${region.intensity}%` }} />
                                     </div>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between">
                                     <Badge className={cn("text-[9px] font-black uppercase px-2 py-0 border-none", region.color, "text-white")}>
                                        {region.status}
                                     </Badge>
                                     <ShieldAlert size={14} className="text-red-600" />
                                  </div>
                               </motion.div>
                             )}
                          </AnimatePresence>
                       </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-8 left-8 flex flex-col gap-2">
               <div className="bg-[#071F18]/80 backdrop-blur-md p-2 rounded-2xl border border-white/10 space-y-1">
                  <ControlButton icon={Search} />
                  <ControlButton icon={Maximize2} />
                  <div className="h-px bg-white/10 mx-2" />
                  <ControlButton icon={Zap} />
               </div>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-8 left-8 flex items-center gap-6 bg-[#071F18]/80 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10">
               <LegendItem color="bg-red-500" label="Critical" />
               <LegendItem color="bg-amber-500" label="Emerging" />
               <LegendItem color="bg-[#0c6a54]" label="Controlled" />
            </div>

            {/* Live Feed Toggle */}
            <div className="absolute bottom-8 right-8">
               <Button className="rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-xs px-6 py-6 shadow-xl shadow-red-900/20 gap-3 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  Live Feed ON
               </Button>
            </div>
         </Card>

         <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-4">
               <h3 className="text-sm font-black uppercase tracking-widest border-b pb-3">Sector Analysis</h3>
               <div className="space-y-6">
                  <SectorProgress label="Social Media (X/Meta)" value={84} status="Critical" />
                  <SectorProgress label="Messaging (WA/TG)" value={65} status="Elevated" />
                  <SectorProgress label="Local Print/News" value={22} status="Nominal" />
               </div>
            </Card>

            <Card className="border-none shadow-xl bg-[#071F18] text-white rounded-[2rem] p-6 space-y-4">
               <div className="flex items-center gap-2">
                  <Info size={16} className="text-[#0c6a54]" />
                  <h3 className="text-xs font-black uppercase tracking-widest italic">Actionable Insight</h3>
               </div>
               <p className="text-xs text-secondary/60 font-medium leading-relaxed">
                  Detected 15% surge in "unverified herbal cures" in the Urban Metropolitan sector. Inter-agency communication recommended.
               </p>
               <Button className="w-full rounded-xl bg-[#0c6a54] font-bold text-xs py-3">
                  Deploy Counter Messaging
               </Button>
            </Card>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 rounded-3xl bg-secondary/50 text-center space-y-1">
                  <p className="text-[10px] font-black uppercase text-secondary-foreground/60">Active Nodes</p>
                  <p className="text-2xl font-black text-[#071F18] tracking-tighter">1,204</p>
               </div>
               <div className="p-4 rounded-3xl bg-secondary/50 text-center space-y-1">
                  <p className="text-[10px] font-black uppercase text-secondary-foreground/60">Agency Collab</p>
                  <p className="text-2xl font-black text-[#071F18] tracking-tighter">12</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

function ControlButton({ icon: Icon }: any) {
  return (
    <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-white/10 text-secondary/40 hover:text-white transition-colors">
       <Icon size={18} />
    </Button>
  )
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
       <div className={cn("h-3 w-3 rounded-full", color)} />
       <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">{label}</span>
    </div>
  )
}

function SectorProgress({ label, value, status }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-muted-foreground">{label}</span>
          <span className={cn(
             status === "Critical" ? "text-red-600" : status === "Elevated" ? "text-amber-600" : "text-green-600"
          )}>{status}</span>
       </div>
       <div className="w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            className={cn(
               "h-full",
               status === "Critical" ? "bg-red-600" : status === "Elevated" ? "bg-amber-600" : "bg-green-600"
            )}
          />
       </div>
    </div>
  )
}
