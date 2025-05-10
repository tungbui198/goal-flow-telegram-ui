
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';

interface AddKeyResultFormProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

const AddKeyResultForm: React.FC<AddKeyResultFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <div className="mt-4 border border-dashed border-okr-blue/30 p-3 rounded-md animate-fade-in">
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter key result..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3"
          autoFocus
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-3 w-3 mr-1" /> Cancel
          </Button>
          <Button 
            type="submit" 
            size="sm" 
            disabled={!title.trim()}
            className="bg-okr-blue hover:bg-okr-indigo"
          >
            <Check className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddKeyResultForm;
