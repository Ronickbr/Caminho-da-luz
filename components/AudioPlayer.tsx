
import React, { useState } from 'react';
import { Play, Square, Loader2, Volume2 } from 'lucide-react';
// Added GeminiService to imports to access static methods
import { geminiService, GeminiService } from '../services/geminiService';

interface AudioPlayerProps {
  text: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);

  const handlePlay = async () => {
    if (isPlaying) {
      audioSource?.stop();
      setIsPlaying(false);
      return;
    }

    try {
      setIsLoading(true);
      const base64Audio = await geminiService.speak(text);
      // Fixed: Accessing static methods via class name which is now imported
      const audioBytes = GeminiService.decode(base64Audio);
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      // Fixed: Accessing static methods via class name which is now imported
      const buffer = await GeminiService.decodeAudioData(audioBytes, audioCtx, 24000, 1);
      
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      
      source.onended = () => {
        setIsPlaying(false);
        setAudioSource(null);
      };

      source.start();
      setAudioSource(source);
      setIsPlaying(true);
    } catch (err) {
      console.error("Playback failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isLoading}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
        isPlaying 
          ? 'bg-rose-50 text-rose-600 border border-rose-200' 
          : 'bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100'
      }`}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isPlaying ? (
        <Square size={16} />
      ) : (
        <Volume2 size={16} />
      )}
      <span className="text-xs font-bold">{isLoading ? 'Carregando...' : isPlaying ? 'Parar' : 'Ouvir'}</span>
    </button>
  );
};

export default AudioPlayer;
