import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Question, Theme } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  theme: Theme;
  onAnswer: (selectedIndex: number) => void;
  showResult?: boolean;
  selectedAnswer?: number;
  isCorrect?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  theme,
  onAnswer,
  showResult = false,
  selectedAnswer,
  isCorrect,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (selected === null) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onAnswer(selected);
  };

  const getOptionClass = (index: number) => {
    const baseClass = `
      w-full p-4 rounded-xl text-left transition-all duration-300 border-2
      focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2
      ${theme === 'dark' ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
    `;

    if (showResult) {
      if (index === question.answer) {
        return `${baseClass} bg-green-100 border-green-500 text-green-800 ${theme === 'dark' ? 'bg-green-900/30 text-green-300' : ''}`;
      }
      if (index === selectedAnswer && index !== question.answer) {
        return `${baseClass} bg-red-100 border-red-500 text-red-800 ${theme === 'dark' ? 'bg-red-900/30 text-red-300' : ''}`;
      }
      return `${baseClass} ${theme === 'dark' 
        ? 'bg-gray-700 border-gray-600 text-gray-300' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
      }`;
    }

    if (selected === index) {
      return `${baseClass} bg-purple-100 border-purple-500 text-purple-800 ${theme === 'dark' ? 'bg-purple-900/30 text-purple-300' : ''}`;
    }

    return `${baseClass} ${theme === 'dark' 
      ? 'bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600 hover:border-gray-500' 
      : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300'
    }`;
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-2xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className={`w-full max-w-xs mx-4 bg-gray-200 rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : ''}`}>
            <div 
              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {question.question}
        </h2>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && setSelected(index)}
            disabled={showResult}
            className={getOptionClass(index)}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && index === question.answer && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
              {showResult && index === selectedAnswer && index !== question.answer && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {showError && (
        <div className="flex items-center space-x-2 mb-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="text-red-700 text-sm">Please select an answer before submitting.</span>
        </div>
      )}

      {!showResult && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};