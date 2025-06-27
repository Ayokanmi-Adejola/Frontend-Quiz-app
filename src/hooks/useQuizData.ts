import { QuizData } from '../types/quiz';
import quizData from '../data/quiz-data.json';

export const useQuizData = () => {
  return { quizData: quizData as QuizData, loading: false };
};