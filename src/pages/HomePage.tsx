import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import DoctorCards from '../components/DoctorCards';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const doctorsRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDoctors = () => {
    doctorsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrollToFeatures={scrollToFeatures} scrollToDoctors={scrollToDoctors} />
      <HeroSection />
      
      <div ref={featuresRef}>
        <FeaturesSection />
      </div>
      
      <div ref={doctorsRef}>
        <DoctorCards />
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;