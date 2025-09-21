export type Lang = 'en' | 'ar';

export type KBSection = {
  id: string;
  heading_en: string;
  heading_ar: string;
  body_en: string;
  body_ar: string;
};

export type KBEntry = {
  slug: string;
  title_en: string;
  title_ar: string;
  description_en?: string;
  description_ar?: string;
  sections: KBSection[];
};

export const kbContent: KBEntry[] = [
  {
    slug: 'home',
    title_en: 'Waffarha Knowledge Base',
    title_ar: 'قاعدة معرفة وفرها',
    description_en: 'Centralized documentation for Waffarha operations and best practices.',
    description_ar: 'توثيق مركزي لعمليات وفرها وأفضل الممارسات.',
    sections: [
      {
        id: 'intro',
        heading_en: 'Introduction',
        heading_ar: 'مقدمة',
        body_en: 'Paste your English introduction from Google Sites here.',
        body_ar: 'الصق المقدمة العربية من Google Sites هنا.',
      },
      {
        id: 'getting-started',
        heading_en: 'Getting Started',
        heading_ar: 'البدء',
        body_en: 'Steps, roles, and responsibilities in English.',
        body_ar: 'الخطوات والأدوار والمسؤوليات باللغة العربية.',
      },
    ],
  },
];

export function getKB(slug: string): KBEntry | undefined {
  return kbContent.find((k) => k.slug === slug);
}
