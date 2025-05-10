
import React from 'react';
import { Target, Clock, CheckCircle2, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: <Target className="h-10 w-10 text-okr-blue" />,
    title: 'Set Clear Objectives',
    description: 'Define ambitious but achievable objectives that align with your personal or professional goals.'
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-okr-purple" />,
    title: 'Track Key Results',
    description: 'Add measurable key results to each objective so you can track your progress effectively.'
  },
  {
    icon: <BarChart2 className="h-10 w-10 text-okr-indigo" />,
    title: 'Monitor Progress',
    description: 'Visualize your progress with intuitive charts and progress bars to stay motivated.'
  },
  {
    icon: <Clock className="h-10 w-10 text-okr-pink" />,
    title: 'Set Timeframes',
    description: 'Establish clear deadlines for your OKRs to create accountability and urgency.'
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How <span className="gradient-text">OKRify</span> Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-md card-hover animate-fade-in"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
