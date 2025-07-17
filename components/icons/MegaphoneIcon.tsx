import React from 'react';

const MegaphoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.34 1.87c.9-1.3 2.42-1.3 3.32 0l4.06 6.1a2 2 0 01-1.66 3.03H7.94a2 2 0 01-1.66-3.03l4.06-6.1zM10.13 12.13H4a1 1 0 00-1 1v2a1 1 0 001 1h6.13a1 1 0 01.95.69l1.42 4.25a1 1 0 001.9 0l1.42-4.25a1 1 0 01.95-.69H20a1 1 0 001-1v-2a1 1 0 00-1-1h-6.13a1 1 0 00-.95.69l-1.42 4.25a1 1 0 01-1.9 0l-1.42-4.25a1 1 0 00-.95-.69z"
    />
  </svg>
);

export default MegaphoneIcon;