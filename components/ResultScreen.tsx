import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stats, PersonaResult, PersonaType } from '../types';
import { Brain, Shield, Ghost, Eye, Zap, Share2, RefreshCw, CheckCircle2, Clapperboard, Loader2, Users, AlertTriangle, ExternalLink, X } from 'lucide-react';
import { playSound } from '../utils/sound';
import { toPersianDigits } from '../utils/persian';
import { personas } from '../utils/calculatePersona';

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

// Helper to get reasoning text
const getMatchReason = (userPersona: PersonaType, matchPersona: PersonaType, isBestMatch: boolean): string => {
    // Generic logic for now, can be expanded
    if (isBestMatch) {
        return `ترکیب ${personas[userPersona].persianTitle} و ${personas[matchPersona].persianTitle} شکست‌ناپذیر است. شما نقاط ضعف یکدیگر را پوشش می‌دهید.`;
    } else {
        return `سبک بازی ${personas[userPersona].persianTitle} با ${personas[matchPersona].persianTitle} در تضاد است. یکی عمل‌گرا و دیگری تحلیل‌گر، که باعث اصطکاک می‌شود.`;
    }
};

export const ResultScreen: React.FC<Props> = ({ result, stats, onRestart, generatedImage, generatedVideo, loadingStatus, onGenerateVideo }) => {
    const Icon = IconMap[result.iconName] || Zap;
    const [shareBtnText, setShareBtnText] = useState("اشتراک‌گذاری");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
    const [selectedMatch, setSelectedMatch] = useState<{ type: PersonaType, reason: string, title: string, isBest: boolean } | null>(null);

    useEffect(() => {
        playSound('success');

        // Auto-play explanation audio
        const timer = setTimeout(() => {
            handleSpeak();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleShare = async () => {
        playSound('click');
        setShareBtnText("در حال آماده‌سازی...");

        try {
            const html2canvas = (await import('html2canvas')).default;
            const element = document.body;
            const canvas = await html2canvas(element, {
                backgroundColor: '#0f172a',
                scale: 2,
                useCORS: true,
            });

            canvas.toBlob(async (blob) => {
                if (!blob) {
                    setShareBtnText("خطا!");
                    setTimeout(() => setShareBtnText("اشتراک‌گذاری"), 2000);
                    return;
                }

                const file = new File([blob], 'escape-persona-result.png', { type: 'image/png' });
                const shareData: ShareData = {
                    title: 'Escape Persona',
                    text: result.shareText,
                    files: [file],
                };

                if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                    try {
                        await navigator.share(shareData);
                        setShareBtnText("اشتراک‌گذاری");
                    } catch (err) {
                        console.warn('Share cancelled', err);
                        setShareBtnText("اشتراک‌گذاری");
                    }
                } else {
                    try {
                        const item = new ClipboardItem({ 'image/png': blob });
                        await navigator.clipboard.write([item]);
                        setShareBtnText("تصویر کپی شد!");
                    } catch (err) {
                        const link = document.createElement('a');
                        link.download = 'escape-persona.png';
                        link.href = canvas.toDataURL();
                        link.click();
                        setShareBtnText("دانلود شد!");
                    }
                    setTimeout(() => setShareBtnText("اشتراک‌گذاری"), 2000);
                }
            }, 'image/png');

        } catch (error) {
            console.error("Screenshot failed", error);
            setShareBtnText("خطا!");
            setTimeout(() => setShareBtnText("اشتراک‌گذاری"), 2000);
        }
    };

    const handleRestart = () => {
        playSound('click');
        onRestart();
    };

    const handleSpeak = () => {
        if (isSpeaking && audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            setIsSpeaking(false);
            return;
        }

        const audioPath = `/audio/${result.type.toLowerCase()}.mp3`;
        const audio = new Audio(audioPath);

        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => {
            console.warn("Audio file not found, falling back to synthesis");
            const utterance = new SpeechSynthesisUtterance(result.description);
            utterance.lang = 'fa-IR';
            utterance.rate = 0.9;
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        };

        setAudioElement(audio);
        setIsSpeaking(true);
        audio.play().catch(e => {
            console.error("Play error", e);
            setIsSpeaking(false);
        });
    };

    const handleMatchClick = (matchType: PersonaType, isBest: boolean) => {
        playSound('click');
        setSelectedMatch({
            type: matchType,
            reason: getMatchReason(result.type, matchType, isBest),
            title: isBest ? 'هم‌تیمی عالی' : 'دشمن خونی',
            isBest
        });
    };

    const isVideoProcessing = generatedImage && !generatedVideo && loadingStatus.includes("ویدیو");
    const baseColor = result.color.replace('text-', '');

    return (
        <div className="w-full max-w-md mx-auto px-5 py-6 min-h-full flex flex-col items-center pb-24 font-bold">

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
                        <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-3 py-1 rounded-full text-[12px] font-bold text-slate-200 flex items-center gap-2`}>
                            <Icon size={14} className={result.color} />
                            <span>کلاس: {result.persianTitle}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="bg-amber-500/20 border border-amber-500/50 px-2 py-0.5 rounded text-[12px] text-amber-200 font-bold flex items-center gap-1" style={{ fontFamily: 'Yekan Bakh FaNum, sans-serif' }}>
                                <span>کمیابی:</span>
                                <span>{result.rarity}</span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
                        </div>
                    </div>

                    {/* Media Area */}
                    <div className="relative w-full aspect-[3/4] bg-slate-900">
                        {!generatedImage && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="relative">
                                    <div className={`absolute inset-0 bg-${baseColor}/20 blur-xl rounded-full animate-pulse`} />
                                    <Loader2 className={`animate-spin ${result.color} relative z-10`} size={40} />
                                </div>
                                <p className="text-[12px] text-slate-400 mt-4 font-bold uppercase tracking-widest animate-pulse">{loadingStatus || "در حال تحلیل..."}</p>
                            </div>
                        )}

                        {generatedImage && !generatedVideo && (
                            <div className="w-full h-full relative overflow-hidden">
                                <motion.img
                                    src={generatedImage}
                                    className="w-full h-full object-cover mask-image-gradient"
                                    initial={{ opacity: 0, scale: 1.0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: [1.0, 1.08, 1.0],
                                        x: [0, 10, 0]
                                    }}
                                    transition={{
                                        opacity: { duration: 0.8 },
                                        scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
                                        x: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                                {!isVideoProcessing && (
                                    <div className="absolute bottom-24 left-0 right-0 flex justify-center z-30">
                                        <motion.button
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            onClick={onGenerateVideo}
                                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-[12px] font-bold py-2 px-4 rounded-full border border-white/20 flex items-center gap-2 transition-all shadow-lg"
                                        >
                                            <Clapperboard size={14} />
                                            متحرک‌سازی (Veo AI)
                                        </motion.button>
                                    </div>
                                )}

                                {isVideoProcessing && (
                                    <div className="absolute bottom-24 left-0 right-0 flex justify-center z-30">
                                        <div className="bg-black/50 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                                            <Loader2 className="animate-spin text-white" size={14} />
                                            <span className="text-[12px] text-white font-bold">{loadingStatus}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {generatedVideo && (
                            <div className="w-full h-full relative bg-black">
                                <video
                                    src={generatedVideo}
                                    className="w-full h-full object-cover pointer-events-none"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/50 px-2 py-0.5 rounded text-[10px] text-red-200 font-bold animate-pulse pointer-events-none">
                                    REC ●
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Card Content Body */}
                    <div className="relative -mt-[40rem] pt-[18rem] pb-4 px-6 bg-gradient-to-t from-slate-950 from-20% via-slate-950/90 via-50% to-transparent z-10">
                        <div className="text-center mb-4">
                            <motion.h1
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-1 drop-shadow-sm`}
                            >
                                {result.persianTitle}
                            </motion.h1>
                            <div className={`h-1 w-12 mx-auto rounded-full bg-${baseColor} mb-3 shadow-[0_0_10px_currentColor] opacity-80`} />

                            {/* Motto */}
                            <p className={`text-xs font-bold ${result.color} mb-2 italic opacity-90`}>
                                "{result.motto}"
                            </p>

                            <div className="relative">
                                <p className="text-sm text-slate-200 leading-6 font-bold dir-rtl">
                                    {result.description}
                                </p>
                            </div>
                        </div>

                        {/* Survival Rate */}
                        <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/50 mb-4 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-slate-300 text-xs font-bold">
                                <Shield size={14} className="text-emerald-400" />
                                <span>احتمال بقا در اتاق فرار:</span>
                            </div>
                            <div className="text-lg font-black text-white tracking-wider" style={{ fontFamily: 'Yekan Bakh FaNum, sans-serif' }}>
                                {result.survivalRate}
                            </div>
                        </div>

                        {/* Integrated Stats */}
                        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm mb-4">
                            <StatMini label="شجاعت" value={stats.bravery} color="bg-emerald-500" />
                            <StatMini label="منطق" value={stats.logic} color="bg-cyan-500" />
                            <StatMini label="دقت" value={stats.observation} color="bg-amber-500" />
                            <StatMini label="رهبری" value={stats.leadership} color="bg-fuchsia-500" />
                        </div>

                        {/* Compatibility Section - Redesigned */}
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            {/* Best Match */}
                            {result.bestMatch[0] && (
                                <div
                                    onClick={() => handleMatchClick(result.bestMatch[0], true)}
                                    className="bg-emerald-950/30 hover:bg-emerald-900/40 rounded-xl p-2 border border-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all group relative overflow-hidden"
                                >
                                    <div className="flex-1 z-10">
                                        <div className="text-[10px] text-emerald-400 font-bold mb-1">هم‌تیمی عالی</div>
                                        <div className="text-sm text-white font-black">{personas[result.bestMatch[0]].persianTitle}</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-500/30 relative z-10">
                                        <img src={`/images/${result.bestMatch[0].toLowerCase()}.png`} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute bottom-0 right-0 bg-emerald-500 p-0.5 rounded-tl-md">
                                            <Users size={8} className="text-emerald-950" />
                                        </div>
                                    </div>
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}

                            {/* Worst Match */}
                            {result.worstMatch[0] && (
                                <div
                                    onClick={() => handleMatchClick(result.worstMatch[0], false)}
                                    className="bg-rose-950/30 hover:bg-rose-900/40 rounded-xl p-2 border border-rose-500/20 flex items-center gap-2 cursor-pointer transition-all group relative overflow-hidden"
                                >
                                    <div className="flex-1 z-10">
                                        <div className="text-[10px] text-rose-400 font-bold mb-1">دشمن خونی</div>
                                        <div className="text-sm text-white font-black">{personas[result.worstMatch[0]].persianTitle}</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-rose-500/30 relative z-10">
                                        <img src={`/images/${result.worstMatch[0].toLowerCase()}.png`} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute bottom-0 right-0 bg-rose-500 p-0.5 rounded-tl-md">
                                            <AlertTriangle size={8} className="text-rose-950" />
                                        </div>
                                    </div>
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
                        </div>

                        {/* Viral "Add Yours" Section - My Disaster Team */}
                        <div className="mt-6 pt-6 border-t border-slate-800/50">
                            <div className="text-center mb-4">
                                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">چالش اینستاگرام</div>
                                <div className="text-lg font-black text-white">تیم فاجعه من 💀</div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                {/* Slot 1 */}
                                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2 flex flex-col items-center text-center gap-2 aspect-[3/4] justify-center border-dashed border-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-600">
                                        <Users size={16} />
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold leading-tight">اولین قربانی</div>
                                    <div className="text-[8px] text-slate-600">@تگ_کنید</div>
                                </div>

                                {/* Slot 2 */}
                                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2 flex flex-col items-center text-center gap-2 aspect-[3/4] justify-center border-dashed border-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-600">
                                        <Ghost size={16} />
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold leading-tight">جیغ‌زن تیم</div>
                                    <div className="text-[8px] text-slate-600">@تگ_کنید</div>
                                </div>

                                {/* Slot 3 */}
                                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-2 flex flex-col items-center text-center gap-2 aspect-[3/4] justify-center border-dashed border-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-600">
                                        <Brain size={16} />
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold leading-tight">نابغه تقلبی</div>
                                    <div className="text-[8px] text-slate-600">@تگ_کنید</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Decorative Footer with QR */}
                    <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <div className="text-[10px] text-slate-500 font-bold tracking-widest">تحلیل شخصیت اتاق فرار</div>
                            <div className="text-[8px] text-slate-600">escaperoom.ir</div>
                        </div>

                        {/* QR Code */}
                        <div className="bg-white p-1 rounded">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://escaperoom.ir')}`} className="w-10 h-10" alt="QR Code" />
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
                <div className="text-sm font-black text-slate-400 mb-3 px-2 text-center">بازی‌های پیشنهادی متناسب با شخصیت شما</div>
                <div className="flex flex-col gap-2">
                    {result.recommendedGames.map((game, idx) => (
                        <a
                            key={idx}
                            href={game.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold px-4 py-3 rounded-xl border border-slate-700 flex justify-between items-center transition-all group"
                        >
                            <span>{game.title}</span>
                            <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                <button
                    onClick={handleRestart}
                    className="flex items-center justify-center gap-2 bg-slate-800 text-slate-300 font-bold py-4 rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
                >
                    <RefreshCw size={20} />
                    تست مجدد
                </button>

                <button
                    onClick={handleShare}
                    className={`flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-all shadow-lg
            ${shareBtnText === "کپی شد!" ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-900 hover:bg-white'}
          `}
                >
                    {shareBtnText === "کپی شد!" ? <CheckCircle2 size={20} /> : <Share2 size={20} />}
                    {shareBtnText}
                </button>
            </div>

            {/* Popup Modal */}
            <AnimatePresence>
                {selectedMatch && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedMatch(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden"
                        >
                            {/* Background Glow */}
                            <div className={`absolute top-0 right-0 w-32 h-32 ${selectedMatch.isBest ? 'bg-emerald-500' : 'bg-rose-500'} blur-[80px] opacity-20 pointer-events-none`} />

                            <button
                                onClick={() => setSelectedMatch(null)}
                                className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className={`text-sm font-bold mb-2 ${selectedMatch.isBest ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {selectedMatch.title}
                            </div>

                            <h3 className="text-2xl font-black text-white mb-4">
                                چرا {personas[selectedMatch.type].persianTitle}؟
                            </h3>

                            <p className="text-slate-300 leading-relaxed text-sm">
                                {selectedMatch.reason}
                            </p>

                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={() => setSelectedMatch(null)}
                                    className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold py-2 px-6 rounded-lg transition-colors"
                                >
                                    متوجه شدم
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

const StatMini = ({ label, value, color }: { label: string, value: number, color: string }) => {
    const normalizedValue = Math.max(0, Math.min(10, value + 5));
    const percent = (normalizedValue / 10) * 100;

    return (
        <div className="flex flex-col gap-1.5 p-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1">
                <span>{label}</span>
                <span className="text-slate-200 text-[12px]" style={{ fontFamily: 'Yekan Bakh FaNum, sans-serif' }}>{toPersianDigits(normalizedValue)}/۱۰</span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${color} shadow-[0_0_8px_currentColor]`}
                />
            </div>
        </div>
    );
};
