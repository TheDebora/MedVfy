"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Layers, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Download, 
  Trash2,
  Table as TableIcon,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Claim {
  id: string
  content: string
  verdict?: "verified" | "misleading" | "dangerous"
  confidence: number
}

const mockClaims: Claim[] = [
  { id: "1", content: "Lemon water cures diabetes in 3 days with zero side effects.", confidence: 0 },
  { id: "2", content: "New study suggests moderate coffee consumption may lower heart disease risk.", confidence: 0 },
  { id: "3", content: "Boiling garlic and drinking the water is a 100% effective miracle cure for COVID-19.", confidence: 0 },
  { id: "4", content: "Wearing copper bracelets can alleviate arthritis pain permanently.", confidence: 0 },
  { id: "5", content: "Regular exercise is recommended for maintaining cardiovascular health.", confidence: 0 },
]

export default function BulkUploadPage() {
  const [isUploading, setIsUploading] = React.useState(false)
  const [claims, setClaims] = React.useState<Claim[]>([])
  const [isVerifying, setIsVerifying] = React.useState(false)

  const handleUpload = () => {
    setIsUploading(true)
    // Simulate parsing
    setTimeout(() => {
      setClaims(mockClaims)
      setIsUploading(false)
    }, 1500)
  }

  const handleVerifyAll = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setClaims(prev => prev.map(claim => {
        const lower = claim.content.toLowerCase()
        let verdict: "verified" | "misleading" | "dangerous" = "verified"
        if (lower.includes("cure") || lower.includes("miracle") || lower.includes("100%")) {
            verdict = "dangerous"
        } else if (lower.includes("may") || lower.includes("can") || lower.includes("study")) {
            verdict = "misleading"
        }
        return { ...claim, verdict, confidence: Math.floor(Math.random() * 20) + 80 }
      }))
      setIsVerifying(false)
    }, 2500)
  }

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "verified": return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 font-bold">Verified</Badge>
      case "misleading": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-3 font-bold">Misleading</Badge>
      case "dangerous": return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none px-3 font-bold">Dangerous</Badge>
      default: return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#0c6a54] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2">NGO Premium</Badge>
          <h1 className="text-3xl font-black tracking-tight">Bulk Verification</h1>
          <p className="text-muted-foreground font-medium">Upload datasets for large-scale misinformation analysis.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-xl border-secondary font-bold gap-2">
              <Download size={18} />
              Template
           </Button>
           <Button className="rounded-xl bg-[#0c6a54] font-bold gap-2 shadow-lg shadow-indigo-200">
              <TableIcon size={18} />
              History
           </Button>
        </div>
      </div>

      {!claims.length ? (
        <Card className="border-2 border-dashed border-indigo-200 shadow-none bg-indigo-50/30 rounded-[2.5rem] p-12 text-center space-y-6">
           <div className="h-20 w-20 rounded-3xl bg-white border shadow-sm flex items-center justify-center mx-auto text-indigo-600">
              <Upload size={32} />
           </div>
           <div className="space-y-2 max-w-sm mx-auto">
              <h3 className="text-xl font-black">Upload your CSV</h3>
              <p className="text-muted-foreground text-sm font-medium">Drop your dataset containing health claims, social media posts, or news headings here.</p>
           </div>
           <input type="file" className="hidden" id="csv-upload" onChange={handleUpload} />
           <Button 
             onClick={() => document.getElementById('csv-upload')?.click()}
             disabled={isUploading}
             className="rounded-2xl h-12 px-8 bg-indigo-600 font-bold shadow-xl shadow-indigo-100"
           >
              {isUploading ? <Loader2 className="animate-spin" /> : "Select CSV File"}
           </Button>
        </Card>
      ) : (
        <div className="space-y-6">
           <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#0c6a54]/10 text-[#0c6a54] flex items-center justify-center">
                       <FileText size={20} />
                    </div>
                    <div>
                        <h4 className="font-black text-sm uppercase tracking-widest">Dataset: health_claims_march.csv</h4>
                        <p className="text-xs text-muted-foreground font-medium">{claims.length} entries detected</p>
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <Button onClick={() => setClaims([])} variant="ghost" className="rounded-xl text-red-600 hover:bg-red-50">
                       <Trash2 size={18} />
                    </Button>
                    <Button
                      onClick={handleVerifyAll}
                      disabled={isVerifying}
                      className="rounded-xl bg-primary font-bold gap-2"
                    >
                       {isVerifying ? <Loader2 className="animate-spin" size={18} /> : <ShieldAlert size={18} />}
                       {isVerifying ? "Processing..." : "Verify All Claims"}
                    </Button>
                 </div>
              </div>
              <CardContent className="p-0">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-secondary/30 text-xs font-black uppercase tracking-widest text-muted-foreground border-b border-secondary/50">
                             <th className="px-6 py-4">Status</th>
                             <th className="px-6 py-4 w-1/2">Health Claim Content</th>
                             <th className="px-6 py-4">AI Confidence</th>
                             <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-secondary/50">
                          {claims.map((claim) => (
                            <tr key={claim.id} className="hover:bg-secondary/10 transition-colors">
                               <td className="px-6 py-4">
                                  {claim.verdict ? getVerdictBadge(claim.verdict) : <Badge className="bg-secondary text-muted-foreground border-none font-bold">Pending</Badge>}
                               </td>
                               <td className="px-6 py-4">
                                  <p className="text-sm font-bold truncate max-w-md">{claim.content}</p>
                               </td>
                               <td className="px-6 py-4">
                                  {claim.verdict ? (
                                    <div className="flex items-center gap-2">
                                       <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                                          <div className="h-full bg-[#0c6a54]" style={{ width: `${claim.confidence}%` }} />
                                       </div>
                                       <span className="text-xs font-black text-indigo-600">{claim.confidence}%</span>
                                    </div>
                                  ) : "—"}
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                                     <Search size={14} className="text-muted-foreground" />
                                  </Button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </CardContent>
           </Card>
           
           {claims.some(c => c.verdict) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                 <Card className="border-none shadow-xl bg-white rounded-3xl p-6 border-l-4 border-red-500">
                    <h5 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Dangerous Hits</h5>
                    <p className="text-3xl font-black text-red-600">{claims.filter(c => c.verdict === "dangerous").length}</p>
                 </Card>
                 <Card className="border-none shadow-xl bg-white rounded-3xl p-6 border-l-4 border-green-500">
                    <h5 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Accurate Data</h5>
                    <p className="text-3xl font-black text-green-600">{claims.filter(c => c.verdict === "verified").length}</p>
                 </Card>
                 <Card className="border-none shadow-xl bg-white rounded-3xl p-6 border-l-4 border-indigo-500">
                    <h5 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Total Processed</h5>
                    <p className="text-3xl font-black text-indigo-600">{claims.length}</p>
                 </Card>
              </motion.div>
           )}
        </div>
      )}
    </div>
  )
}
