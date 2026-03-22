"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Globe, 
  Key, 
  Copy, 
  RefreshCw, 
  ShieldCheck, 
  Terminal, 
  ExternalLink,
  Code2,
  Database,
  Lock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function APIAccessPage() {
  const [showKey, setShowKey] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const apiKey = "mv_live_51Pz7X9K2L4M8N1O0Q3R6T9V2W5Y8B1E4S7G"

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8 pb-10 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-slate-900 rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2">Gov-Institutional Tier</Badge>
          <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center text-[#0c6a54] shadow-lg shadow-slate-200">
                <Globe size={20} />
             </div>
             <h1 className="text-3xl font-black tracking-tight italic uppercase">API Access</h1>
          </div>
          <p className="text-muted-foreground font-medium">Integrate MedVfy intelligence into your institutional systems.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" className="rounded-xl font-bold gap-2 text-[#0c6a54]">
              <ExternalLink size={18} />
              Full Documentation
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
               <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-slate-50 border flex items-center justify-center text-slate-900">
                        <Key size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">Your API Key</h3>
                        <p className="text-sm text-muted-foreground font-medium">Use this key to authenticate your server-side requests.</p>
                     </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-none font-bold px-3">Active</Badge>
               </div>

               <div className="space-y-4 relative z-10">
                  <div className="flex gap-2">
                     <div className="flex-1 relative">
                        <Input 
                          type={showKey ? "text" : "password"}
                          value={apiKey}
                          readOnly
                          className="h-14 rounded-2xl bg-secondary/30 border-none font-mono font-bold text-sm pr-12 focus-visible:ring-slate-900/10"
                        />
                        <button 
                          onClick={() => setShowKey(!showKey)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-slate-900 transition-colors"
                        >
                           {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                     </div>
                     <Button 
                       onClick={handleCopy}
                       variant="outline" 
                       className="h-14 w-14 rounded-2xl border-secondary bg-white hover:bg-slate-50 shadow-sm"
                     >
                        {copied ? <CheckCircle2 size={24} className="text-green-600" /> : <Copy size={24} />}
                     </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-red-500 bg-red-50 p-4 rounded-2xl border border-red-100">
                     <AlertCircle size={16} />
                     Do not share your API key. It grants full access to your organization's data quotas.
                  </div>
               </div>
               
               <div className="absolute top-0 right-0 h-40 w-40 bg-slate-50 rounded-bl-full -z-0 opacity-50" />
            </Card>

            <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6">
               <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                     <Code2 size={20} className="text-[#0c6a54]" />
                     <h3 className="text-sm font-black uppercase tracking-widest">Example Integration</h3>
                  </div>
                  <Badge variant="outline" className="rounded-full px-3 py-1 text-[10px] font-black border-white/20 text-[#0c6a54]">
                     cURL
                  </Badge>
               </div>
               
               <div className="bg-black/50 rounded-2xl p-6 font-mono text-[13px] leading-relaxed relative border border-white/10">
                  <div className="flex gap-2 absolute top-4 right-4 group">
                     <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white/50 hover:text-white">
                        <Copy size={14} />
                     </Button>
                  </div>
                  <div className="space-y-1 overflow-x-auto pb-2">
                     <p className="text-slate-500"># Verify a health claim via API</p>
                     <p className="text-[#0c6a54]">curl <span className="text-slate-300">-X POST</span> https://api.medvfy.gov/v1/verify \</p>
                     <p className="text-[#0c6a54]">  -H <span className="text-green-400">"Authorization: Bearer {apiKey.slice(0, 10)}..."</span> \</p>
                     <p className="text-[#0c6a54]">  -H <span className="text-green-400">"Content-Type: application/json"</span> \</p>
                     <p className="text-[#0c6a54]">  -d <span className="text-green-400">'{'{'}"claim": "Drinking lemon water cures diabetes"{'}'}'</span></p>
                  </div>
               </div>
            </Card>
         </div>

         <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-6">
               <h3 className="text-sm font-black uppercase tracking-widest italic flex items-center gap-2">
                  <Database size={16} className="text-[#0c6a54]" />
                  Usage Quotas
               </h3>
               <div className="space-y-6">
                  <UsageItem label="Verification Requests" used={1240} total={5000} />
                  <UsageItem label="Bulk Upload Volume" used={24} total={100} />
                  <UsageItem label="API Node Hours" used={42} total={500} />
               </div>
               <Button className="w-full h-12 rounded-xl bg-slate-900 font-bold text-xs shadow-lg shadow-slate-200">
                  Request Quota Increase
               </Button>
            </Card>

            <Card className="border-none shadow-xl bg-[#0c6a54]/5 border border-[#0c6a54]/10 rounded-[2rem] p-6 space-y-4">
               <div className="flex items-center gap-2 text-[#0c6a54]">
                  <ShieldCheck size={20} />
                  <h4 className="text-xs font-black uppercase tracking-widest">Compliance</h4>
               </div>
               <p className="text-xs text-[#0c6a54]/80 font-medium leading-relaxed">
                  Institutional APIs are rate-limited to 100 req/sec to ensure stability for emergency responders. 
               </p>
               <div className="flex items-center gap-2 text-[#0c6a54] text-[10px] font-black uppercase tracking-widest cursor-pointer group">
                  Security Whitepaper <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
               </div>
            </Card>

            <Button className="w-full h-14 rounded-2xl bg-secondary text-slate-900 font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2">
               <Terminal size={18} />
               Open SDK Explorer
            </Button>
         </div>
      </div>
    </div>
  )
}

function UsageItem({ label, used, total }: any) {
  const percentage = (used / total) * 100
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[11px] font-bold">
          <span className="text-muted-foreground uppercase tracking-widest">{label}</span>
          <span className="text-slate-900">{used} / {total}</span>
       </div>
       <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-[#0c6a54]"
          />
       </div>
    </div>
  )
}
