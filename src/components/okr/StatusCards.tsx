
import React from 'react';
import { Card } from '@/components/ui/card';

interface StatusCardsProps {
  objectiveCounts: {
    ongoing: number;
    overdue: number;
  };
  keyResultCount: number;
  taskCount: number;
}

const StatusCards: React.FC<StatusCardsProps> = ({ 
  objectiveCounts,
  keyResultCount,
  taskCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Ongoing Objectives Card */}
      <Card className="bg-blue-800 text-white border-none">
        <div className="p-4">
          <div className="uppercase text-sm font-semibold mb-2">Ongoing Objectives</div>
          <div className="text-2xl font-bold">{objectiveCounts.ongoing} Objectives</div>
        </div>
      </Card>

      {/* Overdue Objectives Card */}
      <Card className="bg-orange-500 text-white border-none">
        <div className="p-4">
          <div className="uppercase text-sm font-semibold mb-2">Overdue Objectives</div>
          <div className="text-2xl font-bold">{objectiveCounts.overdue} Overdue Objectives</div>
        </div>
      </Card>

      {/* Key Results Card */}
      <Card className="bg-blue-500 text-white border-none">
        <div className="p-4">
          <div className="uppercase text-sm font-semibold mb-2">Ongoing Key Results</div>
          <div className="text-2xl font-bold">{keyResultCount} Key Results</div>
        </div>
      </Card>

      {/* Department/Team Card */}
      <Card className="bg-red-500 text-white border-none">
        <div className="p-4">
          <div className="uppercase text-sm font-semibold mb-2">Tasks</div>
          <div className="text-2xl font-bold">Personal</div>
        </div>
      </Card>
    </div>
  );
};

export default StatusCards;
