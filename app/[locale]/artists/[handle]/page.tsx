import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { getLocalCreatorByHandle, getLocalDesignsByCreator } from '@/data/marketplace';
import { ArtistProfileClient } from '@/features/artist-profile/ArtistProfileClient';

interface Props {
  params: { locale: string; handle: string };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!locales.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;
  const creator = getLocalCreatorByHandle(params.handle, locale);
  if (!creator) return {};

  return {
    title: `${creator.display_name} — ${locale === 'fa' ? 'رُزی آتلیه' : 'Rozi Atelier'}`,
    description: creator.bio ?? undefined,
  };
}

export default function ArtistProfilePage({ params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const creator = getLocalCreatorByHandle(params.handle, locale);
  if (!creator) notFound();

  return (
    <ArtistProfileClient
      creator={creator}
      initialDesigns={getLocalDesignsByCreator(creator.id, locale)}
    />
  );
}
