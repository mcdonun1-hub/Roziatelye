import type { Category, Creator, Design, Review } from '@/types/marketplace';
import type { Locale } from '@/lib/i18n';

/**
 * Phase 22B deterministic marketplace data.
 *
 * Public frontend routes consume this adapter instead of reaching Supabase
 * directly. The exported functions intentionally mirror the public service
 * layer so the data source can be swapped back without rewriting the UI.
 */

const BASE_CREATORS: Creator[] = [
  {
    id: 'creator-elena',
    display_name: 'Elena Marchetti',
    handle: 'elena-marchetti',
    bio: 'A Milan-based surface designer pairing Mediterranean botanicals with quiet, hand-drawn geometry.',
    location: 'Milan, Italy',
    avatar_url: '/images/artists/elena.svg',
    banner_url: '/images/patterns/mediterranean-bloom.svg',
    website_url: null,
    is_verified: true,
    status: 'approved',
    design_count: 2,
    follower_count: 1284,
    created_at: '2024-02-14T00:00:00.000Z',
    updated_at: '2026-08-20T00:00:00.000Z',
  },
  {
    id: 'creator-kenji',
    display_name: 'Kenji Watanabe',
    handle: 'kenji-watanabe',
    bio: 'A Tokyo pattern artist translating traditional structure and the rhythm of the contemporary city into precise repeats.',
    location: 'Tokyo, Japan',
    avatar_url: '/images/artists/kenji.svg',
    banner_url: '/images/patterns/asanoha-grid.svg',
    website_url: null,
    is_verified: true,
    status: 'approved',
    design_count: 2,
    follower_count: 2156,
    created_at: '2024-04-03T00:00:00.000Z',
    updated_at: '2026-08-18T00:00:00.000Z',
  },
  {
    id: 'creator-amara',
    display_name: 'Amara Okafor',
    handle: 'amara-okafor',
    bio: 'A Lagos-based illustrator building expressive textiles from layered colour, memory, and everyday movement.',
    location: 'Lagos, Nigeria',
    avatar_url: '/images/artists/amara.svg',
    banner_url: '/images/patterns/pastel-dreams.svg',
    website_url: null,
    is_verified: true,
    status: 'approved',
    design_count: 2,
    follower_count: 3421,
    created_at: '2024-05-22T00:00:00.000Z',
    updated_at: '2026-08-21T00:00:00.000Z',
  },
  {
    id: 'creator-isabella',
    display_name: 'Isabella Costa',
    handle: 'isabella-costa',
    bio: 'Botanical forms, saturated greens, and the generous energy of Rio shape Isabella’s studio practice.',
    location: 'Rio de Janeiro, Brazil',
    avatar_url: '/images/artists/isabella.svg',
    banner_url: '/images/patterns/monstera-wild.svg',
    website_url: null,
    is_verified: true,
    status: 'approved',
    design_count: 1,
    follower_count: 1879,
    created_at: '2024-06-10T00:00:00.000Z',
    updated_at: '2026-08-16T00:00:00.000Z',
  },
  {
    id: 'creator-sofia',
    display_name: 'Sofia Reyes',
    handle: 'sofia-reyes',
    bio: 'Sofia turns the warm mineral palette and open landscapes of Oaxaca into tactile, modern compositions.',
    location: 'Oaxaca, Mexico',
    avatar_url: '/images/artists/sofia.svg',
    banner_url: '/images/patterns/desert-dreams.svg',
    website_url: null,
    is_verified: false,
    status: 'approved',
    design_count: 1,
    follower_count: 893,
    created_at: '2024-07-19T00:00:00.000Z',
    updated_at: '2026-08-14T00:00:00.000Z',
  },
];

