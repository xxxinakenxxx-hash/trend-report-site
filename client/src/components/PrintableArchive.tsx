// PrintableArchive.tsx
// Design: 印刷専用レイアウト — アーカイブ詳細ページ用
// @media print で表示される。画面上は非表示。

import type { ArchiveIssue } from '@/lib/archiveData';

interface PrintableArchiveProps {
  issue: ArchiveIssue;
}

export default function PrintableArchive({ issue }: PrintableArchiveProps) {
  const today = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="print-only">
      {/* ── 表紙ヘッダー ── */}
      <div className="print-header">
        <div className="print-header-left">
          <p className="print-label">社内配布資料 — 営業企画部（バックナンバー）</p>
          <h1 className="print-title">食品・スイーツ・パン・カフェ<br />週次トレンドレポート</h1>
          <p className="print-subtitle">{issue.weekLabel}（{issue.issueNumber}）</p>
        </div>
        <div className="print-header-right">
          <p className="print-meta">発行日：{issue.publishedAt}</p>
          <p className="print-meta">印刷日：{today}</p>
          <p className="print-meta">用途：顧客訪問・商品提案・フェア企画</p>
        </div>
      </div>

      <div className="print-divider" />

      {/* ── 編集後記 ── */}
      <div className="print-tip-box">
        <span className="print-tip-label">📝 編集後記</span>
        <p className="print-tip-text">{issue.editorNote}</p>
      </div>

      {/* ── キーワードタグ ── */}
      <div className="print-tags">
        <span className="print-col-title">今週のキーワード：</span>
        {issue.keywordTags.map((tag, i) => (
          <span key={tag} className="print-tag">
            #{tag}{i < issue.keywordTags.length - 1 ? '　' : ''}
          </span>
        ))}
      </div>

      {/* ── TOP5 トレンド ── */}
      <h2 className="print-section-title">今週の注目トレンドTOP5</h2>

      {issue.topTrends.map((trend) => (
        <div key={trend.rank} className="print-trend-card">
          <div className="print-trend-header">
            <span className="print-rank">{String(trend.rank).padStart(2, '0')}</span>
            <div className="print-trend-header-body">
              <span className="print-category">[{trend.category}]</span>
              <h3 className="print-trend-title">{trend.icon} {trend.title}</h3>
            </div>
            <div className="print-total-score">
              <span className="print-total-score-num">{trend.totalScore}</span>
              <span className="print-total-score-denom">/25</span>
            </div>
          </div>
          <p className="print-summary">{trend.summary}</p>
        </div>
      ))}

      {/* フッター */}
      <div className="print-footer">
        <p>本資料は公開Web情報のみを対象に作成しています。健康効果・医療効果・機能性については断定していません。</p>
        <p>アーカイブ号のデータはサマリー情報です。詳細な根拠URL・営業トーク例は最新号をご参照ください。</p>
        <p>© 2026 営業企画部 — 食品・スイーツ・パン・カフェ 週次トレンドレポート</p>
      </div>
    </div>
  );
}
