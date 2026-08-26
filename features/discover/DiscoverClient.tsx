'use client';

/**
 * Discover page — Client Component.
 *
 * Receives server-fetched initial data. Handles all interactive state:
 * search, category filter, sort order.
 */
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/site-nav';
import { useLocale } from '@/components/locale-provider';
import { toPersianNumber } from '@/lib/i18n';
import { getLocalDesignsByCategory } from '@/data/marketplace';
import { useLocalFavorites } from '@/hooks/use-local-favorites';
import { DesignGrid } from '@/components/design/DesignCard';
import type { Category, Design, DesignSortOption } from '@/types/marketplace';

interface Props {
  initialDesigns: Design[];
  categories: Category[];
  initialCategory: string;
}

export function DiscoverClient({ initialDesigns, categories, initialCategory }: Props) {
  const { locale, dict, isRTL } = useLocale();
  const base = `/${locale}`;
  const router = useRouter();
  const { favorites, toggleFavorite } = useLocalFavorites();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<DesignSortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  function handleCategoryChange(slug: string) {
    setActiveCategory(slug);
    setShowFilters(false);
    const href = slug === 'all'
      ? `${base}/discover`
      : `${base}/discover?category=${encodeURIComponent(slug)}`;
    router.push(href, { scroll: false });
  }

  const filtered = useMemo(() => {
    let result = getLocalDesignsByCategory(initialDesigns, activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) => d.title.toLowerCase().includes(q) || (d.creators?.display_name ?? '').toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'popular':   result.sort((a, b) => b.view_count - a.view_count); break;
      case 'rating':    result.sort((a, b) => b.avg_rating - a.avg_rating); break;
      case 'favorites': result.sort((a, b) => b.favorite_count - a.favorite_count); break;
      default:          result.sort((a, b) => new Date(b.published_at ?? 0).getTime() - new Date(a.published_at ?? 0).getTime());
    }
    return result;
  }, [activeCategory, initialDesigns, search, sort]);

  const countLabel = isRTL
    ? toPersianNumber(filtered.length) + ' ' + dict.discover.designsUnit
    : `${filtered.length} ${filtered.length === 1 ? 'design' : 'designs'}`;

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader favoriteCount={favorites.length} />

      <section className="border-b border-border/60 bg-[#f2efe8]">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 lg:px-12">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{dict.discover.browseMarketplace}</p>
          <h1 className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
            {activeCategory === 'all'
              ? dict.discover.allDesigns
              : categories.find((c) => c.slug === activeCategory)?.name ?? dict.discover.allDesigns}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{countLabel}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Search + Sort bar */}
        <div className="flex items-center gap-3 border-b border-border py-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card ps-4 pe-1 py-1">
            <Search size={17} className="text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={dict.discover.searchPlaceholder}
              aria-label={dict.discover.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="grid min-h-[44px] min-w-[44px] place-items-center text-muted-foreground hover:text-foreground" aria-label={dict.discover.clearFilters}><X size={15} /></button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters((o) => !o)}
            className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted sm:px-4 lg:hidden"
            aria-expanded={showFilters}
          >
            <SlidersHorizontal size={16} /> {dict.discover.filters}
          </button>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-sm text-muted-foreground">{dict.discover.sortBy}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as DesignSortOption)}
              className="min-h-[44px] rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted"
              aria-label={dict.discover.sortBy}
            >
              <option value="newest">{dict.discover.sortNewest}</option>
              <option value="popular">{dict.discover.sortPopular}</option>
              <option value="rating">{dict.discover.sortRating}</option>
              <option value="favorites">{dict.discover.sortFavorites}</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-8 py-8 lg:flex-row">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} w-full shrink-0 lg:block lg:w-56`}>
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">{dict.discover.categories}</h3>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('all')}
                    className={`min-h-[44px] rounded-lg px-3 py-2 text-start text-sm transition-colors ${activeCategory === 'all' ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    aria-pressed={activeCategory === 'all'}
                  >
                    {dict.discover.allDesigns}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`min-h-[44px] rounded-lg px-3 py-2 text-start text-sm transition-colors ${activeCategory === cat.slug ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                      aria-pressed={activeCategory === cat.slug}
                    >
                      {cat.name}
                      <span className="ms-2 text-xs text-muted-foreground/70">
                        {isRTL ? toPersianNumber(cat.design_count) : cat.design_count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Designs grid */}
          <div className="min-w-0 flex-1">
            {filtered.length === 0 ? (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                <p className="text-lg font-semibold">{dict.discover.noDesigns}</p>
                <p className="mt-2 text-sm text-muted-foreground">{dict.discover.noDesignsDesc}</p>
                <button
                  type="button"
                  onClick={() => { setSearch(''); handleCategoryChange('all'); }}
                  className="mt-6 min-h-[44px] rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {dict.discover.clearFilters}
                </button>
              </div>
            ) : (
              <DesignGrid
                designs={filtered}
                favorites={favorites}
                onFavorite={toggleFavorite}
                base={base}
                priorityCount={4}
              />
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
