import AmbientBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import FeaturesSection from './components/FeaturesSection';
import PredictionSection from './components/PredictionSection';
import AnalyticsSection from './components/AnalyticsSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';
import TechStackSection from './components/TechStackSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#faf9f6' }}>
      {/* Subtle grain film */}
      <div className="grain" />

      <Navbar />

      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <PredictionSection />
        <AnalyticsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <TechStackSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
