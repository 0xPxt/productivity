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
    mode,
    pomodoroSession,
    sessionCount,
    tempPomodoroWork,
    tempPomodoroShortBreak,
    tempPomodoroLongBreak,
    tempSessionsBeforeLongBreak,
    setTempHours,
    setTempMinutes,
    setMode,
    setTempPomodoroWork,
    setTempPomodoroShortBreak,
    setTempPomodoroLongBreak,
    setTempSessionsBeforeLongBreak,
    applyTimeSettings,
    handleStart,
    handlePause,
    handleReset,
  } = useTimer();

  // For breaks, invert the fill (refilling the cup)
  // For work/default, cup drains as time passes
  const coffeeFillPercentage = mode === 'pomodoro' && pomodoroSession === 'break'
    ? 100 - calculateFillPercentage(totalSeconds, remainingSeconds)
    : calculateFillPercentage(totalSeconds, remainingSeconds);

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Coffee cup visualization */}
      <div className="relative">
        <CoffeeCupVisualization fillPercentage={coffeeFillPercentage} />
      </div>

      {/* Pomodoro session indicator */}
      {mode === 'pomodoro' && totalSeconds > 0 && (
        <div className="flex items-center gap-3 text-sm">
          <div className={`px-4 py-2 rounded-full font-medium ${
            pomodoroSession === 'work'
              ? 'bg-foreground text-highlight'
              : 'bg-foreground/90 text-highlight'
          }`}>
            {pomodoroSession === 'work' ? 'Work Session' : 'Break Time'}
          </div>
          <div className="text-secondary">
            Session {sessionCount}
          </div>
        </div>
      )}

      {/* Digital display with settings */}
      <div className="flex items-center gap-3">
        <div className="text-3xl font-mono text-foreground tracking-wider">
          {formatTime(remainingSeconds)}
        </div>

        <SettingsDialog
          tempHours={tempHours}
          tempMinutes={tempMinutes}
          mode={mode}
          tempPomodoroWork={tempPomodoroWork}
          tempPomodoroShortBreak={tempPomodoroShortBreak}
          tempPomodoroLongBreak={tempPomodoroLongBreak}
          tempSessionsBeforeLongBreak={tempSessionsBeforeLongBreak}
          setTempHours={setTempHours}
          setTempMinutes={setTempMinutes}
          setMode={setMode}
          setTempPomodoroWork={setTempPomodoroWork}
          setTempPomodoroShortBreak={setTempPomodoroShortBreak}
          setTempPomodoroLongBreak={setTempPomodoroLongBreak}
          setTempSessionsBeforeLongBreak={setTempSessionsBeforeLongBreak}
          onApply={applyTimeSettings}
        />
      </div>

      {/* Controls */}
      <TimerControls
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        isRunning={isRunning}
        isDisabled={mode === 'default' && hours === 0 && minutes === 0}
      />
    </div>
  );
}
