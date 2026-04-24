"use client"

import { useContext, useEffect } from "react" 
import { AppContext } from "@/context/AppContext" 
import { useRouter } from "next/navigation"

import { GlucoseStatsCards } from "@/components/dashboard/glucose-stats-cards"
import { GlucoseChart } from "@/components/dashboard/glucose-chart"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  const router = useRouter()
  const { isLoggedIn, userData } = useContext(AppContext)
  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/auth/login")
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return null 
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {/* 3. Hardcoded name ki jagah Dynamic Name! */}
          Welcome back, {userData ? userData.firstName : "User"}. Here is your glucose overview for today.
        </p>
      </div>

      {/* Stats row */}
      <GlucoseStatsCards />

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Glucose Chart (Main Area) */}
        <div className="lg:col-span-2">
          <GlucoseChart />
        </div>
        
        {/* Sidebar Actions */}
        <div className="flex flex-col gap-6">
          <QuickActions />
        </div>
      </div>

      {/* Activity feed */}
      <ActivityFeed />
    </div>
  )
}