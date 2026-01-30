import { LightHeader, Footer } from '@/components/layout'
import {
  LightHero,
  FeaturesGrid,
  EnhancedUseCases,
  HowItWorks,
  Testimonials,
  EnhancedFinalCTA,
} from '@/components/landing'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <LightHeader />
      <main>
        <LightHero />
        <FeaturesGrid />
        <EnhancedUseCases />
        <HowItWorks />
        <Testimonials />
        <EnhancedFinalCTA />
      </main>
      <Footer />
    </div>
  )
}