const PERSIAN_CREATOR_BIOS: Record<string, string> = {
  'elena-marchetti': 'طراح سطح ساکن میلان که گیاهان مدیترانه‌ای را با هندسه‌ای آرام و دست‌کشیده همراه می‌کند.',
  'kenji-watanabe': 'هنرمند الگو در توکیو که ساختارهای سنتی و ریتم شهر معاصر را به تکرارهای دقیق تبدیل می‌کند.',
  'amara-okafor': 'تصویرگر ساکن لاگوس که از رنگ، خاطره و حرکت روزمره، منسوجاتی زنده و لایه‌مند می‌سازد.',
  'isabella-costa': 'فرم‌های گیاهی، سبزهای اشباع و انرژی سخاوتمند ریودوژانیرو در مرکز کار ایزابلا قرار دارند.',
  'sofia-reyes': 'سوفیا رنگ‌های معدنی گرم و چشم‌اندازهای باز اوآخاکا را به ترکیب‌هایی مدرن و لمسی تبدیل می‌کند.',
};

const BASE_DESIGNS: Design[] = [
  {
    id: 'design-mediterranean-bloom', creator_id: 'creator-elena', shop_id: null,
    title: 'Mediterranean Bloom', slug: 'mediterranean-bloom',
    description: 'A generous botanical repeat inspired by sun-warmed courtyards, painted tiles, and late-summer flowers.',
    image_url: '/images/patterns/mediterranean-bloom.svg', thumbnail_url: null,
    colors: ['#F4EADB', '#D87564', '#173F3C', '#5C927F'], width_px: 3600, height_px: 3600, dpi: 300,
    is_public: true, is_featured: true, status: 'published', view_count: 4521, favorite_count: 312,
    review_count: 28, avg_rating: 4.8, published_at: '2026-08-18T00:00:00.000Z',
    created_at: '2026-07-12T00:00:00.000Z', updated_at: '2026-08-18T00:00:00.000Z',
  },
  {
    id: 'design-asanoha-grid', creator_id: 'creator-kenji', shop_id: null,
    title: 'Asanoha Grid', slug: 'asanoha-grid',
    description: 'A measured geometric study that reinterprets the asanoha motif through an architectural indigo grid.',
    image_url: '/images/patterns/asanoha-grid.svg', thumbnail_url: null,
    colors: ['#172F3F', '#E6D9C6', '#CF7F68'], width_px: 3200, height_px: 3200, dpi: 300,
    is_public: true, is_featured: true, status: 'published', view_count: 5234, favorite_count: 389,
    review_count: 31, avg_rating: 4.8, published_at: '2026-08-16T00:00:00.000Z',
    created_at: '2026-06-28T00:00:00.000Z', updated_at: '2026-08-16T00:00:00.000Z',
  },
  {
    id: 'design-pastel-dreams', creator_id: 'creator-amara', shop_id: null,
    title: 'Pastel Dreams', slug: 'pastel-dreams',
    description: 'Soft fields of rose, lilac, sage, and ochre meet in a calm composition with a hand-painted pulse.',
    image_url: '/images/patterns/pastel-dreams.svg', thumbnail_url: null,
    colors: ['#EFB5BD', '#B9D8CF', '#D6C1DE', '#F0C98F'], width_px: 4000, height_px: 4000, dpi: 300,
    is_public: true, is_featured: true, status: 'published', view_count: 6789, favorite_count: 512,
    review_count: 35, avg_rating: 4.9, published_at: '2026-08-13T00:00:00.000Z',
    created_at: '2026-06-15T00:00:00.000Z', updated_at: '2026-08-13T00:00:00.000Z',
  },
  {
    id: 'design-monstera-wild', creator_id: 'creator-isabella', shop_id: null,
    title: 'Monstera Wild', slug: 'monstera-wild',
    description: 'Oversized tropical leaves move across a soft mineral ground in an expressive, generous repeat.',
    image_url: '/images/patterns/monstera-wild.svg', thumbnail_url: null,
    colors: ['#DFE8D9', '#225B46', '#4F8C69', '#D18B62'], width_px: 3600, height_px: 3600, dpi: 300,
    is_public: true, is_featured: true, status: 'published', view_count: 5678, favorite_count: 423,
    review_count: 29, avg_rating: 4.8, published_at: '2026-08-10T00:00:00.000Z',
    created_at: '2026-06-09T00:00:00.000Z', updated_at: '2026-08-10T00:00:00.000Z',
  },
  {
    id: 'design-tokyo-night', creator_id: 'creator-kenji', shop_id: null,
    title: 'Tokyo Night', slug: 'tokyo-night',
    description: 'A cinematic city repeat where lit windows, a vermilion moon, and midnight geometry share one rhythm.',
    image_url: '/images/patterns/tokyo-night.svg', thumbnail_url: null,
    colors: ['#15192C', '#D84B4B', '#F0AA65', '#6C86A0'], width_px: 3200, height_px: 3200, dpi: 300,
    is_public: true, is_featured: false, status: 'published', view_count: 4123, favorite_count: 312,
    review_count: 24, avg_rating: 4.9, published_at: '2026-08-07T00:00:00.000Z',
    created_at: '2026-05-19T00:00:00.000Z', updated_at: '2026-08-07T00:00:00.000Z',
  },
  {
    id: 'design-desert-dreams', creator_id: 'creator-sofia', shop_id: null,
    title: 'Desert Dreams', slug: 'desert-dreams',
    description: 'Layered horizons and a clay-red sun hold the stillness and warmth of a long desert afternoon.',
    image_url: '/images/patterns/desert-dreams.svg', thumbnail_url: null,
    colors: ['#F1DFC2', '#D99D6C', '#AE6C50', '#734A3E'], width_px: 3600, height_px: 3600, dpi: 300,
    is_public: true, is_featured: false, status: 'published', view_count: 3102, favorite_count: 234,
    review_count: 17, avg_rating: 4.7, published_at: '2026-08-04T00:00:00.000Z',
    created_at: '2026-05-02T00:00:00.000Z', updated_at: '2026-08-04T00:00:00.000Z',
  },
  {
    id: 'design-indigo-loom', creator_id: 'creator-elena', shop_id: null,
    title: 'Indigo Loom', slug: 'indigo-loom',
    description: 'A woven-looking repeat of indigo crossings and terracotta details, balanced for calm interior applications.',
    image_url: '/images/patterns/indigo-loom.svg', thumbnail_url: null,
    colors: ['#E8E1D3', '#274B62', '#8AA2A8', '#D17A5F'], width_px: 3400, height_px: 3400, dpi: 300,
    is_public: true, is_featured: false, status: 'published', view_count: 2894, favorite_count: 208,
    review_count: 16, avg_rating: 4.7, published_at: '2026-08-01T00:00:00.000Z',
    created_at: '2026-04-24T00:00:00.000Z', updated_at: '2026-08-01T00:00:00.000Z',
  },
  {
    id: 'design-saffron-garden', creator_id: 'creator-amara', shop_id: null,
    title: 'Saffron Garden', slug: 'saffron-garden',
    description: 'Graphic garden forms unfold over saffron yellow in a vivid repeat made for joyful, confident spaces.',
    image_url: '/images/patterns/saffron-garden.svg', thumbnail_url: null,
    colors: ['#F2C565', '#A64050', '#244D43', '#E8E2D4'], width_px: 4000, height_px: 4000, dpi: 300,
    is_public: true, is_featured: false, status: 'published', view_count: 3540, favorite_count: 277,
    review_count: 19, avg_rating: 4.8, published_at: '2026-07-28T00:00:00.000Z',
    created_at: '2026-04-11T00:00:00.000Z', updated_at: '2026-07-28T00:00:00.000Z',
  },
];

