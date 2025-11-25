
import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Onboarding } from './components/Onboarding';
import { QuestionCard } from './components/QuestionCard';
import { AnalysisScreen } from './components/AnalysisScreen';
import { ResultScreen } from './components/ResultScreen';
import { LoginScreen } from './components/LoginScreen';
import { questions } from './data/questions';
import { calculatePersona } from './utils/calculatePersona';
import { Option, Stats, PersonaResult } from './types';
import { playSound } from './utils/sound';
import { BackgroundMusic } from './components/BackgroundMusic';

type AppState = 'INTRO' | 'QUIZ' | 'ANALYZING' | 'LOGIN' | 'RESULT';

const initialStats: Stats = {
  bravery: 0,
  logic: 0,
  observation: 0,
  leadership: 0
};

export default function App() {
  const [state, setState] = useState<AppState>('INTRO');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [history, setHistory] = useState<Stats[]>([]);
  const [result, setResult] = useState<PersonaResult | null>(null);

  // Prevent double submission
  const isProcessingRef = useRef(false);

  // Asset State - using pre-made files only
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>("");

  const loadPreMadeAssets = async (persona: PersonaResult) => {
    try {
      setLoadingStatus("در حال بارگذاری...");

      // Use pre-made image
      const imagePath = `/images/${persona.type.toLowerCase()}.png`;

      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      setGeneratedImage(imagePath);
      playSound('scan');
      setLoadingStatus("");

    } catch (error) {
      console.error("Asset loading error", error);
      setLoadingStatus("");
    }
  };

  const handleGenerateVideo = () => {
    // Placeholder - not used since we load pre-made videos automatically
    console.log("Using pre-made videos");
  };

  const handleStart = () => {
    setState('QUIZ');
  };

  const handleAnswer = (option: Option) => {
    if (isProcessingRef.current) return;

    // Save current stats to history before updating
    setHistory(prev => [...prev, stats]);

    const newStats = { ...stats };
    if (option.effect.bravery) newStats.bravery += option.effect.bravery;
    if (option.effect.logic) newStats.logic += option.effect.logic;
    if (option.effect.observation) newStats.observation += option.effect.observation;
    if (option.effect.leadership) newStats.leadership += option.effect.leadership;
    setStats(newStats);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz Finished
      isProcessingRef.current = true;
      const finalPersona = calculatePersona(newStats);
      setResult(finalPersona);
      setState('ANALYZING');

      // Load pre-made video immediately
      if (finalPersona.videoUrl) {
        setGeneratedVideo(finalPersona.videoUrl);
      }

      // Load pre-made image
      loadPreMadeAssets(finalPersona);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      playSound('click');
      setCurrentQuestionIndex(prev => prev - 1);
      // Restore previous stats
      const previousStats = history[history.length - 1];
      setStats(previousStats);
      // Remove last history entry
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleAnalysisComplete = () => {
    setState('LOGIN');
  };

  const handleLoginSuccess = () => {
    setState('RESULT');
  };

  const handleRestart = () => {
    setStats(initialStats);
    setHistory([]);
    setCurrentQuestionIndex(0);
    setResult(null);
    setGeneratedImage(null);
    setGeneratedVideo(null);
    setLoadingStatus("");
    isProcessingRef.current = false;
    setState('INTRO');
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-100 overflow-hidden flex flex-col">
      <BackgroundMusic />
      <main className="flex-1 relative w-full max-w-2xl mx-auto h-full">
        <AnimatePresence mode="wait">
          {state === 'INTRO' && (
            <motion.div
              key="intro"
              className="h-full w-full"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Onboarding onStart={handleStart} />
            </motion.div>
          )}

          {state === 'QUIZ' && (
            <motion.div
              key="quiz"
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionCard
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                onBack={handleBack}
                totalQuestions={questions.length}
                currentIndex={currentQuestionIndex}
              />
            </motion.div>
          )}

          {state === 'ANALYZING' && (
            <motion.div
              key="analyzing"
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnalysisScreen onComplete={handleAnalysisComplete} />
            </motion.div>
          )}

          {state === 'LOGIN' && result && (
            <motion.div
              key="login"
              className="h-full w-full overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LoginScreen
                onLoginSuccess={handleLoginSuccess}
                personaResult={result}
                stats={stats}
              />
            </motion.div>
          )}

          {state === 'RESULT' && result && (
            <motion.div
              key="result"
              className="h-full w-full overflow-y-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ResultScreen
                result={result}
                stats={stats}
                onRestart={handleRestart}
                generatedImage={generatedImage}
                generatedVideo={generatedVideo}
                loadingStatus={loadingStatus}
                onGenerateVideo={handleGenerateVideo}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
