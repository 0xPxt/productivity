'use client';

import { useTimer } from './Timer/useTimer';
import { CoffeeCupVisualization } from './Timer/CoffeeCupVisualization';
import { SettingsDialog } from './Timer/SettingsDialog';
import { TimerControls } from './Timer/TimerControls';
import { formatTime, calculateFillPercentage } from '@/utils/time';

export default function Timer() {
  const {
    hours,
    minutes,
    totalSeconds,
    remainingSeconds,
    isRunning,
    tempHours,
    tempMinutes,
    setTempHours,
    setTempMinutes,
    applyTimeSettings,
    handleStart,
    handlePause,
    handleReset,
  } = useTimer();

  const coffeeFillPercentage = calculateFillPercentage(totalSeconds, remainingSeconds);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Coffee cup visualization */}
      <div className="relative">
        <CoffeeCupVisualization fillPercentage={coffeeFillPercentage} />
      </div>

      {/* Digital display with settings */}
      <div className="flex items-center gap-3">
        <div className="text-3xl font-mono text-foreground tracking-wider">
          {formatTime(remainingSeconds)}
        </div>

        <SettingsDialog
          tempHours={tempHours}
          tempMinutes={tempMinutes}
          setTempHours={setTempHours}
          setTempMinutes={setTempMinutes}
          onApply={applyTimeSettings}
        />
      </div>

      {/* Controls */}
      <TimerControls
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        isRunning={isRunning}
        isDisabled={hours === 0 && minutes === 0}
      />
    </div>
  );
}
