export const categoryTranslations: Record<string, string> = {
  careers: 'Karriär',
  news: 'Nyheter',
  service: 'Service',
  api: 'API',
  templates: 'Mallar',
  tools: 'Verktyg',
} as const;

// Consistent sorting across components
export const categoryOrder: string[] = [
  'service',
  'api',
  'careers',
  'templates',
  'news',
  'tools',
];
