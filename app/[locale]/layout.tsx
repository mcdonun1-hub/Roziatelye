import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleProvider } from '@/components/locale-provider';
import { locales, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!locales.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;

  return {
    title: locale === 'fa'
      ? 'رُزی آتلیه — طراحی مستقل، با نگاه انسانی'
      : 'Rozi Atelier — Independent design, made personal',
    description: locale === 'fa'
      ? 'مجموعه‌ای سنجیده از الگوها و آثار طراحان مستقل.'
      : 'A considered collection of patterns and work by independent designers.',
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;

  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
