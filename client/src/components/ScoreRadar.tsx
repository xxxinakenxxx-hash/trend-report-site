// ScoreRadar.tsx
// Design: Modern Dashboard — Recharts radar chart for trend score visualization

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import type { TrendScore } from '@/lib/trendData';
import { scoreLabels } from '@/lib/trendData';

interface ScoreRadarProps {
  scores: TrendScore;
  color?: string;
}

export default function ScoreRadar({ scores, color = '#F5A623' }: ScoreRadarProps) {
  const data = scoreLabels.map((key) => ({
    subject: key,
    value: scores[key],
    fullMark: 5,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#243650" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Noto Sans JP' }}
        />
        <Radar
          name="score"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.18}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
