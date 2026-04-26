// ArchiveDetail.tsx
// Design: Modern Dashboard × Premium Report
// アーカイブ詳細ページ — 特定の号のトレンドTOP5を詳細表示

import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { TrendingUp, ArrowLeft, Calendar, Tag, Archive, ExternalLink } from 'lucide-react';
import { getIssueById, archiveIssues } from '@/lib/archiveData';
import type { ArchiveTrendSummary } from '@/lib/archiveData';
import PrintButton from '@/components/PrintButton';
import PrintableArchive from '@/components/PrintableArchive';

// スコアのドット表示（詳細データがないため総合スコアからの推定表示）
function ScoreDots({ score, color }: { score: number; color: string }) {
  const filled = Math.round((score / 25) * 5);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i <= filled ? color : '#243650' }}
        />
      ))}
    </div>
  );
}

function TrendRow({ trend, index }: { trend: ArchiveTrendSummary; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="flex items-start gap-4 p-4 rounded-xl border"
      style={{ background: '#1A2B42', borderColor: '#243650' }}
    >
      {/* Rank */}
      <div
        className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl font-black"
        style={{
          background: `${trend.categoryColor}18`,
          color: trend.categoryColor,
          fontFamily: 'Bebas Neue, Syne, sans-serif',
        }}
      >
        {String(trend.rank).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${trend.categoryColor}22`, color: trend.categoryColor }}
          >
            {trend.category}
          </span>
          <ScoreDots score={trend.totalScore} color={trend.categoryColor} />
          <span className="text-xs text-slate-600">総合 {trend.totalScore}/25</span>
        </div>
        <h3
          className="text-sm font-bold text-white leading-snug mb-1.5"
          style={{ fontFamily: 'Syne, Noto Sans JP, sans-serif' }}
        >
          {trend.icon} {trend.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">{trend.summary}</p>
      </div>

      {/* Score Badge */}
      <div
        className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-black border-2"
        style={{
          borderColor: trend.categoryColor,
          color: trend.categoryColor,
          fontFamily: 'Bebas Neue, Syne, sans-serif',
        }}
      >
        {trend.totalScore}
      </div>
    </motion.div>
  );
}

export default function ArchiveDetailPage() {
  const params = useParams<{ id: string }>();
  const issue = getIssueById(params.id);

  if (!issue) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F1B2D' }}>
        <div className="text-center">
          <p className="text-slate-400 mb-4">該当する号が見つかりませんでした。</p>
          <Link
            href="/archive"
            className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1.5 justify-center"
          >
            <ArrowLeft size={14} /> アーカイブ一覧へ戻る
          </Link>
        </div>
      </div>
    );
  }

  // 前後の号を取得
  const currentIndex = archiveIssues.findIndex((i) => i.id === issue.id);
  const prevIssue = archiveIssues[currentIndex + 1] ?? null;
  const nextIssue = archiveIssues[currentIndex - 1] ?? null;

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
            href="/archive"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-md hover:bg-amber-500/10"
          >
            <Archive size={13} />
            バックナンバー一覧
          </Link>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <div
        className="border-b"
        style={{ background: 'linear-gradient(135deg, #162236 0%, #0F1B2D 100%)', borderColor: '#243650' }}
      >
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <Link href="/" className="hover:text-amber-400 transition-colors">最新号</Link>
              <span>/</span>
              <Link href="/archive" className="hover:text-amber-400 transition-colors">バックナンバー</Link>
              <span>/</span>
              <span className="text-slate-400">{issue.weekLabel}</span>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="shrink-0 px-4 py-2 rounded-lg text-2xl font-black"
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
                <div className="flex items-center gap-2 flex-wrap">
                  <h1
                    className="text-2xl sm:text-3xl font-black text-white"
                    style={{ fontFamily: 'Syne, Noto Sans JP, sans-serif' }}
                  >
                    {issue.weekLabel}
                  </h1>
                  {issue.isLatest && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      最新号
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={11} />
                    <span>発行日：{issue.publishedAt}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Note */}
            <div
              className="mt-4 p-3 rounded-lg border-l-4 text-sm text-slate-300 italic"
              style={{ background: '#F5A62308', borderColor: '#F5A62340' }}
            >
              {issue.editorNote}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {issue.keywordTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                  style={{ background: '#243650', color: '#94A3B8' }}
                >
                  <Tag size={9} />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Trend List ── */}
      <main className="container py-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <TrendingUp size={16} className="text-amber-400" />
          </div>
          <h2
            className="text-lg font-bold text-white"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            今週の注目トレンドTOP5
          </h2>
        </div>

        <div className="space-y-3 mb-8">
          {issue.topTrends.map((trend, index) => (
            <TrendRow key={trend.rank} trend={trend} index={index} />
          ))}
        </div>

        {/* Print CTA */}
        <div
          className="mb-6 p-4 rounded-xl border flex items-center justify-between gap-4"
          style={{ background: '#162236', borderColor: '#243650' }}
        >
          <div>
            <p className="text-sm font-semibold text-slate-300">訪問先でも活用できます</p>
            <p className="text-xs text-slate-500 mt-0.5">印刷またはPDF保存して、顧客訪問・商品提案の資料としてご活用ください</p>
          </div>
          <PrintButton label="印刷 / PDF保存" />
        </div>

        {/* Latest Issue CTA */}
        {!issue.isLatest && (
          <div
            className="p-4 rounded-xl border flex items-center justify-between gap-4"
            style={{ background: '#F5A62308', borderColor: '#F5A62330' }}
          >
            <div>
              <p className="text-sm font-semibold text-amber-400">最新号を確認する</p>
              <p className="text-xs text-slate-500 mt-0.5">
                最新のトレンド情報・営業トーク例・メール文案はこちら
              </p>
            </div>
            <Link
              href="/"
              className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ background: '#F5A623', color: '#0F1B2D' }}
            >
              最新号へ <ExternalLink size={12} />
            </Link>
          </div>
        )}

        {/* Prev / Next Navigation */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {prevIssue ? (
            <Link
              href={`/archive/${prevIssue.id}`}
              className="p-3 rounded-xl border text-left transition-all hover:border-amber-500/30 hover:bg-amber-500/5"
              style={{ background: '#1A2B42', borderColor: '#243650' }}
            >
              <p className="text-xs text-slate-500 mb-1">← 前の号</p>
              <p className="text-sm font-semibold text-slate-300">{prevIssue.weekLabel}</p>
              <p className="text-xs text-slate-600 mt-0.5">{prevIssue.issueNumber}</p>
            </Link>
          ) : (
            <div />
          )}
          {nextIssue ? (
            <Link
              href={`/archive/${nextIssue.id}`}
              className="p-3 rounded-xl border text-right transition-all hover:border-amber-500/30 hover:bg-amber-500/5"
              style={{ background: '#1A2B42', borderColor: '#243650' }}
            >
              <p className="text-xs text-slate-500 mb-1">次の号 →</p>
              <p className="text-sm font-semibold text-slate-300">{nextIssue.weekLabel}</p>
              <p className="text-xs text-slate-600 mt-0.5">{nextIssue.issueNumber}</p>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t text-center" style={{ borderColor: '#243650' }}>
          <p className="text-xs text-slate-600">
            アーカイブ号のデータはサマリー情報です。詳細な根拠URL・営業トーク例は最新号をご参照ください。
          </p>
        </div>
      </main>

      {/* 印刷専用レイアウト（画面上は非表示、@media print で表示） */}
      <PrintableArchive issue={issue} />
    </div>
  );
}
