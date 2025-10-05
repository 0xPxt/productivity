import { useState, useEffect, useRef } from 'react';

export interface UseTimerReturn {
  hours: number;
  minutes: number;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  tempHours: number;
  tempMinutes: number;
  setTempHours: (hours: number) => void;
  setTempMinutes: (minutes: number) => void;
  applyTimeSettings: () => void;
  handleStart: () => void;
  handlePause: () => void;
  handleReset: () => void;
}

export function useTimer(): UseTimerReturn {
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

  // Timer interval effect
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

  return {
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
  };
}
