"use client";
import { useState } from 'react';
import type { Lang } from '@/lib/content';

export default function LangToggle({
  initial = 'ar',
  onChange,
}: {
  initial?: Lang;
  onChange?: (lang: Lang) => void;
}) {
  const [lang, setLang] = useState<Lang>(initial);
  return (
    <div className="inline-flex rounded-md border border-gray-300 overflow-hidden">
      {(['ar', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => {
            setLang(l);
            onChange?.(l);
          }}
          className={
            'px-3 py-1 text-sm font-medium ' +
            (lang === l ? 'bg-blue-600 text-white' : 'bg-white text-gray-700')
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
