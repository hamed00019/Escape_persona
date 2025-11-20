import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScanFace, Fingerprint, BrainCircuit } from 'lucide-react';
import { playSound } from '../utils/sound';

interface Props {
  onComplete: () => void;
}

export const AnalysisScreen: React.FC<Props> = ({ onComplete }) => {
  const [status, setStatus] = useState("در حال تحلیل شجاعت...");

  useEffect(() => {
    playSound('scan');
    const timers = [
      setTimeout(() => { setStatus("سنجش سطح IQ..."); playSound('hover'); }, 1000),
      setTimeout(() => { setStatus("بررسی واکنش به ترس..."); playSound('hover'); }, 2000),
      setTimeout(() => { setStatus("شناسایی آرکی‌تایپ..."); playSound('hover'); }, 3000),
      setTimeout(() => { playSound('success'); onComplete(); }, 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="relative">
        {/* Rotating rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="w-32 h-32 border-4 border-t-violet-500 border-r-transparent border-b-fuchsia-500 border-l-transparent rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="absolute inset-2 border-2 border-t-emerald-400 border-transparent rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center text-violet-400">
            <BrainCircuit size={40} />
        </div>
      </div>
      
      <motion.h2 
        key={status}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-8 text-xl text-slate-300 font-medium"
      >
        {status}
      </motion.h2>
      
      <p className="mt-2 text-slate-600 text-sm">هوش مصنوعی در حال محاسبه شخصیت شماست</p>
    </div>
  );
};