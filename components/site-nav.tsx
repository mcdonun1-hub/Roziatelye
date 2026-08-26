'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Heart, Leaf, Menu, Search, X } from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import { toPersianNumber } from '@/lib/i18n';

export function SiteHeader({ favoriteCount = 0 }: { favoriteCount?: number }) {
  const { locale, dict, isRTL } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const base = `/${locale}`;
  const formattedFavoriteCount = isRTL ? toPersianNumber(favoriteCount) : favoriteCount;
  const navigation = [
    { href: base, label: dict.nav.discover },
    { href: `${base}/discover`, label: dict.nav.browse },
    { href: `${base}/artists`, label: dict.nav.artists },
    { href: `${base}/portfolio`, label: dict.nav.portfolio },
    { href: `${base}/education`, label: dict.nav.education },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
        <div className="flex min-w-0 items-center gap-7 xl:gap-10">
          <Link prefetch={false} href={base} className="group flex shrink-0 items-center gap-2.5" aria-label={dict.brandName}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:-rotate-6">
              <Leaf size={19} strokeWidth={2.4} />
            </span>
            <span className="brand-wordmark whitespace-nowrap text-[20px] font-semibold min-[360px]:text-[22px] sm:text-[26px]">{dict.brandName}</span>
          </Link>
          <nav className="hidden items-center gap-5 text-[13px] font-medium text-muted-foreground lg:flex xl:gap-7" aria-label={isRTL ? 'پیمایش اصلی' : 'Primary navigation'}>
            {navigation.map((item) => (
              <Link prefetch={false} key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 xl:gap-3">
          <Link prefetch={false} href={`${base}/discover`} className="hidden h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground min-[420px]:grid" aria-label={dict.nav.search}>
            <Search size={19} />
          </Link>
          <Link prefetch={false} href={`${base}/favorites`} className="relative grid min-h-[44px] min-w-[44px] place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={dict.nav.favorites}>
            <Heart size={19} />
            {favoriteCount > 0 && (
              <span className="absolute end-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                {formattedFavoriteCount}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
          <Link prefetch={false}
            href={`${base}/shop`}
            className="hidden min-h-[44px] items-center rounded-full border border-border px-4 py-2 text-[13px] font-semibold transition-all hover:border-primary hover:text-primary md:inline-flex"
          >
            {dict.nav.ownerShop}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full transition-colors hover:bg-muted lg:hidden"
            aria-label={menuOpen ? dict.nav.close : dict.nav.menu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border/70 bg-background px-5 py-5 lg:hidden">
          <nav className="mx-auto grid max-w-[1440px] gap-1 text-sm font-semibold" aria-label={isRTL ? 'پیمایش موبایل' : 'Mobile navigation'}>
            {navigation.map((item) => (
              <Link prefetch={false} key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 transition-colors hover:bg-muted">
                {item.label}
              </Link>
            ))}
            <Link prefetch={false} href={`${base}/shop`} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-primary transition-colors hover:bg-primary/10">
              {dict.nav.ownerShop}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { locale, dict, isRTL } = useLocale();
  const base = `/${locale}`;
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'invalid' | 'saved'>('idle');

  function handleNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setNewsletterStatus(valid ? 'saved' : 'invalid');
    if (valid) setEmail('');
  }

  return (
    <footer id="footer" className="border-t border-border bg-[#f2efe8]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_.8fr_1.3fr]">
          <div className="min-w-0">
            <Link prefetch={false} href={base} className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Leaf size={17} /></span>
              <span className="brand-wordmark text-2xl font-semibold">{dict.brandName}</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-muted-foreground">{dict.footer.description}</p>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em]">{dict.footer.explore}</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link prefetch={false} href={`${base}/discover`} className="hover:text-foreground">{dict.discover.allDesigns}</Link>
              <Link prefetch={false} href={`${base}/artists`} className="hover:text-foreground">{dict.nav.artists}</Link>
              <Link prefetch={false} href={`${base}/portfolio`} className="hover:text-foreground">{dict.footer.portfolio}</Link>
              <Link prefetch={false} href={`${base}/education`} className="hover:text-foreground">{dict.footer.education}</Link>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em]">{dict.footer.about}</h3>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link prefetch={false} href={`${base}#about`} className="hover:text-foreground">{dict.footer.ourStory}</Link>
              <Link prefetch={false} href={`${base}/shop`} className="hover:text-foreground">{dict.footer.ownerShop}</Link>
              <Link prefetch={false} href={`${base}/commerce`} className="hover:text-foreground">{dict.footer.commerce}</Link>
              <Link prefetch={false} href={`${base}/support`} className="hover:text-foreground">{dict.footer.support}</Link>
              <Link prefetch={false} href={`${base}/legal`} className="hover:text-foreground">{dict.footer.termsPrivacy}</Link>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.12em]">{dict.footer.stayInspired}</h3>
            <p className="mb-4 text-sm leading-7 text-muted-foreground">{dict.footer.newsletterDesc}</p>
            <form onSubmit={handleNewsletter} noValidate className="min-w-0">
              <div className="flex min-w-0 rounded-xl border border-border bg-background p-1 focus-within:border-primary">
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); setNewsletterStatus('idle'); }}
                  placeholder={dict.footer.emailPlaceholder}
                  aria-label={dict.footer.emailPlaceholder}
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button type="submit" className="min-h-[44px] rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-85">
                  {dict.footer.subscribe}
                </button>
              </div>
              <p className={`mt-2 min-h-5 text-xs ${newsletterStatus === 'invalid' ? 'text-destructive' : 'text-muted-foreground'}`} role="status" aria-live="polite">
                {newsletterStatus === 'saved' ? dict.footer.newsletterSuccess : newsletterStatus === 'invalid' ? dict.footer.emailInvalid : ''}
              </p>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <span>{dict.footer.copyright}</span>
            <span>{dict.footer.tagline}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{isRTL ? 'زبان' : 'Language'}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
