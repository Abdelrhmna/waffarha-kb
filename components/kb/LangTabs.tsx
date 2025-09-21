"use client";

import { useState, useMemo } from 'react';
import Markdown from './Markdown';

export type TocItem = { id: string; text: string; level: number };

export default function LangTabs({
  titleEn,
  titleAr,
  enMarkdown,
  arMarkdown,
  tocEn,
  tocAr,
}: {
  titleEn: string;
  titleAr: string;
  enMarkdown: string;
  arMarkdown: string;
  tocEn: TocItem[];
  tocAr: TocItem[];
}) {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const toc = useMemo(() => (lang === 'en' ? tocEn : tocAr), [lang, tocEn, tocAr]);

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Sidebar TOC */}
      <aside className="md:col-span-3">
        <div className="bg-white rounded-lg shadow p-4 md:sticky md:top-24">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Contents</span>
            <div className="inline-flex rounded-md border border-gray-200 overflow-hidden">
              <button
                className={`px-3 py-1 text-sm ${lang === 'en' ? 'bg-gray-100 font-semibold' : 'bg-white'}`}
                onClick={() => setLang('en')}
              >
                English
              </button>
              <button
                className={`px-3 py-1 text-sm ${lang === 'ar' ? 'bg-gray-100 font-semibold' : 'bg-white'}`}
                onClick={() => setLang('ar')}
              >
                العربية
              </button>
            </div>
          </div>
          <nav className="text-sm">
            <ul className="space-y-1">
              {toc.map((h) => (
                <li key={h.id} className={h.level > 2 ? 'ml-3' : ''}>
                  <a
                    href={`#${h.id}`}
                    className="block text-gray-700 hover:text-primary-700 hover:underline truncate"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
              {toc.length === 0 && (
                <li className="text-gray-400">No headings</li>
              )}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <section className="md:col-span-9">
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-100 px-4 pt-4 md:px-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {lang === 'en' ? titleEn : titleAr}
              </h1>
              <div className="md:hidden ml-4">
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={lang}
                  onChange={(e) => setLang(e.target.value as 'en' | 'ar')}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 mt-2">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-gray-100 font-medium' : ''}`}
              >
                English
              </button>
              <span>•</span>
              <button
                onClick={() => setLang('ar')}
                className={`px-2 py-1 rounded ${lang === 'ar' ? 'bg-gray-100 font-medium' : ''}`}
              >
                العربية
              </button>
            </div>
          </div>

        <div className="px-4 md:px-6 py-6">
            {lang === 'en' ? (
              <Markdown content={enMarkdown} />
            ) : (
              <Markdown content={arMarkdown} rtl />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
