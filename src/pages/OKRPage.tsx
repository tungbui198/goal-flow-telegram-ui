
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Objective, KeyResult, OKRState, Task, getObjectiveStatus } from '@/types/okr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ObjectiveCard from '@/components/okr/ObjectiveCard';
import AddObjectiveForm from '@/components/okr/AddObjectiveForm';
import EmptyState from '@/components/okr/EmptyState';
import BadgesPanel from '@/components/okr/BadgesPanel';
import ExportPanel from '@/components/okr/ExportPanel';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const OKR_STORAGE_KEY = 'okrify-data';

const OKRPage: React.FC = () => {
  const [okrState, setOkrState] = useState<OKRState>({ 
    objectives: [],
    streakCount: 0,
    badges: []
  });
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

  // Check for completed objectives and award badges
  useEffect(() => {
    const newBadges = [];
    let completedToday = false;
    
    okrState.objectives.forEach(obj => {
      if (obj.status === 'completed') {
        const completedDate = new Date(obj.endDate);
        const today = new Date();
        
        if (completedDate.toDateString() === today.toDateString()) {
          completedToday = true;
        }
        
        // First objective completed badge
        if (!okrState.badges.includes('First Objective Complete') && 
            !newBadges.includes('First Objective Complete')) {
          newBadges.push('First Objective Complete');
        }
      }
    });
    
    // Update streak count if an objective was completed today
    let updatedStreakCount = okrState.streakCount;
    if (completedToday) {
      updatedStreakCount += 1;
      
      // Check for streak badges
      if (updatedStreakCount >= 7 && 
          !okrState.badges.includes('7-Day Streak') && 
          !newBadges.includes('7-Day Streak')) {
        newBadges.push('7-Day Streak');
      }
      
      if (updatedStreakCount >= 30 && 
          !okrState.badges.includes('30-Day Streak') && 
          !newBadges.includes('30-Day Streak')) {
        newBadges.push('30-Day Streak');
      }
    }
    
    // If new badges were earned, update state and show notifications
    if (newBadges.length > 0 || (completedToday && updatedStreakCount !== okrState.streakCount)) {
      setOkrState(prev => ({
        ...prev,
        badges: [...prev.badges, ...newBadges],
        streakCount: updatedStreakCount
      }));
      
      newBadges.forEach(badge => {
        toast({
          title: "New Badge Earned!",
          description: `Congratulations! You've earned: ${badge}`,
        });
      });
    }
  }, [okrState.objectives]);

  const handleAddObjective = (title: string, startDate: string, endDate: string) => {
    const newObjective: Objective = {
      id: uuidv4(),
      title,
      keyResults: [],
      startDate,
      endDate,
      status: 'not-started'
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

    setOkrState(prev => {
      const updatedObjectives = prev.objectives.map(obj => 
        obj.id === objectiveId 
          ? { ...obj, keyResults: [...obj.keyResults, newKeyResult] } 
          : obj
      );
      
      // Update objective statuses after adding a key result
      return {
        ...prev,
        objectives: updatedObjectives.map(obj => ({
          ...obj,
          status: getObjectiveStatus(obj)
        }))
      };
    });

    toast({
      title: "Key Result added",
      description: `"${keyResult.title}" has been added`,
    });
  };

  const handleUpdateKeyResult = (objectiveId: string, keyResultId: string, progress: number) => {
    setOkrState(prev => {
      const updatedObjectives = prev.objectives.map(obj => 
        obj.id === objectiveId 
          ? {
              ...obj,
              keyResults: obj.keyResults.map(kr => 
                kr.id === keyResultId ? { ...kr, progress } : kr
              )
            } 
          : obj
      );
      
      // Update objective statuses after updating a key result
      return {
        ...prev,
        objectives: updatedObjectives.map(obj => ({
          ...obj,
          status: getObjectiveStatus(obj)
        }))
      };
    });
  };

  const handleUpdateKeyResultTasks = (objectiveId: string, keyResultId: string, tasks: Task[]) => {
    setOkrState(prev => {
      const updatedObjectives = prev.objectives.map(obj => 
        obj.id === objectiveId 
          ? {
              ...obj,
              keyResults: obj.keyResults.map(kr => 
                kr.id === keyResultId ? { ...kr, tasks } : kr
              )
            } 
          : obj
      );
      
      // Update objective statuses after updating tasks
      return {
        ...prev,
        objectives: updatedObjectives.map(obj => ({
          ...obj,
          status: getObjectiveStatus(obj)
        }))
      };
    });
  };

  const handleDeleteKeyResult = (objectiveId: string, keyResultId: string) => {
    setOkrState(prev => {
      const updatedObjectives = prev.objectives.map(obj => 
        obj.id === objectiveId 
          ? {
              ...obj,
              keyResults: obj.keyResults.filter(kr => kr.id !== keyResultId)
            } 
          : obj
      );
      
      // Update objective statuses after deleting a key result
      return {
        ...prev,
        objectives: updatedObjectives.map(obj => ({
          ...obj,
          status: getObjectiveStatus(obj)
        }))
      };
    });

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
        <div className="container mx-auto max-w-4xl">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
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
                      objective={objective}
                      onAddKeyResult={handleAddKeyResult}
                      onUpdateKeyResult={handleUpdateKeyResult}
                      onUpdateKeyResultTasks={handleUpdateKeyResultTasks}
                      onDeleteKeyResult={handleDeleteKeyResult}
                      onDeleteObjective={handleDeleteObjective}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <BadgesPanel 
                badges={okrState.badges} 
                streakCount={okrState.streakCount} 
              />
              <ExportPanel okrState={okrState} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OKRPage;
