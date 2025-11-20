
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Key, Lock } from 'lucide-react';
import { playSound } from '../utils/sound';

interface Props {
  onStart: () => void;
}

export const Onboarding: React.FC<Props> = ({ onStart }) => {
  const handleStart = () => {
    playSound('click');
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden bg-slate-900">
      {/* Background Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" 
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6 z-10"
      >
        <motion.div 
          className="flex justify-center gap-4 mb-4 text-slate-500 opacity-50"
          initial={{ gap: 100, opacity: 0 }}
          animate={{ gap: 16, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
        >
            <Lock size={24} />
            <Key size={24} />
        </motion.div>

        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-slate-500 leading-tight">
          <motion.span 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            در تاریکی
          </motion.span>
          <br/>
          <motion.span
             initial={{ opacity: 0, filter: "blur(10px)" }}
             animate={{ opacity: 1, filter: "blur(0px)" }}
             transition={{ duration: 1, delay: 0.8 }}
          >
             کی هستی؟
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-lg text-slate-400 max-w-xs mx-auto leading-relaxed"
        >
          یک تست روانشناسی کوتاه برای کشف نقش واقعی شما در اتاق فرار.
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
        onMouseEnter={() => playSound('hover')}
        className="mt-12 group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-violet-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 cursor-pointer"
      >
        <div className="absolute -inset-3 transition-all duration-1000 opacity-30 group-hover:opacity-100 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:duration-200 animate-tilt"></div>
        <span className="relative flex items-center gap-2">
            <Fingerprint size={20} />
            شروع تحلیل
        </span>
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 text-slate-600 text-xs"
      >
        پروژه Escape Persona
      </motion.div>
    </div>
  );
};
