// ScoreMatrix.tsx
// Design: Modern Dashboard — overview score matrix table

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import { trends, scoreLabels } from '@/lib/trendData';

function ScoreDot({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i <= value ? color : '#243650' }}
        />
      ))}
    </div>
  );
}

export default function ScoreMatrix() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      id="matrix"
      className="mt-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <BarChart3 size={16} className="text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            評価マトリクス一覧
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">各5点満点 — 点数が高いほど業務用提案への優先度が高い</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#243650] bg-[#1A2B42] overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="border-b border-[#243650]">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-8">#</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">トレンドテーマ</th>
              {scoreLabels.map((label) => (
                <th key={label} className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {label}
                </th>
              ))}
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">総合</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((trend, i) => (
              <tr
                key={trend.id}
                className="border-b border-[#243650] last:border-0 hover:bg-white/5 transition-colors"
              >
                <td className="px-4 py-3">
                  <span
                    className="text-sm font-black"
                    style={{ color: trend.categoryColor, fontFamily: 'Bebas Neue, Syne, sans-serif' }}
                  >
                    {String(trend.id).padStart(2, '0')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>{trend.icon}</span>
                    <span className="text-slate-200 font-medium text-xs leading-snug">{trend.shortTitle}</span>
                  </div>
                </td>
                {scoreLabels.map((label) => (
                  <td key={label} className="px-3 py-3 text-center">
                    <ScoreDot value={trend.scores[label]} color={trend.categoryColor} />
                  </td>
                ))}
                <td className="px-4 py-3 text-center">
                  <span
                    className="text-lg font-black"
                    style={{ color: trend.categoryColor, fontFamily: 'Bebas Neue, Syne, sans-serif' }}
                  >
                    {trend.totalScore}
                  </span>
                  <span className="text-xs text-slate-600">/25</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
