"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Mic, Activity, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    icon: Camera,
    title: "Log a Meal",
    description: "Snap a food photo for AI analysis",
    href: "/dashboard/food-logger",
    color: "text-primary",
    bg: "bg-primary/10",
    hoverBg: "hover:bg-primary/5",
  },
  {
    icon: Mic,
    title: "Check Stress",
    description: "Record voice for biomarker analysis",
    href: "/dashboard/stress-detector",
    color: "text-accent",
    bg: "bg-accent/10",
    hoverBg: "hover:bg-accent/5",
  },
  {
    icon: Activity,
    title: "View Forecast",
    description: "See 60-min glucose prediction",
    href: "/dashboard/forecaster",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    hoverBg: "hover:bg-chart-3/5",
  },
  {
    icon: Shield,
    title: "Get Intervention",
    description: "Correction suggestions & what-ifs",
    href: "/dashboard/intervention",
    color: "text-success",
    bg: "bg-success/10",
    hoverBg: "hover:bg-success/5",
  },
]

export function QuickActions() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`group flex flex-col gap-3 rounded-xl border border-border/50 p-4 transition-all ${action.hoverBg} hover:border-border`}
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.bg}`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-1">
                {action.title}
                <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
