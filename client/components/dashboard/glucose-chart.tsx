"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"

// Simulated glucose data for 24hrs
const glucoseData = [
  { time: "00:00", glucose: 110, predicted: null },
  { time: "01:00", glucose: 105, predicted: null },
  { time: "02:00", glucose: 98, predicted: null },
  { time: "03:00", glucose: 95, predicted: null },
  { time: "04:00", glucose: 100, predicted: null },
  { time: "05:00", glucose: 108, predicted: null },
  { time: "06:00", glucose: 115, predicted: null },
  { time: "07:00", glucose: 130, predicted: null },
  { time: "08:00", glucose: 155, predicted: null },
  { time: "09:00", glucose: 145, predicted: null },
  { time: "10:00", glucose: 135, predicted: null },
  { time: "11:00", glucose: 128, predicted: null },
  { time: "12:00", glucose: 140, predicted: null },
  { time: "13:00", glucose: 160, predicted: null },
  { time: "14:00", glucose: 148, predicted: null },
  { time: "15:00", glucose: 138, predicted: null },
  { time: "16:00", glucose: 142, predicted: null },
  { time: "17:00", glucose: null, predicted: 155 },
  { time: "18:00", glucose: null, predicted: 172 },
  { time: "19:00", glucose: null, predicted: 185 },
  { time: "20:00", glucose: null, predicted: 178 },
  { time: "21:00", glucose: null, predicted: 165 },
  { time: "22:00", glucose: null, predicted: 150 },
  { time: "23:00", glucose: null, predicted: 140 },
]

const weekData = [
  { day: "Mon", avg: 132, max: 175, min: 85 },
  { day: "Tue", avg: 128, max: 168, min: 90 },
  { day: "Wed", avg: 145, max: 195, min: 78 },
  { day: "Thu", avg: 138, max: 182, min: 88 },
  { day: "Fri", avg: 125, max: 160, min: 92 },
  { day: "Sat", avg: 140, max: 188, min: 82 },
  { day: "Sun", avg: 135, max: 172, min: 87 },
]

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="text-sm font-medium" style={{ color: p.color }}>
            {p.dataKey === "glucose" ? "Actual" : p.dataKey === "predicted" ? "Predicted" : p.dataKey}: {p.value} mg/dL
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function GlucoseChart() {
  return (
    <Card className="border-border/50 col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Glucose Trend</CardTitle>
          <CardDescription>Real-time monitoring with 60-minute prediction horizon</CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-6 rounded-full bg-primary" />
            <span>Actual</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-6 rounded-full bg-warning" style={{ borderStyle: "dashed" }} />
            <span>Predicted</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="today">
          <TabsList className="mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
          </TabsList>
          <TabsContent value="today">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={glucoseData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="glucoseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="var(--warning)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                  <XAxis
                    dataKey="time"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={[60, 220]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceArea y1={70} y2={180} fill="var(--success)" fillOpacity={0.04} />
                  <ReferenceLine y={180} stroke="var(--warning)" strokeDasharray="4 4" strokeWidth={1} />
                  <ReferenceLine y={70} stroke="var(--destructive)" strokeDasharray="4 4" strokeWidth={1} />
                  <Area
                    type="monotone"
                    dataKey="glucose"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fill="url(#glucoseGrad)"
                    connectNulls={false}
                    dot={false}
                    activeDot={{ r: 5, fill: "var(--primary)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="var(--warning)"
                    strokeWidth={2.5}
                    strokeDasharray="6 4"
                    fill="url(#predictedGrad)"
                    connectNulls={false}
                    dot={false}
                    activeDot={{ r: 5, fill: "var(--warning)" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <Badge variant="outline" className="border-success/30 text-success">
                Target: 70-180 mg/dL
              </Badge>
              <Badge variant="outline" className="border-warning/30 text-warning">
                Spike predicted at ~19:00
              </Badge>
            </div>
          </TabsContent>
          <TabsContent value="week">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[60, 220]} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceArea y1={70} y2={180} fill="var(--success)" fillOpacity={0.04} />
                  <Area type="monotone" dataKey="max" stroke="var(--warning)" strokeWidth={1} fill="none" strokeDasharray="3 3" dot={false} />
                  <Area type="monotone" dataKey="avg" stroke="var(--primary)" strokeWidth={2.5} fill="url(#avgGrad)" dot={{ r: 3, fill: "var(--primary)" }} />
                  <Area type="monotone" dataKey="min" stroke="var(--accent)" strokeWidth={1} fill="none" strokeDasharray="3 3" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
