"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Activity,
  Brain,
  Server,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
} from "recharts"

const adminStats = [
  { title: "Total Users", value: "1,248", change: "+32 this week", icon: Users, color: "text-primary", bg: "bg-primary/10" },
  { title: "Active Sessions", value: "186", change: "Currently online", icon: Activity, color: "text-success", bg: "bg-success/10" },
  { title: "Models Active", value: "5", change: "All healthy", icon: Brain, color: "text-accent", bg: "bg-accent/10" },
  { title: "API Requests (24h)", value: "24.5K", change: "+12% vs yesterday", icon: Server, color: "text-chart-3", bg: "bg-chart-3/10" },
]

const usageData = [
  { day: "Mon", food: 245, stress: 120, forecast: 380, intervention: 95 },
  { day: "Tue", food: 278, stress: 145, forecast: 410, intervention: 112 },
  { day: "Wed", food: 312, stress: 168, forecast: 445, intervention: 128 },
  { day: "Thu", food: 290, stress: 155, forecast: 420, intervention: 105 },
  { day: "Fri", food: 260, stress: 130, forecast: 395, intervention: 98 },
  { day: "Sat", food: 198, stress: 95, forecast: 310, intervention: 72 },
  { day: "Sun", food: 215, stress: 105, forecast: 340, intervention: 85 },
]

const recentUsers = [
  { name: "Sarah Ahmed", email: "sarah@email.com", type: "Type 1", status: "active", lastActive: "2 min ago" },
  { name: "Ali Hassan", email: "ali@email.com", type: "Type 2", status: "active", lastActive: "15 min ago" },
  { name: "Fatima Khan", email: "fatima@email.com", type: "Caregiver", status: "active", lastActive: "1 hr ago" },
  { name: "Omar Raza", email: "omar@email.com", type: "Type 1", status: "inactive", lastActive: "3 days ago" },
  { name: "Zainab Malik", email: "zainab@email.com", type: "Type 2", status: "active", lastActive: "30 min ago" },
]

const modelStatus = [
  { name: "Food Vision (LLaVA)", version: "v2.3", accuracy: 94, status: "healthy", lastTrained: "3 days ago" },
  { name: "Stress Classifier (CNN)", version: "v1.8", accuracy: 89, status: "healthy", lastTrained: "1 week ago" },
  { name: "Glucose Forecaster (Transformer)", version: "v3.1", accuracy: 87, status: "healthy", lastTrained: "2 days ago" },
  { name: "Walsh IOB Calculator", version: "v1.0", accuracy: 99, status: "healthy", lastTrained: "Static" },
  { name: "Counterfactual Engine", version: "v1.5", accuracy: 85, status: "retraining", lastTrained: "In progress" },
]

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="text-sm font-medium" style={{ color: p.color }}>
            {p.dataKey}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          System management, user oversight, and model performance monitoring.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardContent className="flex items-center gap-4 p-5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} shrink-0`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Module Usage Chart */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Module Usage (This Week)</CardTitle>
            <CardDescription>API requests per module per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar dataKey="food" fill="var(--primary)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="stress" fill="var(--accent)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="forecast" fill="var(--chart-3)" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="intervention" fill="var(--success)" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Model Health */}
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Model Health</CardTitle>
              <CardDescription>Performance and retraining status</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retrain All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {modelStatus.map((model) => (
                <div key={model.name} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{model.name}</p>
                      <Badge variant="outline" className="text-xs">{model.version}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <Progress value={model.accuracy} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground w-8">{model.accuracy}%</span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={model.status === "healthy"
                      ? "border-success/30 text-success"
                      : "border-warning/30 text-warning"
                    }
                  >
                    {model.status === "healthy" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                    )}
                    {model.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users Table */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Users</CardTitle>
            <CardDescription>Latest user activity across the platform</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="/admin/users">View All Users</a>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Diabetes Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{user.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={user.status === "active"
                        ? "border-success/30 text-success"
                        : "border-muted-foreground/30 text-muted-foreground"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
