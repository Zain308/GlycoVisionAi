"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Camera, Mic, Activity, Shield, Brain, Users } from "lucide-react"

const modules = [
  {
    icon: Camera,
    title: "AI Nutritionist",
    subtitle: "Smart Food Logger",
    description:
      "Upload meal photos and our Vision-Language Model instantly identifies dishes, estimates portion sizes, and calculates Carbohydrates & Fat content.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Mic,
    title: "AI Physiologist",
    subtitle: "Stress Detector",
    description:
      "Detects acute stress via vocal biomarkers (pitch, jitter, shimmer) from voice commands, or accepts manual HRV/stress scores from smartwatches.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Activity,
    title: "The Forecaster",
    subtitle: "Prediction Engine",
    description:
      "Transformer-based deep learning model fuses nutritional, physiological, and glucose data to predict blood glucose 60 minutes into the future.",
    color: "text-chart-3",
    bg: "bg-chart-3/10",
  },
  {
    icon: Shield,
    title: "Intervention Engine",
    subtitle: "Safe Treatment Guide",
    description:
      "Uses Walsh Insulin Model for IOB calculation and Counterfactual AI for what-if scenarios. Suggests safe correction boluses or lifestyle activities.",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Brain,
    title: "Digital Twin",
    subtitle: "Proactive Intelligence",
    description:
      "Acts as your proactive digital twin, ingesting real-time multimodal data streams to shift care from reactive treatment to predictive prevention.",
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    icon: Users,
    title: "Admin Module",
    subtitle: "System Management",
    description:
      "Secure login, user management, model retraining triggers, and database oversight for clinicians and system administrators.",
    color: "text-chart-5",
    bg: "bg-chart-5/10",
  },
]

export function ModulesSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <span className="text-sm font-medium text-primary tracking-wider uppercase">
            System Architecture
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Five Intelligent Modules Working Together
          </h2>
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Each module processes a unique data stream and contributes to a unified prediction
            and intervention pipeline for comprehensive glucose management.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <Card
              key={mod.title}
              className="group relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${mod.bg}`}>
                    <mod.icon className={`h-6 w-6 ${mod.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{mod.title}</h3>
                    <p className="text-xs text-muted-foreground">{mod.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
