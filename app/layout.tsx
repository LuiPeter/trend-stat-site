import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TrendStat - 마케터를 위한 데이터 큐레이션',
  description: '주요 미디어 리포트 통계 데이터 검색 및 시각화 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}