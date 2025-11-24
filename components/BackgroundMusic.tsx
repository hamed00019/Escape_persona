import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const audio = new Audio('/audio/bg-loop.mp3');
        audio.loop = true;
        audio.volume = 0.3; // Low volume background
        audioRef.current = audio;

        // Try to play automatically, but handle browser autoplay policies
        const playAudio = async () => {
            try {
                await audio.play();
            } catch (err) {
                console.log("Autoplay blocked, waiting for interaction");
            }
        };

        if (hasInteracted) {
            playAudio();
        }

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, [hasInteracted]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);

            // If this is the first interaction, ensure it plays
            if (!hasInteracted) {
                setHasInteracted(true);
                audioRef.current.play().catch(e => console.error("Play failed", e));
            }
        }
    };

    // Global click listener to start audio on first interaction if blocked
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                setHasInteracted(true);
                audioRef.current.play().catch(e => console.log("Still blocked", e));
            }
        };

        window.addEventListener('click', handleFirstInteraction, { once: true });
        return () => window.removeEventListener('click', handleFirstInteraction);
    }, [hasInteracted]);

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-4 right-4 z-50 bg-slate-800/80 backdrop-blur p-2 rounded-full text-slate-400 hover:text-white border border-slate-700 transition-all hover:scale-110"
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
    );
};
