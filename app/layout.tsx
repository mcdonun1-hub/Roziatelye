import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/fraunces';
import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { LocaleProvider } from '@/components/locale-provider';
import { localeConfig, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  metadataBase: new URL('https://morrow-marketplace.netlify.app'),
  title: 'رُزی آتلیه — طراحی مستقل، با نگاه انسانی',
  description: 'مجموعه‌ای سنجیده از الگوها و آثار طراحان مستقل؛ برای کشف، الهام و ساختن فضاهای شخصی.',
  openGraph: {
    title: 'رُزی آتلیه | Rozi Atelier',
    description: 'Independent patterns, thoughtful stories, and the people who make them.',
    images: ['/images/patterns/mediterranean-bloom.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localeHeader = headers().get('x-rozi-locale');
  const locale: Locale = localeHeader === 'en' ? 'en' : 'fa';
  const config = localeConfig[locale];

  return (
    <html lang={config.htmlLang} dir={config.dir} suppressHydrationWarning>
      <body>
        {/* The fallback provider keeps legacy non-prefixed route files safe.
            Locale routes supply their own document-managing provider. */}
        <LocaleProvider locale={locale} manageDocument={false}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
