import CustomCursor from '@/components/CustomCursor';
import GrainOverlay from '@/components/GrainOverlay';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Showreel from '@/components/Showreel';
import SelectedWork from '@/components/SelectedWork';
import BeforeAfter from '@/components/BeforeAfter';
import EditingProcess from '@/components/EditingProcess';
import TimelineSection from '@/components/TimelineSection';
import Services from '@/components/Services';
import Clients from '@/components/Clients';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import CreativeStatement from '@/components/CreativeStatement';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <main className="relative bg-primary">
        <Hero />
        <Showreel />
        <SelectedWork />
        <BeforeAfter />
        <EditingProcess />
        <TimelineSection />
        <Services />
        <Clients />
        <Testimonials />
        <About />
        <CreativeStatement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
