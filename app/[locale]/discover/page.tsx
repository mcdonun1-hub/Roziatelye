import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { getLocalCategories, getLocalDesigns } from '@/data/marketplace';
import { DiscoverClient } from '@/features/discover/DiscoverClient';

interface Props {
  params: { locale: string };
  searchParams?: { category?: string };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!locales.includes(params.locale as Locale)) return {};
  return {
    title: params.locale === 'fa'
      ? 'کشف طراحی‌ها — رُزی آتلیه'
      : 'Discover designs — Rozi Atelier',
    description: params.locale === 'fa'
      ? 'طراحی‌های مستقل را بر اساس حال‌وهوا، هنرمند و سبک مرور کنید.'
      : 'Browse independent surface designs by mood, artist, and style.',
  };
}

export default function DiscoverPage({ params, searchParams }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const categories = getLocalCategories(locale);
  const requestedCategory = searchParams?.category ?? 'all';
  const initialCategory = requestedCategory === 'all' || categories.some((category) => category.slug === requestedCategory)
    ? requestedCategory
    : 'all';

  return (
    <DiscoverClient
      initialDesigns={getLocalDesigns(locale)}
      categories={categories}
      initialCategory={initialCategory}
    />
  );
}
