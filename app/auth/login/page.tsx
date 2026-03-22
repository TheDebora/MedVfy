"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, User, Lock, Mail, ChevronRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useUserRole, UserRole } from "@/hooks/use-user-role"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const { setRole } = useUserRole()
  const [selectedRole, setSelectedRole] = React.useState<UserRole>("Free")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login
    setTimeout(() => {
      setRole(selectedRole)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] overflow-hidden">
          <CardHeader className="p-8 text-center space-y-2">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-4">
               <Shield size={32} />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your secure vault.</CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                 <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                 <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="demo@medvfy.com" 
                      type="email"
                      required
                      className="h-14 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary/20 pl-12 font-medium" 
                    />
                 </div>
              </div>
              <div className="space-y-2">
                 <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                 <div className="relative">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="••••••••" 
                      type="password"
                      required
                      className="h-14 rounded-2xl bg-secondary/30 border-none focus-visible:ring-primary/20 pl-12 font-medium" 
                    />
                 </div>
              </div>

              <div className="space-y-3 pt-4">
                 <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Simulate User Role</Label>
                 <div className="grid grid-cols-1 gap-2">
                    {(["Free", "NGO", "Government"] as UserRole[]).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-sm font-bold",
                          selectedRole === role 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-transparent bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                        )}
                      >
                         <div className="flex items-center gap-3">
                            <User size={18} />
                            <span>{role} User</span>
                         </div>
                         {selectedRole === role && <CheckCircle2 size={18} />}
                      </button>
                    ))}
                 </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 rounded-2xl bg-primary font-black text-lg shadow-xl shadow-primary/20 mt-6 active:scale-[0.98] transition-all"
              >
                {isLoading ? "Authenticating..." : "Login to MedVfy"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="p-8 pt-0 flex justify-center border-t border-secondary/50">
             <p className="text-sm text-muted-foreground mt-6">
                Don't have an account? <Link href="/auth/register" className="text-primary font-bold hover:underline">Create Account</Link>
             </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