const PERSIAN_DESIGN_COPY: Record<string, { title: string; description: string }> = {
  'mediterranean-bloom': { title: 'شکوفه‌های مدیترانه', description: 'تکراری گیاهی و سخاوتمند با الهام از حیاط‌های آفتاب‌خورده، کاشی‌های نقاشی‌شده و گل‌های آخر تابستان.' },
  'asanoha-grid': { title: 'شبکه‌ی آسانوها', description: 'مطالعه‌ای هندسی و دقیق که نقش آسانوها را در شبکه‌ای معماری و نیلی بازخوانی می‌کند.' },
  'pastel-dreams': { title: 'رویای پاستلی', description: 'سطوح آرام رز، یاسی، سبز مریم‌گلی و اخرایی در ترکیبی نرم با ضرباهنگ دست‌نقاشی کنار هم می‌نشینند.' },
  'monstera-wild': { title: 'مونسترای وحشی', description: 'برگ‌های گرمسیری بزرگ روی زمینه‌ای معدنی و روشن حرکت می‌کنند و تکراری آزاد و پرانرژی می‌سازند.' },
  'tokyo-night': { title: 'شب توکیو', description: 'تکراری سینمایی که پنجره‌های روشن، ماه قرمز و هندسه‌ی نیمه‌شب را در یک ریتم جمع می‌کند.' },
  'desert-dreams': { title: 'رؤیای کویر', description: 'افق‌های لایه‌لایه و خورشیدی به رنگ رس، سکوت و گرمای یک عصر بلند کویری را نگه می‌دارند.' },
  'indigo-loom': { title: 'دار نیلی', description: 'تلاقی‌های نیلی و جزئیات سفالی، تکراری با حس بافت می‌سازند که برای فضاهای آرام متعادل شده است.' },
  'saffron-garden': { title: 'باغ زعفرانی', description: 'فرم‌های گرافیکی باغ روی زرد زعفرانی باز می‌شوند؛ تکراری روشن برای فضاهای شاد و جسور.' },
};

