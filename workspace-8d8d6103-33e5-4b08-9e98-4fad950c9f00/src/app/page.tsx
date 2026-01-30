'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { WhyChooseUsSection } from '@/components/landing/WhyChooseUsSection';
import { ProjectsSection } from '@/components/landing/ProjectsSection';
import { ClientsSection } from '@/components/landing/ClientsSection';
import { ContactSection } from '@/components/landing/ContactSection';
import { NewsletterSection } from '@/components/landing/NewsletterSection';
import { Footer } from '@/components/landing/Footer';
import { ConsultationBoard } from '@/components/landing/ConsultationBoard';
import { Toaster } from '@/components/ui/toaster';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <ConsultationBoard />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <ProjectsSection />
      <ClientsSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
      <Toaster />
    </div>
  );
}
