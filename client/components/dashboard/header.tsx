"use client"

import { useContext, useState, useEffect } from "react" 
import { AppContext } from "@/context/AppContext" 
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Bell, Search, Moon, Sun, LogOut, Loader2 } from "lucide-react" 
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false) // Guard for theme toggle
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  const { userData, setUserData, setIsLoggedIn } = useContext(AppContext)

  // 🛡️ Prevent Hydration Mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const logout = async () => {
    setIsLoggingOut(true)
    try {
      const { data } = await axiosInstance.post('/api/auth/logout')
      if (data.success) {
        setIsLoggedIn(false)
        setUserData(null)
        toast.success("Logged out safely")
        router.push('/auth/login')
      }
    } catch (err: any) {
      toast.error("Logout failed")
    } finally {
      setIsLoggingOut(false)
    }
  }

  const getInitials = () => {
    if (!userData?.firstName || !userData?.lastName) return "GU"
    return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
  }

  // If not mounted, we show a placeholder so the UI doesn't jump
  if (!mounted) return <header className="h-[65px] border-b bg-card" />

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            className="pl-10 bg-secondary border-border/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle - Now Rock Solid */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground"
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5 transition-all" />
          ) : (
            <Sun className="h-5 w-5 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground font-bold">
            3
          </Badge>
        </Button>

        <div className="h-8 w-px bg-border mx-1" />

        <div className="flex items-center gap-3 ml-2">
          <Avatar className="h-9 w-9 border-2 border-primary/20">
            <AvatarImage src={userData?.image} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden md:block">
            <p className="text-sm font-bold text-foreground leading-tight">
              {userData ? `${userData.firstName} ${userData.lastName}` : "Syncing..."}
            </p>
            <p className="text-[10px] uppercase tracking-tighter font-black text-primary">
              {userData?.diabetesType?.replace('-', ' ')} Patient
            </p>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            disabled={isLoggingOut}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-2"
          >
            {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}