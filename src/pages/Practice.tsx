import React, { useState } from 'react';
import questionsData from '../data/questions.json';
import { saveQuizResult } from '../db';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { celebrateSuccess } from '../utils/celebration';

export const Practice: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = questionsData[currentQuestionIndex];

    const handleOptionSelect = (index: number) => {
        if (isAnswered) return;
        setSelectedOption(index);
        setIsAnswered(true);

        if (index === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        setShowResults(true);
        await saveQuizResult(score, questionsData.length);

        // Celebrate if score is 80% or higher
        const percentage = (score / questionsData.length) * 100;
        if (percentage >= 80) {
            setTimeout(() => {
                celebrateSuccess();
            }, 500);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
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
                                stroke={score / questionsData.length >= 0.8 ? "#22c55e" : "#eab308"}
                                strokeWidth="8"
                                strokeDasharray={2 * Math.PI * 60}
                                strokeDashoffset={2 * Math.PI * 60 * (1 - score / questionsData.length)}
                                className="transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-gray-900">{Math.round((score / questionsData.length) * 100)}%</span>
                        </div>
                    </div>

                    <p className="text-lg font-medium text-gray-800 mb-8">
                        You got <span className="font-bold text-blue-600">{score}</span> out of <span className="font-bold">{questionsData.length}</span> correct
                    </p>

                    <button
                        onClick={restartQuiz}
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                        <RotateCcw size={20} />
                        <span>Try Again</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                <span>Question {currentQuestionIndex + 1}/{questionsData.length}</span>
                <span>Score: {score}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questionsData.length) * 100}%` }}
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
                            <span>{currentQuestionIndex === questionsData.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
