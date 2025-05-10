
export interface Task {
  id: string;
  title: string;
  progress: number;
}

export interface KeyResult {
  id: string;
  title: string;
  progress: number;
  tasks: Task[];
}

export interface Objective {
  id: string;
  title: string;
  keyResults: KeyResult[];
  startDate: string;
  endDate: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'behind';
}

export interface OKRState {
  objectives: Objective[];
  streakCount: number;
  badges: string[];
}

// Helper functions to calculate progress
export const calculateKeyResultProgress = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  const totalProgress = tasks.reduce((acc, task) => acc + task.progress, 0);
  return Math.round(totalProgress / tasks.length);
};

export const calculateObjectiveProgress = (keyResults: KeyResult[]): number => {
  if (keyResults.length === 0) return 0;
  const totalProgress = keyResults.reduce((acc, kr) => acc + kr.progress, 0);
  return Math.round(totalProgress / keyResults.length);
};

export const getObjectiveStatus = (objective: Objective): 'not-started' | 'in-progress' | 'completed' | 'behind' => {
  const progress = calculateObjectiveProgress(objective.keyResults);
  const now = new Date();
  const endDate = new Date(objective.endDate);
  const startDate = new Date(objective.startDate);
  
  if (progress >= 100) return 'completed';
  if (progress === 0) return 'not-started';
  
  // Calculate expected progress based on time elapsed
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsedDuration = now.getTime() - startDate.getTime();
  const expectedProgress = Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
  
  return progress < expectedProgress ? 'behind' : 'in-progress';
};
