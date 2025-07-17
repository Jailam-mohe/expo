import { type FC } from 'react';
import { Zone } from '../types';

interface ExpoMapProps {
  clickedZone: Zone | null;
  setHoveredZone: (zone: Zone | null) => void;
  onZoneClick: (zone: Zone) => void;
}

const zoneData: { id: Zone; path: string; labelPos: { x: string; y: string }; }[] = [
  { id: Zone.CAREER_HUB, path: "M 10 10 H 290 V 290 H 10 Z", labelPos: { x: '150', y: '150' } },
  { id: Zone.EDUCATION_PROVIDER, path: "M 310 10 H 590 V 290 H 310 Z", labelPos: { x: '450', y: '150' } },
  { id: Zone.INNOVATION_STARTUP, path: "M 610 10 H 890 V 290 H 610 Z", labelPos: { x: '750', y: '150' } },
  { id: Zone.SKILLS_EXPERIENCE, path: "M 10 310 H 290 V 590 H 10 Z", labelPos: { x: '150', y: '450' } },
  { id: Zone.FOOD_CULINARY, path: "M 310 310 H 590 V 590 H 310 Z", labelPos: { x: '450', y: '450' } },
  { id: Zone.ENTERTAINMENT, path: "M 610 310 H 890 V 590 H 610 Z", labelPos: { x: '750', y: '450' } },
];

const zoneColors = {
  default: "fill-gray-200 dark:fill-gray-700",
  active: "fill-cyan-500 dark:fill-cyan-500",
};

const ExpoMap: FC<ExpoMapProps> = ({ clickedZone, setHoveredZone, onZoneClick }) => {
  return (
    <svg 
      viewBox="0 0 900 600" 
      className="w-full h-full"
      aria-label="Expo venue map with 6 zones"
    >
      {zoneData.map(({ id, path, labelPos }) => {
        const isClicked = clickedZone === id;
        return (
          <g 
            key={id}
            onMouseEnter={() => setHoveredZone(id)}
            onMouseLeave={() => setHoveredZone(null)}
            onClick={() => onZoneClick(id)}
            onFocus={() => setHoveredZone(id)}
            onBlur={() => setHoveredZone(null)}
            className="cursor-pointer group focus:outline-none"
            tabIndex={0}
            aria-label={id}
          >
            <path
              d={path}
              className={`transition-all duration-300 stroke-white/50 dark:stroke-black/50 stroke-[10px] ${
                isClicked ? zoneColors.active : 'group-hover:fill-cyan-400/70 dark:group-hover:fill-cyan-600/70 ' + zoneColors.default
              }`}
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`fill-gray-800 dark:fill-gray-100 font-bold text-4xl pointer-events-none transition-all duration-300 ${
                isClicked ? 'fill-white dark:fill-gray-900' : 'group-hover:fill-gray-900 dark:group-hover:fill-gray-50'
              }`}
            >
              {id.split(' ')[0]}
            </text>
             <text
              x={labelPos.x}
              y={Number(labelPos.y) + 40}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`fill-gray-800 dark:fill-gray-100 font-bold text-4xl pointer-events-none transition-all duration-300 ${
                isClicked ? 'fill-white dark:fill-gray-900' : 'group-hover:fill-gray-900 dark:group-hover:fill-gray-50'
              }`}
            >
              {id.split(' ').slice(1).join(' ')}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default ExpoMap;