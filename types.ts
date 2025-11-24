
export type PersonaType = 'MASTERMIND' | 'TANK' | 'SCREAMER' | 'SCOUT' | 'CHAOS' | 'COMMANDER' | 'ENGINEER' | 'MEDIUM';

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
  videoPrompt: string;
  shareText: string;
  voicePrompt: string;
  recommendedGames: { title: string; url: string }[];
  videoUrl: string;
  rarity: string; // e.g., "5%"
  bestMatch: PersonaType[];
  worstMatch: PersonaType[];
  motto: string;
  survivalRate: string;
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
