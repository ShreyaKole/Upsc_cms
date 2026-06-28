export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface Option {
  id: OptionKey;
  text: string;
}

export type Subject =
  | 'General Medicine'
  | 'Paediatrics'
  | 'Surgery'
  | 'Obstetrics & Gynaecology'
  | 'Preventive & Social Medicine (SPM)'
  | 'General Ability';

export interface Question {
  id: number;
  year: number;
  paper: 'I' | 'II' | 'General Studies' | 'CMS Paper I' | 'CMS Paper II';
  text: string;
  options: Option[];
  correctOption: OptionKey;
  subject: Subject;
  explanation: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface Paper {
  id: string;
  year: number;
  title: string;
  category: 'Prelims GS-1' | 'CMS Paper I' | 'CMS Paper II';
  totalQuestions: number;
  totalMarks: number;
  marksPerQuestion: number;
  negativeMarking: number;
  durationMinutes: number;
  description: string;
}

export interface AnswerRecord {
  questionId: number;
  selectedOption: OptionKey | null;
  isMarkedForReview: boolean;
  timeSpentSeconds: number;
  visitCount: number;
}

export interface ExamSession {
  paperId: string;
  year: number;
  startedAt: string;
  answers: Record<number, AnswerRecord>;
  currentIndex: number;
  isSubmitted: boolean;
  timeRemainingSeconds: number;
}

export interface SubjectStats {
  subject: Subject;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  marksGained: number;
  accuracy: number;
}

export interface ExamResult {
  id: string;
  userId: string;
  paperId: string;
  paperTitle: string;
  year: number;
  submittedAt: string;
  totalTimeSeconds: number;
  score: number;
  totalMarks: number;
  totalCorrect: number;
  totalWrong: number;
  totalUnattempted: number;
  totalFlagged: number;
  accuracy: number;
  subjectBreakdown: SubjectStats[];
  answers: AnswerRecord[];
  questions: Question[];
}

export interface User {
  id: string;
  username: string;
  createdAt: string;
}
