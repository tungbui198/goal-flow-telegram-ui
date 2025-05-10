
import React from 'react';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

interface EmptyStateProps {
  onAddObjective: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddObjective }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 animate-fade-in">
      <Target className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">No objectives yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Get started by creating your first objective. Then add key results to track your progress.
      </p>
      <Button className="button-gradient" onClick={onAddObjective}>
        Create Your First Objective
      </Button>
    </div>
  );
};

export default EmptyState;
