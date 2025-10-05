import { ICON_PATHS, COLORS, ANIMATION } from './constants';

type IconType = 'play' | 'pause' | 'reset' | 'settings';

interface AnimatedIconButtonProps {
  onClick: () => void;
  disabled?: boolean;
  icon: IconType;
  ariaLabel: string;
  className?: string;
}

export function AnimatedIconButton({ onClick, disabled, icon, ariaLabel, className = '' }: AnimatedIconButtonProps) {
  const iconPath = ICON_PATHS[icon];
  const clipPathId = `${icon}Shape`;

  // Settings icon needs special rendering
  const isSettings = icon === 'settings';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative group ${className}`}
      aria-label={ariaLabel}
    >
      <svg width={isSettings ? "24" : "28"} height={isSettings ? "24" : "28"} viewBox="0 0 24 24" fill="none" className="relative">
        <defs>
          <clipPath id={clipPathId}>
            <path d={iconPath} fillRule="evenodd" clipRule="evenodd"/>
          </clipPath>
        </defs>

        {/* Icon outline */}
        <path
          d={iconPath}
          stroke={COLORS.ICON_STROKE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors group-hover:stroke-highlight group-disabled:stroke-current"
        />

        {/* Settings icon center circle */}
        {isSettings && (
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke={COLORS.ICON_STROKE}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors group-hover:stroke-highlight"
          />
        )}

        {/* Progressive fill */}
        <g clipPath={`url(#${clipPathId})`}>
          <rect
            x="0"
            y="24"
            width="24"
            height="24"
            fill={COLORS.ICON_FILL}
            className={`transition-all ${ANIMATION.ICON_HOVER_DURATION} ease-out group-hover:-translate-y-full group-disabled:translate-y-0`}
          />
        </g>
      </svg>
    </button>
  );
}
