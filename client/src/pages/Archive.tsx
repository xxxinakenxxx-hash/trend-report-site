// Archive.tsx
// Design: Modern Dashboard × Premium Report
// アーカイブ一覧ページ — 過去の週次レポートを号数順に一覧表示

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Archive, TrendingUp, ChevronRight, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { archiveIssues } from '@/lib/archiveData';

const categoryColors: Record<string, string> = {
  'スイーツ・洋菓子': '#10B981',
  'パン・ベーカリー': '#F5A623',
  'カフェメニュー': '#A78BFA',
  '冷凍食品・冷凍スイーツ': '#60A5FA',
  '健康志向・高付加価値食品': '#34D399',
};

export default function ArchivePage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: '#0F1B2D' }}>
      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{ background: 'rgba(15,27,45,0.92)', backdropFilter: 'blur(12px)', borderColor: '#243650' }}
      >
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-amber-500/20 flex items-center justify-center">
              <TrendingUp size={14} className="text-amber-400" />
            </div>
            <span className="text-sm font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              週次トレンドレポート
            </span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-md hover:bg-amber-500/10"
          >
            <ArrowLeft size={13} />
            最新号へ戻る
          </Link>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <div
        className="border-b"
        style={{ background: 'linear-gradient(135deg, #162236 0%, #0F1B2D 100%)', borderColor: '#243650' }}
      >
        <div className="container py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Archive size={18} className="text-amber-400" />
              </div>
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-black text-white"
                  style={{ fontFamily: 'Syne, Noto Sans JP, sans-serif' }}
                >
                  バックナンバー
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">過去の週次トレンドレポートを号数順に閲覧できます</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar size={12} />
                <span>{archiveIssues.length}号分のアーカイブ</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Tag size={12} />
                <span>2026年3月〜4月</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Archive List ── */}
      <main className="container py-8">
        <div className="space-y-4">
          {archiveIssues.map((issue, index) => (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              onMouseEnter={() => setHoveredId(issue.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                href={`/archive/${issue.id}`}
                className="block rounded-xl border overflow-hidden transition-all duration-200"
                style={{
                  borderColor: hoveredId === issue.id ? '#F5A62340' : '#243650',
                  background: hoveredId === issue.id ? '#1E3050' : '#1A2B42',
                  boxShadow: hoveredId === issue.id ? '0 4px 24px rgba(245,166,35,0.08)' : 'none',
                }}
              >
                  <div className="p-5">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        {/* Vol Number */}
                        <div
                          className="shrink-0 px-3 py-1 rounded-md text-sm font-black"
                          style={{
                            background: issue.isLatest ? '#F5A62320' : '#243650',
                            color: issue.isLatest ? '#F5A623' : '#94A3B8',
                            fontFamily: 'Bebas Neue, Syne, sans-serif',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {issue.issueNumber}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-base font-bold text-white"
                              style={{ fontFamily: 'Syne, Noto Sans JP, sans-serif' }}
                            >
                              {issue.weekLabel}
                            </span>
                            {issue.isLatest && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                最新号
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            発行日：{issue.publishedAt}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={18}
                        className="shrink-0 mt-1 transition-transform duration-200"
                        style={{
                          color: hoveredId === issue.id ? '#F5A623' : '#475569',
                          transform: hoveredId === issue.id ? 'translateX(3px)' : 'translateX(0)',
                        }}
                      />
                    </div>

                    {/* Editor Note */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-4 italic border-l-2 pl-3" style={{ borderColor: '#243650' }}>
                      {issue.editorNote}
                    </p>

                    {/* Keyword Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {issue.keywordTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: '#243650', color: '#94A3B8' }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Top 3 Trend Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {issue.topTrends.slice(0, 3).map((trend) => (
                        <div
                          key={trend.rank}
                          className="flex items-start gap-2 p-2.5 rounded-lg"
                          style={{ background: '#0F1B2D' }}
                        >
                          <span
                            className="text-xs font-black shrink-0 mt-0.5"
                            style={{ color: trend.categoryColor, fontFamily: 'Bebas Neue, Syne, sans-serif' }}
                          >
                            {String(trend.rank).padStart(2, '0')}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs text-slate-300 font-medium leading-snug line-clamp-2">
                              {trend.icon} {trend.title}
                            </p>
                            <span
                              className="text-xs mt-0.5 inline-block"
                              style={{ color: trend.categoryColor, opacity: 0.8 }}
                            >
                              {trend.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-10 pt-6 border-t text-center" style={{ borderColor: '#243650' }}>
          <p className="text-xs text-slate-600">
            アーカイブは毎週金曜日に更新されます。過去号のデータは参考情報としてご活用ください。
          </p>
        </div>
      </main>
    </div>
  );
}
