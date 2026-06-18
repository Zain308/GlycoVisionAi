"use client"

import { useState, useContext, useEffect, useRef } from "react"
import { AppContext } from "@/context/AppContext"
import axiosInstance from "@/lib/axios"
import { toast } from "react-toastify"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, User, Activity, Scale, Ruler, Camera } from "lucide-react"

export default function ProfilePage() {
  const { userData, getUserData } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    diabetesType: "",
    age: "",
    weight: "",
    height: "",
    image: "" 
  })

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        diabetesType: userData.diabetesType || "",
        age: userData.age || "",
        weight: userData.weight || "",
        height: userData.height || "",
        image: userData.image || ""
      })
    }
  }, [userData])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Image too large. Please select a file under 2MB.")
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axiosInstance.post("/api/auth/update-profile", formData)
      if (data.success) {
        toast.success("Profile updated successfully!")
        await getUserData() 
      } else {
        toast.error(data.message)
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  // --- 🛡️ THE LOADING GUARD (SYNC FIX) ---
  // If userData is null, it means AppContext is still fetching your registration data.
  // We show a professional spinner instead of empty boxes.
  if (!userData) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-muted-foreground">Syncing patient data...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and health metrics.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <div className="flex flex-col items-center space-y-4">
          <div 
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar className="h-40 w-40 border-4 border-background shadow-xl transition-all group-hover:ring-4 group-hover:ring-primary/20">
              {formData.image ? (
                <img src={formData.image} alt="Profile" className="aspect-square h-full w-full object-cover" />
              ) : (
                <AvatarFallback className="text-4xl font-bold bg-primary/5 text-primary">
                  {userData?.firstName?.[0]}{userData?.lastName?.[0]}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col items-center text-white text-xs font-medium">
                <Camera className="h-6 w-6 mb-1" />
                Change Photo
              </div>
            </div>

            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange}
              aria-label="Upload profile image"
            />
          </div>
          
          <div className="text-center">
            <h3 className="font-bold text-lg">{userData?.firstName} {userData?.lastName}</h3>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest bg-secondary px-2 py-1 rounded mt-1">
              {userData?.diabetesType || 'Update Type'}
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" /> Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  value={formData.firstName} 
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  value={formData.lastName} 
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary" /> Health Metrics
              </CardTitle>
              <CardDescription>Vital information for AI-powered glucose forecasting.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Diabetes Type</Label>
                <Select 
                  value={formData.diabetesType} 
                  onValueChange={(val) => setFormData({...formData, diabetesType: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type1">Type 1</SelectItem>
                    <SelectItem value="type2">Type 2</SelectItem>
                    <SelectItem value="gestational">Gestational</SelectItem>
                    <SelectItem value="pre-diabetic">Pre-diabetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age"
                  type="number" 
                  value={formData.age} 
                  onChange={(e) => setFormData({...formData, age: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Scale className="h-3 w-3" /> Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={formData.weight} 
                  onChange={(e) => setFormData({...formData, weight: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2"><Ruler className="h-3 w-3" /> Height (cm)</Label>
                <Input 
                  type="number" 
                  value={formData.height} 
                  onChange={(e) => setFormData({...formData, height: e.target.value})} 
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" type="button" onClick={() => window.location.reload()}>Discard Changes</Button>
            <Button type="submit" disabled={loading} className="px-8">
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : "Save Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}