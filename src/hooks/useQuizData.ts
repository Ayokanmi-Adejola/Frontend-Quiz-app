import { useState, useEffect } from 'react';
import { QuizData } from '../types/quiz';

export const useQuizData = () => {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        const response = await fetch('/src/data/quiz-data.json');
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Failed to load quiz data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []);

  return { quizData, loading };
};