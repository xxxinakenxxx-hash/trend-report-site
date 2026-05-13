// PrintableReportFiltered.tsx
// Design: 印刷専用レイアウト — カテゴリフィルター対応版
// selectedCategories で絞り込んだトレンドのみを印刷する
// @media print で表示。画面上は非表示。

import { trends, emailContent, scoreLabels } from '@/lib/trendData';
import { getLatestIssue } from '@/lib/archiveData';

interface PrintableReportFilteredProps {
  selectedCategories: string[];
}

// カテゴリ → 顧客タイプの説明文
const CUSTOMER_LABEL: Record<string, string> = {
  'スイーツ・洋菓子': 'スイーツ・洋菓子店向け',
  'パン・ベーカリー': 'ベーカリー・パン専門店向け',
  '冷凍食品・冷凍スイーツ': '冷凍食品導入検討先向け',
  'カフェメニュー': 'カフェ・ドリンクショップ向け',
  '健康志向・高付加価値食品': '健康・高付加価値食品向け',
};

function ScoreRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="print-score-row">
      <span className="print-score-label">{label}</span>
      <div className="print-score-bar-wrap">
        <div className="print-score-bar" style={{ width: `${(value / 5) * 100}%` }} />
      </div>
      <span className="print-score-num">{value}/5</span>
    </div>
  );
}

export default function PrintableReportFiltered({ selectedCategories }: PrintableReportFilteredProps) {
  const latestIssue = getLatestIssue();
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const filtered = trends.filter((t) => selectedCategories.includes(t.category));
  const isAllCategories = selectedCategories.length >= 5;

  // カテゴリラベル（絞り込み時は対象カテゴリ名を列挙）
  const categoryLabel = isAllCategories
    ? '全カテゴリ'
    : selectedCategories.map((c) => CUSTOMER_LABEL[c] ?? c).join(' / ');

  return (
    <div className="print-only">
      {/* ── 表紙ヘッダー ── */}
      <div className="print-header">
        <div className="print-header-left">
          <p className="print-label">社内配布資料 — 営業企画部</p>
          <h1 className="print-title">食品・スイーツ・パン・カフェ<br />週次トレンドレポート</h1>
          <p className="print-subtitle">{latestIssue.weekLabel}号（{latestIssue.issueNumber}）</p>
        </div>
        <div className="print-header-right">
          <p className="print-meta">発行日：{latestIssue.publishedAt}</p>
          <p className="print-meta">印刷日：{today}</p>
          <p className="print-meta">対象：{categoryLabel}</p>
          <p className="print-meta">用途：顧客訪問・商品提案・フェア企画</p>
        </div>
      </div>

      {/* カテゴリ絞り込みバナー（全カテゴリ以外の場合のみ表示） */}
      {!isAllCategories && (
        <div className="print-filter-banner">
          <span className="print-filter-label">▶ 絞り込み印刷：</span>
          <span className="print-filter-cats">
            {selectedCategories.join('　/　')}
          </span>
          <span className="print-filter-count">
            （全{trends.length}件中 {filtered.length}件を掲載）
          </span>
        </div>
      )}

      <div className="print-divider" />

      {/* ── 今週の一言 ── */}
      <div className="print-tip-box">
        <span className="print-tip-label">💡 今週の営業で使える一言</span>
        <p className="print-tip-text">
          「今週は国産メロン・チョコミント・宇治抹茶氷を軸に、
          <strong>果実感・冷感・食感</strong>を組み合わせた初夏フェア提案が有効です」
        </p>
      </div>

      {/* ── フィルター済みトレンド ── */}
      <h2 className="print-section-title">
        今週の注目トレンド
        {!isAllCategories && `（${selectedCategories.join(' / ')}）`}
        — {filtered.length}件
      </h2>

      {filtered.length === 0 ? (
        <p style={{ fontSize: '9pt', color: '#888', padding: '12pt 0' }}>
          選択されたカテゴリに該当するトレンドがありません。
        </p>
      ) : (
        filtered.map((trend) => (
          <div key={trend.id} className="print-trend-card">
            {/* カードヘッダー */}
            <div className="print-trend-header">
              <span className="print-rank">{String(trend.id).padStart(2, '0')}</span>
              <div className="print-trend-header-body">
                <span className="print-category">[{trend.category}]</span>
                <h3 className="print-trend-title">{trend.icon} {trend.title}</h3>
              </div>
              <div className="print-total-score">
                <span className="print-total-score-num">{trend.totalScore}</span>
                <span className="print-total-score-denom">/25</span>
              </div>
            </div>

            {/* サマリー */}
            <p className="print-summary">{trend.summary}</p>

            {/* 2カラム: スコア + 詳細 */}
            <div className="print-two-col">
              <div className="print-scores">
                <p className="print-col-title">評価スコア</p>
                {scoreLabels.map((key) => (
                  <ScoreRow key={key} label={key} value={trend.scores[key]} />
                ))}
              </div>
              <div className="print-detail">
                <p className="print-col-title">話題化の背景</p>
                <p className="print-body-text">{trend.background}</p>
                <p className="print-col-title" style={{ marginTop: '6pt' }}>営業で使える切り口</p>
                <p className="print-body-text">{trend.salesAngle}</p>
              </div>
            </div>

            {/* 関連商品・提案先 */}
            <div className="print-two-col" style={{ marginTop: '6pt' }}>
              <div>
                <p className="print-col-title">関連商品カテゴリ</p>
                <ul className="print-list">
                  {trend.products.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div>
                <p className="print-col-title">提案先候補</p>
                <ul className="print-list">
                  {trend.targets.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>

            {/* 営業トーク例 */}
            <div className="print-talk-box">
              <p className="print-col-title">営業トーク例</p>
              <p className="print-talk-text">{trend.talkExample}</p>
            </div>

            {/* 注意点 */}
            <div className="print-caution-box">
              <span className="print-caution-label">⚠ 注意点：</span>
              <span className="print-caution-text">{trend.caution}</span>
            </div>

            {/* 根拠URL */}
            <div className="print-sources">
              <span className="print-col-title">根拠URL：</span>
              {trend.sources.map((s, i) => (
                <span key={i} className="print-source-item">
                  {s.url}{i < trend.sources.length - 1 ? '　' : ''}
                </span>
              ))}
            </div>
          </div>
        ))
      )}

      {/* ── メール文案（全カテゴリ選択時のみ掲載） ── */}
      {isAllCategories && (
        <>
          <div className="print-page-break" />
          <h2 className="print-section-title">社内配信用メール文案（TOP3）</h2>
          <div className="print-email-box">
            <p className="print-email-subject">件名：{emailContent.subject}</p>
            <div className="print-email-divider" />
            <pre className="print-email-body">{emailContent.body}</pre>
          </div>
        </>
      )}

      {/* フッター */}
      <div className="print-footer">
        <p>本資料は公開Web情報のみを対象に作成しています。健康効果・医療効果・機能性については断定していません。</p>
        <p>情報の正確性は調査時点のものです。最新情報は各根拠URLよりご確認ください。</p>
        <p>© 2026 営業企画部 — 食品・スイーツ・パン・カフェ 週次トレンドレポート</p>
      </div>
    </div>
  );
}
