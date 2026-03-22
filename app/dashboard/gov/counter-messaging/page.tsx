"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MessageSquare, 
  Send, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  Copy, 
  Share2, 
  Globe, 
  Target, 
  AlertTriangle,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function CounterMessagingPage() {
  const [claim, setClaim] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [response, setResponse] = React.useState<string | null>(null)
  const [isDeploying, setIsDeploying] = React.useState(false)

  const handleGenerate = () => {
    if (!claim) return
    setIsGenerating(true)
    setResponse(null)
    
    setTimeout(() => {
      const mockResponses = [
        "Based on verified medical data from the WHO and local health ministries, this claim is categorized as dangerous misinformation. Our AI-generated response highlights that no scientific evidence supports this 'cure' and directs citizens to the nearest oncology department for evidence-based treatment plans.",
        "System Analysis: The claim is misleading. Recommended counter-response: 'This information lacks clinical trial backing. Health authorities urge citizens to consult certified medical professionals before adopting unregulated supplement regimens. See ministry guidelines at health.gov/verify.'",
        "Targeted Response: Provide a clear, evidence-based infographic explaining why 'lemon water' does not affect insulin dependence. Emphasize the risks of stopping prescribed medication without professional guidance."
      ]
      setResponse(mockResponses[Math.floor(Math.random() * mockResponses.length)])
      setIsGenerating(false)
    }, 2000)
  }

  const handleDeploy = () => {
    setIsDeploying(true)
    setTimeout(() => {
      setIsDeploying(false)
      setClaim("")
      setResponse(null)
    }, 2000)
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#071F18] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2 border border-white/10">Gov-Institutional Tier</Badge>
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-xl bg-[#0c6a54] flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <MessageSquare size={20} />
             </div>
             <h1 className="text-3xl font-black tracking-tight italic uppercase">Counter Messaging</h1>
          </div>
          <p className="text-muted-foreground font-medium italic">Deploy rapid, evidence-based responses to dangerous health narratives.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold gap-2">
              <Globe size={18} />
              Platform Reach
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black italic uppercase tracking-tighter">Enter Harmful Claim</h3>
               <Badge className="bg-red-100 text-red-600 border-none font-bold uppercase text-[10px]">Threat Level 4</Badge>
            </div>

            <div className="space-y-4">
               <Textarea 
                 placeholder="Paste the misinformation narrative here (e.g., viral posts, suspicious advertisements, or recurring verbal claims)..."
                 value={claim}
                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setClaim(e.target.value)}
                 className="min-h-[250px] rounded-3xl bg-secondary/30 border-none p-6 font-bold text-lg focus-visible:ring-indigo-600/20"
               />
               
               <div className="flex items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground font-medium">
                     Supports multi-language analysis and sentiment weighting.
                  </p>
                   <Button 
                    onClick={handleGenerate}
                    disabled={!claim || isGenerating}
                    className="rounded-2xl h-14 px-8 bg-[#071F18] font-black uppercase tracking-widest text-[11px] gap-2 shadow-xl shadow-[#0c6a54]/10"
                  >
                     {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                     {isGenerating ? "Generating..." : "Generate AI Response"}
                  </Button>
               </div>
            </div>
         </Card>

         <div className="space-y-6">
            <AnimatePresence mode="wait">
               {response ? (
                 <motion.div
                   key="response"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.95 }}
                 >
                     <Card className="border-none shadow-2xl bg-[#071F18] text-white rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
                       <div className="absolute top-0 right-0 h-40 w-40 bg-[#0c6a54]/5 rounded-bl-full" />
                       
                       <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
                          <div className="flex items-center gap-3">
                             <Sparkles size={20} className="text-indigo-400" />
                             <h3 className="text-sm font-black uppercase tracking-widest">AI Counter-Response</h3>
                          </div>
                          <div className="flex gap-1">
                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white/50 hover:text-white">
                                <Copy size={16} />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 text-white/50 hover:text-white">
                                <RefreshCw size={16} onClick={handleGenerate} />
                             </Button>
                          </div>
                       </div>

                       <CardContent className="p-0 space-y-6 relative z-10">
                          <p className="text-lg font-bold leading-relaxed text-green-50 italic">
                             {response}
                          </p>
                                                    <div className="p-4 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-secondary-foreground/40">Response Parameters</Label>
                             <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-secondary-foreground/30">Tone</p>
                                    <p className="text-xs font-black">Authoritative/Medical</p>
                                 </div>
                                 <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-secondary-foreground/30">Credibility Score</p>
                                    <p className="text-xs font-black text-[#2ECC9A]">98% Verified</p>
                                 </div>
                             </div>
                          </div>
                       </CardContent>

                       <CardFooter className="p-0 pt-2 flex gap-4 relative z-10">
                          <Button 
                            onClick={handleDeploy}
                            disabled={isDeploying}
                            className="flex-1 h-14 rounded-2xl bg-[#0c6a54] font-black uppercase tracking-widest text-xs gap-3 shadow-xl shadow-[#0c6a54]/20"
                          >
                             {isDeploying ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                             Deploy to Channels
                          </Button>
                          <Button variant="outline" className="h-14 w-14 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10">
                             <Share2 size={20} />
                          </Button>
                       </CardFooter>
                    </Card>
                 </motion.div>
               ) : (
                 <motion.div
                   key="empty"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6 border-2 border-dashed border-slate-200 rounded-[2.5rem]"
                 >
                    <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300">
                       <Zap size={40} />
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-xl font-black text-slate-400 capitalize">Analysis Pending</h4>
                       <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
                          Enter a claim and generate a response to see the AI agent's recommended counter-narrative.
                       </p>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
            
            <div className="p-8 rounded-[2rem] bg-[#0c6a54]/5 border border-[#0c6a54]/10 space-y-4">
               <div className="flex items-center gap-3">
                  <ShieldCheck size={24} className="text-[#0c6a54]" />
                  <h4 className="text-sm font-black italic uppercase tracking-tighter">Strategic Impact</h4>
               </div>
               <p className="text-xs text-[#0c6a54]/80 font-medium leading-relaxed">
                  These responses are optimized for high-risk demographic clusters in Nigeria and Ghana based on recent surveillance data.
               </p>
               <div className="flex items-center gap-2 text-[#0c6a54] font-black text-[10px] uppercase tracking-widest cursor-pointer hover:underline">
                  View Strategy <ArrowRight size={12} />
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("block", className)}>{children}</p>
}
