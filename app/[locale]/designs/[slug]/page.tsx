import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import {
  getLocalDesignBySlug,
  getLocalDesignsByCreator,
  getLocalReviewsByDesign,
} from '@/data/marketplace';
import { DesignDetailClient } from '@/features/design-detail/DesignDetailClient';

interface Props {
  params: { locale: string; slug: string };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!locales.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;
  const design = getLocalDesignBySlug(params.slug, locale);
  if (!design) return {};

  return {
    title: `${design.title} — ${locale === 'fa' ? 'رُزی آتلیه' : 'Rozi Atelier'}`,
    description: design.description ?? undefined,
    openGraph: { images: [design.image_url] },
  };
}

export default function DesignDetailPage({ params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const design = getLocalDesignBySlug(params.slug, locale);
  if (!design) notFound();

  return (
    <DesignDetailClient
      design={design}
      reviews={getLocalReviewsByDesign(design.id, locale)}
      moreDesigns={getLocalDesignsByCreator(design.creator_id, locale, design.id, 4)}
    />
  );
}
