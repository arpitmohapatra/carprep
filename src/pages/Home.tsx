import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Layers, CheckSquare, Trophy, Clock, Star, Shuffle } from 'lucide-react';
import { getUserName, getReadSectionsCount, getAverageAccuracy, getTestsCompletedCount } from '../db';

const TOTAL_SECTIONS = 51; // Total sections in the handbook

export const Home: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [readPercentage, setReadPercentage] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [testsCompleted, setTestsCompleted] = useState<number>(0);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        const name = await getUserName();
        if (name) {
            setUserName(name);
        }

        // Load statistics
        const readCount = await getReadSectionsCount();
        const readPct = Math.round((readCount / TOTAL_SECTIONS) * 100);
        setReadPercentage(readPct);

        const avgAccuracy = await getAverageAccuracy();
        setAccuracy(avgAccuracy);

        const testsCount = await getTestsCompletedCount();
        setTestsCompleted(testsCount);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 font-display">
                        {userName ? `Welcome back, ${userName}!` : 'Welcome back!'}
                    </h2>
                    <p className="text-slate-500">Continue your preparation for the driving test.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <Trophy className="text-yellow-500" size={20} />
                    <span className="font-bold text-slate-700">Level 1</span>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Read</p>
                        <p className="text-lg font-bold text-slate-900">{readPercentage}%</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                        <Layers size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Tests</p>
                        <p className="text-lg font-bold text-slate-900">{testsCompleted}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-3 col-span-2 md:col-span-1">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600">
                        <CheckSquare size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-medium">Accuracy</p>
                        <p className="text-lg font-bold text-slate-900">{accuracy}%</p>
                    </div>
                </div>
            </div>

            {/* Main Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <Link to="/guide" className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-3xl shadow-lg text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative z-10">
                        <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 font-display">Study Guide</h3>
                        <p className="text-blue-100 mb-6 max-w-xs">Master the rules of the road with the official handbook chapters.</p>
                        <div className="flex items-center text-sm font-medium bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-md">
                            <span>Continue Reading</span>
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                        <BookOpen size={200} />
                    </div>
                </Link>

                <div className="space-y-4">
                    <Link to="/flashcards" className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-purple-100 p-4 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <Layers size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Flashcards</h3>
                                <p className="text-slate-500 text-sm">Memorize signs & rules</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-full text-slate-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                            <Star size={20} />
                        </div>
                    </Link>

                    <Link to="/practice" className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:border-green-200 hover:shadow-md transition-all flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-green-100 p-4 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <CheckSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Practice Test</h3>
                                <p className="text-slate-500 text-sm">Test your knowledge</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded-full text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                            <Clock size={20} />
                        </div>
                    </Link>

                    <Link to="/test-generator" className="group bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                                <Shuffle size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Test Me</h3>
                                <p className="text-orange-100 text-sm">30 random questions</p>
                            </div>
                        </div>
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                            <Trophy size={20} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
