export type CPAMode = 'concrete' | 'pictorial' | 'abstract' | 'socratic_hint' | 'visual_bridge';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'sage';
  text: string;
  timestamp: number;
  imageUrl?: string;
  cpaStage?: 'concrete' | 'pictorial' | 'abstract';
  mode?: CPAMode;
  suggestedActions?: string[];
  isThinking?: boolean;
}

export interface ChapterItem {
  id: number;
  number: number;
  title: string;
  category: 'Algebra' | 'Geometry' | 'Statistics' | 'Mensuration' | 'Graphs';
  objectives: string[];
  concreteNotes: string;
  pictorialNotes: string;
  abstractNotes: string;
  coreFormulas: string[];
  sampleProblems: SampleProblem[];
  recommendedTool?: string;
}

export interface SampleProblem {
  id: string;
  title: string;
  difficulty: 'Basic' | 'Advanced' | 'Exam Challenge';
  statement: string;
  concretePrompt: string;
  pictorialPrompt: string;
  abstractPrompt: string;
  solutionSummary: string;
  scaffoldingHints: string[];
  commonMisconception: string;
}

export interface CPAStepStatus {
  concrete: boolean;
  pictorial: boolean;
  abstract: boolean;
}

export type MasteryMap = Record<number, CPAStepStatus>;

export interface BarUnit {
  id: string;
  label: string;
  value?: number | string;
  isUnknown?: boolean;
  color?: string;
  widthUnits: number;
}

export interface BarRow {
  id: string;
  name: string;
  units: BarUnit[];
  totalValue?: number | string;
}

export interface TileItem {
  id: string;
  type: 'x2' | 'neg_x2' | 'x' | 'neg_x' | 'unit' | 'neg_unit';
  x: number;
  y: number;
}
