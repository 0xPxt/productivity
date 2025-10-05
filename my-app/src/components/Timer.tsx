'use client';

import { useState, useEffect, useRef } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Dialog from '@radix-ui/react-dialog';
import { Settings, Play, Pause } from 'lucide-react';

interface AnimatedIconButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: 'play' | 'pause' | 'reset';
  ariaLabel: string;
  className?: string;
}

function AnimatedIconButton({ onClick, disabled, icon, ariaLabel, className = '' }: AnimatedIconButtonProps) {
  const iconPaths = {
    play: 'M5 3l14 9-14 9V3z',
    pause: 'M6 4h4v16H6V4zm8 0h4v16h-4V4z',
    reset: 'M17.65 6.35A7.96 7.96 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z'
  };

  const clipPathId = `${icon}Shape`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative group ${className}`}
      aria-label={ariaLabel}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="relative">
        <defs>
          <clipPath id={clipPathId}>
            <path d={iconPaths[icon]} fillRule="evenodd" clipRule="evenodd"/>
          </clipPath>
        </defs>

        {/* Icon outline */}
        <path
          d={iconPaths[icon]}
          stroke="#9A9085"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors group-hover:stroke-highlight group-disabled:stroke-current"
        />

        {/* Progressive fill */}
        <g clipPath={`url(#${clipPathId})`}>
          <rect
            x="0"
            y="24"
            width="24"
            height="24"
            fill="#403A34"
            className="transition-all duration-500 ease-out group-hover:-translate-y-full group-disabled:translate-y-0"
          />
        </g>
      </svg>
    </button>
  );
}

