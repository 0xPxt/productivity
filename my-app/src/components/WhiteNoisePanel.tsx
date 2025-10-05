'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2, X, Play, Pause } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { WhiteNoiseGenerator, NoiseType } from '@/utils/whiteNoise';

export default function WhiteNoisePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(20); // Start at lower volume
  const [noiseType, setNoiseType] = useState<NoiseType>('white-1');
  const generatorRef = useRef<WhiteNoiseGenerator | null>(null);

  // Initialize generator
  useEffect(() => {
    generatorRef.current = new WhiteNoiseGenerator();
    generatorRef.current.setVolume(volume);

    return () => {
      generatorRef.current?.dispose();
    };
  }, []);

  // Update volume
  useEffect(() => {
    generatorRef.current?.setVolume(volume);
  }, [volume]);

  const togglePlayback = () => {
    if (!generatorRef.current) return;

    if (isPlaying) {
      generatorRef.current.stop();
      setIsPlaying(false);
    } else {
      generatorRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNoiseTypeChange = (type: NoiseType) => {
    setNoiseType(type);
    generatorRef.current?.setNoiseType(type);
  };

  const noiseTypes: { value: NoiseType; label: string; description: string }[] = [
    { value: 'white-1', label: 'Espresso Machine', description: 'Bright, crisp hissing' },
    { value: 'white-2', label: 'Steam Wand', description: 'Airy, light whooshing' },
    { value: 'pink-1', label: 'Ocean Waves', description: 'Calm beach ambience' },
    { value: 'pink-2', label: 'Gentle Stream', description: 'Flowing water sounds' },
    { value: 'brown-1', label: 'Roasting Beans', description: 'Deep, rich rumble' },
    { value: 'brown-2', label: 'Brewing Pour-Over', description: 'Low, gentle flow' },
  ];

  return (
    <>
      {/* Toggle Button - Fixed to right side, below Todo button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-[calc(50%+5rem)] -translate-y-1/2 -right-3 bg-highlight border-2 border-r-0 border-border rounded-l-lg px-6 py-3 hover:bg-border hover:right-0 transition-all duration-300 cursor-pointer z-40 shadow-md"
        aria-label="Toggle white noise"
      >
        <Volume2 className="w-5 h-5 text-foreground transition-colors" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-accent/20 backdrop-blur-sm z-45"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Panel */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 -right-96 h-2/3 min-h-[400px] w-96 bg-highlight border-2 border-border rounded-2xl shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? '-translate-x-[25rem]' : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
            <h2 className="text-2xl font-bold text-foreground">Colored Noises</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-border rounded transition-colors cursor-pointer"
              aria-label="Close white noise panel"
            >
              <X className="w-5 h-5 text-secondary" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Play/Pause Control */}
            <div className="mb-6 flex justify-center">
              <button
                onClick={togglePlayback}
                className="flex items-center gap-3 px-8 py-4 bg-foreground text-highlight rounded-lg hover:bg-accent transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-6 h-6" />
                    <span className="font-medium">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-6 h-6" />
                    <span className="font-medium">Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Noise Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary mb-3">
                Noise Type
              </label>
              <div className="space-y-2">
                {noiseTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => handleNoiseTypeChange(type.value)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${
                      noiseType === type.value
                        ? 'border-foreground bg-background'
                        : 'border-border hover:border-secondary'
                    }`}
                  >
                    <div className="font-medium text-foreground">{type.label}</div>
                    <div className="text-xs text-secondary mt-1">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Control */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-secondary">Volume</label>
                <span className="text-lg text-foreground font-medium">{volume}%</span>
              </div>
              <Slider.Root
                value={[volume]}
                onValueChange={(value) => setVolume(value[0])}
                max={100}
                step={1}
                className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
              >
                <Slider.Track className="bg-border relative grow rounded-full h-1 cursor-pointer">
                  <Slider.Range className="absolute bg-secondary rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-foreground rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                  aria-label="Volume"
                />
              </Slider.Root>
            </div>

            {/* Info */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-secondary text-center">
                White noise can help improve focus and mask distracting sounds
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
