import React from 'react';
import { RotateCcw, Trophy, Target } from 'lucide-react';
import { Quiz, Theme } from '../types/quiz';

interface ResultsScreenProps {
  quiz: Quiz;
  score: number;
  totalQuestions: number;
  theme: Theme;
  onPlayAgain: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  quiz,
  score,
  totalQuestions,
  theme,
  onPlayAgain,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPerfectScore = score === totalQuestions;
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreMessage = () => {
    if (isPerfectScore) return "Perfect score! Outstanding! 🎉";
    if (percentage >= 80) return "Excellent work! 🌟";
    if (percentage >= 60) return "Good job! Keep practicing! 👍";
    return "Keep learning and try again! 📚";
  };

  return (
    <div className={`max-w-md mx-auto p-8 rounded-2xl shadow-lg text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="mb-6">
        {isPerfectScore ? (
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
        ) : (
          <Target className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        )}
        
        <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Quiz Completed!
        </h2>
        <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          You completed the {quiz.title} quiz
        </p>
      </div>

      <div className="mb-6">
        <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
          {score}/{totalQuestions}
        </div>
        <div className={`text-2xl font-semibold mb-2 ${getScoreColor()}`}>
          {percentage}%
        </div>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {getScoreMessage()}
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={onPlayAgain}
          className="w-full flex items-center justify-center space-x-2 py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
};