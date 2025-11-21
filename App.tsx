
import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Onboarding } from './components/Onboarding';
import { QuestionCard } from './components/QuestionCard';
import { AnalysisScreen } from './components/AnalysisScreen';
import { ResultScreen } from './components/ResultScreen';
import { questions } from './data/questions';
import { calculatePersona } from './utils/calculatePersona';
import { Option, Stats, PersonaResult } from './types';
import { GoogleGenAI, Modality } from "@google/genai";
import { playSound } from './utils/sound';

type AppState = 'INTRO' | 'QUIZ' | 'ANALYZING' | 'RESULT';

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
  const [result, setResult] = useState<PersonaResult | null>(null);

  // Prevent double submission
  const isProcessingRef = useRef(false);

  // Asset Generation State
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [loadingStatus, setLoadingStatus] = useState<string>("");

  // Store the raw base64 image to use for video generation later
  const [rawBase64Image, setRawBase64Image] = useState<string | null>(null);
  const [rawImageMimeType, setRawImageMimeType] = useState<string>('image/png');

  const generateAssets = async (persona: PersonaResult) => {
    //const API_KEY = process.env.API_KEY;
    const API_KEY = "AIzaSyB3-Nih44mUzgR-nPL5b4hPa7pko5mXgGs";

    if (!API_KEY) {
      console.error("API Key not found in environment");
      setLoadingStatus("خطای تنظیمات (API Key)");
      return;
    }

    try {
      setLoadingStatus("در حال اتصال به هوش مصنوعی...");

      const ai = new GoogleGenAI({ apiKey: API_KEY });

      // 1. Generate Image (Gemini 2.5 Flash Image)
      setLoadingStatus("طراحی کاراکتر (Nano Banana)...");

      try {
        const imageResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: persona.aiPrompt }]
          },
          config: {
            responseModalities: [Modality.IMAGE],
          },
        });

        const part = imageResponse.candidates?.[0]?.content?.parts?.[0];
        if (part?.inlineData) {
          const base64 = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';

          if (base64) {
            setRawBase64Image(base64);
            setRawImageMimeType(mimeType);
            setGeneratedImage(`data:${mimeType};base64,${base64}`);
            playSound('scan');
          }
        }
      } catch (e) {
        console.error("Image generation failed", e);
        setLoadingStatus("خطا در ساخت تصویر");
      }

      // Complete the process (Image only)
      setLoadingStatus("");

    } catch (error) {
      console.error("General Asset generation error", error);
      setLoadingStatus("خطای ارتباط با سرور");
    }
  };

  const handleGenerateVideo = async () => {
    if (!result || !rawBase64Image) return;

    // const API_KEY = process.env.API_KEY;
    const API_KEY = "AIzaSyB3-Nih44mUzgR-nPL5b4hPa7pko5mXgGs";
    if (!API_KEY) return;

    setLoadingStatus("ساخت ویدیو (Veo 3)...");
    playSound('click');

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const operation = await ai.models.generateVideos({
        model: 'veo-2.0-generate-001',
        image: {
          imageBytes: rawBase64Image,
          mimeType: rawImageMimeType,
        },
        // Refined prompt for looped, living portrait effect
        prompt: result.aiPrompt + ", fantasy art style, living portrait, subtle cinematic movement, gentle breathing, blinking, looking at camera, seamless loop style, photorealistic render, slow motion",
        config: {
          numberOfVideos: 1,
          // resolution: '720p',
          aspectRatio: '9:16'
        }
      });

      let op = operation;
      while (!op.done) {
        await new Promise(resolve => setTimeout(resolve, 4000));
        op = await ai.operations.getVideosOperation({ operation: op });
        setLoadingStatus("رندر نهایی ویدیو...");
      }

      const downloadLink = op.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoRes = await fetch(`${downloadLink}&key=${API_KEY}`);
        const videoBlob = await videoRes.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        setGeneratedVideo(videoUrl);
        playSound('success');
      }
    } catch (videoError: any) {
      console.warn("Veo generation failed", videoError);
      alert("متاسفانه ساخت ویدیو با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoadingStatus("");
    }
  };

  const handleStart = () => {
    setState('QUIZ');
  };

  const handleAnswer = (option: Option) => {
    if (isProcessingRef.current) return;

    const newStats = { ...stats };
    if (option.effect.bravery) newStats.bravery += option.effect.bravery;
    if (option.effect.logic) newStats.logic += option.effect.logic;
    if (option.effect.observation) newStats.observation += option.effect.observation;
    if (option.effect.leadership) newStats.leadership += option.effect.leadership;
    setStats(newStats);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Quiz Finished - Determine Persona and Start Generation immediately
      isProcessingRef.current = true; // Lock to prevent double triggering
      const finalPersona = calculatePersona(newStats);
      setResult(finalPersona);
      setState('ANALYZING');
      generateAssets(finalPersona);
    }
  };

  const handleAnalysisComplete = () => {
    setState('RESULT');
  };

  const handleRestart = () => {
    setStats(initialStats);
    setCurrentQuestionIndex(0);
    setResult(null);
    setGeneratedImage(null);
    setGeneratedVideo(null);
    setRawBase64Image(null);
    setLoadingStatus("");
    isProcessingRef.current = false; // Unlock
    setState('INTRO');
  };

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-100 overflow-hidden flex flex-col">
      {/* Main Content Area */}
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
