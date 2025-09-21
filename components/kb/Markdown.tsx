import { marked } from 'marked';
import { slugifyHeading } from './slug';

export default function Markdown({ content, rtl = false }: { content: string; rtl?: boolean }) {
  const raw = marked.parse(content || '') as string;
  // Inject IDs into headings for anchor links and TOC targets
  const html = raw.replace(/<h([1-6])>([^<]+)<\/h\1>/g, (_m, level, inner) => {
    const id = slugifyHeading(String(inner));
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  const base = 'prose max-w-none prose-headings:scroll-mt-24 prose-a:text-primary-700 hover:prose-a:underline prose-pre:bg-gray-900 prose-code:text-gray-800';
  const rtlClass = rtl ? ' text-right prose-ul:pl-0 prose-ol:pl-0' : '';
  return (
    <div
      className={base + rtlClass}
      dir={rtl ? 'rtl' : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
