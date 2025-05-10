
export interface KeyResult {
  id: string;
  title: string;
  progress: number;
}

export interface Objective {
  id: string;
  title: string;
  keyResults: KeyResult[];
}

export interface OKRState {
  objectives: Objective[];
}
