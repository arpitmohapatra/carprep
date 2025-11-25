import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import { saveQuizResult } from '../db';
import { CheckCircle, XCircle, ArrowRight, Shuffle } from 'lucide-react';
import clsx from 'clsx';
import { celebrateSuccess } from '../utils/celebration';

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const TestGenerator: React.FC = () => {
    const [questions, setQuestions] = useState<typeof questionsData>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [isStarted, setIsStarted] = useState(false);

    const generateNewTest = () => {
        // Shuffle all questions and take first 30
        const shuffled = shuffleArray(questionsData).slice(0, 30);
        setQuestions(shuffled);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
        setIsStarted(true);
    };

    useEffect(() => {
        // Generate initial test on mount
        if (!isStarted) {
            generateNewTest();
        }
    }, []);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        setShowResults(true);
        await saveQuizResult(score, questions.length);

        // Celebrate if score is 25/30 or higher (83%+)
        if (score >= 25) {
            setTimeout(() => {
                celebrateSuccess();
            }, 500);
        }
    };

    if (!isStarted || questions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full">
                    <Shuffle className="text-white" size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Loading Test...</h2>
            </div>
        );
    }

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        const passed = percentage >= 80;

        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h2>
                    <p className="text-gray-500 mb-8">Here's how you did</p>

                    <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                fill="none"
                                stroke="#f3f4f6"
                                strokeWidth="8"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                fill="none"
                                stroke={passed ? "#22c55e" : "#ef4444"}
                                strokeWidth="8"
                                strokeDasharray={2 * Math.PI * 60}
                                strokeDashoffset={2 * Math.PI * 60 * (1 - score / questions.length)}
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
                        </div>
                    </div>

                    <div className={clsx(
                        "mb-6 p-4 rounded-xl",
                        passed ? "bg-green-50" : "bg-red-50"
                    )}>
                        <p className={clsx(
                            "font-bold text-lg",
                            passed ? "text-green-700" : "text-red-700"
                        )}>
                            {passed ? "✓ You Passed!" : "✗ You Need More Practice"}
                        </p>
                        <p className={clsx(
                            "text-sm mt-1",
                            passed ? "text-green-600" : "text-red-600"
                        )}>
                            {passed ? "You're ready for the real test!" : "Keep studying and try again."}
                        </p>
                    </div>

                    <p className="text-lg font-medium text-gray-800 mb-8">
                        You got <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{questions.length}</span> correct
                    </p>

                    <button
                        onClick={generateNewTest}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                        <Shuffle size={20} />
                        <span>Generate New Test</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">Practice Test</h2>
                    <button
                        onClick={generateNewTest}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                        <Shuffle size={16} />
                        <span className="text-sm font-medium">New Test</span>
                    </button>
                </div>
                <p className="text-blue-100">30 randomly selected questions</p>
            </div>

            <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                <span>Score: {score}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                    {currentQuestion.question}
                </h3>

                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            disabled={isAnswered}
                            className={clsx(
                                "w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between group",
                                !isAnswered && "hover:border-blue-200 hover:bg-blue-50 border-gray-100",
                                isAnswered && index === currentQuestion.correctAnswer && "border-green-500 bg-green-50 text-green-700",
                                isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && "border-red-500 bg-red-50 text-red-700",
                                isAnswered && index !== currentQuestion.correctAnswer && index !== selectedOption && "border-gray-100 opacity-50"
                            )}
                        >
                            <span className="font-medium">{option}</span>
                            {isAnswered && index === currentQuestion.correctAnswer && (
                                <CheckCircle className="text-green-500" size={20} />
                            )}
                            {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                                <XCircle className="text-red-500" size={20} />
                            )}
                        </button>
                    ))}
                </div>

                {isAnswered && (
                    <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                        <div className="bg-blue-50 p-4 rounded-xl mb-6">
                            <p className="text-sm text-blue-800 font-medium">
                                <span className="font-bold">Explanation:</span> {currentQuestion.explanation}
                            </p>
                        </div>
                        <button
                            onClick={handleNext}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <span>{currentQuestionIndex === questions.length - 1 ? 'Finish Test' : 'Next Question'}</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
