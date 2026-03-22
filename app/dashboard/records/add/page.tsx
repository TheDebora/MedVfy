"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Save, 
  Stethoscope, 
  Pill, 
  AlertCircle, 
  FileText,
  CheckCircle2,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  motion, 
  AnimatePresence 
} from "framer-motion"
import { cn } from "@/lib/utils"

export default function AddRecordPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: "",
    type: "Diagnosis",
    description: "",
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate save
    setTimeout(() => {
      const records = JSON.parse(localStorage.getItem("medvfy_records") || "[]")
      const newRecord = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9)
      }
      localStorage.setItem("medvfy_records", JSON.stringify([newRecord, ...records]))
      
      setIsSubmitting(false)
      setIsSuccess(true)
      
      setTimeout(() => {
        router.push("/dashboard/records")
      }, 1500)
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Button 
        variant="ghost" 
        onClick={() => router.back()}
        className="rounded-xl gap-2 hover:bg-secondary -ml-2"
      >
        <ArrowLeft size={18} />
        <span className="font-bold">Back to Records</span>
      </Button>

      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight">Add New Record</h1>
        <p className="text-muted-foreground">Securely add a new health entry to your vault.</p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 flex flex-col items-center text-center space-y-6"
          >
            <div className="h-24 w-24 rounded-[2rem] bg-green-100 text-green-600 flex items-center justify-center shadow-xl shadow-green-100/50">
               <CheckCircle2 size={48} />
            </div>
            <div className="space-y-2">
               <h3 className="text-2xl font-black">Record Saved!</h3>
               <p className="text-muted-foreground">Redirecting you back to your health vault...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="border-none shadow-2xl bg-white rounded-[2rem] overflow-hidden">
               <CardHeader className="bg-primary/5 p-8 border-b border-primary/10">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                        <Save size={24} />
                     </div>
                     <div>
                        <CardTitle className="text-xl font-black">Record Details</CardTitle>
                        <CardDescription>All data is encrypted before storage.</CardDescription>
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="p-8 space-y-6">
                  <div className="space-y-3">
                     <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Title</Label>
                     <Input 
                       id="title" 
                       placeholder="e.g. Chronic Back Pain" 
                       required
                       value={formData.title}
                       onChange={e => setFormData(d => ({ ...d, title: e.target.value }))}
                       className="h-14 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary/20 text-lg px-6 font-medium" 
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                       <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Record Type</Label>
                       <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: "Diagnosis", icon: Stethoscope, color: "text-blue-600", bg: "bg-blue-50" },
                            { id: "Medication", icon: Pill, color: "text-purple-600", bg: "bg-purple-50" },
                            { id: "Allergy", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" }
                          ].map(t => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setFormData(d => ({ ...d, type: t.id as any }))}
                              className={cn(
                                "flex items-center justify-between p-3 rounded-xl border-2 transition-all",
                                formData.type === t.id 
                                  ? "border-primary bg-primary/5" 
                                  : "border-transparent bg-secondary/30 hover:bg-secondary/50"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                 <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", t.bg, t.color)}>
                                    <t.icon size={16} />
                                 </div>
                                 <span className="font-bold text-sm tracking-tight">{t.id}</span>
                              </div>
                              {formData.type === t.id && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                              )}
                            </button>
                          ))}
                       </div>
                    </div>
                    <div className="space-y-3">
                       <Label htmlFor="date" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Date</Label>
                       <div className="relative">
                          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            id="date" 
                            type="date" 
                            required
                            value={formData.date}
                            onChange={e => setFormData(d => ({ ...d, date: e.target.value }))}
                            className="h-14 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary/20 pl-12 font-medium" 
                          />
                       </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                     <Label htmlFor="desc" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Notes / Description</Label>
                     <textarea 
                       id="desc" 
                       placeholder="Additional details about this record..."
                       value={formData.description}
                       onChange={e => setFormData(d => ({ ...d, description: e.target.value }))}
                       className="w-full min-h-[120px] p-6 rounded-2xl bg-secondary/30 border-none focus:ring-2 focus:ring-primary/20 resize-none font-medium"
                     />
                  </div>
               </CardContent>
               <CardFooter className="p-8 pt-0">
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.title}
                    className="w-full h-14 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
                  >
                    {isSubmitting ? "Saving Record..." : "Secure Save Record"}
                  </Button>
               </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
