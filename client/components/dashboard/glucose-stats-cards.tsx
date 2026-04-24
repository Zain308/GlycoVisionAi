"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  TrendingUp,
  Droplets,
  Brain,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
} from "lucide-react"

const stats = [
  {
    title: "Current Glucose",
    value: "142",
    unit: "mg/dL",
    change: "+8",
    trend: "up" as const,
    status: "normal" as const,
    icon: Droplets,
  },
  {
    title: "Predicted (60min)",
    value: "185",
    unit: "mg/dL",
    change: "+43",
    trend: "up" as const,
    status: "warning" as const,
    icon: TrendingUp,
  },
  {
    title: "Time in Range",
    value: "78",
    unit: "%",
    change: "+3",
    trend: "up" as const,
    status: "normal" as const,
    icon: Activity,
  },
  {
    title: "Active Insulin (IOB)",
    value: "2.4",
    unit: "units",
    change: "-0.6",
    trend: "down" as const,
    status: "normal" as const,
    icon: Clock,
  },
]

export function GlucoseStatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.unit}</span>
                </div>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  stat.status === "warning" ? "bg-warning/10" : "bg-primary/10"
                }`}
              >
                <stat.icon
                  className={`h-5 w-5 ${
                    stat.status === "warning" ? "text-warning" : "text-primary"
                  }`}
                />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {stat.trend === "up" ? (
                <ArrowUpRight className={`h-4 w-4 ${stat.status === "warning" ? "text-warning" : "text-success"}`} />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-primary" />
              )}
              <span className={`text-sm font-medium ${stat.status === "warning" ? "text-warning" : "text-success"}`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">vs last reading</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
