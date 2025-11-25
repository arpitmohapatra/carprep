import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Layers, CheckSquare, Home, WifiOff, Shuffle } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeModal } from './WelcomeModal';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const [isOffline, setIsOffline] = React.useState(!navigator.onLine);

    React.useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const navItems = [
        { path: '/', icon: Home, label: 'Home' },
        { path: '/guide', icon: BookOpen, label: 'Study Guide' },
        { path: '/flashcards', icon: Layers, label: 'Flashcards' },
        { path: '/practice', icon: CheckSquare, label: 'Practice Test' },
        { path: '/test-generator', icon: Shuffle, label: 'Test Generator' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col md:flex-row">
            <WelcomeModal />
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 z-20">
                <div className="p-6 border-b border-slate-100">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-display">
                        CarPrep
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Ontario Driving Test Guide</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={clsx(
                                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                location.pathname === path
                                    ? "bg-blue-50 text-blue-700 font-medium shadow-sm"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Icon size={20} className={clsx(location.pathname === path ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                {isOffline && (
                    <div className="p-4">
                        <div className="bg-amber-50 text-amber-700 px-4 py-3 rounded-xl text-sm flex items-center space-x-2 border border-amber-100">
                            <WifiOff size={16} />
                            <span>Offline Mode</span>
                        </div>
                    </div>
                )}
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-display">
                    CarPrep
                </h1>
                <div className="flex items-center space-x-2">
                    {isOffline && <WifiOff size={18} className="text-amber-500" />}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full pb-24 md:pb-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe z-30">
                <div className="flex justify-around items-center">
                    {navItems.map(({ path, icon: Icon, label }) => (
                        <Link
                            key={path}
                            to={path}
                            className={clsx(
                                "flex flex-col items-center py-3 px-2 flex-1 transition-colors relative",
                                location.pathname === path
                                    ? "text-blue-600"
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {location.pathname === path && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute top-0 w-8 h-1 bg-blue-600 rounded-b-full"
                                />
                            )}
                            <Icon size={24} />
                            <span className="text-[10px] mt-1 font-medium">{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};
