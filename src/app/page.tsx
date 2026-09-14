import { HeroScrollGallery } from "@/components/site/hero-scroll-gallery";
import { SiteHeader } from "@/components/site/site-header";
import { StickyAppraisalBar } from "@/components/site/sticky-appraisal-bar";
import { TeamCarousel } from "@/components/site/team-carousel";
import { TestimonialsMarquee } from "@/components/site/testimonials-marquee";
import {
  ContactSection,
  PropertiesSection,
  ServicesSection,
  SiteFooter,
  TrustMetricsBento,
} from "@/components/site/sections";

export default function HomePage() {
  return (
    <main id="top" className="flex-1">
      <SiteHeader />
      <HeroScrollGallery />
      <ServicesSection />
      <PropertiesSection />
      <TrustMetricsBento />
      {/* About us — temporarily hidden
      <FeatureSplit
        id="about"
        title="About us"
        body="Fifteen years advising owners and occupiers across Melbourne's CBD. Local knowledge, personal service, and a commercial-first approach on every mandate."
        cta="Discover our agency story"
        href="#contact"
        image="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80"
      />
      */}
      <TeamCarousel />
      <TestimonialsMarquee />
      <ContactSection />
      <div id="news" className="sr-only" aria-hidden>
        Latest news
      </div>
      <SiteFooter />
      <StickyAppraisalBar />
    </main>
  );
}
