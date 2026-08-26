'use client';

import { Globe } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import type { Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, switchLocale } = useLocale();
  const target: Locale = locale === 'fa' ? 'en' : 'fa';

  return (
    <button
      type="button"
      onClick={() => switchLocale(target)}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={locale === 'fa' ? 'Switch to English' : 'تغییر به فارسی'}
    >
      <Globe size={19} />
      <span className="hidden text-[13px] font-medium min-[360px]:inline">
        {locale === 'fa' ? 'EN' : 'فا'}
      </span>
    </button>
  );
}
