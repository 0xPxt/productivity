import { useState, useEffect, useRef } from 'react';

export type TimerMode = 'default' | 'pomodoro';
export type PomodoroSession = 'work' | 'break';

export interface UseTimerReturn {
  hours: number;
  minutes: number;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  tempHours: number;
  tempMinutes: number;
  mode: TimerMode;
  pomodoroSession: PomodoroSession;
  sessionCount: number;
  tempPomodoroWork: number;
  tempPomodoroShortBreak: number;
  tempPomodoroLongBreak: number;
  tempSessionsBeforeLongBreak: number;
  setTempHours: (hours: number) => void;
  setTempMinutes: (minutes: number) => void;
  setMode: (mode: TimerMode) => void;
  setTempPomodoroWork: (minutes: number) => void;
  setTempPomodoroShortBreak: (minutes: number) => void;
  setTempPomodoroLongBreak: (minutes: number) => void;
  setTempSessionsBeforeLongBreak: (sessions: number) => void;
  applyTimeSettings: () => void;
  handleStart: () => void;
  handlePause: () => void;
  handleReset: () => void;
}

const DEFAULT_POMODORO_WORK_MINUTES = 25;
const DEFAULT_POMODORO_SHORT_BREAK_MINUTES = 5;
const DEFAULT_POMODORO_LONG_BREAK_MINUTES = 25;
const DEFAULT_SESSIONS_BEFORE_LONG_BREAK = 4;

export function useTimer(): UseTimerReturn {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tempHours, setTempHours] = useState(0);
  const [tempMinutes, setTempMinutes] = useState(0);
  const [mode, setMode] = useState<TimerMode>('default');
  const [pomodoroSession, setPomodoroSession] = useState<PomodoroSession>('work');
  const [sessionCount, setSessionCount] = useState(1);

  // Pomodoro duration settings
  const [pomodoroWorkMinutes, setPomodoroWorkMinutes] = useState(DEFAULT_POMODORO_WORK_MINUTES);
  const [pomodoroShortBreakMinutes, setPomodoroShortBreakMinutes] = useState(DEFAULT_POMODORO_SHORT_BREAK_MINUTES);
  const [pomodoroLongBreakMinutes, setPomodoroLongBreakMinutes] = useState(DEFAULT_POMODORO_LONG_BREAK_MINUTES);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(DEFAULT_SESSIONS_BEFORE_LONG_BREAK);
  const [tempPomodoroWork, setTempPomodoroWork] = useState(DEFAULT_POMODORO_WORK_MINUTES);
  const [tempPomodoroShortBreak, setTempPomodoroShortBreak] = useState(DEFAULT_POMODORO_SHORT_BREAK_MINUTES);
  const [tempPomodoroLongBreak, setTempPomodoroLongBreak] = useState(DEFAULT_POMODORO_LONG_BREAK_MINUTES);
  const [tempSessionsBeforeLongBreak, setTempSessionsBeforeLongBreak] = useState(DEFAULT_SESSIONS_BEFORE_LONG_BREAK);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startPomodoroSession = (
    session: PomodoroSession,
    count: number,
    workMins?: number,
    shortBreakMins?: number,
    longBreakMins?: number,
    sessionsBeforeLong?: number
  ) => {
    setPomodoroSession(session);
    setSessionCount(count);

    // Use provided values or fall back to state
    const work = workMins ?? pomodoroWorkMinutes;
    const shortBreak = shortBreakMins ?? pomodoroShortBreakMinutes;
    const longBreak = longBreakMins ?? pomodoroLongBreakMinutes;
    const sessionThreshold = sessionsBeforeLong ?? sessionsBeforeLongBreak;

    let minutes: number;
    if (session === 'work') {
      minutes = work;
    } else {
      minutes = count % sessionThreshold === 0 ? longBreak : shortBreak;
    }

    const total = minutes * 60;
    setTotalSeconds(total);
    setRemainingSeconds(total);
  };

  const applyTimeSettings = () => {
    if (mode === 'default') {
      setHours(tempHours);
      setMinutes(tempMinutes);
      const total = tempHours * 3600 + tempMinutes * 60;
      setRemainingSeconds(total);
      setTotalSeconds(total);
    } else {
      // Apply pomodoro settings
      setPomodoroWorkMinutes(tempPomodoroWork);
      setPomodoroShortBreakMinutes(tempPomodoroShortBreak);
      setPomodoroLongBreakMinutes(tempPomodoroLongBreak);
      setSessionsBeforeLongBreak(tempSessionsBeforeLongBreak);
      // Start with a work session using the temp values directly
      startPomodoroSession(
        'work',
        1,
        tempPomodoroWork,
        tempPomodoroShortBreak,
        tempPomodoroLongBreak,
        tempSessionsBeforeLongBreak
      );
    }
  };

  // Update display when hours or minutes change (if not running and stopped)
  useEffect(() => {
    if (!isRunning && remainingSeconds === 0) {
      const total = hours * 3600 + minutes * 60;
      setRemainingSeconds(total);
      setTotalSeconds(total);
    }
  }, [hours, minutes, isRunning, remainingSeconds]);

  // Timer interval effect
  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);

            // In pomodoro mode, auto-transition to next session
            if (mode === 'pomodoro') {
              if (pomodoroSession === 'work') {
                // After work, take a break
                startPomodoroSession('break', sessionCount);
              } else {
                // After break, start next work session
                const nextCount = sessionCount + 1;
                startPomodoroSession('work', nextCount);
              }
              setIsRunning(true); // Auto-start next session
            }

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
  }, [isRunning, remainingSeconds, mode, pomodoroSession, sessionCount]);

  const handleStart = () => {
    if (mode === 'default') {
      if (remainingSeconds === 0 && (hours > 0 || minutes > 0)) {
        const total = hours * 3600 + minutes * 60;
        setTotalSeconds(total);
        setRemainingSeconds(total);
      }
    } else {
      // Pomodoro mode - if at 0, restart current session
      if (remainingSeconds === 0) {
        startPomodoroSession(pomodoroSession, sessionCount);
      }
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

    if (mode === 'pomodoro') {
      setPomodoroSession('work');
      setSessionCount(1);
    }
  };

  return {
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
  };
}
