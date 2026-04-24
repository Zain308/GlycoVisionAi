"use client"

import { useContext } from "react" // 1. Import useContext
import { AppContext } from "@/context/AppContext" // 2. Import context
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

import { Button } from "@/components/ui/button"
import { Bell, Search, Moon, Sun, LogOut, Loader2 } from "lucide-react" // Added icons
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  
  // 3. Destructure Context Data
  const { userData, setUserData, setIsLoggedIn } = useContext(AppContext)

  // 4. Logout Function
  const logout = async () => {
    try {
      const { data } = await axiosInstance.post('/api/auth/logout')
      if (data.success) {
        setIsLoggedIn(false)
        setUserData(null)
        toast.success("Logged out")
        router.push('/auth/login')
      }
    } catch (err: any) {
      toast.error("Logout failed")
    }
  }

  // Initial nikalne ke liye logic (e.g., Zain Abideen -> ZA)
  const getInitials = () => {
    if (!userData) return "GU" // Guest User
    return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase()
  }

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules, predictions..."
            className="pl-10 bg-secondary border-border/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-destructive text-destructive-foreground">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>

        <div className="h-8 w-px bg-border mx-1" />

        {/* User Profile Section - Now Dynamic */}
        <div className="flex items-center gap-3 ml-2">
          <Avatar className="h-9 w-9 border border-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-bold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-foreground leading-tight">
              {userData ? `${userData.firstName} ${userData.lastName}` : "Loading..."}
            </p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
              {userData?.diabetesType === 'type1' ? 'Type 1 Patient' : 
               userData?.diabetesType === 'type2' ? 'Type 2 Patient' : 
               userData?.diabetesType}
            </p>
          </div>

          {/* Logout Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={logout}
            className="text-muted-foreground hover:text-destructive ml-2"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}