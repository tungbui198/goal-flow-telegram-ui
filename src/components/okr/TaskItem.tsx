
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Task } from '@/types/okr';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onUpdateProgress: (progress: number) => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateProgress,
  onDelete
}) => {
  const [progress, setProgress] = useState(task.progress);
  const [isEditing, setIsEditing] = useState(false);

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };

  const handleProgressChangeEnd = () => {
    onUpdateProgress(progress);
    setIsEditing(false);
  };

  return (
    <div className="p-2 bg-muted/50 rounded-md">
      <div className="flex justify-between items-start mb-1">
        <span className="text-xs font-medium">{task.title}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-5 w-5 text-gray-500 hover:text-destructive"
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Slider
            defaultValue={[task.progress]}
            value={[progress]}
            max={100}
            step={5}
            className="w-full"
            onValueChange={handleProgressChange}
            onValueCommit={handleProgressChangeEnd}
            onClick={() => setIsEditing(true)}
          />
        </div>
        <div className="w-10 text-right text-xs font-medium">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
