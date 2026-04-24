"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Info, Utensils, Mic, Pill } from "lucide-react"

const activities = [
  {
    time: "16:15",
    type: "prediction",
    icon: AlertTriangle,
    color: "text-warning",
    bg: "bg-warning/10",
    title: "Spike Predicted",
    description: "Blood glucose expected to reach 185 mg/dL by 19:00",
    badge: "Warning",
    badgeColor: "bg-warning/10 text-warning border-warning/20",
  },
  {
    time: "15:45",
    type: "intervention",
    icon: Pill,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Correction Suggested",
    description: "1.5u correction bolus recommended (IOB: 2.4u, Safe limit: 4u)",
    badge: "Action",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    time: "14:30",
    type: "food",
    icon: Utensils,
    color: "text-accent",
    bg: "bg-accent/10",
    title: "Meal Logged",
    description: "Chicken Biryani - 65g carbs, 18g fat detected via AI vision",
    badge: "Logged",
    badgeColor: "bg-accent/10 text-accent border-accent/20",
  },
  {
    time: "14:00",
    type: "stress",
    icon: Mic,
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    title: "Stress Detected",
    description: "Moderate stress detected via vocal biomarker analysis (jitter: elevated)",
    badge: "Detected",
    badgeColor: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
  {
    time: "12:00",
    type: "success",
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
    title: "Target Range Maintained",
    description: "Glucose stayed within 70-180 mg/dL throughout the morning",
    badge: "Good",
    badgeColor: "bg-success/10 text-success border-success/20",
  },
]

export function ActivityFeed() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {activities.map((a, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.bg} shrink-0`}>
                  <a.icon className={`h-4 w-4 ${a.color}`} />
                </div>
                {i < activities.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <Badge variant="outline" className={`text-xs ${a.badgeColor}`}>
                    {a.badge}
                  </Badge>
                  <span className="ml-auto text-xs text-muted-foreground">{a.time}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {a.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
