import React, { useState } from 'react';
import { FileCode } from 'lucide-react';
import { SubjectCard } from './components/SubjectCard';
import { QuestionCard } from './components/QuestionCard';
import { ResultsScreen } from './components/ResultsScreen';
import { ThemeToggle } from './components/ThemeToggle';
import { Attribution } from './components/Attribution';
import { useQuizData } from './hooks/useQuizData';
import { useTheme } from './hooks/useTheme';
import { Quiz, GameState } from './types/quiz';

function App() {
  const { quizData, loading } = useQuizData();
  const { theme, setTheme } = useTheme();
  const [gameState, setGameState] = useState<GameState>('subject-selection');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setGameState('quiz');
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!selectedQuiz) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.answer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, answerIndex]);

    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowResult(false);
        setSelectedAnswer(null);
      } else {
        setGameState('results');
      }
    }, 2000);
  };

  const handlePlayAgain = () => {
    setGameState('subject-selection');
    setSelectedQuiz(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 to-pink-50'}`}>
        <div className="text-center">
          <p className={`text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Failed to load quiz data. Please refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-purple-50 to-pink-50'
    }`} style={
      theme !== 'dark' ? {
        backgroundImage: `url('https://media.istockphoto.com/id/2177129583/photo/businessman-hand-hold-and-robot-touching-on-api-technology-on-virtual-interface-integration.webp?a=1&b=1&s=612x612&w=0&k=20&c=k011oSorM1ZAKcwquOsDFWyRuNm9JgutMBwuNF71xsU=')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      } : {}
    }>
      {/* Overlay for readability */}
      {theme !== 'dark' && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" aria-hidden="true"></div>
      )}
      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-6 sm:py-10 max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        <div className={`rounded-2xl shadow-xl p-4 sm:p-8 ${theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'} transition-colors duration-300`}> 
          <header className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-2 sm:p-3 bg-purple-500 rounded-xl shadow-md">
                <FileCode className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Frontend Quiz</h1>
                {gameState === 'quiz' && selectedQuiz && (
                  <p className={`text-base sm:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{selectedQuiz.title} Quiz</p>
                )}
              </div>
            </div>
            <ThemeToggle theme={theme} onThemeChange={setTheme} />
          </header>

          <main>
            {gameState === 'subject-selection' && (
              <div className="max-w-full sm:max-w-2xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className={`text-2xl sm:text-4xl font-bold mb-2 sm:mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Welcome to the Frontend Quiz!</h2>
                  <p className={`text-base sm:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Pick a subject to get started.</p>
                </div>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                  {quizData.quizzes.map((quiz) => (
                    <SubjectCard
                      key={quiz.title}
                      quiz={quiz}
                      theme={theme}
                      onClick={() => handleQuizSelect(quiz)}
                    />
                  ))}
                </div>
              </div>
            )}

            {gameState === 'quiz' && selectedQuiz && (
              <QuestionCard
                question={selectedQuiz.questions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={selectedQuiz.questions.length}
                theme={theme}
                onAnswer={handleAnswer}
                showResult={showResult}
                selectedAnswer={selectedAnswer === null ? undefined : selectedAnswer}
                isCorrect={selectedAnswer === selectedQuiz.questions[currentQuestionIndex].answer}
              />
            )}

            {gameState === 'results' && selectedQuiz && (
              <ResultsScreen
                quiz={selectedQuiz}
                score={score}
                totalQuestions={selectedQuiz.questions.length}
                theme={theme}
                onPlayAgain={handlePlayAgain}
              />
            )}
          </main>

          <Attribution theme={theme} />
        </div>
      </div>
    </div>
  );
}

export default App;