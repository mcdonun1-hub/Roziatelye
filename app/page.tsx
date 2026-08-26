'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Heart,
  Leaf,
  Menu,
  Palette,
  Search,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Category, Creator, Design } from '@/lib/types';
import { useLocale } from '@/components/locale-provider';
import { LanguageSwitcher } from '@/components/language-switcher';
import { toPersianNumber, formatCount } from '@/lib/i18n';

const fallbackDesigns: Design[] = [
  { id: '1', creator_id: '1', shop_id: null, title: 'Mediterranean Bloom', slug: 'mediterranean-bloom', description: null, image_url: 'https://images.pexels.com/photos/5117322/pexels-photo-5117322.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop', thumbnail_url: null, colors: ['#E8A0BF'], width_px: 1500, height_px: 1500, dpi: 150, is_public: true, is_featured: true, view_count: 4521, favorite_count: 312, review_count: 28, avg_rating: 4.8, published_at: '', created_at: '', updated_at: '', creators: { id: '1', display_name: 'Elena Marchetti', handle: 'elena-marchetti', bio: null, location: 'Milan, Italy', avatar_url: 'https://images.pexels.com/photos/5393535/pexels-photo-5393535.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', banner_url: null, website_url: null, is_verified: true, design_count: 7, follower_count: 1284, created_at: '', updated_at: '' } },
  { id: '2', creator_id: '2', shop_id: null, title: 'Asanoha Grid', slug: 'asanoha-grid', description: null, image_url: 'https://images.pexels.com/photos/2268541/pexels-photo-2268541.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop', thumbnail_url: null, colors: ['#2C3E50'], width_px: 1500, height_px: 1500, dpi: 150, is_public: true, is_featured: true, view_count: 5234, favorite_count: 389, review_count: 31, avg_rating: 4.8, published_at: '', created_at: '', updated_at: '', creators: { id: '2', display_name: 'Kenji Watanabe', handle: 'kenji-watanabe', bio: null, location: 'Tokyo, Japan', avatar_url: 'https://images.pexels.com/photos/6925033/pexels-photo-6925033.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', banner_url: null, website_url: null, is_verified: true, design_count: 6, follower_count: 2156, created_at: '', updated_at: '' } },
  { id: '3', creator_id: '3', shop_id: null, title: 'Pastel Dreams', slug: 'pastel-dreams', description: null, image_url: 'https://images.pexels.com/photos/4391611/pexels-photo-4391611.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop', thumbnail_url: null, colors: ['#FADBD8'], width_px: 1500, height_px: 1500, dpi: 150, is_public: true, is_featured: true, view_count: 6789, favorite_count: 512, review_count: 35, avg_rating: 4.9, published_at: '', created_at: '', updated_at: '', creators: { id: '3', display_name: 'Amara Okafor', handle: 'amara-okafor', bio: null, location: 'Lagos, Nigeria', avatar_url: 'https://images.pexels.com/photos/8036823/pexels-photo-8036823.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', banner_url: null, website_url: null, is_verified: true, design_count: 5, follower_count: 3421, created_at: '', updated_at: '' } },
  { id: '4', creator_id: '4', shop_id: null, title: 'Monstera Wild', slug: 'monstera-wild', description: null, image_url: 'https://images.pexels.com/photos/3686275/pexels-photo-3686275.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop', thumbnail_url: null, colors: ['#27AE60'], width_px: 1500, height_px: 1500, dpi: 150, is_public: true, is_featured: true, view_count: 5678, favorite_count: 423, review_count: 29, avg_rating: 4.8, published_at: '', created_at: '', updated_at: '', creators: { id: '4', display_name: 'Isabella Costa', handle: 'isabella-costa', bio: null, location: 'Rio de Janeiro, Brazil', avatar_url: 'https://images.pexels.com/photos/22690802/pexels-photo-22690802.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', banner_url: null, website_url: null, is_verified: true, design_count: 3, follower_count: 1879, created_at: '', updated_at: '' } },
  { id: '5', creator_id: '5', shop_id: null, title: 'Tokyo Night', slug: 'tokyo-night', description: null, image_url: 'https://images.pexels.com/photos/2268528/pexels-photo-2268528.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop', thumbnail_url: null, colors: ['#E74C3C'], width_px: 1500, height_px: 1500, dpi: 150, is_public: true, is_featured: true, view_count: 4123, favorite_count: 312, review_count: 24, avg_rating: 4.9, published_at: '', created_at: '', updated_at: '', creators: { id: '5', display_name: 'Kenji Watanabe', handle: 'kenji-watanabe', bio: null, location: 'Tokyo, Japan', avatar_url: 'https://images.pexels.com/photos/6925033/pexels-photo-6925033.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', banner_url: null, website_url: null, is_verified: true, design_count: 6, follower_count: 2156, created_at: '', updated_at: '' } },
  { id: '6', creator_id: '6', shop_id: null, title: 'Desert Dreams', slug: 'desert-dreams', description: null, image_url: 'https://images.pexels.com/photos/2158532/pexels-photo-2158532.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&fit=crop', thumbnail_url: null, colors: ['#D35400'], width_px: 1500, height_px: 1500, dpi: 150, is_public: true, is_featured: true, view_count: 3102, favorite_count: 234, review_count: 17, avg_rating: 4.7, published_at: '', created_at: '', updated_at: '', creators: { id: '6', display_name: 'Sofia Reyes', handle: 'sofia-reyes', bio: null, location: 'Oaxaca, Mexico', avatar_url: 'https://images.pexels.com/photos/22690802/pexels-photo-22690802.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop', banner_url: null, website_url: null, is_verified: false, design_count: 5, follower_count: 893, created_at: '', updated_at: '' } },
];

