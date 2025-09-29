import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 8, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`relative inline-block ${className}`}
    >
      {/* Base text */}
      <span className="text-foreground">{text}</span>

      {/* Shiny overlay - Light mode */}
      {!disabled && (
        <>
          <span
            className="absolute inset-0 bg-clip-text text-transparent animate-shine dark:hidden"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 30%, rgba(255, 255, 255, 0.8) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animationDuration: animationDuration,
            }}
          >
            {text}
          </span>

          {/* Shiny overlay - Dark mode */}
          <span
            className="absolute inset-0 bg-clip-text text-transparent animate-shine hidden dark:block"
            style={{
              backgroundImage:
                'linear-gradient(90deg, transparent 20%, rgba(255, 255, 255, 0.9) 50%, transparent 80%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              animationDuration: animationDuration,
            }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
