import { LandingNav } from "@/components/landing/landing-nav"
import { HeroSection } from "@/components/landing/hero-section"
import { ModulesSection } from "@/components/landing/modules-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <LandingNav />
      <HeroSection />
      <div id="modules">
        <ModulesSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <LandingFooter />
    </main>
  )
}