const BASE_CATEGORIES: Category[] = [
  { id: 'category-floral', name: 'Floral', slug: 'floral', description: 'Expressive blooms and garden forms', icon_name: 'Flower2', design_count: 2 },
  { id: 'category-geometric', name: 'Geometric', slug: 'geometric', description: 'Measured repeats and structured rhythm', icon_name: 'Hexagon', design_count: 2 },
  { id: 'category-abstract', name: 'Abstract', slug: 'abstract', description: 'Colour-led compositions and movement', icon_name: 'Sparkles', design_count: 1 },
  { id: 'category-botanical', name: 'Botanical', slug: 'botanical', description: 'Leaves, stems, and generous natural forms', icon_name: 'Leaf', design_count: 1 },
  { id: 'category-watercolor', name: 'Watercolour', slug: 'watercolor', description: 'Soft edges and painterly layers', icon_name: 'Droplets', design_count: 1 },
  { id: 'category-minimalist', name: 'Minimal', slug: 'minimalist', description: 'Quiet palettes and restrained geometry', icon_name: 'Minus', design_count: 1 },
];

const PERSIAN_CATEGORY_NAMES: Record<string, string> = {
  floral: 'گل‌دار',
  geometric: 'هندسی',
  abstract: 'انتزاعی',
  botanical: 'گیاه‌شناسی',
  watercolor: 'آبرنگی',
  minimalist: 'مینیمال',
};

export const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  floral: '/images/patterns/mediterranean-bloom.svg',
  geometric: '/images/patterns/asanoha-grid.svg',
  abstract: '/images/patterns/desert-dreams.svg',
  botanical: '/images/patterns/monstera-wild.svg',
  watercolor: '/images/patterns/pastel-dreams.svg',
  minimalist: '/images/patterns/indigo-loom.svg',
};

const DESIGN_CATEGORY_BY_SLUG: Record<string, string> = {
  'mediterranean-bloom': 'floral',
  'saffron-garden': 'floral',
  'asanoha-grid': 'geometric',
  'indigo-loom': 'geometric',
  'tokyo-night': 'abstract',
  'monstera-wild': 'botanical',
  'pastel-dreams': 'watercolor',
  'desert-dreams': 'minimalist',
};

