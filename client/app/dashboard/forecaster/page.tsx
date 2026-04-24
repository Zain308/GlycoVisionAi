"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Clock,
  Zap,
  RefreshCw,
  ArrowUpRight,
  CheckCircle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Tooltip,
} from "recharts"

const forecastData = [
  { time: "Now", actual: 142, predicted: 142, lower: 138, upper: 146 },
  { time: "+10m", actual: null, predicted: 148, lower: 142, upper: 155 },
  { time: "+20m", actual: null, predicted: 158, lower: 148, upper: 168 },
  { time: "+30m", actual: null, predicted: 168, lower: 155, upper: 180 },
  { time: "+40m", actual: null, predicted: 176, lower: 162, upper: 192 },
  { time: "+50m", actual: null, predicted: 182, lower: 166, upper: 198 },
  { time: "+60m", actual: null, predicted: 185, lower: 168, upper: 202 },
]

const inputFactors = [
  { label: "Current Glucose", value: "142 mg/dL", weight: 35, icon: Activity },
  { label: "Meal Carbs (logged)", value: "65g", weight: 30, icon: Zap },
  { label: "Stress Level", value: "Moderate (62/100)", weight: 15, icon: AlertTriangle },
  { label: "Active Insulin (IOB)", value: "2.4 units", weight: 12, icon: Clock },
  { label: "Historical Trend", value: "Rising", weight: 8, icon: TrendingUp },
]

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload
          .filter((p) => p.dataKey !== "lower" && p.dataKey !== "upper")
          .map((p) => (
            <p key={p.dataKey} className="text-sm font-medium" style={{ color: p.color }}>
              {p.dataKey === "actual" ? "Actual" : "Predicted"}: {p.value} mg/dL
            </p>
          ))}
      </div>
    )
  }
  return null
}

export default function ForecasterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">The Forecaster</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Transformer-based model fusing nutritional, physiological, and glucose data
            to predict blood glucose 60 minutes ahead.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh Prediction
        </Button>
      </div>

      {/* Prediction Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-warning/30 bg-warning/[0.03]">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Predicted Peak</p>
              <p className="text-2xl font-bold text-foreground">185 <span className="text-sm font-normal text-muted-foreground">mg/dL</span></p>
              <p className="text-xs text-warning">Above target range</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time to Peak</p>
              <p className="text-2xl font-bold text-foreground">~60 <span className="text-sm font-normal text-muted-foreground">minutes</span></p>
              <p className="text-xs text-primary">At approximately 17:15</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Model Confidence</p>
              <p className="text-2xl font-bold text-foreground">87<span className="text-sm font-normal text-muted-foreground">%</span></p>
              <p className="text-xs text-success">High confidence interval</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Forecast Chart */}
        <Card className="border-border/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              60-Minute Glucose Forecast
            </CardTitle>
            <CardDescription>
              Prediction with confidence intervals (shaded area)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="var(--warning)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[100, 220]} />
                  <Tooltip content={<ChartTooltip />} />
                  <ReferenceArea y1={70} y2={180} fill="var(--success)" fillOpacity={0.04} />
                  <ReferenceLine y={180} stroke="var(--warning)" strokeDasharray="4 4" strokeWidth={1} label={{ value: "High", position: "right", fill: "var(--warning)", fontSize: 10 }} />
                  <Area type="monotone" dataKey="upper" stroke="none" fill="url(#confGrad)" />
                  <Area type="monotone" dataKey="lower" stroke="none" fill="var(--background)" />
                  <Area type="monotone" dataKey="actual" stroke="var(--primary)" strokeWidth={2.5} fill="none" dot={{ r: 4, fill: "var(--primary)" }} connectNulls={false} />
                  <Area type="monotone" dataKey="predicted" stroke="var(--warning)" strokeWidth={2.5} strokeDasharray="6 4" fill="url(#forecastGrad)" dot={{ r: 3, fill: "var(--warning)" }} connectNulls={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Input Factors */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Input Factors</CardTitle>
            <CardDescription>Data sources contributing to this prediction</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {inputFactors.map((factor) => (
              <div key={factor.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <factor.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{factor.label}</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{factor.weight}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={factor.weight} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground w-28 text-right">{factor.value}</span>
                </div>
              </div>
            ))}

            <div className="rounded-lg bg-primary/[0.05] border border-primary/20 p-4 mt-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Model:</strong> Transformer-based time-series
                forecaster trained on CGM data with multimodal feature fusion. Updated every 5 minutes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
