import * as Slider from '@radix-ui/react-slider';

interface TimeSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  max: number;
  min?: number;
}

export function TimeSlider({ label, value, onValueChange, max, min = 0 }: TimeSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm text-secondary">{label}</label>
        <span className="text-lg text-foreground font-medium">{value}</span>
      </div>
      <Slider.Root
        value={[value]}
        onValueChange={(values) => onValueChange(values[0])}
        min={min}
        max={max}
        step={1}
        className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
      >
        <Slider.Track className="bg-border relative grow rounded-full h-1 cursor-pointer">
          <Slider.Range className="absolute bg-secondary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-foreground rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
          aria-label={label}
        />
      </Slider.Root>
    </div>
  );
}
