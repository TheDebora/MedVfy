"use client"

import Link from "next/link"
import { 
  Shield, 
  Lock, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  ShieldCheck,
  Building,
  Users,
  Search,
  Zap,
  Check,
  Terminal as TerminalIcon,
  ShieldAlert,
  Server,
  Fingerprint,
  Info
} from "lucide-react"
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
}

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("block", className)}>{children}</p>
}

export default function LandingPage() {
  const [claim, setClaim] = useState("")

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/10 selection:text-primary scroll-smooth font-sans">
      {/* Navbar - Solid #0C6A54 */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-[#0A5242] shadow-sm">
        <nav className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4">
          <Link className="flex items-center group" href="/">
            <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center text-primary transition-transform group-hover:scale-105">
              <Shield className="h-5 w-5 fill-primary" />
            </div>
            <span className="ml-3 text-xl font-serif font-bold tracking-tight text-white italic">
              MedVfy
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link className="text-sm font-semibold text-white/80 hover:text-white transition-colors" href="#features">
              Infrastructure
            </Link>
            <Link className="text-sm font-semibold text-white/80 hover:text-white transition-colors" href="#how-it-works">
              Protocols
            </Link>
            <Link className="text-sm font-semibold text-white/80 hover:text-white transition-colors" href="#audience">
              Institutional Roles
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="hidden sm:block text-sm font-bold text-white/90 hover:text-white transition-colors">
              Systems Login
            </Link>
            <Button asChild className="rounded-full px-8 bg-white text-primary hover:bg-white/90 font-bold shadow-2xl transition-all">
              <Link href="/auth/register">Request Access</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section - Full-bleed #0C6A54 */}
        <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 bg-primary medical-grid overflow-hidden">
          <div className="container px-6 mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 border border-white/20 text-accent text-[11px] font-black uppercase tracking-[0.2em]"
                >
                  <Activity className="h-3 w-3" />
                  <span>Clinical Intelligence Node Alpha</span>
                </motion.div>

                <div className="space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-serif text-white sm:text-7xl md:text-8xl leading-[1.05] tracking-tight"
                  >
                    Verify Health <br /> Information. <br /><span className="text-accent underline decoration-accent/30 decoration-4 underline-offset-8">Save Lives.</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-xl text-white/75 text-lg md:text-xl font-medium leading-relaxed"
                  >
                    Medical-grade AI designed for institutional health coordination,
                    secure biometric record storage, and viral misinformation containment.
                    Zero fluff. Clinical precision.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-5"
                >
                  <Button size="lg" className="rounded-full h-16 px-12 text-sm font-black uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl hover:translate-y-[-2px] transition-all group" asChild>
                    <Link href="/verify">
                      Submit for Verification <Search className="ml-3 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full h-16 px-12 text-sm font-black uppercase tracking-widest border-white text-white hover:bg-white/10 transition-all font-bold" asChild>
                    <Link href="/auth/register">
                      Request Access
                    </Link>
                  </Button>
                </motion.div>

                {/* Trust bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="flex flex-wrap gap-x-8 gap-y-4 pt-10 border-t border-white/10"
                >
                  {["HIPAA Compliant", "ISO 27001", "FDA Registered", "SOC 2 Type II"].map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-white text-[10px] font-black uppercase tracking-widest">
                      <ShieldCheck className="h-3 w-3 text-accent" />
                      {tag}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Terminal Verification Widget */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative hidden lg:block"
              >
                <div className="bg-[#071F18] rounded-3xl p-1 border border-white/10 shadow-[0_0_100px_rgba(46,204,154,0.15)]">
                  <div className="bg-[#071F18] rounded-[1.4rem] overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
                      <div className="flex items-center gap-3">
                         <div className="flex gap-1.5">
                            <div className="h-2 w-2 rounded-full bg-red-500/50" />
                            <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                            <div className="h-2 w-2 rounded-full bg-[#2ECC9A]/50" />
                         </div>
                         <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.2em]">VERIFICATION_ENGINE_v4.2</span>
                      </div>
                      <TerminalIcon size={14} className="text-white/20" />
                    </div>
                    <div className="p-8 font-mono text-sm leading-relaxed min-h-[400px]">
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <span className="text-accent shrink-0">$&gt;</span>
                          <span className="text-white/90">analysing_input: "Unpasteurized milk prevents chronic respiratory disease..."</span>
                        </div>
                        <div className="text-white/40">[...] CROSS_REFERENCING_NCDC_DATABASES</div>
                        <div className="text-white/40">[...] QUERYING_PEER_REVIEWED_MANUSCRIPTS</div>
                        <div className="text-white/40">[...] VALIDATING_AUTHOR_CREDENTIALS</div>
                        <div className="pt-6 space-y-6">
                           <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg">
                              <div className="flex items-center justify-center p-1 bg-accent rounded text-[#071F18]">
                                <Check size={14} strokeWidth={4} />
                              </div>
                              <span className="text-accent font-black tracking-widest text-xs uppercase">VERIFIED_VERDICT: DANGEROUS_MISINFORMATION</span>
                           </div>
                           <div className="space-y-2 text-xs">
                              <p className="text-white/60">SOURCE: National Institute of Allergy and Infectious Diseases (NIAID)</p>
                              <p className="text-white/60">CONFIDENCE: 99.82%</p>
                              <p className="text-white/60">EVIDENCE: Meta-analysis (n=14,200) confirms direct correlation with zoonotic pathogen transmission.</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 px-6 py-4 bg-white rounded-2xl shadow-2xl border border-secondary flex items-center gap-4 animate-bounce-slow">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Zap size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Processing Time</p>
                      <p className="text-lg font-black text-primary">0.84s</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Bar - #071F18 */}
        <section className="bg-[#071F18] py-16 relative overflow-hidden">
           <div className="container px-6 mx-auto relative z-10 flex flex-wrap justify-between items-center gap-10">
              {[
                { label: "Claims Verified", value: "47M+" },
                { label: "Active Countries", value: "190" },
                { label: "SLA Uptime", value: "99.98%" },
                { label: "Avg. Latency", value: "<2s" }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                   <span className="text-4xl md:text-5xl font-serif text-accent">{stat.value}</span>
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40">{stat.label}</span>
                </div>
              ))}
           </div>
        </section>

        {/* Features Section - "Clinical-Grade Infrastructure" */}
        <section id="features" className="w-full py-32 bg-white relative">
          <div className="container px-6 mx-auto">
            <motion.div
               {...fadeIn}
               className="text-center mb-24 space-y-4"
            >
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-[#071F18]">Clinical-Grade Infrastructure</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium italic">High-authority health verification tools built for large-scale institutional procurement.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { title: "AI Submission Node", desc: "Submit complex health claims for recursive verification against institutional nodes.", icon: Zap },
                { title: "Encrypted Health Vault", desc: "256-bit AES encrypted medical record storage with biometric identity access parity.", icon: Lock },
                { title: "Institutional SOS", desc: "Direct-to-hospital emergency broadcast protocol with automated vitals transmission.", icon: ShieldAlert },
                { title: "Source Metadata Explorer", desc: "Deep-dive into the veracity of medical sources with peer-review citation metrics.", icon: Server },
                { title: "Biometric Governance", desc: "Granular access lifecycle control for patient data throughout professional networks.", icon: Fingerprint },
                { title: "Real-time Clinical Feed", desc: "Authenticated health guidance directly from verified NCDC and WHO endpoints.", icon: Activity },
              ].map((feature, idx) => (
                <motion.div key={idx} variants={fadeIn}>
                  <Card className="border-none shadow-sm bg-secondary rounded-none p-10 hover:shadow-xl transition-all h-full group border-l-[3px] border-primary">
                    <CardContent className="p-0 space-y-6">
                      <div className="inline-flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <feature.icon className="h-8 w-8 stroke-[1.5]" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-serif text-[#071F18] leading-tight">{feature.title}</h3>
                        <p className="text-muted-foreground font-medium leading-relaxed">{feature.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Protocols Section - Alternating Bands */}
        <section id="how-it-works" className="w-full">
           <div className="bg-primary py-32 medical-grid overflow-hidden">
             <div className="container px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                   <motion.div {...fadeIn} className="space-y-10">
                      <div className="space-y-4">
                        <span className="text-accent text-xs font-black tracking-widest uppercase">Protocol Alpha</span>
                        <h2 className="text-4xl md:text-7xl font-serif text-white leading-tight">Institutional <br /> Verification Lifecycle</h2>
                      </div>
                      <div className="space-y-12">
                        {[
                          { step: "01", title: "Submit for Verification", desc: "Initiate an AI-led recursive audit of any text, image, or video based health claim." },
                          { step: "02", title: "Technical Verification", desc: "Automated cross-referencing against the Federated Health Information Node." },
                          { step: "03", title: "Final Clinical Verdict", desc: "Structured veracity assessment delivered with exhaustive institutional citations." },
                        ].map((s, idx) => (
                          <div key={idx} className="flex gap-8 group">
                            <div className="text-5xl font-serif text-accent/20 group-hover:text-accent/40 transition-colors uppercase pt-2">{s.step}</div>
                            <div className="space-y-2">
                              <h4 className="text-2xl font-serif text-white">{s.title}</h4>
                              <p className="text-white/60 font-medium leading-relaxed">{s.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                   </motion.div>
                   <motion.div {...fadeIn} className="relative">
                      <div className="bg-[#071F18] rounded-3xl p-8 border border-white/5 shadow-2xl space-y-8">
                         <div className="flex gap-3 px-6 py-3 bg-accent/5 border border-accent/10 rounded-xl">
                            <Info size={16} className="text-accent mt-0.5" />
                            <p className="text-xs font-mono text-accent/80 uppercase tracking-widest">Active_Protocol: Containment_Mode</p>
                         </div>
                         <div className="space-y-6 font-mono text-xs text-white/40 leading-relaxed">
                            <p className="text-white/80">$&gt; verified_output --format:structured_data</p>
                            <div className="p-6 bg-black/40 rounded-xl border border-white/5 space-y-4 text-[11px]">
                               <div className="flex justify-between">
                                  <span>STATUS:</span>
                                  <span className="text-red-500 font-bold">CONTAINMENT_REQUIRED</span>
                               </div>
                               <div className="flex justify-between">
                                  <span>ID:</span>
                                  <span>MVC-8821-X</span>
                               </div>
                               <div className="flex justify-between">
                                  <span>TIMESTAMP:</span>
                                  <span>22_MAR_2026_13:50:42</span>
                               </div>
                               <div className="pt-4 border-t border-white/5">
                                  <span>CITATIONS: [WHO_2024], [CDC_AFRICA], [LANCET_P3]</span>
                                </div>
                            </div>
                            <p className="animate-pulse">_ await next command</p>
                         </div>
                      </div>
                   </motion.div>
                </div>
             </div>
           </div>
        </section>

        {/* Audience Section - "Designed for Every Scale of Care" */}
        <section id="audience" className="w-full py-32 bg-white">
          <div className="container px-6 mx-auto">
             <div className="text-center mb-24 space-y-4">
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-[#071F18]">Designed for Every Scale of Care</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium italic">Standardized health infrastructure from community leaders to state actors.</p>
            </div>

            <motion.div
               variants={staggerContainer}
               initial="initial"
               whileInView="animate"
               className="grid md:grid-cols-3 gap-10"
            >
              {[
                { type: "Individuals", desc: "Private medical record management and emergency SOS protocols for professional health hygiene.", icon: Fingerprint },
                { type: "NGOs", desc: "Coordinate bulk health verification and field operations with military-grade communication nodes.", icon: Building },
                { type: "Governments", desc: "Implement national misinformation surveillance and counter-messaging infrastructure at scale.", icon: Globe },
              ].map((user, idx) => (
                <motion.div key={idx} variants={fadeIn}>
                  <Card className="border-none shadow-sm bg-secondary rounded-none overflow-hidden group border-t-4 border-primary p-12 hover:shadow-2xl transition-all h-full">
                    <CardContent className="p-0 space-y-8">
                        <user.icon className="h-10 w-10 text-primary stroke-[1.5]" />
                        <div className="space-y-4">
                          <h3 className="text-3xl font-serif text-[#071F18]">{user.type}</h3>
                          <p className="text-muted-foreground font-medium leading-relaxed">{user.desc}</p>
                        </div>
                        <Button variant="link" className="px-0 h-auto text-xs font-black uppercase tracking-widest text-[#071F18] hover:text-primary transition-colors gap-3">
                          Request Full Capabilities <ArrowRight size={14} />
                        </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section - Medical Background */}
        <section className="w-full py-40 relative overflow-hidden bg-primary medical-grid border-t border-white/10">
          <div className="container px-6 mx-auto text-center relative z-10 space-y-12">
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-8xl font-serif text-white tracking-tight leading-[1.1]">Deploy Institutional <br />Health Safety.</h2>
              <p className="text-white/60 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                Procure the MedVfy infrastructure for your organization. Clinical-grade security for the modern health ecosystem.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button size="lg" className="rounded-full h-20 px-16 text-xs font-black uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl transition-all font-bold">
                Request Access Now
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-20 px-16 text-xs font-black uppercase tracking-widest border-white text-white hover:bg-white/10 transition-all font-bold" asChild>
                <Link href="#">Speak with a Consultant</Link>
              </Button>
            </div>
            
            {/* Security Seals */}
            <div className="pt-24 opacity-30 flex flex-wrap justify-center gap-12 grayscale brightness-200">
               <div className="flex items-center gap-2"><Lock size={16} /><span className="text-[10px] font-black uppercase tracking-widest">256-bit AES Encrypted</span></div>
               <div className="flex items-center gap-2"><CheckCircle2 size={16} /><span className="text-[10px] font-black uppercase tracking-widest">ISO 27001 Certified</span></div>
               <div className="flex items-center gap-2"><Globe size={16} /><span className="text-[10px] font-black uppercase tracking-widest">HIPAA Registered Node</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-24 bg-[#071F18] text-white overflow-hidden relative border-t border-white/5">
        <div className="container px-6 mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-20">
            <div className="space-y-8">
               <Link className="flex items-center group" href="/">
                <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center text-[#071F18]">
                  <Shield size={20} fill="currentColor" />
                </div>
                <span className="ml-4 text-2xl font-serif italic font-bold text-white">MedVfy</span>
              </Link>
              <p className="text-xs text-white/40 leading-relaxed font-medium uppercase tracking-widest">
                Clinical-grade medical verification <br /> infrastructure nodes. v4.2.0
              </p>
            </div>
            {[
              { title: "Platform", links: ["Verification Engine", "Biometric Vault", "Emergency SOS", "Health Governance"] },
              { title: "Institutional", links: ["State Coordination", "NGO field tools", "Security Whitepaper", "Regulatory Compliance"] },
              { title: "Security Hub", links: ["HIPAA Standards", "SOC 2 Type II", "API Explorer", "Incident Response"] }
            ].map((col) => (
              <div key={col.title} className="space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-[#0c6a54]">{col.title}</h5>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}><Link href="#" className="text-sm font-medium text-white/60 hover:text-accent transition-colors">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">© 2026 MedVfy Institutional Protocols. Distributed by Antigravity AI.</p>
                <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] max-w-md leading-relaxed">This platform is intended for institutional health coordination and is HIPAA/ISO compliant. Unauthorised access is strictly prohibited by Article 42.1 of the Health Security Act.</p>
             </div>
             <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-white/60">
               <Link href="#" className="hover:text-accent font-bold transition-colors">Regulatory Terms</Link>
               <Link href="#" className="hover:text-accent font-bold transition-colors">Privacy Charter</Link>
               <Link href="#" className="hover:text-accent font-bold transition-colors">Security Node</Link>
             </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
