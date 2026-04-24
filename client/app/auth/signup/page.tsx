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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Shield, Loader2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter();
  const { setIsLoggedIn, getUserData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // 1. State Management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    diabetesType: ""
  });

  // 2. Input Change Handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Select Change Handler (Shadcn specific)
  const onSelectChange = (value: string) => {
    setFormData({ ...formData, diabetesType: value });
  };

  // 4. Form Submission Logic
  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    if (!formData.diabetesType) {
      return toast.error("Please select your diabetes type");
    }

    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/api/auth/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        diabetesType: formData.diabetesType
      });

      if (data.success) {
        toast.success("Account Created! Check your email for OTP.");
        setIsLoggedIn(true);
        await getUserData();
        router.push("/auth/verify"); // Updated path to match your folder structure
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Visual (Stays same) */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-primary/[0.03] border-r border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)_0%,transparent_70%)] opacity-[0.06]" />
        <div className="relative text-center px-12 max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 mb-6">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Your Health, AI-Protected</h2>
          <p className="text-muted-foreground leading-relaxed">
            Join GlycoVision AI to access cutting-edge glucose prediction, automated food logging, and stress-aware interventions tailored to you.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <GlycoVisionLogo className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold text-foreground">
              GlycoVision<span className="text-primary"> AI</span>
            </span>
          </Link>

          <Card className="border-border/50 shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
              <CardDescription>Set up your GlycoVision AI profile</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Muhammad" required value={formData.firstName} onChange={onChangeHandler} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Ubaid" required value={formData.lastName} onChange={onChangeHandler} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="patient@example.com" required value={formData.email} onChange={onChangeHandler} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="diabetesType">Diabetes Type</Label>
                  {/* Shadcn Select needs onValueChange instead of onChange */}
                  <Select onValueChange={onSelectChange} value={formData.diabetesType}>
                    <SelectTrigger id="diabetesType">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type1">Type 1 Diabetes</SelectItem>
                      <SelectItem value="type2">Type 2 (Insulin-Dependent)</SelectItem>
                      <SelectItem value="gestational">Gestational Diabetes</SelectItem>
                      <SelectItem value="caregiver">Caregiver / Clinician</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a password" required value={formData.password} onChange={onChangeHandler} />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm password" required value={formData.confirmPassword} onChange={onChangeHandler} />
                </div>

                <Button className="w-full mt-2" type="submit" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</> : "Create Account"}
                </Button>

                <Separator className="my-2" />

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}