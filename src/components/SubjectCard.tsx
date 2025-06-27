import React from 'react';
import { Code, Palette, Zap, Eye } from 'lucide-react';
import { Quiz, Theme } from '../types/quiz';

interface SubjectCardProps {
  quiz: Quiz;
  theme: Theme;
  onClick: () => void;
}

const iconMap = {
  html: Code,
  css: Palette,
  javascript: Zap,
  accessibility: Eye,
};

const colorMap = {
  orange: {
    light: 'bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700',
    dark: 'bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800',
    icon: 'text-orange-100',
  },
  blue: {
    light: 'bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
    dark: 'bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800',
    icon: 'text-blue-100',
  },
  yellow: {
    light: 'bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700',
    dark: 'bg-gradient-to-br from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800',
    icon: 'text-yellow-100',
  },
  purple: {
    light: 'bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700',
    dark: 'bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800',
    icon: 'text-purple-100',
  },
};

export const SubjectCard: React.FC<SubjectCardProps> = ({ quiz, theme, onClick }) => {
  const IconComponent = iconMap[quiz.icon as keyof typeof iconMap];
  const colors = colorMap[quiz.color];

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-6 rounded-2xl text-left transition-all duration-300 transform
        hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 
        focus:ring-purple-400 focus:ring-offset-2 group
        ${colors[theme]}
        ${theme === 'dark' ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
      `}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-xl bg-white/20 ${colors.icon} group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-1">{quiz.title}</h3>
          <p className="text-white/80 text-sm">{quiz.questions.length} questions</p>
        </div>
      </div>
    </button>
  );
};