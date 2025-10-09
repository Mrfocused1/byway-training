import { useState, type ReactNode } from 'react';

interface InfiniteSliderProps {
  children: ReactNode;
  gap?: number;
  duration?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

export default function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  direction = 'horizontal',
  reverse = false,
  className = '',
  pauseOnHover = true
}: InfiniteSliderProps) {
  const [isPaused, setIsPaused] = useState(false);

  const animationStyle = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? 'reverse' : 'normal',
    animationPlayState: isPaused ? 'paused' : 'running',
  };

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className={`flex ${direction === 'horizontal' ? 'animate-scroll-horizontal' : 'animate-scroll-vertical'}`}
        style={{
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          ...animationStyle
        }}
      >
        {/* First set of children */}
        <div className="flex shrink-0" style={{ gap: `${gap}px`, flexDirection: direction === 'horizontal' ? 'row' : 'column' }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0" style={{ gap: `${gap}px`, flexDirection: direction === 'horizontal' ? 'row' : 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
