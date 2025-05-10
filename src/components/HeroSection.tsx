
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Achieve Your Goals with <span className="gradient-text">OKRify</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Set, track, and achieve your Objectives and Key Results with our simple, 
            easy-to-use OKR management tool. No sign-up required.
          </p>
          
          <Button asChild size="lg" className="button-gradient text-lg py-6 px-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/okr" className="flex items-center gap-2">
              Get Started <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
