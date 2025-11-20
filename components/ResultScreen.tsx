
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Stats, PersonaResult } from '../types';
import { Brain, Shield, Ghost, Eye, Zap, Share2, RefreshCw, CheckCircle2, Play, Lightbulb, Loader2, Sparkles, Clapperboard, Copy } from 'lucide-react';
import { playSound } from '../utils/sound';

interface Props {
  result: PersonaResult;
  stats: Stats;
  onRestart: () => void;
  generatedImage: string | null;
  generatedVideo: string | null;
  loadingStatus: string;
  onGenerateVideo: () => void;
}

const IconMap: Record<string, React.ElementType> = {
  Brain, Shield, Ghost, Eye, Zap
};

export const ResultScreen: React.FC<Props> = ({ result, stats, onRestart, generatedImage, generatedVideo, loadingStatus, onGenerateVideo }) => {
  const Icon = IconMap[result.iconName] || Zap;
  const [shareBtnText, setShareBtnText] = useState("اشتراک‌گذاری");

  useEffect(() => {
    playSound('success');
  }, []);

  const handleShare = async () => {
    playSound('click');
    
    const text = `من در اتاق فرار، «${result.persianTitle}» هستم!\n${result.description}\n\nشخصیت فرار خودت رو پیدا کن: #EscapePersona`;
    const url = window.location.href;
    const shareData: ShareData = {
      title: 'Escape Persona',
      text: text,
      url: url
    };

    // 1. Try Sharing File (Mobile/Supported Browsers)
    if (generatedImage && navigator.share && navigator.canShare) {
      try {
        const res = await fetch(generatedImage);
        const blob = await res.blob();
        const file = new File([blob], 'persona.png', { type: 'image/png' });
        
        const dataWithFile = {
            files: [file],
            title: shareData.title,
            text: shareData.text
        };

        if (navigator.canShare(dataWithFile)) {
            await navigator.share(dataWithFile);
            return;
        }
      } catch (e) {
        console.warn("File share failed, falling back...", e);
      }
    }

    // 2. Try Sharing Text Only
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.warn('Share cancelled or failed', err);
      }
    }

    // 3. Fallback to Clipboard
    try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setShareBtnText("کپی شد!");
        setTimeout(() => setShareBtnText("اشتراک‌گذاری"), 2000);
    } catch (err) {
        alert('امکان اشتراک‌گذاری در این مرورگر وجود ندارد.');
    }
  };

  const handleRestart = () => {
      playSound('click');
      onRestart();
  };

  const isVideoProcessing = generatedImage && !generatedVideo && loadingStatus.includes("ویدیو");

  // Dynamic colors based on persona
  const baseColor = result.color.replace('text-', ''); // e.g., 'emerald-500'
  const glowColor = `shadow-${baseColor}/50`;
  const borderColor = `border-${baseColor}`;
  
  return (
    <div className="w-full max-w-md mx-auto px-5 py-6 min-h-full flex flex-col items-center pb-24">
      
      {/* Main Character Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        className="w-full relative mb-6 group perspective-1000"
      >
        {/* Glow Background */}
        <div className={`absolute -inset-0.5 bg-gradient-to-b from-${baseColor} to-slate-900 rounded-[34px] opacity-40 blur-lg group-hover:opacity-60 transition duration-500`} />
        
        <div className="relative bg-slate-950 rounded-[32px] border border-slate-700 overflow-hidden flex flex-col">
            
            {/* Header / ID */}
            <div className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
                <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 flex items-center gap-2`}>
                    <Icon size={12} className={result.color} />
                    <span>CLASS: {result.type}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
            </div>

            {/* Media Area */}
            <div className="relative w-full aspect-[3/4] bg-slate-900">
                {/* Loading State */}
                {!generatedImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="relative">
                             <div className={`absolute inset-0 bg-${baseColor}/20 blur-xl rounded-full animate-pulse`} />
                             <Loader2 className={`animate-spin ${result.color} relative z-10`} size={40} />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-4 font-mono uppercase tracking-widest animate-pulse">{loadingStatus || "ANALYZING DNA..."}</p>
                    </div>
                )}

                {/* Image */}
                {generatedImage && !generatedVideo && (
                   <div className="w-full h-full relative overflow-hidden">
                       <motion.img 
                           src={generatedImage} 
                           className="w-full h-full object-cover mask-image-gradient"
                           initial={{ opacity: 0, scale: 1.0 }}
                           animate={{ 
                               opacity: 1, 
                               scale: [1.0, 1.08, 1.0],
                               x: [0, 10, 0] // Subtle pan
                           }}
                           transition={{ 
                               opacity: { duration: 0.8 },
                               scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                               x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                           }}
                       />
                       {/* Breathing Overlay */}
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                       
                       {/* Generate Video Button Overlay */}
                        {!isVideoProcessing && (
                            <div className="absolute bottom-24 left-0 right-0 flex justify-center z-30">
                                <motion.button
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    onClick={onGenerateVideo}
                                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[10px] font-bold py-2 px-4 rounded-full border border-white/20 flex items-center gap-2 transition-all shadow-lg"
                                >
                                    <Clapperboard size={12} />
                                    متحرک‌سازی (Veo AI)
                                </motion.button>
                            </div>
                        )}

                        {isVideoProcessing && (
                            <div className="absolute bottom-24 left-0 right-0 flex justify-center z-30">
                                <div className="bg-black/50 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                                    <Loader2 className="animate-spin text-white" size={12} />
                                    <span className="text-[10px] text-white font-mono">{loadingStatus}</span>
                                </div>
                            </div>
                        )}
                   </div>
                )}

                {/* Video */}
                {generatedVideo && (
                    <div className="w-full h-full relative bg-black">
                        <video 
                            src={generatedVideo} 
                            className="w-full h-full object-cover"
                            autoPlay loop muted playsInline controls
                        />
                        <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 px-2 py-0.5 rounded text-[8px] text-red-200 font-mono animate-pulse pointer-events-none">
                            REC ●
                        </div>
                    </div>
                )}
            </div>

            {/* Card Content Body */}
            <div className="relative -mt-20 pt-16 pb-6 px-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent z-10">
                <div className="text-center mb-6">
                    <motion.h1 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 drop-shadow-sm`}
                    >
                        {result.persianTitle}
                    </motion.h1>
                    <div className={`h-1 w-16 mx-auto rounded-full bg-${baseColor} mb-4 shadow-[0_0_10px_currentColor] opacity-80`} />
                    <p className="text-sm text-slate-300 leading-6 font-medium dir-rtl">
                        {result.description}
                    </p>
                </div>

                {/* Integrated Stats */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-900/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                    <StatMini label="شجاعت" value={stats.bravery} color="bg-emerald-500" />
                    <StatMini label="منطق" value={stats.logic} color="bg-cyan-500" />
                    <StatMini label="دقت" value={stats.observation} color="bg-amber-500" />
                    <StatMini label="رهبری" value={stats.leadership} color="bg-fuchsia-500" />
                </div>
            </div>
            
            {/* Decorative Footer */}
            <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                 <div className="text-[9px] text-slate-600 font-mono tracking-[0.2em]">ESCAPE PERSONA</div>
                 <div className={`text-[9px] ${result.color} font-bold flex items-center gap-1`}>
                    VERIFIED <CheckCircle2 size={10} />
                 </div>
            </div>
        </div>
      </motion.div>

       {/* Recommendations */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full mb-6"
      >
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Recommended Rooms</div>
        <div className="flex flex-wrap gap-2">
            {result.recommendedGames.map((game, idx) => (
                <span key={idx} className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700">
                    {game}
                </span>
            ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 w-full mt-auto">
        <button 
          onClick={handleRestart}
          className="flex items-center justify-center gap-2 bg-slate-800 text-slate-400 font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
        >
          <RefreshCw size={18} />
          تست مجدد
        </button>

        <button 
          onClick={handleShare}
          className={`flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all shadow-lg
            ${shareBtnText === "کپی شد!" ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-900 hover:bg-white'}
          `}
        >
          {shareBtnText === "کپی شد!" ? <CheckCircle2 size={18} /> : <Share2 size={18} />}
          {shareBtnText}
        </button>
      </div>

    </div>
  );
};

const StatMini = ({ label, value, color }: { label: string, value: number, color: string }) => {
  // Normalize value for visual bar (-5 to +5 approx range)
  const percent = Math.min(100, Math.max(10, (value + 3) * 12.5));
  
  return (
    <div className="flex flex-col gap-1 p-1">
      <div className="flex justify-between text-[10px] text-slate-400 px-1">
        <span>{label}</span>
        <span className="font-mono text-slate-500">{value > 0 ? `+${value}` : value}</span>
      </div>
      <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full ${color}`} 
        />
      </div>
    </div>
  );
};
