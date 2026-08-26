import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { getLocalDesigns } from '@/data/marketplace';
import { FavoritesClient } from '@/features/favorites/FavoritesClient';

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!locales.includes(params.locale as Locale)) return {};
  return {
    title: params.locale === 'fa'
      ? 'علاقه‌مندی‌ها — رُزی آتلیه'
      : 'Favorites — Rozi Atelier',
  };
}

export default function FavoritesPage({ params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  return <FavoritesClient designs={getLocalDesigns(locale)} />;
}