const fallbackCategories: Category[] = [
  { id: '1', name: 'Floral', slug: 'floral', description: null, icon_name: 'Flower2', design_count: 8 },
  { id: '2', name: 'Geometric', slug: 'geometric', description: null, icon_name: 'Hexagon', design_count: 7 },
  { id: '3', name: 'Abstract', slug: 'abstract', description: null, icon_name: 'Sparkles', design_count: 6 },
  { id: '4', name: 'Botanical', slug: 'botanical', description: null, icon_name: 'Leaf', design_count: 5 },
  { id: '5', name: 'Watercolor', slug: 'watercolor', description: null, icon_name: 'Droplets', design_count: 5 },
  { id: '6', name: 'Minimalist', slug: 'minimalist', description: null, icon_name: 'Minus', design_count: 4 },
];

const categoryVisuals: Record<string, { image: string; color: string }> = {
  floral: { image: fallbackDesigns[0].image_url, color: 'bg-rose-50' },
  geometric: { image: fallbackDesigns[1].image_url, color: 'bg-slate-100' },
  abstract: { image: fallbackDesigns[5].image_url, color: 'bg-orange-50' },
  botanical: { image: fallbackDesigns[3].image_url, color: 'bg-emerald-50' },
  watercolor: { image: fallbackDesigns[2].image_url, color: 'bg-sky-50' },
  minimalist: { image: 'https://images.pexels.com/photos/2268543/pexels-photo-2268543.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', color: 'bg-stone-100' },
};

