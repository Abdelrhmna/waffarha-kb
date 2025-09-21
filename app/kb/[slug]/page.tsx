import fs from 'fs';
import path from 'path';
import Markdown from '../../../components/kb/Markdown';
import LangTabs, { type TocItem } from '../../../components/kb/LangTabs';
import { getKB, type KBSection } from '../../../lib/content';
import { slugifyHeading } from '../../../components/kb/slug';

export default function KBPage({ params }: { params: { slug: string } }) {
  // Try markdown-based content first
  const contentDir = path.join(process.cwd(), 'content', 'kb');
  const enPath = path.join(contentDir, `${params.slug}.en.md`);
  const arPath = path.join(contentDir, `${params.slug}.ar.md`);
  const hasEn = fs.existsSync(enPath);
  const hasAr = fs.existsSync(arPath);

  if (hasEn || hasAr) {
    const enRaw = hasEn ? fs.readFileSync(enPath, 'utf8') : '';
    const arRaw = hasAr ? fs.readFileSync(arPath, 'utf8') : '';
    const titleEn = extractTitle(enRaw) || 'Knowledge Base';
    const titleAr = extractTitle(arRaw) || 'قاعدة المعرفة';

    const enBody = stripTitle(enRaw);
    const arBody = stripTitle(arRaw);

    const tocEn = buildToc(enBody);
    const tocAr = buildToc(arBody);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <LangTabs
            titleEn={titleEn}
            titleAr={titleAr}
            enMarkdown={enBody}
            arMarkdown={arBody}
            tocEn={tocEn}
            tocAr={tocAr}
          />
        </div>
      </div>
    );
  }

  // Fallback to code-based content store
  const entry = getKB(params.slug);
  if (!entry) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">Not Found</h1>
        <p className="text-gray-600">No knowledge base entry for this slug.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{entry.title_en}</h1>
          <div className="opacity-70 text-lg">{entry.title_ar}</div>
        </div>

        {entry.description_en && (
          <p className="text-gray-700 mb-2">{entry.description_en}</p>
        )}
        {entry.description_ar && (
          <p className="text-gray-600 mb-6">{entry.description_ar}</p>
        )}

        <div className="space-y-8">
          {entry.sections.map((s: KBSection) => (
            <div key={s.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{s.heading_en}</h2>
                <div className="text-gray-500">{s.heading_ar}</div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="prose max-w-none">
                  <p>{s.body_en}</p>
                </div>
                <div className="prose max-w-none text-right" dir="rtl">
                  <p>{s.body_ar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function extractTitle(md: string): string | undefined {
  const m = md.match(/^#\s+(.+)$/m);
  return m?.[1]?.trim();
}

function stripTitle(md: string): string {
  return md.replace(/^#\s+.+\n?/, '').trim();
}

function buildToc(md: string): TocItem[] {
  const lines = md.split(/\n+/);
  const toc: TocItem[] = [];
  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)/);
    if (m) {
      const level = m[1].length; // 1..3
      const text = m[2].trim();
      const id = slugifyHeading(text);
      toc.push({ id, text, level });
    }
  }
  return toc;
}
