import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MapPin, Palette } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-nav';
import { getLocalCreators } from '@/data/marketplace';
import { getDictionary, locales, toPersianNumber, type Locale } from '@/lib/i18n';

interface Props {
  params: { locale: string };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!locales.includes(params.locale as Locale)) return {};
  return {
    title: params.locale === 'fa' ? 'هنرمندان — رُزی آتلیه' : 'Artists — Rozi Atelier',
    description: params.locale === 'fa'
      ? 'با هنرمندان مستقل و نگاه‌های متفاوت پشت مجموعه‌های رُزی آتلیه آشنا شوید.'
      : 'Meet the independent artists and perspectives behind the Rozi Atelier collection.',
  };
}

export default function ArtistsPage({ params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const creators = getLocalCreators(locale);
  const base = `/${locale}`;
  const isRTL = locale === 'fa';

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="border-b border-border/60 bg-[#e6eee9]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">{dict.sections.peopleBehind}</p>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight text-[#173f3c] sm:text-6xl">
            {dict.sections.madeWithIntention} {dict.sections.sharedWithWorld}
          </h1>
          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-[#45625e]">{dict.sections.peopleBehindDesc}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator) => (
            <article key={creator.id} className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
              <Link prefetch={false} href={`${base}/artists/${creator.handle}`} className="block">
                <div className="aspect-[1.35] overflow-hidden bg-muted">
                  {creator.avatar_url && <img src={creator.avatar_url} alt={creator.display_name} className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 group-hover:scale-105" />}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="flex min-w-0 items-center gap-2 text-xl font-semibold" dir="auto">
                      <span className="truncate">{creator.display_name}</span>
                      {creator.is_verified && <Check size={15} className="shrink-0 rounded-full bg-primary p-0.5 text-primary-foreground" />}
                    </h2>
                    <ArrowRight size={17} className={isRTL ? 'shrink-0 rotate-180 text-primary transition-transform group-hover:-translate-x-1' : 'shrink-0 text-primary transition-transform group-hover:translate-x-1'} />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1" dir="auto"><MapPin size={13} />{creator.location}</span>
                    <span className="flex items-center gap-1"><Palette size={13} />{isRTL ? toPersianNumber(creator.design_count) : creator.design_count} {dict.artist.designs}</span>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">{creator.bio}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
