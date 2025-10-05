import * as Dialog from '@radix-ui/react-dialog';
import { TimeSlider } from './TimeSlider';
import { AnimatedIconButton } from './AnimatedIconButton';
import { TimerMode } from './useTimer';

interface SettingsDialogProps {
  tempHours: number;
  tempMinutes: number;
  mode: TimerMode;
  setTempHours: (hours: number) => void;
  setTempMinutes: (minutes: number) => void;
  setMode: (mode: TimerMode) => void;
  onApply: () => void;
}

export function SettingsDialog({
  tempHours,
  tempMinutes,
  mode,
  setTempHours,
  setTempMinutes,
  setMode,
  onApply
}: SettingsDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <AnimatedIconButton
          icon="settings"
          ariaLabel="Timer settings"
          onClick={() => {}}
          className="p-2"
        />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-accent/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-highlight border-2 border-border rounded-lg p-6 w-full max-w-md shadow-lg focus:outline-none">
          <Dialog.Title className="text-2xl font-bold text-foreground mb-2">
            Timer Settings
          </Dialog.Title>
          <Dialog.Description className="text-sm text-secondary mb-6">
            {mode === 'default' ? 'Adjust the timer duration' : 'Pomodoro: 25min work, 5min break (15min every 4th)'}
          </Dialog.Description>

          {/* Mode Toggle */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Timer Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('default')}
                className={`flex-1 px-4 py-2 rounded transition-colors cursor-pointer ${
                  mode === 'default'
                    ? 'bg-foreground text-highlight'
                    : 'bg-background text-secondary hover:bg-accent/20'
                }`}
              >
                Default
              </button>
              <button
                onClick={() => setMode('pomodoro')}
                className={`flex-1 px-4 py-2 rounded transition-colors cursor-pointer ${
                  mode === 'pomodoro'
                    ? 'bg-foreground text-highlight'
                    : 'bg-background text-secondary hover:bg-accent/20'
                }`}
              >
                Pomodoro
              </button>
            </div>
          </div>

          {/* Sliders - only show in default mode */}
          {mode === 'default' && (
            <div className="space-y-6 mb-6">
              <TimeSlider
                label="Hours"
                value={tempHours}
                onValueChange={setTempHours}
                max={23}
              />
              <TimeSlider
                label="Minutes"
                value={tempMinutes}
                onValueChange={setTempMinutes}
                max={59}
              />
            </div>
          )}

          <Dialog.Close asChild>
            <button
              onClick={onApply}
              className="w-full px-4 py-2 bg-foreground text-highlight rounded hover:bg-accent transition-colors cursor-pointer"
            >
              Done
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
