import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://morrow.market'),
  title: 'Morrow — A world of pattern, made by people',
  description: 'Discover original surface designs from independent artists around the world.',
  openGraph: {
    title: 'Morrow — A world of pattern, made by people',
    description: 'Discover original surface designs from independent artists around the world.',
    images: ['https://images.pexels.com/photos/5117322/pexels-photo-5117322.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${inter.variable} ${fraunces.variable} ${inter.className}`}>{children}</body>
    </html>
  );
}
