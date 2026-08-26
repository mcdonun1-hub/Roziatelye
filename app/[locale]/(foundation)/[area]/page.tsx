import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Compass, Leaf } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-nav';
import { locales, type Locale } from '@/lib/i18n';

type Area = 'portfolio' | 'education' | 'shop' | 'commerce' | 'support' | 'legal';

type AreaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
};

const areaCopy: Record<Locale, Record<Area, AreaCopy>> = {
  fa: {
    portfolio: {
      eyebrow: 'مرحله ۲۳',
      title: 'نمونه‌کارها، با روایت هر پروژه',
      description: 'ساختار این مسیر برای نمایش مجموعه‌های شخصی، فرایند طراحی و پروژه‌های منتخب آماده شده است.',
      note: 'تکمیل محتوای نمونه‌کارها در مرحله ۲۳ انجام می‌شود؛ در این مرحله هیچ داده‌ی ساختگی به‌عنوان نمونه‌کار واقعی نمایش داده نمی‌شود.',
    },
    education: {
      eyebrow: 'مرحله ۲۴',
      title: 'آموزش برای یک مسیر خلاق پایدار',
      description: 'این بخش میزبان راهنماها، درس‌ها و منابع آتلیه خواهد بود؛ با ساختاری روشن برای مطالعه در موبایل و دسکتاپ.',
      note: 'محتوا و منطق آموزش در مرحله ۲۴ اضافه می‌شود. مسیر فعلی فقط مقصد پایدار ناوبری را فراهم می‌کند.',
    },
    shop: {
      eyebrow: 'مرحله ۲۵',
      title: 'فروشگاه مالک و فضای مدیریت اثر',
      description: 'این مسیر برای هویت فروشگاه، مالکیت آثار و ابزارهای مدیریت آینده در نظر گرفته شده است.',
      note: 'هیچ منطق مالکیت یا عملیات فروشگاهی در این مرحله فعال نشده است؛ آن کار به مرحله ۲۵ موکول شده.',
    },
    commerce: {
      eyebrow: 'مرحله ۲۶',
      title: 'تجربه‌ی خرید، پس از تکمیل زیرساخت',
      description: 'مسیر خرید آینده از همین‌جا آغاز می‌شود؛ با تمرکز بر انتخاب روشن، مجوز استفاده و پرداخت امن.',
      note: 'قیمت‌گذاری، پرداخت و سفارش در این مرحله پیاده‌سازی نشده‌اند. این مقصد فقط از ایجاد پیوند مرده جلوگیری می‌کند.',
    },
    support: {
      eyebrow: 'راهنمای سایت',
      title: 'برای پیدا کردن مسیر درست اینجا هستیم',
      description: 'در نسخه‌ی فعلی می‌توانید طراحی‌ها را مرور کنید، هنرمندان را ببینید و آثار دلخواه را در مرورگر خود نگه دارید.',
      note: 'پشتیبانی حساب، سفارش و آپلود پس از اتصال دوباره‌ی سامانه‌های پشتیبان تکمیل خواهد شد.',
    },
    legal: {
      eyebrow: 'شفافیت',
      title: 'قوانین و حریم خصوصی',
      description: 'در مرحله‌ی فعلی، علاقه‌مندی‌ها فقط در مرورگر شما ذخیره می‌شوند و فرم خبرنامه هیچ داده‌ای به سرور ارسال نمی‌کند.',
      note: 'شرایط کامل استفاده، خرید و حساب کاربری هم‌زمان با فعال‌شدن قابلیت‌های مربوطه منتشر می‌شود.',
    },
  },
  en: {
    portfolio: {
      eyebrow: 'Phase 23',
      title: 'Portfolio, with the story behind each project',
      description: 'This route is prepared for personal collections, process notes, and selected project case studies.',
      note: 'Portfolio content arrives in Phase 23. No fictional work is presented here as a real portfolio.',
    },
    education: {
      eyebrow: 'Phase 24',
      title: 'Education for a sustainable creative practice',
      description: 'This area will hold atelier guides, lessons, and resources in a calm reading experience across devices.',
      note: 'Education content and learning logic are deferred to Phase 24. This page provides a stable navigation destination only.',
    },
    shop: {
      eyebrow: 'Phase 25',
      title: 'Owner shop and work management',
      description: 'This route is reserved for shop identity, ownership, and future tools for managing creative work.',
      note: 'No ownership or shop operation is enabled in this phase; that work is explicitly deferred to Phase 25.',
    },
    commerce: {
      eyebrow: 'Phase 26',
      title: 'A considered purchase experience, after the foundation',
      description: 'The future buying path begins here, with clear selection, licensing, and secure payment in view.',
      note: 'Pricing, checkout, payment, and orders are not implemented in this phase. This destination prevents a dead link without claiming commerce completion.',
    },
    support: {
      eyebrow: 'Site guide',
      title: 'A clear route to what you need',
      description: 'In the current foundation you can browse designs, meet artists, and keep favorites in your own browser.',
      note: 'Account, order, and upload support will be completed when the relevant backend systems are reconnected.',
    },
    legal: {
      eyebrow: 'Transparency',
      title: 'Terms and privacy',
      description: 'In this foundation phase, favorites stay in your browser and the newsletter form sends no data to a server.',
      note: 'Complete account, purchase, and usage terms will be published alongside those capabilities.',
    },
  },
};

function isArea(value: string): value is Area {
  return value in areaCopy.en;
}

interface Props {
  params: { locale: string; area: string };
}

export function generateMetadata({ params }: Props): Metadata {
  if (!locales.includes(params.locale as Locale) || !isArea(params.area)) return {};
  const locale = params.locale as Locale;
  return {
    title: `${areaCopy[locale][params.area].title} — ${locale === 'fa' ? 'رُزی آتلیه' : 'Rozi Atelier'}`,
    description: areaCopy[locale][params.area].description,
  };
}

export default function FoundationAreaPage({ params }: Props) {
  if (!locales.includes(params.locale as Locale) || !isArea(params.area)) notFound();
  const locale = params.locale as Locale;
  const copy = areaCopy[locale][params.area];
  const base = `/${locale}`;
  const isRTL = locale === 'fa';

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-border/60 bg-[#e6eee9]">
        <div className="absolute -end-24 -top-24 h-80 w-80 rounded-full border-[56px] border-primary/10" />
        <div className="relative mx-auto max-w-[1100px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-xs font-semibold text-primary">
            <Compass size={14} />{copy.eyebrow}
          </span>
          <h1 className="mt-7 max-w-4xl font-display text-4xl font-medium leading-tight text-[#173f3c] sm:text-6xl">{copy.title}</h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#45625e]">{copy.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="rounded-3xl border border-border bg-card p-7 shadow-sm sm:p-10">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><Leaf size={20} /></span>
            <div>
              <h2 className="text-lg font-semibold">{isRTL ? 'وضعیت این مسیر' : 'Route status'}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{copy.note}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link prefetch={false} href={base} className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              {isRTL ? 'بازگشت به خانه' : 'Back to home'}
              <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
            </Link>
            <Link prefetch={false} href={`${base}/discover`} className="inline-flex min-h-[48px] items-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">
              {isRTL ? 'مرور طراحی‌ها' : 'Browse designs'}
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
