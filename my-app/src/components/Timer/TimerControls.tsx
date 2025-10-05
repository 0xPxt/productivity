import { AnimatedIconButton } from './AnimatedIconButton';
import { BUTTON_BASE_CLASSES, BUTTON_DISABLED_CLASSES } from './constants';

interface TimerControlsProps {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isRunning: boolean;
  isDisabled: boolean;
}

export function TimerControls({ onStart, onPause, onReset, isRunning, isDisabled }: TimerControlsProps) {
  return (
    <div className="flex gap-4">
      <AnimatedIconButton
        onClick={onStart}
        disabled={isDisabled}
        icon="play"
        ariaLabel="Start timer"
        className={`${BUTTON_BASE_CLASSES} ${BUTTON_DISABLED_CLASSES}`}
      />
      <AnimatedIconButton
        onClick={onPause}
        disabled={!isRunning}
        icon="pause"
        ariaLabel="Pause timer"
        className={`${BUTTON_BASE_CLASSES} ${BUTTON_DISABLED_CLASSES}`}
      />
      <AnimatedIconButton
        onClick={onReset}
        icon="reset"
        ariaLabel="Reset timer"
        className={BUTTON_BASE_CLASSES}
      />
    </div>
  );
}
