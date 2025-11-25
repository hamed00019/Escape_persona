import React from 'react';
import { motion } from 'framer-motion';
import { Question, Option } from '../types';
import { playSound } from '../utils/sound';
import { ArrowRight } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (option: Option) => void;
  onBack: () => void;
  totalQuestions: number;
  currentIndex: number;
}

export const QuestionCard: React.FC<Props> = ({ question, onAnswer, onBack, totalQuestions, currentIndex }) => {

  const handleOptionClick = (option: Option) => {
    playSound('click');
    onAnswer(option);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 h-full flex flex-col justify-center relative">

      {/* Back Button */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold z-20"
        >
          <ArrowRight size={16} />
          <span>قبلی</span>
        </motion.button>
      )}

      {/* Progress */}
      <div className="w-full bg-slate-800 h-1 rounded-full mb-8 overflow-hidden mt-12">
        <motion.div
          className="h-full bg-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col gap-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center leading-relaxed text-slate-100">
          {question.question}
        </h2>

        <div className="flex flex-col gap-4">
          {question.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => playSound('hover')}
              className="p-6 rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm text-right hover:border-violet-500/50 transition-colors duration-300 group relative overflow-hidden"
            >
              <span className="relative z-10 text-lg text-slate-300 group-hover:text-white transition-colors">
                {option.text}
              </span>
              {/* Neon Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:animate-shimmer" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 text-center text-slate-500 text-sm">
        سوال {currentIndex + 1} از {totalQuestions}
      </div>
    </div>
  );
};