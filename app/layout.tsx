import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '오늘의 장사 운세 - 자영업자를 위한 매일의 운세',
  description: '자영업자를 위한 매일의 장사 운세를 확인해보세요. 매출, 손님, 이벤트 운세와 함께 실용적인 조언을 받아보세요.',
  keywords: '장사운세, 사업운세, 자영업, 운세, 매일운세, 사업자운세, 점집, 오늘의운세',
  authors: [{ name: '오늘의 장사 운세' }],
  creator: '오늘의 장사 운세',
  publisher: '오늘의 장사 운세',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '오늘의 장사 운세',
    description: '자영업자를 위한 매일의 장사 운세를 확인해보세요.',
    url: '/',
    siteName: '오늘의 장사 운세',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '오늘의 장사 운세',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '오늘의 장사 운세',
    description: '자영업자를 위한 매일의 장사 운세를 확인해보세요.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE,
    other: {
      'naver-site-verification': process.env.NAVER_VERIFICATION_CODE || '',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFD700" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="오늘의 장사 운세" />
        
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '오늘의 장사 운세',
              description: '자영업자를 위한 매일의 장사 운세 서비스',
              url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
              applicationCategory: 'Entertainment',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW'
              },
              author: {
                '@type': 'Organization',
                name: '오늘의 장사 운세'
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        
        {/* Vercel Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}