"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Zap, 
  Upload, 
  Trash2, 
  Layout, 
  Paintbrush, 
  Globe, 
  Shield, 
  CheckCircle2, 
  Loader2,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export default function BrandingPage() {
  const [platformName, setPlatformName] = React.useState("MedVfy")
  const [accentColor, setAccentColor] = React.useState("#4F46E5")
  const [isSaving, setIsSaving] = React.useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setHasUnsavedChanges(false)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge className="bg-[#0c6a54] rounded-full px-3 py-1 font-black uppercase tracking-widest text-[10px] mb-2">NGO Premium</Badge>
          <h1 className="text-3xl font-black tracking-tight">Branding Settings</h1>
          <p className="text-muted-foreground font-medium">Customize the platform identity for your organization.</p>
        </div>
        <div className="flex gap-2">
           <Button 
             onClick={handleSave} 
             disabled={isSaving || !hasUnsavedChanges}
             className="rounded-xl bg-[#0c6a54] font-bold gap-2 shadow-lg shadow-[#0c6a54]/20"
           >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
              {isSaving ? "Saving..." : "Save Changes"}
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-8">
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#0c6a54]/10 text-[#0c6a54] flex items-center justify-center">
                     <Paintbrush size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl font-black italic uppercase tracking-tighter">Identity & Style</h3>
                     <p className="text-sm text-muted-foreground font-medium">Define your organization's presence on the platform.</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Platform Name</Label>
                     <Input 
                       value={platformName}
                       onChange={(e) => {
                         setPlatformName(e.target.value)
                         setHasUnsavedChanges(true)
                       }}
                       className="h-14 rounded-2xl bg-secondary/30 border-none font-bold text-lg focus-visible:ring-[#0c6a54]/20"
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Accent Color</Label>
                        <div className="flex items-center gap-3">
                           <div className="h-14 w-14 rounded-2xl border-4 border-white shadow-lg" style={{ backgroundColor: accentColor }} />
                           <Input 
                             type="text"
                             value={accentColor}
                             onChange={(e) => {
                               setAccentColor(e.target.value)
                               setHasUnsavedChanges(true)
                             }}
                             className="h-14 rounded-2xl bg-secondary/30 border-none font-bold font-mono focus-visible:ring-[#0c6a54]/20"
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Subdomain</Label>
                        <div className="relative">
                           <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                           <Input 
                             disabled
                             value="health-ngo.medvfy.com"
                             className="h-14 rounded-2xl bg-secondary/10 border-none font-bold pl-12 opacity-50"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </Card>

            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-8 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-[#0c6a54]/10 text-[#0c6a54] flex items-center justify-center">
                        <Layout size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter">Organization Logo</h3>
                     </div>
                  </div>
                  <Button variant="ghost" className="rounded-xl text-red-600 font-bold gap-2">
                     <Trash2 size={18} />
                     Remove
                  </Button>
               </div>

               <div className="border-2 border-dashed border-secondary rounded-[2rem] p-12 text-center space-y-4 hover:border-[#0c6a54]/20 transition-colors cursor-pointer group">
                  <div className="h-20 w-20 rounded-3xl bg-[#0c6a54]/5 flex items-center justify-center mx-auto text-[#0c6a54] group-hover:scale-110 transition-transform">
                     <Upload size={32} />
                  </div>
                  <div className="space-y-1">
                     <p className="font-black">Click to upload or drag and drop</p>
                     <p className="text-xs text-muted-foreground">SVG, PNG, or JPG (max. 800x400px)</p>
                  </div>
               </div>
            </Card>
         </div>

         <div className="space-y-8">
            <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2.5rem] p-8 space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-bl-full -z-0" />
               <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                     <Eye size={20} className="text-[#0c6a54]" />
                     <h3 className="text-sm font-black uppercase tracking-widest">Live Preview</h3>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-slate-900">
                           <Shield size={20} />
                        </div>
                        <span className="font-black text-sm">{platformName}</span>
                     </div>
                     <div className="space-y-1">
                        <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                        <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                     </div>
                      <div className="h-8 w-full rounded-xl bg-[#0c6a54] flex items-center justify-center text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#0c6a54]/30">
                        Primary Action
                     </div>
                  </div>

                  <p className="text-xs text-slate-400 font-medium">
                     This is how your branding will appear in the sidebar and dashboard headers for all associated users.
                  </p>
               </div>
            </Card>

            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-6 space-y-6">
               <h4 className="text-sm font-black uppercase tracking-widest italic">Compliance</h4>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <Label className="text-xs font-bold text-muted-foreground">White-label UI</Label>
                     <Switch checked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                     <Label className="text-xs font-bold text-muted-foreground">Remove Powered By</Label>
                     <Switch checked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                     <Label className="text-xs font-bold text-muted-foreground">Custom SMTP</Label>
                     <Switch checked={false} />
                  </div>
               </div>
            </Card>
         </div>
      </div>
    </div>
  )
}
