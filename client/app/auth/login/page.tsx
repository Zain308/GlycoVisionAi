"use client"

import { useState, useContext } from "react"
import { AppContext } from "@/context/AppContext"
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { GlycoVisionLogo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Activity, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn, getUserData } = useContext(AppContext);
  
  // 1. Logic State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Submission Handler
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Direct connection to your Express login route
      const { data } = await axiosInstance.post("/api/auth/login", { email, password });

      if (data.success) {
        toast.success("Welcome back, Zain!");
        setIsLoggedIn(true);
        await getUserData(); // Fetch profile into Global Brain
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed. Check server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <GlycoVisionLogo className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold text-foreground">
              GlycoVision<span className="text-primary"> AI</span>
            </span>
          </Link>

          <Card className="border-border/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>Sign in to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Added Form Wrapper */}
              <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="patient@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/auth/reset-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button className="w-full mt-2" type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Sign In"}
                </Button>
              </form>

              <Separator className="my-2" />

              <p className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right - Visual (Kept exactly same as your code) */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-primary/[0.03] border-l border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.06]" />
        <div className="relative text-center px-12 max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-6">
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Preemptive Glucose Management
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Monitor, predict, and prevent hyperglycemic events with multimodal
            AI. Your personal health companion that stays one step ahead.
          </p>
          <div className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">60min</p>
              <p>Prediction</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">AI</p>
              <p>Powered</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">Safe</p>
              <p>Guardrails</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}