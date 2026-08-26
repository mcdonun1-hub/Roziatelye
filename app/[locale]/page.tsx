import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { getLocalCategories, getLocalFeaturedDesigns } from '@/data/marketplace';
import { HomePageClient } from '@/features/home/HomePageClient';

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!locales.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;

  return {
    title: locale === 'fa'
      ? 'رُزی آتلیه — طراحی مستقل، با نگاه انسانی'
      : 'Rozi Atelier — Independent design, made personal',
    description: locale === 'fa'
      ? 'مجموعه‌ای سنجیده از الگوها و آثار طراحان مستقل؛ برای کشف، الهام و ساختن فضاهای شخصی.'
      : 'A considered collection of patterns and work by independent designers, made for discovery and thoughtful spaces.',
  };
}

export default function HomePage({ params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <HomePageClient
      initialDesigns={getLocalFeaturedDesigns(locale, 8)}
      initialCategories={getLocalCategories(locale)}
    />
  );
}
