import React, { useState } from 'react';
import flashcardsData from '../data/flashcards.json';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRight, ArrowLeft } from 'lucide-react';

export const Flashcards: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const currentCard = flashcardsData[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % flashcardsData.length);
        }, 200);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length);
        }, 200);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Flashcards</h2>
                <p className="text-gray-500">Tap to flip • {currentIndex + 1} of {flashcardsData.length}</p>
            </div>

            <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000">
                <motion.div
                    className="w-full h-full relative preserve-3d cursor-pointer"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                    onClick={handleFlip}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center p-8 text-center">
                        <span className="text-xs font-bold tracking-wider text-blue-500 uppercase mb-4">{currentCard.category}</span>
                        <p className="text-xl font-medium text-gray-800 leading-relaxed">{currentCard.front}</p>
                        <p className="absolute bottom-6 text-xs text-gray-400">Tap to see answer</p>
                    </div>

                    {/* Back */}
                    <div
                        className="absolute inset-0 backface-hidden bg-blue-600 rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <p className="text-2xl font-bold">{currentCard.back}</p>
                        <p className="absolute bottom-6 text-xs text-blue-200">Tap to see question</p>
                    </div>
                </motion.div>
            </div>

            <div className="flex items-center space-x-6">
                <button
                    onClick={handlePrev}
                    className="p-4 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <ArrowLeft size={24} />
                </button>
                <button
                    onClick={() => {
                        setIsFlipped(false);
                        setCurrentIndex(0);
                    }}
                    className="p-4 rounded-full bg-white shadow-md text-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <RefreshCw size={24} />
                </button>
                <button
                    onClick={handleNext}
                    className="p-4 rounded-full bg-blue-600 shadow-md text-white hover:bg-blue-700 active:scale-95 transition-all"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </div>
    );
};
