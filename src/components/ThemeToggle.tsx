import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../types/quiz';

interface ThemeToggleProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onThemeChange }) => {
  return (
    <button
      onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
      className={`
        p-3 rounded-xl transition-all duration-300 
        ${theme === 'light' 
          ? 'bg-purple-500 hover:bg-purple-600 text-white' 
          : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
        }
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
        ${theme === 'dark' ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};