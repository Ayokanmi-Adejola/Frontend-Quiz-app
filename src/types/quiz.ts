export interface Question {
  question: string;
  options: string[];
  answer: number;
}

export interface Quiz {
  title: string;
  icon: string;
  color: 'orange' | 'blue' | 'yellow' | 'purple';
  questions: Question[];
}

export interface QuizData {
  quizzes: Quiz[];
}

export type Theme = 'light' | 'dark';

export type GameState = 'subject-selection' | 'quiz' | 'results';