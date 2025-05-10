
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <div className="mt-2 border border-dashed border-okr-blue/20 p-2 rounded-md animate-fade-in">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 text-xs"
          autoFocus
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="h-7 text-xs">
            <X className="h-3 w-3 mr-1" /> Cancel
          </Button>
          <Button 
            type="submit" 
            size="sm" 
            disabled={!title.trim()}
            className="bg-okr-blue hover:bg-okr-indigo h-7 text-xs"
          >
            <Check className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
