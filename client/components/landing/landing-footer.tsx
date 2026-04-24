"use client"

import { GlycoVisionLogo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      {/* CTA Band */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
          Take Control of Your Glucose, Today
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
          Join GlycoVision AI and experience proactive diabetes management powered by
          multimodal deep learning.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button size="lg" asChild className="gap-2">
            <Link href="/auth/signup">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GlycoVisionLogo className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">GlycoVision AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Department of Computer Science, National University of Modern Languages, Islamabad
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>SDG 3: Good Health</span>
            <span>SDG 4: Quality Education</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
