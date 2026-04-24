"use client"

import { useState, useContext, useEffect } from "react"
import { AppContext } from "@/context/AppContext"
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GlycoVisionLogo } from "@/components/icons"
import { Loader2, MailCheck } from "lucide-react"

export default function VerifyPage() {
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const { getUserData, isLoggedIn } = useContext(AppContext)
  const router = useRouter()

  // Redirect if they aren't even logged in (security check)
  useEffect(() => {
    if (!isLoggedIn) {
        // We let them stay for now to verify, but usually they should be logged in
    }
  }, [isLoggedIn])

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP")
    }

    setLoading(true)
    try {
      // Talking to your verify-account route
      const { data } = await axiosInstance.post("/api/auth/verify-account", { otp })

      if (data.success) {
        toast.success("Account Verified Successfully!")
        await getUserData() // Refresh global state to show they are now verified
        router.push("/auth/login") // Send them to the main app!
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed")
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // 1. Get the pasted text
    const pastedData = e.clipboardData.getData("text");
    
    // 2. Clean it: Remove spaces and keep only the first 6 digits
    const cleanedOtp = pastedData.replace(/\s/g, "").slice(0, 6);
    
    // 3. Update the state
    setOtp(cleanedOtp);
};
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/[0.02] px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <GlycoVisionLogo className="h-10 w-10 text-primary mb-4" />
          <h1 className="text-xl font-bold">Verify Your Identity</h1>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <MailCheck className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
            <CardDescription>
              We've sent a 6-digit verification code to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="otp" className="text-center">Enter 6-Digit Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="text-center text-2xl tracking-[0.5em] font-mono py-6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onPaste={handlePaste} 
                  required
              />
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...</> : "Verify Account"}
              </Button>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button type="button" className="text-primary hover:underline font-medium" onClick={() => toast.info("Feature coming soon!")}>
                    Resend OTP
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}