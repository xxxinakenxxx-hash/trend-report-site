// TrendCard.tsx
// Design: Modern Dashboard — full detail card for each trend item

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import type { TrendItem } from '@/lib/trendData';
import ScoreBar from './ScoreBar';
import ScoreRadar from './ScoreRadar';

interface TrendCardProps {
  trend: TrendItem;
  index: number;
}

export default function TrendCard({ trend, index }: TrendCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopyTalk = () => {
    navigator.clipboard.writeText(trend.talkExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="trend-card rounded-xl border border-[#243650] bg-[#1A2B42] overflow-hidden"
    >
      {/* Card Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-4">
          {/* Rank Number */}
          <div className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-black"
            style={{ background: `${trend.categoryColor}18`, color: trend.categoryColor, fontFamily: 'Bebas Neue, Syne, sans-serif' }}>
            {String(trend.id).padStart(2, '0')}
          </div>

          {/* Title & Category */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${trend.categoryColor}22`, color: trend.categoryColor }}
              >
                {trend.category}
              </span>
              <span className="text-xs text-slate-500">総合 {trend.totalScore}/25</span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug" style={{ fontFamily: 'Syne, Noto Sans JP, sans-serif' }}>
              {trend.icon} {trend.title}
            </h3>
          </div>

          {/* Total Score Badge */}
          <div
            className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-black border-2"
            style={{ borderColor: trend.categoryColor, color: trend.categoryColor, fontFamily: 'Bebas Neue, Syne, sans-serif' }}
          >
            {trend.totalScore}
          </div>
        </div>

        {/* Summary */}
        <p className="mt-3 text-sm text-slate-300 leading-relaxed">{trend.summary}</p>
      </div>

      {/* Score Section */}
      <div className="px-5 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">評価スコア</p>
          <ScoreBar scores={trend.scores} color={trend.categoryColor} />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-0">レーダーチャート</p>
          <ScoreRadar scores={trend.scores} color={trend.categoryColor} />
        </div>
      </div>

      {/* Expandable Detail */}
      <div className="border-t border-[#243650]">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
        >
          <span className="font-medium">詳細・営業ツールを表示</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 space-y-4"
          >
            {/* Background */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">話題化の背景</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{trend.background}</p>
            </div>

            {/* Sales Angle */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">営業で使える切り口</h4>
              <p className="text-sm text-slate-300 leading-relaxed">{trend.salesAngle}</p>
            </div>

            {/* Products & Targets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">関連商品カテゴリ</h4>
                <ul className="space-y-1">
                  {trend.products.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span style={{ color: trend.categoryColor }} className="mt-0.5 shrink-0">▸</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">提案先候補</h4>
                <ul className="space-y-1">
                  {trend.targets.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span style={{ color: trend.categoryColor }} className="mt-0.5 shrink-0">▸</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Talk Example */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">営業トーク例</h4>
                <button
                  onClick={handleCopyTalk}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors"
                  style={{
                    background: copied ? '#10B98122' : '#F5A62322',
                    color: copied ? '#10B981' : '#F5A623',
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'コピー済み' : 'コピー'}
                </button>
              </div>
              <blockquote
                className="text-sm text-slate-200 leading-relaxed p-3 rounded-lg border-l-4"
                style={{ background: `${trend.categoryColor}0d`, borderColor: trend.categoryColor }}
              >
                {trend.talkExample}
              </blockquote>
            </div>

            {/* Caution */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-950/30 border border-red-900/40">
              <span className="text-red-400 shrink-0 mt-0.5">⚠</span>
              <div>
                <p className="text-xs font-semibold text-red-400 mb-0.5">注意点</p>
                <p className="text-sm text-red-200/80">{trend.caution}</p>
              </div>
            </div>

            {/* Sources */}
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">根拠URL</h4>
              <ul className="space-y-1">
                {trend.sources.map((s, i) => (
                  <li key={i}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={11} className="shrink-0" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
