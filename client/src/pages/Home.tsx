// Home.tsx
// Design: Modern Dashboard × Premium Report
// Theme: Deep Navy (#0F1B2D) + Gold Amber (#F5A623) + Emerald Green (#10B981)
// Font: Syne (headings) + Noto Sans JP (body) + Bebas Neue (numbers)

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { TrendingUp, ChevronRight, Archive, Filter } from 'lucide-react';
import { trends } from '@/lib/trendData';
import TrendCard from '@/components/TrendCard';
import ScoreMatrix from '@/components/ScoreMatrix';
import EmailSection from '@/components/EmailSection';
import PrintButton from '@/components/PrintButton';
import PrintableReport from '@/components/PrintableReport';
import PrintFilterDialog from '@/components/PrintFilterDialog';
import PrintableReportFiltered from '@/components/PrintableReportFiltered';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663293176239/eAWmuhhSB9A3wxsnzBFKCG/hero_banner-c3KmhiQN3242xasUbUL3Eu.webp';

const NAV_ITEMS = [
  { label: 'TOP5 トレンド', href: '#trends' },
  { label: '評価マトリクス', href: '#matrix' },
  { label: 'メール文案', href: '#email' },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState('');
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [printCategories, setPrintCategories] = useState<string[]>([]);
  const printRef = useRef<HTMLDivElement>(null);

  // カテゴリ選択後に印刷を実行する
  const handleFilterPrint = useCallback((selected: string[]) => {
    setPrintCategories(selected);
    setShowPrintDialog(false);
    // DOM更新を待ってから印刷ダイアログを開く
    setTimeout(() => {
      window.print();
    }, 80);
  }, []);

  const handleNavClick = (href: string) => {
    setActiveNav(href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
          <div className="hidden sm:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                style={{
                  color: activeNav === item.href ? '#F5A623' : '#94A3B8',
                  background: activeNav === item.href ? '#F5A62318' : 'transparent',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/archive"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors px-3 py-1.5 rounded-md hover:bg-amber-500/10"
            >
              <Archive size={13} />
              バックナンバー
            </Link>
            <span className="text-xs text-slate-600 hidden sm:block">2026年4月第4週号</span>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, rgba(15,27,45,0.6) 0%, rgba(15,27,45,0.85) 60%, #0F1B2D 100%), url(${HERO_BG}) center/cover no-repeat`,
          minHeight: '320px',
        }}
      >
        <div className="container py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                営業企画部 発行
              </span>
              <span className="text-xs text-slate-500">2026年4月24日</span>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-3"
              style={{ fontFamily: 'Syne, Noto Sans JP, sans-serif' }}
            >
              食品・スイーツ・パン・カフェ
              <br />
              <span style={{ color: '#F5A623' }}>週次トレンドレポート</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              製菓製パン・外食カフェ向け業務用卸の営業担当者が、顧客との会話・商品提案・フェア企画に使えるよう、
              直近1か月の公開Web情報から厳選した今週の注目トレンドTOP5をまとめています。
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={() => handleNavClick('#trends')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#F5A623', color: '#0F1B2D' }}
              >
                TOP5を見る <ChevronRight size={14} />
              </button>
              <button
                onClick={() => handleNavClick('#email')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={{ background: '#10B98122', color: '#10B981', border: '1px solid #10B98140' }}
              >
                メール文案をコピー
              </button>
              <PrintButton />
              <button
                onClick={() => setShowPrintDialog(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
                style={{ background: '#10B98122', color: '#10B981', border: '1px solid #10B98140' }}
              >
                <Filter size={13} />
                絞り込み印刷
              </button>
            </div>
          </motion.div>
        </div>

        {/* Decorative bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to bottom, transparent, #0F1B2D)' }}
        />
      </section>

      {/* ── Quick Tip Banner ── */}
      <div style={{ background: '#162236', borderTop: '1px solid #243650', borderBottom: '1px solid #243650' }}>
        <div className="container py-3">
          <p className="text-sm text-center">
            <span className="text-amber-400 font-bold mr-2">💡 今週の営業で使える一言</span>
            <span className="text-slate-300">
              「今年のスイーツは『味』だけでなく、『バリむに』や『とろ生』といった
              <strong className="text-white">複雑な食感（オノマトペ）</strong>をどう作るかが、SNSでバズる最大のポイントです！」
            </span>
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="container py-10">

        {/* TOP5 Trends */}
        <section id="trends">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <TrendingUp size={16} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                今週の注目トレンドTOP5
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">各トレンドをクリックして詳細・営業ツールを展開できます</p>
            </div>
          </div>

          <div className="space-y-4">
            {trends.map((trend, index) => (
              <TrendCard key={trend.id} trend={trend} index={index} />
            ))}
          </div>
        </section>

        {/* Score Matrix */}
        <ScoreMatrix />

        {/* Email Section */}
        <EmailSection />

        {/* Print CTA */}
        <div className="mt-12 p-4 rounded-xl border" style={{ background: '#162236', borderColor: '#243650' }}>
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <p className="text-sm font-semibold text-slate-300">訪問先でも活用できます</p>
              <p className="text-xs text-slate-500 mt-0.5">印刷またはPDF保存して、顧客訪問・商品提案・フェア企画の資料としてご活用ください</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PrintButton label="全トレンドを印刷" />
            <button
              onClick={() => setShowPrintDialog(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: '#10B98118', color: '#10B981', border: '1px solid #10B98140' }}
            >
              <Filter size={13} />
              カテゴリを選んで印刷
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#243650] text-center">
          <p className="text-xs text-slate-600">
            本レポートは公開Web情報のみを対象に作成しています。健康効果・医療効果・機能性については断定していません。
            <br />
            情報の正確性は調査時点のものであり、最新情報は各根拠URLよりご確認ください。
          </p>
          <p className="text-xs text-slate-700 mt-2">
            © 2026 営業企画部 — 食品・スイーツ・パン・カフェ 週次トレンドレポート
          </p>
        </footer>
      </main>

      {/* 印刷専用レイアウト — 全トレンド版（window.print()直接呼び出し時に使用） */}
      {printCategories.length === 0 && <PrintableReport />}

      {/* 印刷専用レイアウト — カテゴリフィルター版（絞り込み印刷時に使用） */}
      {printCategories.length > 0 && (
        <PrintableReportFiltered selectedCategories={printCategories} />
      )}

      {/* カテゴリ絞り込み印刷ダイアログ */}
      <AnimatePresence>
        {showPrintDialog && (
          <PrintFilterDialog
            onClose={() => setShowPrintDialog(false)}
            onPrint={handleFilterPrint}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
