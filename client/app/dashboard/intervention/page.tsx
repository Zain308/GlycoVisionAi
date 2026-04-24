"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Pill,
  Footprints,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Beaker,
  Calculator,
  Dumbbell,
  Coffee,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from "recharts"

const baselineData = [
  { time: "Now", baseline: 142, corrected: 142, walking: 142 },
  { time: "+10m", baseline: 148, corrected: 145, walking: 144 },
  { time: "+20m", baseline: 158, corrected: 150, walking: 148 },
  { time: "+30m", baseline: 168, corrected: 155, walking: 150 },
  { time: "+40m", baseline: 176, corrected: 155, walking: 148 },
  { time: "+50m", baseline: 182, corrected: 152, walking: 142 },
  { time: "+60m", baseline: 185, corrected: 148, walking: 138 },
]

function WhatIfTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-popover p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.dataKey} className="text-sm font-medium" style={{ color: p.color }}>
            {p.dataKey === "baseline" ? "No Action" : p.dataKey === "corrected" ? "With Bolus" : "With Walking"}: {p.value} mg/dL
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function InterventionPage() {
  const [walkMinutes, setWalkMinutes] = useState([15])
  const [showLifestyle, setShowLifestyle] = useState(true)
  const [showMedical, setShowMedical] = useState(true)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Intervention Engine</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Safe, personalized correction suggestions using the Walsh Insulin Model and
          Counterfactual AI for what-if scenario simulation.
        </p>
      </div>

      {/* Alert Banner */}
      <Card className="border-warning/30 bg-warning/[0.04]">
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 shrink-0">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">Hyperglycemia Predicted</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Blood glucose predicted to reach <strong className="text-foreground">185 mg/dL</strong> in
              60 minutes. Intervention recommended to prevent spike.
            </p>
          </div>
          <Badge className="bg-warning/10 text-warning border-warning/20 shrink-0" variant="outline">
            Action Required
          </Badge>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Strategy A: Medical */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Strategy A: Correction Bolus
              </CardTitle>
              <Badge variant="outline" className="border-primary/30 text-primary">Medical</Badge>
            </div>
            <CardDescription>
              Walsh Insulin Model calculation with IOB safety check
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* IOB Calculation */}
            <div className="rounded-xl bg-secondary/50 p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calculator className="h-4 w-4 text-primary" />
                Walsh IOB Calculation
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Predicted Peak:</span>
                  <span className="font-medium text-foreground">185 mg/dL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-medium text-foreground">120 mg/dL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Correction Factor:</span>
                  <span className="font-medium text-foreground">1:40</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current IOB:</span>
                  <span className="font-medium text-foreground">2.4 units</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Calculated Correction:</span>
                <span className="text-lg font-bold text-foreground">1.63 units</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Safe Correction (after IOB):</span>
                <span className="text-lg font-bold text-primary">1.5 units</span>
              </div>
            </div>

            {/* Safety Check */}
            <div className="flex items-center gap-3 rounded-lg bg-success/[0.06] border border-success/20 p-4">
              <CheckCircle className="h-5 w-5 text-success shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Safety Guardrail: PASS</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Total insulin (IOB + correction = 3.9u) is below max limit of 4.0u. No stacking risk detected.
                </p>
              </div>
            </div>

            <Button className="gap-2">
              <Pill className="h-4 w-4" />
              Apply 1.5u Correction Bolus
            </Button>
          </CardContent>
        </Card>

        {/* Strategy B: Lifestyle */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Footprints className="h-5 w-5 text-accent" />
                Strategy B: Lifestyle Activity
              </CardTitle>
              <Badge variant="outline" className="border-accent/30 text-accent">Lifestyle</Badge>
            </div>
            <CardDescription>
              Counterfactual AI simulating what-if scenarios
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {/* Walking Slider */}
            <div className="flex flex-col gap-3">
              <Label className="text-sm">Walking Duration</Label>
              <Slider
                value={walkMinutes}
                onValueChange={setWalkMinutes}
                max={45}
                min={5}
                step={5}
                className="py-2"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">5 min</span>
                <span className="text-lg font-bold text-foreground">{walkMinutes[0]} minutes</span>
                <span className="text-muted-foreground">45 min</span>
              </div>
            </div>

            {/* Counterfactual Results */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/50 p-4">
                <Footprints className="h-5 w-5 text-accent" />
                <span className="text-2xl font-bold text-foreground">-47</span>
                <span className="text-xs text-muted-foreground text-center">mg/dL reduction from {walkMinutes[0]}min walk</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl bg-secondary/50 p-4">
                <Dumbbell className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-foreground">-35</span>
                <span className="text-xs text-muted-foreground text-center">mg/dL from light exercise</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-accent/[0.06] border border-accent/20 p-4">
              <p className="text-sm text-foreground">
                <strong>What-If Simulation:</strong> If you walk for {walkMinutes[0]} minutes,
                your predicted spike of 185 mg/dL will drop to approximately{" "}
                <strong className="text-accent">{185 - Math.round(walkMinutes[0] * 3.1)} mg/dL</strong>.
              </p>
            </div>

            <Button variant="outline" className="gap-2">
              <Footprints className="h-4 w-4" />
              Log {walkMinutes[0]}min Walk Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* What-If Comparison Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-chart-3" />
                Counterfactual Comparison
              </CardTitle>
              <CardDescription>Compare predicted glucose trajectories across intervention strategies</CardDescription>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={showMedical} onCheckedChange={setShowMedical} id="med" />
                <Label htmlFor="med" className="text-xs text-muted-foreground">Bolus Correction</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={showLifestyle} onCheckedChange={setShowLifestyle} id="life" />
                <Label htmlFor="life" className="text-xs text-muted-foreground">Walking Activity</Label>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={baselineData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="time" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[120, 200]} />
                <Tooltip content={<WhatIfTooltip />} />
                <ReferenceLine y={180} stroke="var(--warning)" strokeDasharray="4 4" strokeWidth={1} />
                <Area type="monotone" dataKey="baseline" stroke="var(--destructive)" strokeWidth={2} fill="url(#baseGrad)" dot={false} name="No Action" />
                {showMedical && (
                  <Area type="monotone" dataKey="corrected" stroke="var(--primary)" strokeWidth={2.5} fill="none" strokeDasharray="6 4" dot={false} name="With Bolus" />
                )}
                {showLifestyle && (
                  <Area type="monotone" dataKey="walking" stroke="var(--accent)" strokeWidth={2.5} fill="none" strokeDasharray="3 6" dot={false} name="With Walking" />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-2"><span className="inline-block h-0.5 w-6 bg-destructive rounded-full" /> No Action (Predicted)</span>
            {showMedical && <span className="flex items-center gap-2"><span className="inline-block h-0.5 w-6 bg-primary rounded-full" /> With 1.5u Correction</span>}
            {showLifestyle && <span className="flex items-center gap-2"><span className="inline-block h-0.5 w-6 bg-accent rounded-full" /> With {walkMinutes[0]}min Walk</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
