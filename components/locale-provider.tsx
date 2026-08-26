'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Locale, Dictionary } from '@/lib/i18n';
import { getDictionary, localeConfig } from '@/lib/i18n';

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  switchLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === undefined || current === null) return path;
    current = current[key];
  }
  return typeof current === 'string' ? current : path;
}

export function LocaleProvider({
  locale,
  children,
  manageDocument = true,
}: {
  locale: Locale;
  children: ReactNode;
  manageDocument?: boolean;
}) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
  const dict = getDictionary(currentLocale);
  const config = localeConfig[currentLocale];
  const dir = config.dir;
  const isRTL = dir === 'rtl';
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  useEffect(() => {
    if (!manageDocument) return;
    document.documentElement.dir = dir;
    document.documentElement.lang = config.htmlLang;
    document.documentElement.dataset.locale = currentLocale;
  }, [config.htmlLang, currentLocale, dir, manageDocument]);

  const switchLocale = useCallback((newLocale: Locale) => {
    setCurrentLocale(newLocale);
    const segments = pathname.split('/');
    let nextPath: string;
    if (segments[1] === 'fa' || segments[1] === 'en') {
      segments[1] = newLocale;
      nextPath = segments.join('/');
    } else {
      nextPath = `/${newLocale}${pathname}`;
    }
    const query = searchParams.toString();
    const hash = typeof window === 'undefined' ? '' : window.location.hash;
    router.push(`${nextPath}${query ? `?${query}` : ''}${hash}`);
  }, [pathname, router, searchParams]);

  const t = useCallback((path: string, vars?: Record<string, string | number>) => {
    let str = getNestedValue(dict, path);
    if (vars) {
      for (const [key, value] of Object.entries(vars)) {
        str = str.replace(`{${key}}`, String(value));
      }
    }
    return str;
  }, [dict]);

  return (
    <LocaleContext.Provider value={{ locale: currentLocale, dict, dir, isRTL, switchLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
