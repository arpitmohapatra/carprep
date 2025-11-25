import React, { useState } from 'react';
import handbookData from '../data/handbook.json';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export const Guide: React.FC = () => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (id: string) => {
        setExpandedSection(expandedSection === id ? null : id);
    };

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2 font-display">Driver's Handbook</h2>
                    <p className="text-slate-300 max-w-md">The official source of truth for Ontario drivers. Master these rules to pass your test.</p>
                </div>
                <BookOpen className="absolute right-0 bottom-0 text-white opacity-5 transform translate-x-1/4 translate-y-1/4" size={200} />
            </div>

            <div className="space-y-4">
                {handbookData.map((chapter, idx) => (
                    <motion.div
                        key={chapter.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100"
                    >
                        {chapter.image && (
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-slate-50">
                                <img
                                    src={`${import.meta.env.BASE_URL}${chapter.image.startsWith('/') ? chapter.image.slice(1) : chapter.image}`}
                                    alt={chapter.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        <div className="p-5 bg-slate-50/50 border-b border-slate-100 flex items-center space-x-3">
                            <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
                                {idx + 1}
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 font-display">{chapter.title}</h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {chapter.sections.map((section) => (
                                <div key={section.id}>
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors group"
                                    >
                                        <span className={clsx("font-medium transition-colors", expandedSection === section.id ? "text-blue-600" : "text-slate-600 group-hover:text-slate-900")}>
                                            {section.title}
                                        </span>
                                        {expandedSection === section.id ? (
                                            <ChevronDown className="text-blue-500" size={20} />
                                        ) : (
                                            <ChevronRight className="text-slate-300 group-hover:text-slate-400" size={20} />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {expandedSection === section.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                                                    <div className="prose prose-slate prose-blue max-w-none prose-p:my-3 prose-headings:font-display">
                                                        {section.content.split('\\n').map((paragraph, idx) => (
                                                            <p key={idx}>{paragraph}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
