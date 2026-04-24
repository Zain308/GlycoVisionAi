"use client"

import { Button } from "@/components/ui/button"
import { GlycoVisionLogo } from "@/components/icons"
import { Activity, ArrowRight, Brain, Shield } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--primary)_0%,transparent_50%)] opacity-[0.08]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--accent)_0%,transparent_50%)] opacity-[0.06]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 w-fit">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                AI-Powered Diabetes Management
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
              Predict Glucose Spikes{" "}
              <span className="text-primary">Before</span> They Happen
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              GlycoVision AI fuses computer vision, vocal biomarker analysis, and
              transformer-based forecasting to predict hyperglycemia{" "}
              <strong className="text-foreground">60 minutes in advance</strong> and
              suggest safe interventions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/dashboard">
                  Launch Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link href="/auth/login">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-foreground">60min</p>
                <p className="text-sm text-muted-foreground">Prediction Horizon</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">3+</p>
                <p className="text-sm text-muted-foreground">AI Models Fused</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">Safe</p>
                <p className="text-sm text-muted-foreground">IOB Guardrails</p>
              </div>
            </div>
          </div>

          {/* Right - Visual Dashboard Preview */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl border border-border/50 bg-card p-6 shadow-2xl shadow-primary/5">
              {/* Mini dashboard preview */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <GlycoVisionLogo className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold text-foreground">Live Glucose Monitor</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">Connected</span>
                </div>
              </div>

              {/* Glucose Chart Preview */}
              <div className="mt-4 space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-foreground">142</span>
                  <span className="text-sm text-muted-foreground">mg/dL</span>
                  <span className="ml-auto text-sm font-medium text-warning">Predicted: 185</span>
                </div>

                {/* SVG Chart */}
                <div className="h-32 w-full relative">
                  <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                    {/* Target zone */}
                    <rect x="0" y="30" width="400" height="50" fill="var(--primary)" opacity="0.06" rx="4" />
                    <line x1="0" y1="30" x2="400" y2="30" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

                    {/* Historical line */}
                    <polyline
                      points="0,70 30,65 60,55 90,50 120,60 150,55 180,45 210,50 220,48"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Predicted line */}
                    <polyline
                      points="220,48 260,35 300,25 340,18 380,12 400,10"
                      fill="none"
                      stroke="var(--warning)"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="220" cy="48" r="4" fill="var(--primary)" />
                  </svg>
                  <div className="absolute top-0 right-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-primary rounded-full" /> Actual</span>
                    <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-4 bg-warning rounded-full border-dashed" /> Predicted</span>
                  </div>
                </div>

                {/* Alerts */}
                <div className="flex items-center gap-3 rounded-lg bg-warning/10 border border-warning/20 px-4 py-3">
                  <Shield className="h-4 w-4 text-warning shrink-0" />
                  <p className="text-xs text-foreground">
                    <strong>Spike Predicted in 45min.</strong> Suggested: 1.5u correction bolus or 15min walk.
                  </p>
                </div>
              </div>

              {/* Bottom module indicators */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Forecaster</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                  <Brain className="h-4 w-4 text-accent" />
                  <span className="text-xs text-muted-foreground">AI Nutrition</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-xs text-muted-foreground">Intervener</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
