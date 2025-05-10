
import React from 'react';
import { ChevronRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Create Objectives',
    description: 'Set meaningful objectives that represent what you want to achieve'
  },
  {
    number: '02',
    title: 'Add Key Results',
    description: 'Define measurable key results to track progress toward your objectives'
  },
  {
    number: '03',
    title: 'Update Progress',
    description: 'Regularly update the completion percentage of your key results'
  },
  {
    number: '04',
    title: 'Achieve Goals',
    description: 'Complete your OKRs and celebrate your accomplishments'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Simple Process, <span className="gradient-text">Powerful Results</span>
        </h2>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative flex flex-col items-center text-center animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-full bg-okr-blue text-white flex items-center justify-center mb-4 z-10">
                  {index < 3 ? <ChevronRight className="h-6 w-6" /> : '✓'}
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md w-full">
                  <div className="text-okr-blue font-medium mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
