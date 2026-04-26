// PrintFilterDialog.tsx
// Design: Modern Dashboard × Premium Report
// カテゴリ絞り込み印刷ダイアログ
// ユーザーがカテゴリを選択 → 選択したカテゴリのトレンドのみを印刷用DOMに反映 → window.print()

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Printer, X, CheckSquare, Square, ChevronRight, Filter } from 'lucide-react';
import { trends } from '@/lib/trendData';

// ── カテゴリ定義（trendData から自動抽出 + 色マッピング） ──
const ALL_CATEGORIES = Array.from(
  new Map(trends.map((t) => [t.category, t.categoryColor])).entries()
).map(([name, color]) => ({ name, color }));

// カテゴリアイコン
const CATEGORY_ICONS: Record<string, string> = {
  'スイーツ・洋菓子': '🍵',
  'パン・ベーカリー': '🍞',
  '冷凍食品・冷凍スイーツ': '❄️',
  'カフェメニュー': '☕',
  '健康志向・高付加価値食品': '🌿',
};

// カテゴリ説明文
const CATEGORY_DESC: Record<string, string> = {
  'スイーツ・洋菓子': 'ケーキ・和洋菓子・チョコレート系の顧客向け',
  'パン・ベーカリー': 'ベーカリー・パン専門店・ホテルブレッド向け',
  '冷凍食品・冷凍スイーツ': '冷凍生地・冷凍デザート導入検討先向け',
  'カフェメニュー': 'カフェ・ドリンクショップ・喫茶店向け',
  '健康志向・高付加価値食品': '健康食品・機能性食品・高付加価値路線向け',
};

interface PrintFilterDialogProps {
  /** ダイアログを閉じるコールバック */
  onClose: () => void;
  /** 選択されたカテゴリでフィルタリングして印刷するコールバック */
  onPrint: (selectedCategories: string[]) => void;
}

export default function PrintFilterDialog({ onClose, onPrint }: PrintFilterDialogProps) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(ALL_CATEGORIES.map((c) => c.name))
  );

  const toggle = useCallback((name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const selectAll = () => setSelected(new Set(ALL_CATEGORIES.map((c) => c.name)));
  const clearAll = () => setSelected(new Set());

  const selectedCount = selected.size;
  const filteredTrends = trends.filter((t) => selected.has(t.category));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl border overflow-hidden"
        style={{ background: '#1A2B42', borderColor: '#2E4A6A' }}
      >
        {/* ── ヘッダー ── */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: '#243650' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Filter size={15} className="text-amber-400" />
            </div>
            <div>
              <h2
                className="text-sm font-bold text-white"
                style={{ fontFamily: 'Syne, Noto Sans JP, sans-serif' }}
              >
                カテゴリを選んで印刷
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                印刷したいカテゴリを選択してください
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-slate-700 transition-colors"
          >
            <X size={14} className="text-slate-400" />
          </button>
        </div>

        {/* ── カテゴリ選択リスト ── */}
        <div className="px-5 py-4 space-y-2">
          {/* 全選択 / 全解除 */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={selectAll}
              className="text-xs px-3 py-1 rounded-md transition-colors hover:bg-amber-500/10"
              style={{ color: '#F5A623', border: '1px solid #F5A62330' }}
            >
              すべて選択
            </button>
            <button
              onClick={clearAll}
              className="text-xs px-3 py-1 rounded-md transition-colors hover:bg-slate-700"
              style={{ color: '#94A3B8', border: '1px solid #243650' }}
            >
              すべて解除
            </button>
            <span className="ml-auto text-xs text-slate-500">
              {selectedCount}/{ALL_CATEGORIES.length} カテゴリ選択中
            </span>
          </div>

          {ALL_CATEGORIES.map((cat) => {
            const isChecked = selected.has(cat.name);
            const count = trends.filter((t) => t.category === cat.name).length;
            return (
              <button
                key={cat.name}
                onClick={() => toggle(cat.name)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                style={{
                  background: isChecked ? `${cat.color}12` : '#0F1B2D',
                  border: `1px solid ${isChecked ? cat.color + '40' : '#243650'}`,
                }}
              >
                {/* チェックボックス */}
                <div style={{ color: isChecked ? cat.color : '#475569' }}>
                  {isChecked
                    ? <CheckSquare size={16} />
                    : <Square size={16} />
                  }
                </div>

                {/* アイコン */}
                <span className="text-lg leading-none">
                  {CATEGORY_ICONS[cat.name] ?? '📌'}
                </span>

                {/* テキスト */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-semibold leading-tight"
                    style={{ color: isChecked ? '#F1F5F9' : '#64748B' }}
                  >
                    {cat.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: isChecked ? '#94A3B8' : '#475569' }}>
                    {CATEGORY_DESC[cat.name] ?? ''}
                  </p>
                </div>

                {/* 件数バッジ */}
                <span
                  className="shrink-0 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: isChecked ? `${cat.color}22` : '#243650',
                    color: isChecked ? cat.color : '#475569',
                  }}
                >
                  {count}件
                </span>
              </button>
            );
          })}
        </div>

        {/* ── プレビュー情報 ── */}
        <div
          className="mx-5 mb-4 px-3 py-2.5 rounded-lg text-xs"
          style={{ background: '#0F1B2D', border: '1px solid #243650' }}
        >
          {selectedCount === 0 ? (
            <p className="text-slate-500">カテゴリを1つ以上選択してください</p>
          ) : (
            <div className="flex items-center gap-2">
              <Printer size={12} className="text-slate-500 shrink-0" />
              <span className="text-slate-400">
                <strong className="text-white">{filteredTrends.length}件</strong>のトレンドを印刷します
                {filteredTrends.length > 0 && (
                  <span className="text-slate-600 ml-1">
                    （{filteredTrends.map((t) => `${String(t.id).padStart(2, '0')} ${t.shortTitle}`).join('、')}）
                  </span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* ── フッターボタン ── */}
        <div
          className="flex items-center gap-3 px-5 py-4 border-t"
          style={{ borderColor: '#243650' }}
        >
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-700"
            style={{ background: '#243650', color: '#94A3B8' }}
          >
            キャンセル
          </button>
          <button
            onClick={() => {
              if (selectedCount > 0) onPrint(Array.from(selected));
            }}
            disabled={selectedCount === 0}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all"
            style={{
              background: selectedCount > 0 ? '#F5A623' : '#243650',
              color: selectedCount > 0 ? '#0F1B2D' : '#475569',
              cursor: selectedCount > 0 ? 'pointer' : 'not-allowed',
            }}
          >
            <Printer size={14} />
            印刷 / PDF保存
            <ChevronRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
