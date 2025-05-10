
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { KeyResult, Task, calculateKeyResultProgress } from '@/types/okr';
import { Button } from '@/components/ui/button';
import { Trash, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';
import { v4 as uuidv4 } from 'uuid';

interface KeyResultItemProps {
  keyResult: KeyResult;
  onUpdateProgress: (progress: number) => void;
  onDelete: () => void;
  onUpdateTasks: (tasks: Task[]) => void;
}

const KeyResultItem: React.FC<KeyResultItemProps> = ({
  keyResult,
  onUpdateProgress,
  onDelete,
  onUpdateTasks
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      progress: 0
    };
    
    const updatedTasks = [...keyResult.tasks, newTask];
    onUpdateTasks(updatedTasks);
    setShowAddForm(false);
  };

  const handleUpdateTaskProgress = (taskId: string, progress: number) => {
    const updatedTasks = keyResult.tasks.map(task => 
      task.id === taskId ? { ...task, progress } : task
    );
    
    onUpdateTasks(updatedTasks);
    // Automatically update key result progress based on tasks
    onUpdateProgress(calculateKeyResultProgress(updatedTasks));
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = keyResult.tasks.filter(task => task.id !== taskId);
    onUpdateTasks(updatedTasks);
    // Update key result progress after deleting a task
    onUpdateProgress(calculateKeyResultProgress(updatedTasks));
  };

  return (
    <div className="bg-muted p-3 rounded-md">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-6 w-6 p-0"
          >
            {isExpanded ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </Button>
          <span className="text-sm font-medium">{keyResult.title}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-6 w-6 text-gray-500 hover:text-destructive"
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex items-center gap-4 mb-2">
        <div className="flex-1">
          <Slider
            value={[keyResult.progress]}
            max={100}
            step={5}
            className="w-full"
            disabled={keyResult.tasks.length > 0}
          />
        </div>
        <div className="w-12 text-right text-sm font-medium">
          {keyResult.progress}%
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-3 space-y-2">
          {keyResult.tasks.length > 0 && (
            <div className="space-y-2">
              {keyResult.tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdateProgress={(progress) => handleUpdateTaskProgress(task.id, progress)}
                  onDelete={() => handleDeleteTask(task.id)}
                />
              ))}
            </div>
          )}
          
          {showAddForm ? (
            <AddTaskForm
              onAdd={handleAddTask}
              onCancel={() => setShowAddForm(false)}
            />
          ) : (
            <Button 
              variant="outline" 
              className="w-full mt-2 text-xs text-okr-blue hover:text-okr-indigo border-dashed"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-3 w-3 mr-1" /> Add Task
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default KeyResultItem;
