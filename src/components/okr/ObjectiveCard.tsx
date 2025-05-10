
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { KeyResult } from '@/types/okr';
import { Trash, Plus } from 'lucide-react';
import KeyResultItem from './KeyResultItem';
import AddKeyResultForm from './AddKeyResultForm';

interface ObjectiveCardProps {
  id: string;
  title: string;
  keyResults: KeyResult[];
  onAddKeyResult: (objectiveId: string, keyResult: Omit<KeyResult, 'id'>) => void;
  onUpdateKeyResult: (objectiveId: string, keyResultId: string, progress: number) => void;
  onDeleteKeyResult: (objectiveId: string, keyResultId: string) => void;
  onDeleteObjective: (objectiveId: string) => void;
}

const ObjectiveCard: React.FC<ObjectiveCardProps> = ({
  id,
  title,
  keyResults,
  onAddKeyResult,
  onUpdateKeyResult,
  onDeleteKeyResult,
  onDeleteObjective
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  // Calculate overall progress
  const calculateProgress = () => {
    if (keyResults.length === 0) return 0;
    const totalProgress = keyResults.reduce((acc, kr) => acc + kr.progress, 0);
    return Math.round(totalProgress / keyResults.length);
  };

  const progress = calculateProgress();

  return (
    <Card className="mb-6 border-t-4 border-t-okr-blue animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>{title}</CardTitle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => onDeleteObjective(id)}
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
          {keyResults.map(kr => (
            <KeyResultItem
              key={kr.id}
              keyResult={kr}
              onUpdateProgress={(progress) => onUpdateKeyResult(id, kr.id, progress)}
              onDelete={() => onDeleteKeyResult(id, kr.id)}
            />
          ))}
        </div>
        
        {showAddForm ? (
          <AddKeyResultForm
            onAdd={(title) => {
              onAddKeyResult(id, { title, progress: 0 });
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
