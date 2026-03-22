"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  AlertTriangle, 
  MapPin, 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Loader2,
  ShieldAlert,
  Phone,
  ArrowRight,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface Contact {
  id: string
  name: string
  phone: string
}

export default function EmergencyPage() {
  const [contacts, setContacts] = React.useState<Contact[]>([])
  const [isSending, setIsSending] = React.useState(false)
  const [isSent, setIsSent] = React.useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false)
  
  const [newContact, setNewContact] = React.useState({ name: "", phone: "" })

  React.useEffect(() => {
    const saved = localStorage.getItem("medvfy_emergency_contacts")
    if (saved) {
      setContacts(JSON.parse(saved))
    }
  }, [])

  const saveContacts = (newContacts: Contact[]) => {
    setContacts(newContacts)
    localStorage.setItem("medvfy_emergency_contacts", JSON.stringify(newContacts))
  }

  const addContact = () => {
    if (contacts.length >= 5 || !newContact.name || !newContact.phone) return
    const contact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      ...newContact
    }
    saveContacts([...contacts, contact])
    setNewContact({ name: "", phone: "" })
  }

  const removeContact = (id: string) => {
    saveContacts(contacts.filter(c => c.id !== id))
  }

  const triggerSOS = () => {
    setIsConfirmOpen(false)
    setIsSending(true)
    
    // Simulate sending broadcast
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      
      setTimeout(() => setIsSent(false), 5000)
    }, 2500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground">Emergency SOS</h1>
        <p className="text-muted-foreground text-lg">One-tap emergency broadcast to your trusted network.</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8">
        <AnimatePresence mode="wait">
          {isSent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center text-center space-y-6"
            >
              <div className="h-40 w-40 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-2xl shadow-green-100/50">
                <CheckCircle2 size={80} />
              </div>
              <div className="space-y-2">
                 <h2 className="text-3xl font-black">Alert Sent Successfuly</h2>
                 <p className="text-muted-foreground font-medium">Your location and emergency details have been sent to {contacts.length} contacts.</p>
              </div>
            </motion.div>
          ) : isSending ? (
            <motion.div
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center space-y-8"
            >
               <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
                  <div className="h-40 w-40 rounded-full bg-red-100 text-red-600 flex items-center justify-center relative">
                    <Loader2 size={80} className="animate-spin" />
                  </div>
               </div>
               <div className="space-y-2">
                  <h2 className="text-3xl font-black">Sending Broadcast...</h2>
                  <p className="text-muted-foreground animate-pulse text-lg">Initializing emergency protocols & GPS tracking.</p>
               </div>
            </motion.div>
          ) : (
            <motion.div
              key="normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center w-full"
            >
              <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogTrigger asChild>
                  <button className="group relative">
                    <div className="absolute inset-0 rounded-full bg-red-500/30 blur-2xl group-hover:scale-125 transition-transform duration-500" />
                    <div className="absolute inset-0 rounded-full border-4 border-red-500/20 scale-110 group-hover:scale-125 transition-transform duration-500" />
                    <div className="h-64 w-64 rounded-full bg-red-600 flex flex-col items-center justify-center text-white shadow-[0_0_50px_rgba(220,38,38,0.3)] transition-all active:scale-95 group-hover:bg-red-500 pointer-events-auto relative z-10">
                       <ShieldAlert size={80} className="mb-2 group-hover:scale-110 transition-transform" />
                       <span className="text-2xl font-black uppercase tracking-tighter">Trigger SOS</span>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8 max-w-sm">
                   <DialogHeader className="space-y-4 text-center">
                      <div className="mx-auto h-16 w-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                         <AlertTriangle size={32} />
                      </div>
                      <DialogTitle className="text-2xl font-black">Confirm SOS Alert?</DialogTitle>
                      <DialogDescription className="text-base">
                        This will immediately notify your {contacts.length} emergency contacts with your current GPS location.
                      </DialogDescription>
                   </DialogHeader>
                   <DialogFooter className="flex flex-col sm:flex-col gap-3 mt-4">
                      <Button 
                        onClick={triggerSOS}
                        className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-700 font-black text-xl shadow-lg shadow-red-200"
                      >
                         SEND ALERT NOW
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => setIsConfirmOpen(false)}
                        className="w-full h-12 rounded-xl text-muted-foreground font-bold"
                      >
                         Cancel
                      </Button>
                   </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="mt-12 flex items-center gap-2 text-sm text-muted-foreground font-bold uppercase tracking-widest bg-secondary/50 px-4 py-2 rounded-full">
                 <MapPin size={14} className="text-red-500" />
                 <span>Location Tracking: Active</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <CardTitle className="text-2xl font-black">Trusted Network</CardTitle>
                     <CardDescription>Emergency contacts ({contacts.length}/5)</CardDescription>
                  </div>
                  <Users size={32} className="text-primary/20" />
               </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
               {contacts.length === 0 ? (
                 <div className="py-10 text-center space-y-4 opacity-50 bg-secondary/20 rounded-3xl border-2 border-dashed">
                    <Users size={40} className="mx-auto" />
                    <p className="text-sm font-bold">No contacts added yet.</p>
                 </div>
               ) : (
                 <div className="space-y-3">
                   {contacts.map((contact) => (
                     <div key={contact.id} className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors group">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                              {contact.name[0]}
                           </div>
                           <div>
                              <p className="font-bold text-sm tracking-tight">{contact.name}</p>
                              <p className="text-xs text-muted-foreground font-medium">{contact.phone}</p>
                           </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeContact(contact.id)}
                          className="rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                           <Trash2 size={18} />
                        </Button>
                     </div>
                   ))}
                 </div>
               )}
            </CardContent>
         </Card>

         <Card className="border-none shadow-xl bg-white rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
               <CardTitle className="text-2xl font-black">Add Trusted Contact</CardTitle>
               <CardDescription>Add someone you trust to be notified in an emergency.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
               <div className="space-y-4">
                  <div className="space-y-2">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                     <Input 
                        placeholder="John Doe" 
                        value={newContact.name}
                        onChange={e => setNewContact(c => ({ ...c, name: e.target.value }))}
                        className="h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary/20 font-medium px-4" 
                     />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                     <div className="relative">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                           placeholder="+1 (555) 000-0000" 
                           value={newContact.phone}
                           onChange={e => setNewContact(c => ({ ...c, phone: e.target.value }))}
                           className="h-12 rounded-xl bg-secondary/30 border-none focus-visible:ring-primary/20 font-medium pl-12" 
                        />
                     </div>
                  </div>
               </div>
               <Button 
                 onClick={addContact}
                 disabled={contacts.length >= 5 || !newContact.name || !newContact.phone}
                 className="w-full h-12 rounded-xl font-bold bg-primary shadow-lg shadow-primary/20"
               >
                  <Plus size={18} className="mr-2" />
                  Add to Network
               </Button>
            </CardContent>
            <CardFooter className="p-8 pt-0">
               <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
                  <Info size={18} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-medium leading-relaxed">
                     Emergency contacts will receive a secure link to view your real-time location and medical profile when you trigger SOS.
                  </p>
               </div>
            </CardFooter>
         </Card>
      </div>
    </div>
  )
}