const BASE_REVIEWS: Review[] = [
  { id: 'review-1', design_id: 'design-mediterranean-bloom', creator_id: 'creator-amara', rating: 5, comment: 'Beautifully balanced colour and a repeat that feels both warm and contemporary.', created_at: '2026-08-22T00:00:00.000Z' },
  { id: 'review-2', design_id: 'design-mediterranean-bloom', creator_id: 'creator-kenji', rating: 5, comment: 'The hand-drawn botanical rhythm is especially considered.', created_at: '2026-08-20T00:00:00.000Z' },
  { id: 'review-3', design_id: 'design-asanoha-grid', creator_id: 'creator-elena', rating: 5, comment: 'Precise, calm, and very adaptable across scales.', created_at: '2026-08-19T00:00:00.000Z' },
  { id: 'review-4', design_id: 'design-pastel-dreams', creator_id: 'creator-sofia', rating: 5, comment: 'The layered colour feels soft without losing its energy.', created_at: '2026-08-17T00:00:00.000Z' },
];

function localizeCreator(creator: Creator, locale: Locale): Creator {
  return {
    ...creator,
    bio: locale === 'fa' ? PERSIAN_CREATOR_BIOS[creator.handle] ?? creator.bio : creator.bio,
  };
}

function localizeDesign(design: Design, locale: Locale): Design {
  const copy = locale === 'fa' ? PERSIAN_DESIGN_COPY[design.slug] : undefined;
  const creator = BASE_CREATORS.find((item) => item.id === design.creator_id);
  return {
    ...design,
    ...(copy ?? {}),
    colors: [...design.colors],
    creators: creator ? localizeCreator(creator, locale) : undefined,
  };
}

export function getLocalDesigns(locale: Locale): Design[] {
  return BASE_DESIGNS.map((design) => localizeDesign(design, locale));
}

export function getLocalFeaturedDesigns(locale: Locale, limit = 12): Design[] {
  return getLocalDesigns(locale).slice(0, limit);
}

export function getLocalDesignBySlug(slug: string, locale: Locale): Design | null {
  const design = BASE_DESIGNS.find((item) => item.slug === slug);
  return design ? localizeDesign(design, locale) : null;
}

export function getLocalDesignsByCreator(
  creatorId: string,
  locale: Locale,
  excludeId?: string,
  limit = 8
): Design[] {
  return BASE_DESIGNS
    .filter((design) => design.creator_id === creatorId && design.id !== excludeId)
    .slice(0, limit)
    .map((design) => localizeDesign(design, locale));
}

export function getLocalDesignsByCategory(designs: Design[], categorySlug: string): Design[] {
  if (categorySlug === 'all') return [...designs];
  return designs.filter((design) => DESIGN_CATEGORY_BY_SLUG[design.slug] === categorySlug);
}

export function getLocalCategories(locale: Locale): Category[] {
  return BASE_CATEGORIES.map((category) => ({
    ...category,
    name: locale === 'fa' ? PERSIAN_CATEGORY_NAMES[category.slug] ?? category.name : category.name,
  }));
}

export function getLocalCreators(locale: Locale): Creator[] {
  return BASE_CREATORS.map((creator) => localizeCreator(creator, locale));
}

export function getLocalCreatorByHandle(handle: string, locale: Locale): Creator | null {
  const creator = BASE_CREATORS.find((item) => item.handle === handle);
  return creator ? localizeCreator(creator, locale) : null;
}

export function getLocalReviewsByDesign(designId: string, locale: Locale): Review[] {
  const comments: Record<string, string> = {
    'review-1': 'تعادل رنگ‌ها زیباست و تکرار، هم گرم و هم معاصر به نظر می‌رسد.',
    'review-2': 'ریتم دست‌کشیده‌ی عناصر گیاهی بسیار سنجیده است.',
    'review-3': 'دقیق، آرام و در مقیاس‌های مختلف بسیار انعطاف‌پذیر است.',
    'review-4': 'رنگ‌های لایه‌مند، لطافت خود را بدون از دست دادن انرژی حفظ کرده‌اند.',
  };

  return BASE_REVIEWS
    .filter((review) => review.design_id === designId)
    .map((review) => {
      const creator = BASE_CREATORS.find((item) => item.id === review.creator_id);
      return {
        ...review,
        comment: locale === 'fa' ? comments[review.id] ?? review.comment : review.comment,
        creators: creator ? localizeCreator(creator, locale) : undefined,
      };
    });
}
