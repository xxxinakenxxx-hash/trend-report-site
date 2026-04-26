// PrintButton.tsx
// Design: Modern Dashboard × Premium Report
// 印刷ボタン — window.print() を呼び出すだけのシンプルなトリガー

import { Printer } from 'lucide-react';

interface PrintButtonProps {
  label?: string;
  className?: string;
}

export default function PrintButton({ label = '印刷 / PDF保存', className = '' }: PrintButtonProps) {
  return (
    <button
      onClick={() => window.print()}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 print:hidden ${className}`}
      style={{ background: '#243650', color: '#94A3B8', border: '1px solid #2E4A6A' }}
      title="ブラウザの印刷ダイアログを開きます。「PDFに保存」を選ぶとPDF出力できます。"
    >
      <Printer size={14} />
      {label}
    </button>
  );
}
