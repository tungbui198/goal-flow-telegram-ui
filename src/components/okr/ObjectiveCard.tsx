
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { KeyResult, Task, Objective, calculateObjectiveProgress } from '@/types/okr';
import { Trash, Plus, Calendar } from 'lucide-react';
import KeyResultItem from './KeyResultItem';
import AddKeyResultForm from './AddKeyResultForm';
import { format } from 'date-fns';

interface ObjectiveCardProps {
  objective: Objective;
  onAddKeyResult: (objectiveId: string, keyResult: Omit<KeyResult, 'id'>) => void;
  onUpdateKeyResult: (objectiveId: string, keyResultId: string, progress: number) => void;
  onUpdateKeyResultTasks: (objectiveId: string, keyResultId: string, tasks: Task[]) => void;
  onDeleteKeyResult: (objectiveId: string, keyResultId: string) => void;
  onDeleteObjective: (objectiveId: string) => void;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  objective,
  onAddKeyResult,
  onUpdateKeyResult,
  onUpdateKeyResultTasks,
  onDeleteKeyResult,
  onDeleteObjective
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const progress = calculateObjectiveProgress(objective.keyResults);
  
  const getStatusColor = () => {
    switch(objective.status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'behind': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusBadge = () => {
    switch(objective.status) {
      case 'completed': return <Badge className="bg-green-500">Completed</Badge>;
      case 'in-progress': return <Badge className="bg-blue-500">In Progress</Badge>;
      case 'behind': return <Badge className="bg-orange-500">Behind</Badge>;
      default: return <Badge>Not Started</Badge>;
    }
  };

  return (
    <Card className={`mb-6 border-t-4 border-t-${getStatusColor()} animate-fade-in`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>{objective.title}</CardTitle>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{format(new Date(objective.startDate), 'MMM dd')} - {format(new Date(objective.endDate), 'MMM dd, yyyy')}</span>
            {getStatusBadge()}
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDeleteObjective(objective.id)}
          className="h-8 w-8 text-gray-500 hover:text-destructive"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="space-y-3">
          {objective.keyResults.map(kr => (
            <KeyResultItem
              key={kr.id}
              keyResult={kr}
              onUpdateProgress={(progress) => onUpdateKeyResult(objective.id, kr.id, progress)}
              onDelete={() => onDeleteKeyResult(objective.id, kr.id)}
              onUpdateTasks={(tasks) => onUpdateKeyResultTasks(objective.id, kr.id, tasks)}
            />
          ))}
        </div>
        
        {showAddForm ? (
          <AddKeyResultForm
            onAdd={(title) => {
              onAddKeyResult(objective.id, { title, progress: 0, tasks: [] });
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        ) : (
          <Button 
            variant="outline" 
            className="w-full mt-4 text-okr-blue hover:text-okr-indigo border-dashed"
            onClick={() => setShowAddForm(true)}
          >
            <Plus className="h-4 w-4 mr-2" /> Add Key Result
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ObjectiveCard;
