
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-okr-blue/10 to-okr-purple/10">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to achieve your goals?</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Start tracking your objectives and key results today. No login required - just set your goals and start making progress.
        </p>
        
        <Button asChild size="lg" className="button-gradient text-lg py-6 px-8">
          <Link to="/okr" className="flex items-center gap-2">
            Create Your OKRs Now <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
