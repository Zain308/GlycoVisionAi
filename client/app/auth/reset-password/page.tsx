"use client"

import { useState } from "react"
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GlycoVisionLogo } from "@/components/icons"
import { Loader2, KeyRound, Mail } from "lucide-react"

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Phase 1: Request OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/send-reset-otp", { email });
      if (data.success) {
        toast.success("OTP sent to your email!");
        setIsOtpSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (err: any) {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Phase 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/reset-password", { email, otp, newPassword });
      if (data.success) {
        toast.success("Password reset successfully! Please login.");
        router.push("/auth/login");
      } else {
        toast.error(data.message);
      }
    } catch (err: any) {
      toast.error("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/[0.02] px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <GlycoVisionLogo className="h-10 w-10 text-primary mb-2" />
          <span className="text-xl font-bold">GlycoVision AI</span>
        </div>

        <Card className="border-border/50">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              {isOtpSent ? <KeyRound className="h-6 w-6 text-primary" /> : <Mail className="h-6 w-6 text-primary" />}
            </div>
            <CardTitle className="text-2xl font-bold">
              {isOtpSent ? "Set New Password" : "Reset Password"}
            </CardTitle>
            <CardDescription>
              {isOtpSent ? "Enter the OTP sent to your email and your new password." : "Enter your email to receive a 6-digit recovery code."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isOtpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="zain@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP Code</Label>
                  <Input id="otp" type="text" maxLength={6} placeholder="000000" required value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Min. 6 characters" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}   