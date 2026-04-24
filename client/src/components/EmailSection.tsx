// EmailSection.tsx
// Design: Modern Dashboard — email draft with copy functionality

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Mail } from 'lucide-react';
import { emailContent } from '@/lib/trendData';

export default function EmailSection() {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopySubject = () => {
    navigator.clipboard.writeText(emailContent.subject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(emailContent.body);
    setCopiedBody(true);
    setTimeout(() => setCopiedBody(false), 2000);
  };

  const handleCopyAll = () => {
    const full = `件名：${emailContent.subject}\n\n${emailContent.body}`;
    navigator.clipboard.writeText(full);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      id="email"
      className="mt-12"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
          <Mail size={16} className="text-violet-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            社内配信用メール文案
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">TOP3に絞った A4 1枚以内の配信文。件名・本文をそれぞれコピーできます。</p>
        </div>
        <button
          onClick={handleCopyAll}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: copiedAll ? '#10B98122' : '#A78BFA22',
            color: copiedAll ? '#10B981' : '#A78BFA',
            border: `1px solid ${copiedAll ? '#10B98140' : '#A78BFA40'}`,
          }}
        >
          {copiedAll ? <Check size={14} /> : <Copy size={14} />}
          {copiedAll ? '全文コピー済み' : '全文コピー'}
        </button>
      </div>

      <div className="rounded-xl border border-[#243650] bg-[#1A2B42] overflow-hidden">
        {/* Subject Line */}
        <div className="border-b border-[#243650] p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">件名</span>
            <button
              onClick={handleCopySubject}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors"
              style={{
                background: copiedSubject ? '#10B98122' : '#A78BFA22',
                color: copiedSubject ? '#10B981' : '#A78BFA',
              }}
            >
              {copiedSubject ? <Check size={11} /> : <Copy size={11} />}
              {copiedSubject ? 'コピー済み' : 'コピー'}
            </button>
          </div>
          <p className="text-sm font-semibold text-white">{emailContent.subject}</p>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">本文</span>
            <button
              onClick={handleCopyBody}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors"
              style={{
                background: copiedBody ? '#10B98122' : '#A78BFA22',
                color: copiedBody ? '#10B981' : '#A78BFA',
              }}
            >
              {copiedBody ? <Check size={11} /> : <Copy size={11} />}
              {copiedBody ? 'コピー済み' : 'コピー'}
            </button>
          </div>
          <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
            {emailContent.body}
          </pre>
        </div>
      </div>
    </motion.section>
  );
}
