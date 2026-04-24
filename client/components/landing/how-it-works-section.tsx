"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Snap Your Meal",
    description:
      "Take a photo of your food. Our Vision AI identifies the dish and estimates carbs and fat in seconds.",
  },
  {
    step: "02",
    title: "Speak or Input Stress",
    description:
      "Use voice commands to interact. The system analyzes vocal biomarkers to detect your stress level automatically.",
  },
  {
    step: "03",
    title: "Get Predictions",
    description:
      "The Forecaster fuses all data with your glucose history to predict your blood sugar 60 minutes ahead.",
  },
  {
    step: "04",
    title: "Receive Interventions",
    description:
      "Get safe, personalized correction suggestions: insulin dosing via Walsh IOB model or lifestyle activities.",
  },
]

const advantages = [
  "Proactive safety - prevents spikes before they happen",
  "Eliminates manual carb counting via AI vision",
  "Integrates stress as a primary glucose variable",
  "No expensive sensors required for stress detection",
  "Clinical-grade insulin stacking safety guardrails",
  "Accessible on any device - smartphone, tablet, laptop",
]

export function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* How it Works */}
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <span className="text-sm font-medium text-primary tracking-wider uppercase">
            How It Works
          </span>
          <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            From Meal to Prediction in Seconds
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-24">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-primary/20">{s.step}</span>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block h-5 w-5 text-muted-foreground/30 absolute -right-3 top-3" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Advantages */}
        <Card className="border-primary/20 bg-primary/[0.03]">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-primary tracking-wider uppercase">
                  Why GlycoVision AI
                </span>
                <h3 className="mt-3 text-2xl font-bold text-foreground md:text-3xl text-balance">
                  Shifting from Reactive to Preemptive Care
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Current diabetes management treats high blood sugar after it occurs.
                  GlycoVision AI predicts and prevents spikes by fusing multimodal AI
                  with clinical safety models.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {advantages.map((adv) => (
                  <div key={adv} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-success shrink-0" />
                    <span className="text-sm text-foreground">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
