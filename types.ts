
export type PersonaType = 'MASTERMIND' | 'TANK' | 'SCREAMER' | 'SCOUT' | 'CHAOS';

export interface Stats {
  bravery: number;
  logic: number;
  observation: number;
  leadership: number;
}

export interface PersonaResult {
  type: PersonaType;
  title: string; // e.g., "The Mastermind"
  persianTitle: string; // e.g., "مغز متفکر"
  description: string;
  color: string;
  iconName: string;
  aiPrompt: string;
  recommendedGames: string[];
}

export interface Option {
  text: string;
  effect: Partial<Stats>;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
}