export default function Home() {
  const { locale, dict, isRTL } = useLocale();
  const base = `/${locale}`;
  const [designs, setDesigns] = useState<Design[]>(fallbackDesigns);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadMarketplace() {
      const [designResponse, categoryResponse] = await Promise.all([
        supabase.from('designs').select('*, creators(*)').eq('is_public', true).order('published_at', { ascending: false }).limit(12),
        supabase.from('categories').select('*').order('design_count', { ascending: false }),
      ]);
      if (designResponse.data && designResponse.data.length > 0) setDesigns(designResponse.data as Design[]);
      if (categoryResponse.data && categoryResponse.data.length > 0) setCategories(categoryResponse.data as Category[]);
    }
    loadMarketplace();
  }, []);

  const filteredDesigns = useMemo(() => {
    if (!search.trim()) return designs;
    return designs.filter((design) => `${design.title} ${design.creators?.display_name ?? ''}`.toLowerCase().includes(search.toLowerCase()));
  }, [designs, search]);

  function toggleFavorite(id: string) {
    setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]);
  }

  const favCount = isRTL ? toPersianNumber(favorites.length) : favorites.length;

  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-10">
            <Link href={base} className="group flex items-center gap-2.5" aria-label={dict.brandName}>
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-[-8deg]"><Leaf size={19} strokeWidth={2.5} /></span>
              <span className="font-display text-[26px] font-semibold tracking-[-0.04em]">{dict.brandName}</span>
            </Link>
            <nav className="hidden items-center gap-8 text-[13px] font-medium text-muted-foreground lg:flex">
              <Link href={`${base}#discover`} className="transition-colors hover:text-foreground">{dict.nav.discover}</Link>
              <Link href={`${base}#categories`} className="transition-colors hover:text-foreground">{dict.nav.categories}</Link>
              <Link href={`${base}#artists`} className="transition-colors hover:text-foreground">{dict.nav.artists}</Link>
              <Link href={`${base}#journal`} className="transition-colors hover:text-foreground">{dict.nav.journal}</Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={() => setSearchOpen((open) => !open)} className="rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={dict.nav.search}><Search size={19} /></button>
            <Link href={`${base}/favorites`} className="relative rounded-full p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label={dict.nav.favorites}><Heart size={19} />{favorites.length > 0 && <span className="absolute end-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">{favCount}</span>}</Link>
            <LanguageSwitcher />
            <Link href={`${base}#join`} className="hidden rounded-full border border-border px-4 py-2 text-[13px] font-medium transition-all hover:border-primary hover:text-primary sm:block">{dict.nav.joinCommunity}</Link>
            <button onClick={() => setMenuOpen((open) => !open)} className="rounded-full p-2.5 lg:hidden" aria-label={dict.nav.menu}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-border/70 bg-background px-5 py-4 sm:px-8"><div className="mx-auto flex max-w-2xl items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"><Search size={18} className="text-muted-foreground" /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder={dict.discover.searchPlaceholder} className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><button onClick={() => { setSearch(''); setSearchOpen(false); }} className="text-muted-foreground hover:text-foreground"><X size={16} /></button></div></div>}
        {menuOpen && <div className="border-t border-border/70 bg-background px-5 py-4 lg:hidden"><nav className="flex flex-col gap-4 text-sm font-medium"><Link href={`${base}#discover`} onClick={() => setMenuOpen(false)}>{dict.nav.discover}</Link><Link href={`${base}#categories`} onClick={() => setMenuOpen(false)}>{dict.nav.categories}</Link><Link href={`${base}#artists`} onClick={() => setMenuOpen(false)}>{dict.nav.artists}</Link><Link href={`${base}#journal`} onClick={() => setMenuOpen(false)}>{dict.nav.journal}</Link></nav></div>}
      </header>

      <section className="relative border-b border-border/60 bg-[#e8f0eb]">
        <div className="mx-auto grid min-h-[580px] max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.08fr] lg:px-12 lg:py-20">
          <div className="relative z-10 max-w-xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary"><Sparkles size={13} /> {dict.hero.badge}</div>
            <h1 className="font-display text-[clamp(3.5rem,7vw,6.6rem)] font-medium leading-[0.94] tracking-[-0.055em] text-[#173f3c]">{dict.hero.titleLine1}<br /><span className="italic text-primary">{dict.hero.titleLine2}</span></h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#45625e]">{dict.hero.subtitle}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3"><Link href={`${base}#discover`} className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-xl">{dict.hero.exploreCta} {isRTL ? <ArrowRight size={16} className="transition-transform group-hover:-translate-x-1 rotate-180" /> : <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}</Link><Link href={`${base}#join`} className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-[#173f3c] transition-colors hover:bg-white/60">{dict.hero.meetArtists}</Link></div>
            <div className="mt-12 flex items-center gap-6 border-t border-[#b9cdc4] pt-5 text-xs text-[#45625e]"><div><strong className="block text-xl font-semibold text-[#173f3c]">{dict.hero.statDesigns}</strong></div><div className="h-8 w-px bg-[#b9cdc4]" /><div><strong className="block text-xl font-semibold text-[#173f3c]">{dict.hero.statCountries}</strong></div></div>
          </div>
          <div className="relative hidden h-[490px] lg:block">
            <div className="absolute end-[18%] top-[4%] h-[330px] w-[330px] rotate-[-7deg] overflow-hidden rounded-[12px] shadow-2xl shadow-[#173f3c]/15"><img src={fallbackDesigns[0].image_url} alt="Mediterranean Bloom pattern" className="h-full w-full object-cover" /></div>
            <div className="absolute bottom-[3%] end-0 h-[265px] w-[265px] rotate-[8deg] overflow-hidden rounded-[12px] border-[10px] border-[#f3f0e9] shadow-2xl"><img src={fallbackDesigns[3].image_url} alt="Botanical pattern" className="h-full w-full object-cover" /></div>
            <div className="absolute bottom-[10%] start-[6%] h-[185px] w-[185px] rotate-[5deg] overflow-hidden rounded-[12px] border-[8px] border-[#f3f0e9] shadow-xl"><img src={fallbackDesigns[2].image_url} alt="Pastel watercolor pattern" className="h-full w-full object-cover" /></div>
            <div className="absolute start-[9%] top-[22%] grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg"><Palette size={25} /></div>
            <span className="absolute bottom-[2%] start-[28%] font-display text-lg italic text-[#45625e]">{dict.hero.findNext}</span>
          </div>
        </div>
      </section>

      <section id="discover" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-10 flex items-end justify-between gap-5"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{dict.sections.curatedForYou}</p><h2 className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl">{dict.sections.freshFromStudio}</h2></div><Link href={`${base}/discover`} className="group hidden items-center gap-2 pb-1 text-sm font-semibold text-primary sm:flex">{dict.sections.viewAllDesigns} {isRTL ? <ArrowRight size={16} className="transition-transform group-hover:-translate-x-1 rotate-180" /> : <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}</Link></div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {filteredDesigns.slice(0, 4).map((design, index) => <DesignCard key={design.id} design={design} isFavorite={favorites.includes(design.id)} onFavorite={toggleFavorite} priority={index < 2} locale={locale} base={base} />)}
        </div>
      </section>

      <section id="categories" className="border-y border-border/60 bg-[#f2efe8]">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{dict.sections.exploreByMood}</p><h2 className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl">{dict.sections.whatDrawnTo}</h2></div><Link href={`${base}/discover`} className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex">{dict.sections.browseEverything} {isRTL ? <ChevronRight size={16} className="rotate-180" /> : <ChevronRight size={16} />}</Link></div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{categories.slice(0, 6).map((category) => { const visual = categoryVisuals[category.slug] ?? categoryVisuals.abstract; const count = isRTL ? toPersianNumber(category.design_count) : category.design_count; return <Link href={`${base}/discover?category=${category.slug}`} key={category.id} className="group relative aspect-[0.82] overflow-hidden rounded-2xl"><img src={visual.image} alt={category.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-4 text-white"><span className="block font-display text-xl sm:text-2xl">{category.name}</span><span className="mt-1 block text-[11px] text-white/75">{count} {dict.discover.designsUnit}</span></div></Link>; })}</div>
        </div>
      </section>

      <section id="artists" className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{dict.sections.peopleBehind}</p><h2 className="font-display text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">{dict.sections.madeWithIntention}<br /><span className="italic text-muted-foreground">{dict.sections.sharedWithWorld}</span></h2><p className="mt-6 max-w-sm text-[15px] leading-7 text-muted-foreground">{dict.sections.peopleBehindDesc}</p><Link href={`${base}#all-artists`} className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">{dict.sections.meetAllArtists} {isRTL ? <ArrowRight size={16} className="transition-transform group-hover:-translate-x-1 rotate-180" /> : <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}</Link></div><div className="grid grid-cols-3 gap-3 sm:gap-5"><CreatorSpotlight image="https://images.pexels.com/photos/5393535/pexels-photo-5393535.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop" name="Elena Marchetti" location="Milan, Italy" base={base} /><CreatorSpotlight image="https://images.pexels.com/photos/6925033/pexels-photo-6925033.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop" name="Kenji Watanabe" location="Tokyo, Japan" offset base={base} /><CreatorSpotlight image="https://images.pexels.com/photos/8036823/pexels-photo-8036823.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop" name="Amara Okafor" location="Lagos, Nigeria" base={base} /></div></div></section>

      <section id="journal" className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12 lg:py-20"><div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/70">{dict.sections.creativelyCurious}</p><h2 className="font-display text-4xl font-medium tracking-[-0.045em] sm:text-5xl">{dict.sections.journalTitle}</h2><p className="mt-4 max-w-xl text-[15px] leading-7 text-primary-foreground/75">{dict.sections.journalDesc}</p></div><Link href={`${base}#read`} className="group inline-flex w-fit items-center gap-3 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5">{dict.sections.readJournal} {isRTL ? <ArrowRight size={16} className="transition-transform group-hover:-translate-x-1 rotate-180" /> : <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}</Link></div></section>

      <footer id="join" className="border-t border-border bg-[#f2efe8]"><div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12"><div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]"><div><Link href={base} className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground"><Leaf size={16} /></span><span className="font-display text-2xl font-semibold">{dict.brandName}</span></Link><p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">{dict.footer.description}</p></div><div><h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">{dict.footer.explore}</h3><div className="flex flex-col gap-3 text-sm text-muted-foreground"><Link href={`${base}#discover`} className="hover:text-foreground">{dict.discover.allDesigns}</Link><Link href={`${base}#categories`} className="hover:text-foreground">{dict.nav.categories}</Link><Link href={`${base}#artists`} className="hover:text-foreground">{dict.nav.artists}</Link><Link href={`${base}#journal`} className="hover:text-foreground">{dict.nav.journal}</Link></div></div><div><h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">{dict.footer.about}</h3><div className="flex flex-col gap-3 text-sm text-muted-foreground"><Link href={`${base}#about`} className="hover:text-foreground">{dict.footer.ourStory}</Link><Link href={`${base}#sell`} className="hover:text-foreground">{dict.footer.sellOnMorrow}</Link><Link href={`${base}#support`} className="hover:text-foreground">{dict.footer.support}</Link><Link href={`${base}#terms`} className="hover:text-foreground">{dict.footer.termsPrivacy}</Link></div></div><div><h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">{dict.footer.stayInspired}</h3><p className="mb-4 text-sm leading-6 text-muted-foreground">{dict.footer.newsletterDesc}</p><div className="flex rounded-xl border border-border bg-background p-1"><input placeholder={dict.footer.emailPlaceholder} className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground" /><button className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-85">{dict.footer.subscribe}</button></div></div></div><div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row"><span>{dict.footer.copyright}</span><span>{dict.footer.tagline}</span></div></div></footer>
    </main>
  );
}

function DesignCard({ design, isFavorite, onFavorite, priority, locale, base }: { design: Design; isFavorite: boolean; onFavorite: (id: string) => void; priority?: boolean; locale: string; base: string }) {
  const { dict, isRTL } = useLocale();
  return <article className="group min-w-0"><div className="relative aspect-square overflow-hidden rounded-2xl bg-muted"><Link href={`${base}/designs/${design.slug}`}><img src={design.image_url} alt={design.title} loading={priority ? 'eager' : 'lazy'} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></Link><button onClick={() => onFavorite(design.id)} className={`absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-all hover:scale-105 ${isFavorite ? 'text-accent' : 'text-foreground/65'}`} aria-label={isFavorite ? dict.design.removeFromFavorites : dict.design.addToFavorites}>{isFavorite ? <Heart size={17} fill="currentColor" /> : <Heart size={17} />}</button>{design.is_featured && <span className="absolute bottom-3 start-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground backdrop-blur">{dict.design.featured}</span>}</div><div className="mt-3 flex items-start justify-between gap-2"><div className="min-w-0"><Link href={`${base}/designs/${design.slug}`} className="block truncate text-sm font-semibold transition-colors hover:text-primary">{design.title}</Link><Link href={`${base}/artists/${design.creators?.handle ?? ''}`} className="mt-1 block truncate text-xs text-muted-foreground hover:text-foreground">{design.creators?.display_name}</Link></div><div className="flex shrink-0 items-center gap-1 pt-0.5 text-xs text-muted-foreground"><Star size={12} fill="currentColor" className="text-accent" />{isRTL ? toPersianNumber(design.avg_rating.toFixed(1)) : design.avg_rating.toFixed(1)}</div></div></article>;
}

function CreatorSpotlight({ image, name, location, offset, base }: { image: string; name: string; location: string; offset?: boolean; base: string }) {
  return <Link href={`${base}/artists/elena-marchetti`} className={`group ${offset ? 'mt-8' : ''}`}><div className="aspect-[0.78] overflow-hidden rounded-2xl bg-muted"><img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="mt-3"><span className="flex items-center gap-1 text-sm font-semibold">{name}<Check size={13} className="rounded-full bg-primary p-0.5 text-primary-foreground" /></span><span className="mt-1 block text-xs text-muted-foreground">{location}</span></div></Link>;
}
