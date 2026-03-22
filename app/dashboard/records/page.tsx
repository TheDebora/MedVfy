"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  Plus, 
  Lock, 
  ChevronRight, 
  Search, 
  Filter,
  Calendar,
  Stethoscope,
  Pill,
  AlertCircle,
  Clock,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Record {
  id: string
  title: string
  type: "Diagnosis" | "Medication" | "Allergy"
  date: string
  description: string
}

const initialRecords: Record[] = [
  { id: "1", title: "Type 2 Diabetes", type: "Diagnosis", date: "2024-03-15", description: "Ongoing management, blood sugar monitoring required." },
  { id: "2", title: "Metformin 500mg", type: "Medication", date: "2024-03-10", description: "Twice daily after meals." },
  { id: "3", title: "Penicillin", type: "Allergy", date: "2023-11-22", description: "Severe reaction reported in 2023." },
]

export default function RecordsPage() {
  const [records, setRecords] = React.useState<Record[]>([])
  const [isLocked, setIsLocked] = React.useState(true)
  const [pin, setPin] = React.useState("")
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    const saved = localStorage.getItem("medvfy_records")
    if (saved) {
      setRecords(JSON.parse(saved))
    } else {
      setRecords(initialRecords)
      localStorage.setItem("medvfy_records", JSON.stringify(initialRecords))
    }
  }, [])

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === "1234") {
      setIsLocked(false)
      setError(false)
    } else {
      setError(true)
      setPin("")
      setTimeout(() => setError(false), 2000)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Diagnosis": return Stethoscope
      case "Medication": return Pill
      case "Allergy": return AlertCircle
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Diagnosis": return "bg-blue-100 text-blue-600 border-blue-200"
      case "Medication": return "bg-purple-100 text-purple-600 border-purple-200"
      case "Allergy": return "bg-red-100 text-red-600 border-red-200"
      default: return "bg-gray-100 text-gray-600"
    }
  }

  if (isLocked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 bg-white rounded-[2.5rem] shadow-2xl border flex flex-col items-center text-center space-y-8"
        >
          <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary group">
             <Lock size={40} className="group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black">Private Vault</h2>
            <p className="text-muted-foreground">Enter your 4-digit PIN to access medical records.</p>
          </div>
          <form onSubmit={handleUnlock} className="w-full space-y-6">
             <div className="flex justify-center gap-4">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-4 w-4 rounded-full border-2 transition-all duration-300",
                      pin.length > i ? "bg-primary border-primary scale-125" : "border-muted-foreground/30",
                      error ? "bg-red-500 border-red-500 animate-shake" : ""
                    )} 
                  />
                ))}
             </div>
             <input 
               type="password" 
               maxLength={4} 
               autoFocus
               value={pin}
               onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
               className="sr-only"
             />
             <div className="grid grid-cols-3 gap-4 pb-4">
                {[1,2,3,4,5,6,7,8,9,0].map(n => (
                  <Button 
                    key={n} 
                    type="button"
                    variant="ghost" 
                    onClick={() => pin.length < 4 && setPin(p => p + n)}
                    className="h-16 w-16 text-xl font-bold rounded-2xl bg-secondary/50 hover:bg-secondary"
                  >
                    {n}
                  </Button>
                ))}
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => setPin(p => p.slice(0, -1))}
                  className="h-16 w-16 rounded-2xl bg-secondary/50"
                >
                  <ArrowLeft size={24} />
                </Button>
             </div>
             {pin.length === 4 && (
               <Button type="submit" className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20">
                  Unlock Vault
               </Button>
             )}
          </form>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Hint: 1234</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">Secure management of your health history.</p>
        </div>
        <Link href="/dashboard/records/add">
          <Button className="rounded-2xl h-12 px-6 gap-2 shadow-xl shadow-primary/20 font-bold">
            <Plus size={20} />
            <span>Add New Record</span>
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search records..." 
            className="pl-12 h-12 rounded-xl bg-white border-none shadow-sm focus-visible:ring-primary/20"
          />
        </div>
        <Button variant="outline" className="h-12 rounded-xl border-none bg-white shadow-sm px-4">
          <Filter size={18} />
        </Button>
      </div>

      <div className="grid gap-4">
        {records.length === 0 ? (
          <div className="py-20 text-center space-y-4 opacity-50">
             <FileText size={48} className="mx-auto text-muted-foreground" />
             <p className="font-bold">No records found. Add your first medical entry.</p>
          </div>
        ) : (
          records.map((record, idx) => {
            const Icon = getTypeIcon(record.type)
            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="border-none shadow-sm hover:shadow-md transition-all group cursor-pointer overflow-hidden bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="flex items-center p-6 gap-6">
                      <div className={cn(
                        "h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform",
                        getTypeColor(record.type).split(' ')[0],
                        getTypeColor(record.type).split(' ')[1],
                      )}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold tracking-tight">{record.title}</h3>
                          <Badge variant="outline" className={cn(
                            "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider",
                            getTypeColor(record.type)
                          )}>
                            {record.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{record.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>Updated recently</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
