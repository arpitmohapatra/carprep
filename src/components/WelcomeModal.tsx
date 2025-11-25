import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { getUserName, saveUserName } from '../db';
import { motion, AnimatePresence } from 'framer-motion';

export const WelcomeModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkFirstVisit();
    }, []);

    const checkFirstVisit = async () => {
        try {
            const existingName = await getUserName();
            if (!existingName) {
                setIsOpen(true);
            }
        } catch (error) {
            console.error('Error checking user name:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            try {
                await saveUserName(name.trim());
                setIsOpen(false);
            } catch (error) {
                console.error('Error saving user name:', error);
            }
        }
    };

    if (isLoading) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => { }}
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
                        >
                            <div className="absolute top-6 right-6">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
                                    <Sparkles className="text-white" size={32} />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome to CarPrep!</h2>
                                <p className="text-slate-600">Let's personalize your learning experience</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                        What's your name?
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors text-slate-900"
                                        autoFocus
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                                >
                                    Get Started
                                </button>
                            </form>

                            <p className="text-xs text-slate-500 text-center mt-6">
                                Your name is stored locally and never shared
                            </p>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
