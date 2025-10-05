import * as Dialog from '@radix-ui/react-dialog';
import { TimeSlider } from './TimeSlider';
import { AnimatedIconButton } from './AnimatedIconButton';

interface SettingsDialogProps {
  tempHours: number;
  tempMinutes: number;
  setTempHours: (hours: number) => void;
  setTempMinutes: (minutes: number) => void;
  onApply: () => void;
}

export function SettingsDialog({ tempHours, tempMinutes, setTempHours, setTempMinutes, onApply }: SettingsDialogProps) {
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
            Adjust the timer duration
          </Dialog.Description>

          {/* Sliders */}
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
