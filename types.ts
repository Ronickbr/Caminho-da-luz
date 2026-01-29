
export interface Affirmation {
  id: string;
  week: number;
  day: number;
  text: string;
  completed: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  affirmationId?: string;
}

export interface UserProgress {
  currentWeek: number;
  completedIds: string[];
}

export type TabType = 'opening' | 'guidelines' | 'affirmations' | 'prayers' | 'journal';

export interface TTSConfig {
  voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';
}
