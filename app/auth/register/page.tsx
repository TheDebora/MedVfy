import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
      <Card className="w-full max-w-lg shadow-2xl shadow-[#0c6a54]/10 rounded-[2.5rem] border-none overflow-hidden">
        <CardHeader className="space-y-1 flex flex-col items-center p-10 pb-0">
          <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 mb-6">
            <Shield className="h-7 w-7" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight italic uppercase text-[#071F18]">Create Account</CardTitle>
          <CardDescription className="text-center font-medium">
            Join the MedVfy institutional network for secure health coordination.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#0c6a54]/60 ml-1" htmlFor="first-name">First Name</label>
              <Input id="first-name" placeholder="John" className="h-12 rounded-xl bg-secondary/20 border-none focus-visible:ring-primary/20 font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#0c6a54]/60 ml-1" htmlFor="last-name">Last Name</label>
              <Input id="last-name" placeholder="Doe" className="h-12 rounded-xl bg-secondary/20 border-none focus-visible:ring-primary/20 font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0c6a54]/60 ml-1" htmlFor="email">Email Address</label>
            <Input id="email" placeholder="name@institutional.gov" type="email" className="h-12 rounded-xl bg-secondary/20 border-none focus-visible:ring-primary/20 font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0c6a54]/60 ml-1" htmlFor="password">Password</label>
            <Input id="password" type="password" className="h-12 rounded-xl bg-secondary/20 border-none focus-visible:ring-primary/20 font-medium" />
          </div>
          <p className="text-[10px] text-muted-foreground/60 font-medium text-center uppercase tracking-widest leading-relaxed pt-2">
            By clicking sign up, you agree to our <br /> Terms of Service and Privacy Charter.
          </p>
          <Button className="w-full rounded-2xl h-14 bg-primary font-black uppercase tracking-widest text-[11px] shadow-xl shadow-primary/20 mt-4 active:scale-[0.98] transition-all">
            Initialize Access
          </Button>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-1 border-t pt-6">
          <span className="text-sm text-muted-foreground" >Already have an account?</span>
          <Link href="/auth/login" className="text-sm font-bold text-primary hover:underline">
            Login here
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