export default function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tempHours, setTempHours] = useState(0);
  const [tempMinutes, setTempMinutes] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const applyTimeSettings = () => {
    setHours(tempHours);
    setMinutes(tempMinutes);
    const total = tempHours * 3600 + tempMinutes * 60;
    setRemainingSeconds(total);
    setTotalSeconds(total);
  };

  // Update display when hours or minutes change (if not running and stopped)
  useEffect(() => {
    if (!isRunning && remainingSeconds === 0) {
      const total = hours * 3600 + minutes * 60;
      setRemainingSeconds(total);
      setTotalSeconds(total);
    }
  }, [hours, minutes, isRunning, remainingSeconds]);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingSeconds]);

  const handleStart = () => {
    if (remainingSeconds === 0 && (hours > 0 || minutes > 0)) {
      const total = hours * 3600 + minutes * 60;
      setTotalSeconds(total);
      setRemainingSeconds(total);
    }
    if (remainingSeconds > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setRemainingSeconds(0);
    setTotalSeconds(0);
  };

  // Calculate coffee fill level
  const getCoffeeFillLevel = () => {
    if (totalSeconds === 0) {
      return 0;
    }
    const elapsed = totalSeconds - remainingSeconds;
    const progress = elapsed / totalSeconds;
    return progress * 100;
  };

  const coffeeFillPercentage = getCoffeeFillLevel();

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Coffee cup */}
      <div className="relative">
        <svg width="300" height="300" viewBox="0 0 300 300" className="filter drop-shadow-sm">
          <defs>
            {/* Clip path for coffee cup */}
            <clipPath id="coffeeCup">
              <path d="M 100 130 L 110 200 L 190 200 L 200 130 Z" />
            </clipPath>
          </defs>

          {/* Coffee cup */}
          <g stroke="#C8BFB5" strokeWidth="3" fill="none">
            {/* Cup body - trapezoid shape */}
            <path d="M 100 130 L 110 200 L 190 200 L 200 130 Z" />

            {/* Cup handle */}
            <path d="M 200 140 Q 220 140 220 160 Q 220 180 200 180" strokeWidth="3" strokeLinecap="round" />

            {/* Saucer */}
            <ellipse cx="150" cy="200" rx="55" ry="8" fill="#C8BFB5" opacity="0.2" />
          </g>

          {/* Coffee fill in cup */}
          <g clipPath="url(#coffeeCup)">
            <rect
              x="100"
              y={200 - (70 * coffeeFillPercentage / 100)}
              width="100"
              height={70 * coffeeFillPercentage / 100}
              fill="#6B4423"
              className="transition-all duration-1000 ease-linear"
            />
            {/* Coffee surface shimmer */}
            {coffeeFillPercentage > 0 && (
              <ellipse
                cx="150"
                cy={200 - (70 * coffeeFillPercentage / 100)}
                rx="45"
                ry="4"
                fill="#8B5A3C"
                opacity="0.6"
              />
            )}
          </g>

          {/* Steam from cup when coffee is present */}
          {coffeeFillPercentage > 10 && (
            <g opacity="0.4" stroke="#9A9085" strokeWidth="2" fill="none" strokeLinecap="round">
              <path d="M 135 125 Q 130 115 135 105" className="animate-pulse" />
              <path d="M 150 125 Q 145 115 150 105" className="animate-pulse" style={{animationDelay: '0.3s'}} />
              <path d="M 165 125 Q 160 115 165 105" className="animate-pulse" style={{animationDelay: '0.6s'}} />
            </g>
          )}
        </svg>
      </div>

      {/* Digital display with settings */}
      <div className="flex items-center gap-3">
        <div className="text-3xl font-mono text-foreground tracking-wider">
          {formatTime(remainingSeconds)}
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button
              className="p-2 relative group cursor-pointer"
              aria-label="Timer settings"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="relative">
                <defs>
                  <clipPath id="gearShape">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fillRule="evenodd" clipRule="evenodd"/>
                  </clipPath>
                </defs>

                {/* Gear outline */}
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                  stroke="#9A9085"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors group-hover:stroke-highlight"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="#9A9085"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors group-hover:stroke-highlight"
                />

                {/* Progressive fill */}
                <g clipPath="url(#gearShape)">
                  <rect
                    x="0"
                    y="24"
                    width="24"
                    height="24"
                    fill="#403A34"
                    className="transition-all duration-500 ease-out group-hover:-translate-y-full"
                  />
                </g>
              </svg>
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-accent/30 backdrop-blur-sm" />
            <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-highlight border-2 border-border rounded-lg p-6 w-full max-w-md shadow-lg focus:outline-none">
              <Dialog.Title className="text-2xl font-bold text-foreground mb-2">
                Timer Settings
              </Dialog.Title>
              <Dialog.Description className="text-sm text-secondary mb-6">
                Adjust the timer duration
              </Dialog.Description>

              {/* Sliders */}
              <div className="space-y-6 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-secondary">Hours</label>
                    <span className="text-lg text-foreground font-medium">{tempHours}</span>
                  </div>
                  <Slider.Root
                    value={[tempHours]}
                    onValueChange={(value) => setTempHours(value[0])}
                    max={23}
                    step={1}
                    className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                  >
                    <Slider.Track className="bg-border relative grow rounded-full h-1 cursor-pointer">
                      <Slider.Range className="absolute bg-secondary rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-5 h-5 bg-foreground rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                      aria-label="Hours"
                    />
                  </Slider.Root>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-secondary">Minutes</label>
                    <span className="text-lg text-foreground font-medium">{tempMinutes}</span>
                  </div>
                  <Slider.Root
                    value={[tempMinutes]}
                    onValueChange={(value) => setTempMinutes(value[0])}
                    max={59}
                    step={1}
                    className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                  >
                    <Slider.Track className="bg-border relative grow rounded-full h-1 cursor-pointer">
                      <Slider.Range className="absolute bg-secondary rounded-full h-full" />
                    </Slider.Track>
                    <Slider.Thumb
                      className="block w-5 h-5 bg-foreground rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
                      aria-label="Minutes"
                    />
                  </Slider.Root>
                </div>
              </div>

              <Dialog.Close asChild>
                <button
                  onClick={applyTimeSettings}
                  className="w-full px-4 py-2 bg-foreground text-highlight rounded hover:bg-accent transition-colors cursor-pointer"
                >
                  Done
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <AnimatedIconButton
          onClick={handleStart}
          disabled={hours === 0 && minutes === 0}
          icon="play"
          ariaLabel="Start timer"
          className="px-6 py-2 bg-highlight text-foreground border border-border rounded hover:bg-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer min-w-24 flex items-center justify-center"
        />
        <AnimatedIconButton
          onClick={handlePause}
          disabled={!isRunning}
          icon="pause"
          ariaLabel="Pause timer"
          className="px-6 py-2 bg-highlight text-foreground border border-border rounded hover:bg-border transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer min-w-24 flex items-center justify-center"
        />
        <AnimatedIconButton
          onClick={handleReset}
          icon="reset"
          ariaLabel="Reset timer"
          className="px-6 py-2 bg-highlight text-foreground border border-border rounded hover:bg-border transition-colors cursor-pointer min-w-24 flex items-center justify-center"
        />
      </div>
    </div>
  );
}
