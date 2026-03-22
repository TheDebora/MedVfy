"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShieldCheck, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Share2, 
  ExternalLink,
  Loader2,
  CheckCircle2,
  Info,
  MessageCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sidebar, Navbar } from "@/components/layout/nav"
import { cn } from "@/lib/utils"

type Verdict = "verified" | "misleading" | "dangerous"

interface Result {
  verdict: Verdict
  explanation: string
  sources: { title: string; url: string }[]
}

export default function VerifyPage() {
  const [input, setInput] = React.useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [result, setResult] = React.useState<Result | null>(null)

  const handleVerify = () => {
    if (!input.trim()) return

    setIsLoading(true)
    setResult(null)

    // Simulate AI Latency
    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let mockResult: Result

      if (lowerInput.includes("cure") || lowerInput.includes("miracle") || lowerInput.includes("100%")) {
        mockResult = {
          verdict: "dangerous",
          explanation: "This claim makes absolute medical promises that are not supported by clinical evidence. Promoting unverified cures can lead to delayed professional treatment and serious health risks.",
          sources: [
            { title: "WHO: Fact-checking health claims", url: "#" },
            { title: "CDC: Avoiding medical misinformation", url: "#" }
          ]
        }
      } else if (lowerInput.includes("study") || lowerInput.includes("may") || lowerInput.includes("can")) {
        mockResult = {
          verdict: "misleading",
          explanation: "While there may be some truth or ongoing research, the claim oversimplifies complex medical data or takes a study out of context. Accuracy depends on specific conditions not mentioned here.",
          sources: [
            { title: "NIH: Understanding clinical trials", url: "#" },
            { title: "Mayo Clinic: Evaluating health news", url: "#" }
          ]
        }
      } else {
        mockResult = {
          verdict: "verified",
          explanation: "This claim aligns with established medical consensus and peer-reviewed research. It follows standard health guidelines provided by leading global health organizations.",
          sources: [
            { title: "Verified Medical Encyclopedia", url: "#" },
            { title: "Global Health Standards Board", url: "#" }
          ]
        }
      }

      setResult(mockResult)
      setIsLoading(false)
    }, 2000)
  }

  const getVerdictDetails = (verdict: Verdict) => {
    switch (verdict) {
      case "verified":
        return {
          label: "Verified",
          icon: CheckCircle2,
          color: "text-green-600",
          bg: "bg-green-100",
          border: "border-green-200"
        }
      case "misleading":
        return {
          label: "Misleading",
          icon: AlertTriangle,
          color: "text-amber-600",
          bg: "bg-amber-100",
          border: "border-amber-200"
        }
      case "dangerous":
        return {
          label: "Dangerous",
          icon: ShieldAlert,
          color: "text-red-600",
          bg: "bg-red-100",
          border: "border-red-200"
        }
    }
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      {/* Sidebar Overlay/Drawer Logic integrated */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar />
      </div>

       <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 w-72 lg:hidden"
            >
              <Sidebar onMobileClose={() => setIsMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <Navbar onMobileOpen={() => setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-10 max-w-4xl mx-auto w-full space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tight text-foreground">AI Health Verification</h1>
            <p className="text-muted-foreground text-lg">Instant analysis of health claims and medical advice.</p>
          </div>

          <Card className="border-none shadow-xl shadow-primary/5 bg-white rounded-[2rem] overflow-hidden">
            <CardContent className="p-6 lg:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Input Claim</span>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste a health claim, WhatsApp message, or medical advice here..."
                  className="w-full min-h-[160px] p-6 rounded-[1.5rem] bg-secondary/30 border-none focus:ring-2 focus:ring-primary/20 resize-none text-lg transition-all"
                />
              </div>
              <Button 
                onClick={handleVerify}
                disabled={isLoading || !input.trim()}
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Analyzing Claim...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search size={20} />
                    <span>Verify Claim</span>
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          <AnimatePresence mode="wait">
            {result && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, type: "spring", damping: 20 }}
              >
                <Card className="border-none shadow-2xl bg-white rounded-[2rem] overflow-hidden relative">
                   <div className={cn(
                     "absolute top-0 left-0 w-full h-2",
                     getVerdictDetails(result.verdict).bg.replace('bg-', 'bg-')
                   )} />
                   
                   <CardHeader className="p-8 pb-4">
                      <div className="flex items-center justify-between mb-4">
                         <div className={cn(
                           "flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-black uppercase tracking-tight",
                           getVerdictDetails(result.verdict).bg,
                           getVerdictDetails(result.verdict).color,
                           getVerdictDetails(result.verdict).border
                         )}>
                            {React.createElement(getVerdictDetails(result.verdict).icon, { size: 18 })}
                            <span>{getVerdictDetails(result.verdict).label}</span>
                         </div>
                         <Button variant="ghost" size="icon" className="rounded-xl">
                            <Share2 size={20} className="text-muted-foreground" />
                         </Button>
                      </div>
                      <CardTitle className="text-2xl font-bold">Analysis Verdict</CardTitle>
                   </CardHeader>

                   <CardContent className="p-8 pt-0 space-y-8">
                      <div className="p-6 rounded-2xl bg-secondary/30 border border-secondary/50">
                        <p className="text-lg leading-relaxed text-foreground/80 lowercase first-letter:uppercase">
                          {result.explanation}
                        </p>
                      </div>

                      <div className="space-y-4">
                         <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Trusted Sources</h4>
                         <div className="grid gap-3">
                            {result.sources.map((source, i) => (
                              <Link 
                                key={i} 
                                href={source.url} 
                                className="flex items-center justify-between p-4 rounded-xl bg-white border hover:bg-secondary/10 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                   <div className="h-8 w-8 rounded-lg bg-[#0c6a54]/10 flex items-center justify-center text-[#0c6a54]">
                                      <Info size={16} />
                                   </div>
                                   <span className="font-semibold text-sm">{source.title}</span>
                                </div>
                                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                              </Link>
                            ))}
                         </div>
                      </div>
                   </CardContent>

                   <CardFooter className="p-8 pt-0 flex flex-col gap-4">
                      <Button className="w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold gap-2">
                        <MessageCircle size={20} />
                        Share Result on WhatsApp
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                        Verify results are generated by MedVfy AI and should be cross-referenced with your doctor.
                      </p>
                   </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 opacity-30 px-10">
               <div className="h-20 w-20 rounded-[2rem] border-4 border-dashed border-primary/30 flex items-center justify-center">
                  <ShieldCheck size={40} className="text-primary" />
               </div>
               <div className="space-y-2">
                  <h3 className="text-xl font-bold">Ready to analyze</h3>
                  <p className="max-w-xs mx-auto">Paste any claim above to start the verification process powered by our medical AI engine.</p>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

import NextLink from "next/link"

function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  )
}
