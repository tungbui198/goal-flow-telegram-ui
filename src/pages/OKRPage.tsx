
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Objective, KeyResult, OKRState, Task, getObjectiveStatus } from '@/types/okr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ObjectiveCard from '@/components/okr/ObjectiveCard';
import AddObjectiveForm from '@/components/okr/AddObjectiveForm';
import EmptyState from '@/components/okr/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus, Objectives, Report, Create } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import StatusCards from '@/components/okr/StatusCards';
import StatusCharts from '@/components/okr/StatusCharts';

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

  // Count objectives by status
  const objectiveCounts = {
    ongoing: okrState.objectives.filter(obj => obj.status === 'in-progress').length,
    overdue: okrState.objectives.filter(obj => obj.status === 'behind').length
  };

  // Count key results
  const keyResultCount = okrState.objectives.reduce((count, obj) => count + obj.keyResults.length, 0);

  // Get all tasks
  const allTasks = okrState.objectives.flatMap(obj => 
    obj.keyResults.flatMap(kr => kr.tasks)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header showGetStarted={false} />
      
      <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">OKR Dashboard</h1>
              <div className="flex gap-2">
                <Button className="bg-red-500 hover:bg-red-600">
                  <Report className="h-4 w-4 mr-2" /> Report
                </Button>
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => setShowAddForm(true)}
                >
                  <Create className="h-4 w-4 mr-2" /> Create
                </Button>
                <Button className="bg-indigo-500 hover:bg-indigo-600">
                  <Objectives className="h-4 w-4 mr-2" /> Objectives
                </Button>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <StatusCards 
            objectiveCounts={objectiveCounts}
            keyResultCount={keyResultCount}
            taskCount={allTasks.length}
          />

          {/* Status Charts */}
          <StatusCharts 
            objectives={okrState.objectives}
            allTasks={allTasks}
          />

          <div className="mt-8">
            {showAddForm && (
              <AddObjectiveForm 
                onAdd={handleAddObjective}
                onCancel={() => setShowAddForm(false)}
              />
            )}
            
            {okrState.objectives.length === 0 && !showAddForm ? (
              <EmptyState onAddObjective={() => setShowAddForm(true)} />
            ) : (
              <div className="space-y-6">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OKRPage;
