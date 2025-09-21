import { marked } from 'marked';

export default function Markdown({ content, rtl = false }: { content: string; rtl?: boolean }) {
  const html = marked.parse(content || '') as string;
  return (
    <div
      className={(rtl ? 'text-right' : '') + ' prose max-w-none'}
      dir={rtl ? 'rtl' : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
