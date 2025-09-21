export function slugifyHeading(text: string): string {
  const noTags = text.replace(/<[^>]+>/g, '');
  // Remove characters that can break attributes; keep letters, numbers, spaces, dashes, underscores
  const safe = noTags.replace(/["'<>`]/g, '');
  return safe
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
