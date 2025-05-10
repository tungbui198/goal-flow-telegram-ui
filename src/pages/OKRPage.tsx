
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Objective, KeyResult, OKRState } from '@/types/okr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ObjectiveCard from '@/components/okr/ObjectiveCard';
import AddObjectiveForm from '@/components/okr/AddObjectiveForm';
import EmptyState from '@/components/okr/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OKR_STORAGE_KEY = 'okrify-data';

const OKRPage: React.FC = () => {
  const [okrState, setOkrState] = useState<OKRState>({ objectives: [] });
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(OKR_STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setOkrState(parsedData);
      } catch (error) {
        console.error('Error parsing saved OKR data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(OKR_STORAGE_KEY, JSON.stringify(okrState));
  }, [okrState]);

  const handleAddObjective = (title: string) => {
    const newObjective: Objective = {
      id: uuidv4(),
      title,
      keyResults: []
    };

    setOkrState(prev => ({
      ...prev,
      objectives: [...prev.objectives, newObjective]
    }));

    toast({
      title: "Objective created",
      description: `"${title}" has been added to your OKRs`,
    });
    
    setShowAddForm(false);
  };

  const handleAddKeyResult = (objectiveId: string, keyResult: Omit<KeyResult, 'id'>) => {
    const newKeyResult: KeyResult = {
      ...keyResult,
      id: uuidv4()
    };

    setOkrState(prev => ({
      ...prev,
      objectives: prev.objectives.map(obj => 
        obj.id === objectiveId 
          ? { ...obj, keyResults: [...obj.keyResults, newKeyResult] } 
          : obj
      )
    }));

    toast({
      title: "Key Result added",
      description: `"${keyResult.title}" has been added`,
    });
  };

  const handleUpdateKeyResult = (objectiveId: string, keyResultId: string, progress: number) => {
    setOkrState(prev => ({
      ...prev,
      objectives: prev.objectives.map(obj => 
        obj.id === objectiveId 
          ? {
              ...obj,
              keyResults: obj.keyResults.map(kr => 
                kr.id === keyResultId ? { ...kr, progress } : kr
              )
            } 
          : obj
      )
    }));
  };

  const handleDeleteKeyResult = (objectiveId: string, keyResultId: string) => {
    setOkrState(prev => ({
      ...prev,
      objectives: prev.objectives.map(obj => 
        obj.id === objectiveId 
          ? {
              ...obj,
              keyResults: obj.keyResults.filter(kr => kr.id !== keyResultId)
            } 
          : obj
      )
    }));

    toast({
      title: "Key Result deleted",
      description: "The key result has been removed",
    });
  };

  const handleDeleteObjective = (objectiveId: string) => {
    setOkrState(prev => ({
      ...prev,
      objectives: prev.objectives.filter(obj => obj.id !== objectiveId)
    }));

    toast({
      title: "Objective deleted",
      description: "The objective and all its key results have been removed",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showGetStarted={false} />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My OKRs</h1>
            
            {okrState.objectives.length > 0 && !showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                className="button-gradient"
              >
                <Plus className="h-4 w-4 mr-2" /> New Objective
              </Button>
            )}
          </div>
          
          {showAddForm && (
            <AddObjectiveForm 
              onAdd={handleAddObjective}
              onCancel={() => setShowAddForm(false)}
            />
          )}
          
          {okrState.objectives.length === 0 ? (
            <EmptyState onAddObjective={() => setShowAddForm(true)} />
          ) : (
            <div>
              {okrState.objectives.map(objective => (
                <ObjectiveCard
                  key={objective.id}
                  id={objective.id}
                  title={objective.title}
                  keyResults={objective.keyResults}
                  onAddKeyResult={handleAddKeyResult}
                  onUpdateKeyResult={handleUpdateKeyResult}
                  onDeleteKeyResult={handleDeleteKeyResult}
                  onDeleteObjective={handleDeleteObjective}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OKRPage;
