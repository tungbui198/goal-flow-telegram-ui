
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface AddObjectiveFormProps {
  onAdd: (title: string) => void;
  onCancel: () => void;
}

const AddObjectiveForm: React.FC<AddObjectiveFormProps> = ({ onAdd, onCancel }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <Card className="mb-6 border-t-4 border-t-okr-blue animate-fade-in">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              placeholder="Enter objective title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              autoFocus
            />
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!title.trim()}
                className="button-gradient"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Objective
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddObjectiveForm;
