'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Heart,
  Layers3,
  Leaf,
  Menu,
  Palette,
  PenTool,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { useLocale } from '@/components/locale-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import { SiteFooter } from '@/components/site-nav';
import { DesignCard } from '@/components/design/DesignCard';
import { CATEGORY_IMAGE_BY_SLUG } from '@/data/marketplace';
import { useLocalFavorites } from '@/hooks/use-local-favorites';
import { toPersianNumber } from '@/lib/i18n';
import type { Category, Design } from '@/types/marketplace';

interface Props {
  initialDesigns: Design[];
  initialCategories: Category[];
}

export function HomePageClient({ initialDesigns, initialCategories }: Props) {
  const { locale, dict, isRTL } = useLocale();
  const base = `/${locale}`;
  const { favorites, toggleFavorite } = useLocalFavorites();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDesigns = useMemo(() => {
    if (!search.trim()) return initialDesigns;
    const query = search.trim().toLocaleLowerCase(locale === 'fa' ? 'fa-IR' : 'en-US');
    return initialDesigns.filter((design) =>
      `${design.title} ${design.creators?.display_name ?? ''}`
        .toLocaleLowerCase(locale === 'fa' ? 'fa-IR' : 'en-US')
        .includes(query)
    );
  }, [initialDesigns, locale, search]);

  const favoriteCount = isRTL ? toPersianNumber(favorites.length) : favorites.length;
  const heroDesigns = initialDesigns.slice(0, 4);

  const primaryNav = [
    { href: `${base}#discover`, label: dict.nav.discover },
    { href: `${base}/artists`, label: dict.nav.artists },
    { href: `${base}/portfolio`, label: dict.nav.portfolio },
    { href: `${base}/education`, label: dict.nav.education },
  ];

  return (
    <main className="min-h-screen overflow-x-clip bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-3 min-[360px]:px-4 sm:px-8 lg:px-12">
          <div className="flex min-w-0 items-center gap-8 xl:gap-10">
            <Link prefetch={false} href={base} className="group flex shrink-0 items-center gap-2.5" aria-label={dict.brandName}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:-rotate-6">
                <Leaf size={19} strokeWidth={2.4} />
              </span>
              <span className="brand-wordmark whitespace-nowrap text-[20px] font-semibold min-[360px]:text-[22px] sm:text-[26px]">{dict.brandName}</span>
            </Link>
            <nav className="hidden items-center gap-6 text-[13px] font-medium text-muted-foreground lg:flex xl:gap-8" aria-label={isRTL ? 'پیمایش اصلی' : 'Primary navigation'}>
              {primaryNav.map((item) => (
                <Link prefetch={false} key={item.href} href={item.href} className="whitespace-nowrap transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2 xl:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className="hidden h-11 w-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground min-[420px]:grid"
              aria-label={dict.nav.search}
              aria-expanded={searchOpen}
            >
              <Search size={19} />
            </button>
            <Link prefetch={false}
              href={`${base}/favorites`}
              className="relative grid min-h-[44px] min-w-[44px] place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={dict.nav.favorites}
            >
              <Heart size={19} />
              {favorites.length > 0 && (
                <span className="absolute end-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-accent-foreground">
                  {favoriteCount}
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

        {searchOpen && (
          <div className="border-t border-border/70 bg-background px-4 py-4 sm:px-8">
            <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
              <Search size={18} className="shrink-0 text-muted-foreground" />
              <input
                type="search"
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={dict.discover.searchPlaceholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label={dict.discover.searchPlaceholder}
              />
              <button
                type="button"
                onClick={() => { setSearch(''); setSearchOpen(false); }}
                className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={dict.nav.close}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {menuOpen && (
          <div className="border-t border-border/70 bg-background px-5 py-5 lg:hidden">
            <nav className="mx-auto grid max-w-[1440px] gap-1 text-sm font-semibold" aria-label={isRTL ? 'پیمایش موبایل' : 'Mobile navigation'}>
              {primaryNav.map((item) => (
                <Link prefetch={false}
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-3 transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <Link prefetch={false} href={`${base}/discover`} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 transition-colors hover:bg-muted">
                {dict.nav.browse}
              </Link>
              <Link prefetch={false} href={`${base}/shop`} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-primary transition-colors hover:bg-primary/10">
                {dict.nav.ownerShop}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <section className="relative border-b border-border/60 bg-[#e6eee9]">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,.8),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(23,63,60,.12),transparent_30%)]" />
        <div className="relative mx-auto grid min-h-[580px] max-w-[1440px] items-center gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.08fr] lg:px-12 lg:py-20">
          <div className="relative z-10 max-w-2xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/75 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary shadow-sm">
              <Sparkles size={13} /> {dict.hero.badge}
            </div>
            <h1 className={`font-display text-[clamp(2.8rem,11vw,6.6rem)] font-medium text-[#173f3c] ${isRTL ? 'leading-[1.08]' : 'leading-[0.94] tracking-[-0.055em]'}`}>
              {dict.hero.titleLine1}<br />
              <span className={isRTL ? 'text-primary' : 'italic text-primary'}>{dict.hero.titleLine2}</span>
            </h1>
            <p className="mt-7 max-w-lg text-[15px] leading-8 text-[#45625e] sm:text-base">{dict.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link prefetch={false}
                href={`${base}/discover`}
                className="group inline-flex min-h-[48px] items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {dict.hero.exploreCta}
                <ArrowRight size={16} className={isRTL ? 'rotate-180 transition-transform group-hover:-translate-x-1' : 'transition-transform group-hover:translate-x-1'} />
              </Link>
              <Link prefetch={false}
                href={`${base}/artists`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-[#173f3c] transition-colors hover:bg-white/65"
              >
                {dict.hero.meetArtists}
              </Link>
            </div>
            <div className="mt-11 flex max-w-lg items-center gap-5 border-t border-[#b9cdc4] pt-5 text-xs text-[#45625e] sm:gap-7">
              <div><strong className="block text-lg font-semibold text-[#173f3c] sm:text-xl">{dict.hero.statDesigns}</strong></div>
              <div className="h-8 w-px bg-[#b9cdc4]" />
              <div><strong className="block text-lg font-semibold text-[#173f3c] sm:text-xl">{dict.hero.statCountries}</strong></div>
            </div>
          </div>

          <div className="relative hidden h-[490px] lg:block" aria-label={isRTL ? 'گزیده‌ای از طراحی‌ها' : 'A selection of designs'}>
            <div className="absolute end-[18%] top-[4%] h-[330px] w-[330px] -rotate-[7deg] overflow-hidden rounded-2xl shadow-2xl shadow-[#173f3c]/15">
              <img src={heroDesigns[0].image_url} alt={heroDesigns[0].title} className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-[3%] end-0 h-[265px] w-[265px] rotate-[8deg] overflow-hidden rounded-2xl border-[10px] border-[#f3f0e9] shadow-2xl">
              <img src={heroDesigns[3].image_url} alt={heroDesigns[3].title} className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-[10%] start-[6%] h-[185px] w-[185px] rotate-[5deg] overflow-hidden rounded-2xl border-[8px] border-[#f3f0e9] shadow-xl">
              <img src={heroDesigns[2].image_url} alt={heroDesigns[2].title} className="h-full w-full object-cover" />
            </div>
            <div className="absolute start-[9%] top-[22%] grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg"><Palette size={25} /></div>
            <span className="absolute bottom-[2%] start-[28%] font-display text-lg text-[#45625e]">{dict.hero.findNext}</span>
          </div>

          <div className="grid grid-cols-[1.15fr_.85fr] gap-3 lg:hidden" aria-label={isRTL ? 'گزیده‌ای از طراحی‌ها' : 'A selection of designs'}>
            <div className="aspect-[1.12] overflow-hidden rounded-2xl shadow-lg"><img src={heroDesigns[0].image_url} alt={heroDesigns[0].title} className="h-full w-full object-cover" /></div>
            <div className="grid gap-3"><div className="overflow-hidden rounded-2xl"><img src={heroDesigns[1].image_url} alt={heroDesigns[1].title} className="h-full w-full object-cover" /></div><div className="overflow-hidden rounded-2xl"><img src={heroDesigns[2].image_url} alt={heroDesigns[2].title} className="h-full w-full object-cover" /></div></div>
          </div>
        </div>
      </section>

      <section id="discover" className="scroll-mt-24 mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{dict.sections.curatedForYou}</p>
            <h2 className="font-display text-4xl font-medium sm:text-5xl">{dict.sections.freshFromStudio}</h2>
          </div>
          <Link prefetch={false} href={`${base}/discover`} className="group hidden items-center gap-2 pb-1 text-sm font-semibold text-primary sm:flex">
            {dict.sections.viewAllDesigns}
            <ArrowRight size={16} className={isRTL ? 'rotate-180 transition-transform group-hover:-translate-x-1' : 'transition-transform group-hover:translate-x-1'} />
          </Link>
        </div>

        {filteredDesigns.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/25 px-6 text-center">
            <p className="text-lg font-semibold">{dict.discover.noDesigns}</p>
            <p className="mt-2 text-sm text-muted-foreground">{dict.discover.noDesignsDesc}</p>
            <button type="button" onClick={() => setSearch('')} className="mt-5 min-h-[44px] rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">
              {dict.discover.clearFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {filteredDesigns.slice(0, 4).map((design, index) => (
              <DesignCard
                key={design.id}
                design={design}
                isFavorite={favorites.includes(design.id)}
                onFavorite={toggleFavorite}
                priority={index < 2}
                base={base}
              />
            ))}
          </div>
        )}
        <Link prefetch={false} href={`${base}/discover`} className="mt-10 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary sm:hidden">
          {dict.sections.viewAllDesigns}<ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
        </Link>
      </section>

      <section id="categories" className="scroll-mt-24 border-y border-border/60 bg-[#f2efe8]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{dict.sections.exploreByMood}</p>
              <h2 className="font-display text-4xl font-medium sm:text-5xl">{dict.sections.whatDrawnTo}</h2>
            </div>
            <Link prefetch={false} href={`${base}/discover`} className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex">
              {dict.sections.browseEverything}<ChevronRight size={16} className={isRTL ? 'rotate-180' : ''} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {initialCategories.slice(0, 6).map((category) => {
              const count = isRTL ? toPersianNumber(category.design_count) : category.design_count;
              return (
                <Link prefetch={false}
                  href={`${base}/discover?category=${category.slug}`}
                  key={category.id}
                  className="group relative aspect-[0.82] overflow-hidden rounded-2xl bg-muted shadow-sm"
                >
                  <img src={CATEGORY_IMAGE_BY_SLUG[category.slug]} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <span className="block text-xl font-semibold sm:text-2xl">{category.name}</span>
                    <span className="mt-1 block text-[11px] text-white/75">{count} {dict.discover.designsUnit}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="artists" className="scroll-mt-24 mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{dict.sections.peopleBehind}</p>
            <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
              {dict.sections.madeWithIntention}<br />
              <span className={isRTL ? 'text-muted-foreground' : 'italic text-muted-foreground'}>{dict.sections.sharedWithWorld}</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-muted-foreground">{dict.sections.peopleBehindDesc}</p>
            <Link prefetch={false} href={`${base}/artists`} className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary">
              {dict.sections.meetAllArtists}
              <ArrowRight size={16} className={isRTL ? 'rotate-180 transition-transform group-hover:-translate-x-1' : 'transition-transform group-hover:translate-x-1'} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            <CreatorSpotlight image="/images/artists/elena.svg" name="Elena Marchetti" location="Milan, Italy" handle="elena-marchetti" base={base} />
            <CreatorSpotlight image="/images/artists/kenji.svg" name="Kenji Watanabe" location="Tokyo, Japan" handle="kenji-watanabe" offset base={base} />
            <CreatorSpotlight image="/images/artists/amara.svg" name="Amara Okafor" location="Lagos, Nigeria" handle="amara-okafor" base={base} />
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 border-y border-border/60 bg-[#eee5d9]">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{dict.sections.aboutBadge}</p>
            <h2 className="font-display text-4xl font-medium leading-tight text-[#173f3c] sm:text-5xl">{dict.sections.aboutTitle}</h2>
            <p className="mt-6 text-[15px] leading-8 text-[#51615e]">{dict.sections.aboutDesc}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/70 bg-white/55 p-6 shadow-sm">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><PenTool size={20} /></span>
              <h3 className="mt-5 text-lg font-semibold">{dict.sections.aboutCraftTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{dict.sections.aboutCraftDesc}</p>
            </div>
            <div className="rounded-3xl border border-white/70 bg-white/55 p-6 shadow-sm sm:translate-y-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-[#9a542d]"><Layers3 size={20} /></span>
              <h3 className="mt-5 text-lg font-semibold">{dict.sections.aboutPeopleTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{dict.sections.aboutPeopleDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="journal" className="scroll-mt-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-foreground/70">{dict.sections.creativelyCurious}</p>
              <h2 className="font-display text-4xl font-medium sm:text-5xl">{dict.sections.journalTitle}</h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-primary-foreground/75">{dict.sections.journalDesc}</p>
            </div>
            <Link prefetch={false} href={`${base}#journal-stories`} className="group inline-flex min-h-[48px] w-fit items-center gap-3 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5">
              {dict.sections.readJournal}
              <ArrowRight size={16} className={isRTL ? 'rotate-180 transition-transform group-hover:-translate-x-1' : 'transition-transform group-hover:translate-x-1'} />
            </Link>
          </div>

          <div id="journal-stories" className="mt-12 grid scroll-mt-28 gap-4 md:grid-cols-3">
            <JournalCard icon={<PenTool size={19} />} label={dict.sections.journalStory1Label} title={dict.sections.journalStory1Title} description={dict.sections.journalStory1Desc} />
            <JournalCard icon={<BookOpen size={19} />} label={dict.sections.journalStory2Label} title={dict.sections.journalStory2Title} description={dict.sections.journalStory2Desc} />
            <JournalCard icon={<Palette size={19} />} label={dict.sections.journalStory3Label} title={dict.sections.journalStory3Title} description={dict.sections.journalStory3Desc} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function CreatorSpotlight({ image, name, location, handle, offset, base }: {
  image: string;
  name: string;
  location: string;
  handle: string;
  offset?: boolean;
  base: string;
}) {
  return (
    <Link prefetch={false} href={`${base}/artists/${handle}`} className={`group min-w-0 ${offset ? 'mt-8' : ''}`}>
      <div className="aspect-[0.78] overflow-hidden rounded-2xl bg-muted shadow-sm">
        <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-3 min-w-0" dir="auto">
        <span className="flex items-center gap-1 truncate text-xs font-semibold sm:text-sm">
          <span className="truncate">{name}</span>
          <Check size={13} className="shrink-0 rounded-full bg-primary p-0.5 text-primary-foreground" />
        </span>
        <span className="mt-1 block truncate text-[10px] text-muted-foreground sm:text-xs">{location}</span>
      </div>
    </Link>
  );
}

function JournalCard({ icon, label, title, description }: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-6 transition-transform hover:-translate-y-1">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground/65">
        {icon}{label}
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-8">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-primary-foreground/70">{description}</p>
    </article>
  );
}
