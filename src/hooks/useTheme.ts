import { useState, useEffect } from 'react';
import { Theme } from '../types/quiz';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('quiz-theme');
    return (saved as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('quiz-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return { theme, setTheme };
};