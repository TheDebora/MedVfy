"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  Lock, 
  Eye, 
  Download, 
  Trash2, 
  AtSign, 
  History, 
  CheckCircle2,
  AlertCircle,
  Database,
  UserCheck,
  Building2,
  Fingerprint
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const accessLogs = [
  { id: 1, entity: "Dr. Mike Ross", type: "Doctor", data: "Medical Records", time: "2 hours ago", status: "Authorized" },
  { id: 2, entity: "HealthCare NGO", type: "NGO", data: "Verified Claims", time: "Yesterday", status: "Authorized" },
  { id: 3, entity: "MedVfy System", type: "System", data: "Identity Info", time: "3 days ago", status: "Authorized" },
  { id: 4, entity: "Unlisted Provider", type: "Unknown", data: "Full Profile", time: "May 10, 2024", status: "Blocked" },
]

export default function PrivacyPage() {
  const [shareWithDoctor, setShareWithDoctor] = React.useState(true)
  const [shareWithNGO, setShareWithNGO] = React.useState(false)
  const [isExporting, setIsExporting] = React.useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      alert("Data export started. Check your email.")
    }, 2000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Privacy & Security</h1>
        <p className="text-muted-foreground text-lg">Manage how your data is shared and who can access it.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Shield size={24} />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl font-black tracking-tight">Data Sharing</CardTitle>
                <CardDescription>Control access for trusted providers.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4 space-y-6">
             <div className="flex items-center justify-between p-6 rounded-2xl bg-secondary/30 border border-secondary/50">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <UserCheck size={20} />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-sm font-bold">Share with Doctor</p>
                      <p className="text-xs text-muted-foreground">Allow verified medical doctors to view records.</p>
                   </div>
                </div>
                <Switch checked={shareWithDoctor} onCheckedChange={setShareWithDoctor} />
             </div>

             <div className="flex items-center justify-between p-6 rounded-2xl bg-secondary/30 border border-secondary/50">
                <div className="flex items-center gap-4">
                   <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Building2 size={20} />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-sm font-bold">Share with NGOs</p>
                      <p className="text-xs text-muted-foreground">Anonymous data sharing for health initiatives.</p>
                   </div>
                </div>
                <Switch checked={shareWithNGO} onCheckedChange={setShareWithNGO} />
             </div>
          </CardContent>
          <CardFooter className="p-8 pt-0">
             <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
                <AtSign size={18} className="shrink-0 mt-0.5" />
                <p className="text-xs font-medium leading-relaxed">
                   Your data is encrypted using AES-256 standards before being shared with any authorized party.
                </p>
             </div>
          </CardFooter>
        </Card>

        <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
           <CardHeader className="p-8 pb-4">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Database size={24} />
                 </div>
                 <div className="space-y-1">
                    <CardTitle className="text-xl font-black tracking-tight">Data Management</CardTitle>
                    <CardDescription>Manage your account and stored data.</CardDescription>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="p-8 pt-4 space-y-4">
              <Button 
                variant="outline" 
                onClick={handleExport}
                disabled={isExporting}
                className="w-full h-16 rounded-2xl justify-start px-6 gap-4 border-none bg-secondary/30 hover:bg-secondary/50 transition-all font-bold group"
              >
                 <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                    <Download size={20} className="text-primary" />
                 </div>
                 <div className="text-left">
                    <p className="text-sm tracking-tight text-foreground">Export My Data</p>
                    <p className="text-[10px] text-muted-foreground">Download all records in a secure ZIP.</p>
                 </div>
              </Button>

              <Dialog>
                 <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full h-16 rounded-2xl justify-start px-6 gap-4 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold group">
                       <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Trash2 size={20} />
                       </div>
                       <div className="text-left">
                          <p className="text-sm tracking-tight">Delete Account</p>
                          <p className="text-[10px] text-red-500/70 uppercase tracking-widest font-black">Permanent Action</p>
                       </div>
                    </Button>
                 </DialogTrigger>
                 <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8 max-w-sm">
                    <DialogHeader className="space-y-4 text-center">
                       <div className="mx-auto h-16 w-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                          <AlertCircle size={32} />
                       </div>
                       <DialogTitle className="text-2xl font-black tracking-tight text-center">Delete Everything?</DialogTitle>
                       <DialogDescription className="text-center">
                         This will permanently delete all your medical records, verification history, and account settings. You cannot undo this.
                       </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-col gap-3 mt-4">
                       <Button className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-black text-lg">
                          YES, DELETE FOREVER
                       </Button>
                       <Button variant="ghost" className="w-full h-12 rounded-xl text-muted-foreground font-bold">
                          Go Back
                       </Button>
                    </DialogFooter>
                 </DialogContent>
              </Dialog>
           </CardContent>
           <CardFooter className="p-8 pt-0">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/50 text-muted-foreground border">
                 <Fingerprint size={18} className="shrink-0" />
                 <p className="text-xs font-medium">Biometric Unlock is active for mobile access.</p>
              </div>
           </CardFooter>
        </Card>
      </div>

      <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
         <CardHeader className="p-8">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                     <History size={24} />
                  </div>
                  <div className="space-y-1">
                     <CardTitle className="text-xl font-black tracking-tight">Recent Access Log</CardTitle>
                     <CardDescription>Track every time your health data was accessed.</CardDescription>
                  </div>
               </div>
               <Badge className="rounded-xl px-4 py-1.5 bg-primary/5 text-primary border-none font-bold uppercase tracking-widest text-[10px]">
                  Updated Real-time
               </Badge>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-secondary/20">
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b first:pl-8">Entity</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b">Category</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b">Data Scope</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b">Timestamp</th>
                        <th className="p-6 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground border-b last:pr-8 text-right">Status</th>
                     </tr>
                  </thead>
                  <tbody>
                     {accessLogs.map((log) => (
                        <tr key={log.id} className="group hover:bg-secondary/10 transition-colors">
                           <td className="p-6 border-b first:pl-8">
                              <div className="flex items-center gap-3">
                                 <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                    {log.entity[0]}
                                 </div>
                                 <span className="font-bold text-sm tracking-tight">{log.entity}</span>
                              </div>
                           </td>
                           <td className="p-6 border-b text-sm font-medium text-muted-foreground">{log.type}</td>
                           <td className="p-6 border-b text-sm font-medium">{log.data}</td>
                           <td className="p-6 border-b text-sm font-medium text-muted-foreground">{log.time}</td>
                           <td className="p-6 border-b last:pr-8 text-right">
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                log.status === "Authorized" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              )}>
                                 {log.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </CardContent>
         <CardFooter className="p-6 border-t flex justify-center">
            <Button variant="link" className="text-primary font-bold text-sm tracking-tight">Request Comprehensive Access Audit</Button>
         </CardFooter>
      </Card>
    </div>
  )
}
