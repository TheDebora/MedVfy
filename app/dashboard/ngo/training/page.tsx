"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  BookOpen, 
  Play, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Award, 
  Download,
  Search,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const modules = [
  {
    id: "1",
    title: "How to Spot Misinformation",
    desc: "A comprehensive guide on identifying fake health claims, absolute promises, and lack of credible sourcing.",
    duration: "45 mins",
    type: "Course",
    status: "In Progress",
    progress: 65,
    icon: Search,
    color: "bg-[#0c6a54]"
  },
  {
    id: "2",
    title: "Safe Health Communication",
    desc: "Learn to communicate complex medical data to local communities without causing panic or confusion.",
    duration: "1.2 hours",
    type: "Workshop",
    status: "Not Started",
    progress: 0,
    icon: MessageSquare,
    color: "bg-primary"
  },
  {
    id: "3",
    title: "Data Verification Protocols",
    desc: "Institutional standards for verifying medical data before public release or policy implementation.",
    duration: "2 hours",
    type: "Certification",
    status: "Locked",
    progress: 0,
    icon: ShieldCheck,
    color: "bg-slate-900"
  },
  {
    id: "4",
    title: "Crisis Response Messaging",
    desc: "Rapid response strategies for countering viral dangerous misinformation in affected regions.",
    duration: "1 hr 15 mins",
    type: "Course",
    status: "Not Started",
    progress: 0,
    icon: Play,
    color: "bg-[#0c6a54]/60"
  }
]

export default function TrainingPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#0c6a54] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2">NGO Premium</Badge>
          <h1 className="text-3xl font-black tracking-tight">Training Module</h1>
          <p className="text-muted-foreground font-medium">Educational resources and certification for institutional health responders.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl border-secondary font-bold gap-2 bg-white">
              <Award size={18} />
              Certificates
           </Button>
        </div>
      </div>

      <div className="relative">
         <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
         <Input 
           placeholder="Search training modules, guides, or workshops..." 
           className="h-14 rounded-2xl bg-white border-none shadow-xl shadow-secondary/50 pl-12 font-medium focus-visible:ring-primary/20"
         />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {modules.map((module) => (
            <Card key={module.id} className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-[#0c6a54]/10 transition-all cursor-pointer">
              <CardHeader className="p-8 pb-4 flex flex-row items-start justify-between">
                 <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform", module.color)}>
                    <module.icon size={32} />
                 </div>
                 <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] bg-secondary/50 text-muted-foreground border-none">
                       {module.type}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                       <Clock size={14} />
                       {module.duration}
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                 <div className="space-y-1">
                    <h3 className="text-xl font-black leading-tight group-hover:text-[#0c6a54] transition-colors">{module.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">{module.desc}</p>
                 </div>
                 
                 {module.status !== "Locked" && (
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-muted-foreground">
                          <span>Progress</span>
                           <span className="text-[#0c6a54]">{module.progress}%</span>
                       </div>
                       <div className="w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${module.progress}%` }}
                            className={cn("h-full", module.color)}
                          />
                       </div>
                    </div>
                 )}
              </CardContent>
              <CardFooter className="p-8 pt-0 flex gap-4">
                 {module.status === "Locked" ? (
                   <Button disabled className="w-full h-12 rounded-xl bg-secondary text-muted-foreground font-bold gap-2">
                      <Lock size={18} />
                      Complete Level 1
                   </Button>
                 ) : (
                   <Button className={cn("w-full h-12 rounded-xl font-bold gap-2 shadow-lg", module.color, `shadow-${module.color.split('-')[1]}-100`)}>
                      {module.progress > 0 ? "Continue Lab" : "Start Module"}
                      <ArrowRight size={18} />
                   </Button>
                 )}
                 <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-secondary/30 shrink-0">
                    <Download size={20} className="text-muted-foreground" />
                 </Button>
              </CardFooter>
           </Card>
         ))}
      </div>

      <div className="p-8 rounded-[2.5rem] bg-[#0c6a54]/5 border border-[#0c6a54]/10 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-3xl bg-white flex items-center justify-center text-[#0c6a54] shadow-xl shadow-[#0c6a54]/10">
               <Award size={40} />
            </div>
            <div className="space-y-1">
               <h3 className="text-xl font-black italic uppercase tracking-tighter">NGO Certification Path</h3>
               <p className="text-sm font-medium text-[#0c6a54] leading-relaxed">
                  Complete all modules to earn the **Master Health Communicator** badge for your organization.
               </p>
            </div>
         </div>
         <Button className="rounded-2xl h-14 px-8 bg-[#0c6a54] font-black shadow-xl shadow-[#0c6a54]/20 active:scale-95 transition-all">
            Unlock Specialist Level
         </Button>
      </div>
    </div>
  )
}
