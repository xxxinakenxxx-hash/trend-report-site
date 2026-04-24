// ScoreBar.tsx
// Design: Modern Dashboard — animated score progress bars

import { useEffect, useRef, useState } from 'react';
import type { TrendScore } from '@/lib/trendData';
import { scoreLabels } from '@/lib/trendData';

interface ScoreBarProps {
  scores: TrendScore;
  color?: string;
}

const colorMap: Record<string, string> = {
  '#F5A623': 'bg-amber-400',
  '#10B981': 'bg-emerald-500',
  '#60A5FA': 'bg-blue-400',
  '#A78BFA': 'bg-violet-400',
};

export default function ScoreBar({ scores, color = '#F5A623' }: ScoreBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const barClass = colorMap[color] || 'bg-amber-400';

  return (
    <div ref={ref} className="space-y-2">
      {scoreLabels.map((key) => (
        <div key={key} className="flex items-center gap-3">
          <span className="text-xs text-slate-400 w-20 shrink-0 font-medium">{key}</span>
          <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full score-bar ${barClass}`}
              style={{ width: animated ? `${(scores[key] / 5) * 100}%` : '0%' }}
            />
          </div>
          <span className="text-xs font-bold text-slate-300 w-4 text-right">{scores[key]}</span>
        </div>
      ))}
    </div>
  );
}
