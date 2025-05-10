
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { KeyResult } from '@/types/okr';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface KeyResultItemProps {
  keyResult: KeyResult;
  onUpdateProgress: (progress: number) => void;
  onDelete: () => void;
}

const KeyResultItem: React.FC<KeyResultItemProps> = ({
  keyResult,
  onUpdateProgress,
  onDelete
}) => {
  const [progress, setProgress] = useState(keyResult.progress);
  const [isEditing, setIsEditing] = useState(false);

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };

  const handleProgressChangeEnd = () => {
    onUpdateProgress(progress);
    setIsEditing(false);
  };

  return (
    <div className="bg-muted p-3 rounded-md">
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm font-medium">{keyResult.title}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-6 w-6 text-gray-500 hover:text-destructive"
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Slider
            defaultValue={[keyResult.progress]}
            value={[progress]}
            max={100}
            step={5}
            className="w-full"
            onValueChange={handleProgressChange}
            onValueCommit={handleProgressChangeEnd}
            onClick={() => setIsEditing(true)}
          />
        </div>
        <div className="w-12 text-right text-sm font-medium">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default KeyResultItem;
