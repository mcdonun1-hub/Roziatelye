import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LocaleProvider } from '@/components/locale-provider';
import { locales, localeConfig, type Locale } from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!locales.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;
  return {
    title: locale === 'fa' ? 'مورو — دنیایی از الگو، ساخته‌ی انسان‌ها' : 'Morrow — A world of pattern, made by people',
    description: locale === 'fa'
      ? 'طراحی‌های اصلی سطح را از هنرمندان مستقل سراسر جهان کشف کنید.'
      : 'Discover original surface designs from independent artists around the world.',
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;

  return (
    <LocaleProvider locale={locale}>
      {children}
    </LocaleProvider>
  );
}
