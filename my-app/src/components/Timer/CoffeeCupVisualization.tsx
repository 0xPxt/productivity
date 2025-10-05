import { COFFEE_CUP, COLORS, ANIMATION } from './constants';

interface CoffeeCupVisualizationProps {
  fillPercentage: number;
}

export function CoffeeCupVisualization({ fillPercentage }: CoffeeCupVisualizationProps) {
  const { SVG_WIDTH, SVG_HEIGHT, CUP_HEIGHT, CUP_Y_BASE, CUP_Y_TOP } = COFFEE_CUP;
  // Cap at 85% to prevent overflow appearance
  const maxFillPercentage = Math.min(fillPercentage, 85);
  const coffeeHeight = (CUP_HEIGHT * maxFillPercentage) / 100;
  const coffeeY = CUP_Y_BASE - coffeeHeight;

  return (
    <svg width={SVG_WIDTH} height={SVG_HEIGHT} viewBox="0 0 300 300" className="filter drop-shadow-sm">
      <defs>
        {/* Clip path for coffee cup */}
        <clipPath id="coffeeCup">
          <path d={`M 100 ${CUP_Y_TOP} L 110 ${CUP_Y_BASE} L 190 ${CUP_Y_BASE} L 200 ${CUP_Y_TOP} Z`} />
        </clipPath>
      </defs>

      {/* Coffee cup */}
      <g stroke={COLORS.STROKE} strokeWidth="3" fill="none">
        {/* Cup body - trapezoid shape */}
        <path d={`M 100 ${CUP_Y_TOP} L 110 ${CUP_Y_BASE} L 190 ${CUP_Y_BASE} L 200 ${CUP_Y_TOP} Z`} />

        {/* Cup handle */}
        <path d={`M 200 ${CUP_Y_TOP + 10} Q 220 ${CUP_Y_TOP + 10} 220 ${CUP_Y_TOP + 30} Q 220 ${CUP_Y_TOP + 50} 200 ${CUP_Y_TOP + 50}`} strokeWidth="3" strokeLinecap="round" />

        {/* Saucer */}
        <ellipse cx="150" cy={CUP_Y_BASE} rx="55" ry="8" fill={COLORS.STROKE} opacity="0.2" />
      </g>

      {/* Coffee fill in cup */}
      <g clipPath="url(#coffeeCup)">
        <rect
          x="100"
          y={coffeeY}
          width="100"
          height={coffeeHeight}
          fill={COLORS.COFFEE}
          className={`transition-all ${ANIMATION.FILL_DURATION} ease-linear`}
        />
        {/* Coffee surface shimmer */}
        {fillPercentage > 0 && (
          <ellipse
            cx="150"
            cy={coffeeY}
            rx="45"
            ry="4"
            fill={COLORS.COFFEE_SHIMMER}
            opacity="0.6"
          />
        )}
      </g>

      {/* Steam from cup when coffee is present */}
      {fillPercentage > ANIMATION.STEAM_THRESHOLD && (
        <g opacity="0.4" stroke={COLORS.STEAM} strokeWidth="2" fill="none" strokeLinecap="round">
          <path d={`M 135 ${CUP_Y_TOP - 5} Q 130 ${CUP_Y_TOP - 15} 135 ${CUP_Y_TOP - 25}`} className="animate-pulse" />
          <path d={`M 150 ${CUP_Y_TOP - 5} Q 145 ${CUP_Y_TOP - 15} 150 ${CUP_Y_TOP - 25}`} className="animate-pulse" style={{animationDelay: ANIMATION.STEAM_DELAYS[1]}} />
          <path d={`M 165 ${CUP_Y_TOP - 5} Q 160 ${CUP_Y_TOP - 15} 165 ${CUP_Y_TOP - 25}`} className="animate-pulse" style={{animationDelay: ANIMATION.STEAM_DELAYS[2]}} />
        </g>
      )}
    </svg>
  );
}
