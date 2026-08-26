'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Trash2 } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/site-nav';
import { DesignGrid } from '@/components/design/DesignCard';
import { useLocale } from '@/components/locale-provider';
import { useLocalFavorites } from '@/hooks/use-local-favorites';
import { toPersianNumber } from '@/lib/i18n';
import type { Design } from '@/types/marketplace';

export function FavoritesClient({ designs }: { designs: Design[] }) {
  const { locale, dict, isRTL } = useLocale();
  const base = `/${locale}`;
  const { favorites, toggleFavorite, clearFavorites } = useLocalFavorites();
  const favoritedDesigns = designs.filter((design) => favorites.includes(design.id));
  const savedCount = isRTL ? toPersianNumber(favoritedDesigns.length) : favoritedDesigns.length;

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader favoriteCount={favorites.length} />

      <section className="border-b border-border/60 bg-[#f2efe8]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{dict.favorites.yourCollection}</p>
            <h1 className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl">{dict.favorites.title}</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {dict.favorites.savedCount.replace('{count}', String(savedCount))}
            </p>
          </div>
          {favoritedDesigns.length > 0 && (
            <button
              type="button"
              onClick={clearFavorites}
              className="inline-flex min-h-[44px] w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              <Trash2 size={15} /> {dict.favorites.clearAll}
            </button>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
        {favoritedDesigns.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/25 px-6 py-20 text-center">
            <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-background shadow-sm">
              <Heart size={28} className="text-muted-foreground" />
            </span>
            <p className="text-lg font-semibold">{dict.favorites.noFavorites}</p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{dict.favorites.noFavoritesDesc}</p>
            <Link prefetch={false}
              href={`${base}/discover`}
              className="group mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5"
            >
              {dict.favorites.discoverDesigns}
              <ArrowRight size={16} className={isRTL ? 'rotate-180 transition-transform group-hover:-translate-x-1' : 'transition-transform group-hover:translate-x-1'} />
            </Link>
          </div>
        ) : (
          <DesignGrid
            designs={favoritedDesigns}
            favorites={favorites}
            onFavorite={toggleFavorite}
            base={base}
            priorityCount={4}
          />
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
