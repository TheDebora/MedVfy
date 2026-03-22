"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Database, 
  Search, 
  FileText, 
  ChevronRight, 
  Globe, 
  Filter, 
  BookOpen, 
  Star, 
  ArrowRight,
  Download,
  ShieldCheck,
  Building,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const guidelines = [
  { id: 1, title: "Nigeria National Health Act: Misinformation Clause", country: "Nigeria", category: "Legal", status: "Official", updated: "Jan 2026" },
  { id: 2, title: "Ghana Health Service: Emergency Response Protocol", country: "Ghana", category: "Medical", status: "Standard", updated: "Dec 2025" },
  { id: 3, title: "NCDC: Public Awareness Mandate on Fake Cures", country: "Nigeria", category: "Public Health", status: "Critical", updated: "Feb 2026" },
  { id: 4, title: "Ghana GHS: Social Media Monitoring Guide", country: "Ghana", category: "Internal Policy", status: "Standard", updated: "Mar 2026" },
  { id: 5, title: "Lagos State Health Management Agency Guidelines", country: "Nigeria (Lagos)", category: "Regional", status: "Official", updated: "Feb 2026" }
]

export default function KnowledgeBasePage() {
  const [search, setSearch] = React.useState("")

  const filtered = guidelines.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase()) || 
    g.country.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#071F18] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2 border border-white/10">Gov-Institutional Tier</Badge>
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-[#0c6a54]/10 text-[#0c6a54] flex items-center justify-center shadow-lg shadow-[#0c6a54]/10">
                <Database size={20} />
             </div>
             <h1 className="text-3xl font-black tracking-tight text-[#071F18] italic uppercase">Knowledge Base</h1>
          </div>
          <p className="text-muted-foreground font-medium">Country-specific health guidelines and misinformation policies.</p>
        </div>
        <div className="flex gap-2">
           <Button className="rounded-xl bg-[#0c6a54] font-bold gap-2 shadow-lg shadow-[#0c6a54]/20">
              <Download size={18} />
              Policy Pack PDF
           </Button>
        </div>
      </div>

      <div className="relative group">
         <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-secondary-foreground/40 group-focus-within:text-[#0c6a54] transition-colors" />
         <Input 
           placeholder="Search policies, country guidelines, or legal mandates..." 
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           className="h-20 rounded-[2rem] bg-white border-none shadow-2xl shadow-[#0c6a54]/5 pl-14 font-bold text-xl focus-visible:ring-[#0c6a54]/10 placeholder:text-secondary-foreground/20"
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-[#0c6a54]/10 hover:shadow-2xl hover:shadow-[#0c6a54]/10 transition-all cursor-pointer flex items-center gap-6"
              >
                 <div className="h-14 w-14 rounded-2xl bg-secondary/50 border border-[#E8F4F0] flex items-center justify-center text-secondary-foreground/40 group-hover:bg-[#0c6a54] group-hover:text-white transition-all">
                    <FileText size={24} />
                 </div>
                 <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-3">
                       <h3 className="font-black text-[#071F18] tracking-tight group-hover:text-[#0c6a54] transition-colors">{item.title}</h3>
                       <Badge variant="outline" className="rounded-md border-[#E8F4F0] text-[9px] font-black uppercase text-muted-foreground">
                          {item.category}
                       </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                       <span className="flex items-center gap-1.5">
                          <Globe size={12} /> {item.country}
                       </span>
                       <span className="flex items-center gap-1.5">
                          <Badge className={cn(
                            "h-2 w-2 rounded-full p-0 border-none",
                            item.status === "Critical" ? "bg-red-500" : item.status === "Official" ? "bg-green-500" : "bg-[#B2C5BF]"
                          )} />
                          {item.status}
                       </span>
                       <span>Updated: {item.updated}</span>
                    </div>
                 </div>
                 <ChevronRight size={20} className="text-secondary-foreground/20 group-hover:text-[#0c6a54] group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))}
         </div>

         <div className="space-y-6">
            <Card className="border-none shadow-xl bg-[#071F18] text-white rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
               <div className="absolute bottom-0 right-0 h-40 w-40 bg-[#0c6a54]/5 rounded-tl-full" />
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-2">
                     <Star size={18} className="text-amber-400 fill-amber-400" />
                     <h3 className="text-sm font-black uppercase tracking-widest">Saved Guidelines</h3>
                  </div>
                  
                  <div className="space-y-4">
                     <p className="text-xs text-slate-400 font-medium">No guidelines saved yet. Click the star icon on any document to save it here for quick access.</p>
                     <Button variant="outline" className="w-full rounded-xl border-white/10 bg-white/5 font-bold hover:bg-white/10">
                        View History
                     </Button>
                  </div>
               </div>
            </Card>

            <div className="p-8 rounded-[2rem] bg-white border-2 border-dashed border-[#E8F4F0] space-y-6">
               <h4 className="text-xs font-black uppercase tracking-widest border-b pb-3">Popular Resources</h4>
               <div className="space-y-4">
                  <ResourceLink label="WHO Verification Standards" />
                  <ResourceLink label="Anti-Disinformation Toolkit" />
                  <ResourceLink label="Clinical Data API Guide" />
                  <ResourceLink label="Regional Emergency Codes" />
               </div>
            </div>

            <Card className="border-none shadow-xl bg-[#0c6a54]/5 border border-[#0c6a54]/10 rounded-[2.5rem] p-6 space-y-4">
               <div className="flex items-center gap-3 text-[#0c6a54]">
                  <ShieldCheck size={20} />
                  <h4 className="text-xs font-black uppercase tracking-widest">Compliance</h4>
               </div>
               <p className="text-[11px] text-[#0c6a54]/80 font-medium leading-relaxed">
                  Institutional access requires adherence to the National Health Data Security Framework.
               </p>
               <Button className="w-full rounded-xl bg-[#0c6a54] font-black text-[10px] uppercase tracking-widest py-3">
                  Read Compliance Guidelines
               </Button>
            </Card>
         </div>
      </div>
    </div>
  )
}

function ResourceLink({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
       <div className="flex items-center gap-3">
          <BookOpen size={16} className="text-slate-400 group-hover:text-[#0c6a54] transition-colors" />
          <span className="flex-1 text-sm font-bold truncate group-hover:underline">Research Paper: Delta Variant Analysis</span>
       </div>
       <ArrowRight size={14} className="text-slate-300 group-hover:text-[#0c6a54] transition-all opacity-0 group-hover:opacity-100" />
    </div>
  )
}
