import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function getSlugs(): { slug: string; title?: string }[] {
  const dir = path.join(process.cwd(), 'content', 'kb');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  const slugs = new Map<string, string | undefined>();
  for (const f of files) {
    const m = f.match(/^(.+)\.(en|ar)\.md$/);
    if (m) {
      const slug = m[1];
      if (!slugs.has(slug) && f.endsWith('.en.md')) {
        // Try reading first H1 from EN file as title
        try {
          const raw = fs.readFileSync(path.join(dir, f), 'utf8');
          const t = (raw.match(/^#\s+(.+)$/m)?.[1] || '') as string;
          slugs.set(slug, t || undefined);
        } catch {
          slugs.set(slug, undefined);
        }
      } else if (!slugs.has(slug)) {
        slugs.set(slug, undefined);
      }
    }
  }
  return Array.from(slugs, ([slug, title]) => ({ slug, title }));
}

export default function KBIndexPage() {
  const items = getSlugs();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Knowledge Base Index</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ slug, title }) => (
            <Link
              key={slug}
              href={`/kb/${slug}`}
              className="block bg-white rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {title || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </h2>
              <p className="text-sm text-gray-600">/kb/{slug}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
