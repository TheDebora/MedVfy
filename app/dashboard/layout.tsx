"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar, Navbar } from "@/components/layout/nav"
import { useUserRole } from "@/hooks/use-user-role"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Zap, Lock, ArrowRight } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { role, isLoading } = useUserRole()
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = React.useState(false)

  // Role-based route protection
  React.useEffect(() => {
    if (isLoading) return

    const protectedNGO = ["/dashboard/ngo/"]
    const protectedGov = ["/dashboard/gov/"]

    if (role === "Free" && protectedNGO.some(route => pathname.includes(route))) {
      setShowUpgradeModal(true)
    } else if (role !== "Government" && protectedGov.some(route => pathname.includes(route))) {
      setShowUpgradeModal(true)
    }
  }, [pathname, role, isLoading])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white"
        >
          <ShieldCheck size={32} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] z-50 lg:hidden"
            >
              <Sidebar onMobileClose={() => setIsMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMobileOpen={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-6 lg:p-10">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      <Dialog open={showUpgradeModal} onOpenChange={(open) => {
        if (!open) {
          setShowUpgradeModal(false)
          router.push("/dashboard")
        }
      }}>
        <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-8 max-w-md">
          <DialogHeader className="space-y-4 text-center">
             <div className="mx-auto h-20 w-20 rounded-3xl bg-yellow-100 text-yellow-600 flex items-center justify-center shadow-xl shadow-yellow-100/50">
                <Lock size={40} />
             </div>
             <DialogTitle className="text-3xl font-black tracking-tight">Access Restricted</DialogTitle>
             <DialogDescription className="text-lg font-medium text-muted-foreground">
               This feature is only available for <span className="text-indigo-600 font-bold">NGO Premium</span> and <span className="text-slate-900 font-bold">Government Tier</span> users.
             </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-4">
             <div className="p-4 rounded-2xl bg-secondary/30 flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-white border shadow-sm flex items-center justify-center">
                   <Zap size={20} className="text-yellow-600" />
                </div>
                <div>
                   <p className="text-sm font-bold">Instant Access</p>
                   <p className="text-xs text-muted-foreground">Unlock institutional health toolkits today.</p>
                </div>
             </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-col gap-3 mt-2">
             <Button className="w-full h-14 rounded-2xl bg-primary font-black text-lg gap-2 shadow-xl shadow-primary/20">
                Upgrade Account <ArrowRight size={20} />
             </Button>
             <Button 
               variant="ghost" 
               onClick={() => {
                 setShowUpgradeModal(false)
                 router.push("/dashboard")
               }}
               className="w-full h-12 rounded-xl text-muted-foreground font-bold"
             >
                Back to Dashboard
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
