import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Theme } from '../types/quiz';

interface AttributionProps {
  theme: Theme;
}

export const Attribution: React.FC<AttributionProps> = ({ theme }) => {
  return (
    <footer className={`mt-12 text-center py-6 border-t ${
      theme === 'dark' 
        ? 'border-gray-700 text-gray-400' 
        : 'border-gray-200 text-gray-600'
    }`}>
      <p className="text-sm">
        Challenge by{' '}
        <a 
          href="https://www.frontendmentor.io" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 font-medium transition-colors duration-200 ${
            theme === 'dark'
              ? 'text-purple-400 hover:text-purple-300'
              : 'text-purple-600 hover:text-purple-700'
          }`}
        >
          Frontend Mentor
          <ExternalLink className="w-3 h-3" />
        </a>
        . Coded by{' '}
        <span className={`font-medium ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Ayokanmi Adejola
        </span>
        .
      </p>
    </footer>
  );
};