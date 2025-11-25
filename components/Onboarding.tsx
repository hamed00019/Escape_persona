
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Lock, Eye, Brain } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center h-full px-6 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating Icons */}
      <motion.div
        className="absolute top-20 left-10 text-violet-500/20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lock size={40} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-16 text-emerald-500/20"
        animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <Eye size={36} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-8 text-cyan-500/20"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Brain size={32} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8 z-10 max-w-lg"
      >
        {/* Title with Glow Effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 blur-2xl opacity-30" />
          <h1 className="relative text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 leading-tight mb-4">
            <motion.span
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              تحلیل شخصیت
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.6 }}
              className="bg-gradient-to-r from-emerald-200 via-cyan-200 to-emerald-200 bg-clip-text text-transparent"
            >
              اتاق فرار
            </motion.span>
          </h1>
        </div>

        {/* Description with better styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-3"
        >
          <p className="text-xl text-slate-300 leading-relaxed font-bold">
            نقش واقعی شما در تیم چیست؟
          </p>
          <p className="text-base text-slate-400 leading-relaxed max-w-md mx-auto">
            یک تست روانشناسی دقیق که با تحلیل انتخاب‌های شما در شرایط بحرانی، شخصیت پنهان شما را آشکار می‌کند.
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center gap-6 pt-4 text-sm text-slate-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
              <span>۸ شخصیت منحصر به فرد</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(139, 92, 246, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
        onMouseEnter={() => playSound('hover')}
        className="mt-12 group relative inline-flex items-center justify-center px-10 py-5 font-black text-lg text-white transition-all duration-300 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl focus:outline-none focus:ring-4 focus:ring-violet-500/50 cursor-pointer shadow-2xl shadow-violet-600/50"
      >
        <div className="absolute -inset-1 transition-all duration-500 opacity-70 group-hover:opacity-100 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 rounded-2xl blur-xl group-hover:blur-2xl" />
        <span className="relative flex items-center gap-3">
          <Fingerprint size={24} className="group-hover:rotate-12 transition-transform duration-300" />
          شروع تحلیل شخصیت
        </span>
      </motion.button>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 text-slate-600 text-sm flex items-center gap-2"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Escape Persona - تحلیل شخصیت اتاق فرار</span>
      </motion.div>
    </div>
  );
};
