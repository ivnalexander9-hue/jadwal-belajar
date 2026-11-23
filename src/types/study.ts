export type DayOfWeek = 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';

export type WorkspaceTab = 'ringkasan' | 'jadwal' | 'tugas' | 'materi';

export type TaskPriority = 'Mendesak' | 'Sedang' | 'Santai';
export type TaskStatus = 'Belum' | 'Dikerjakan' | 'Selesai';
export type ConfidenceLevel = 'Perlu Bimbingan' | 'Mulai Mengerti' | 'Paham' | 'Menguasai';

export interface ScheduleItem {
  id: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  teacher: string;
  topicFocus: string;
  linkedMaterialId?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string; // YYYY-MM-DD
  dueTime: string; // HH:mm
  priority: TaskPriority;
  status: TaskStatus;
  description: string;
  linkedMaterialId?: string;
  reminderEnabled: boolean;
}

export interface MaterialSection {
  heading: string;
  summary: string;
  points: string[];
}

export interface MaterialTerm {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type InteractiveLabType =
  | 'social-impact'
  | 'ipo-system'
  | 'data-privacy'
  | 'digital-citizenship'
  | 'vibe-coding'
  | 'cloud-pipeline';

export interface MaterialTopic {
  id: string;
  order: string;
  title: string;
  shortTitle: string;
  subject: string;
  estimatedReadMin: number;
  summaryLead: string;
  sections: MaterialSection[];
  keyTerms: MaterialTerm[];
  realWorldExample: string;
  interactiveLabType: InteractiveLabType;
  quiz: QuizQuestion[];
}

export interface ProgressEntry {
  id: string;
  materialId: string;
  date: string; // YYYY-MM-DD
  weekLabel: string;
  score: number; // 0-100
  confidence: ConfidenceLevel;
  note: string;
  quizScore?: number;
}

export interface StudentProfile {
  name: string;
  school: string;
  grade: string;
  academicYear: string;
}
