'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import { Search, Bookmark, Copy, Download, Share2, Sparkles, ExternalLink, FileSpreadsheet, Filter } from 'lucide-react';

// --- [1. 데이터 스키마 & 샘플 데이터] ---
const SAMPLE_STATS = [
  {
    id: "STAT_001",
    title: "주요 연령별 주 이용 소셜 미디어 플랫폼 비교",
    publisher: "과학기술정보통신부 · NIA",
    year: 2025,
    source_citation: "출처: 과학기술정보통신부·한국지능정보사회진흥원, 「2025 인터넷이용실태조사」",
    insight_summary: "20대 레이어에서는 인스타그램(68.5%)이 독보적 1위이며, 생성형 AI 기반 정보검색 채널 이용률이 전년대비 15% 상승함.",
    tags: ["20대", "인스타그램", "SNS", "생성형AI"],
    category: "소셜 미디어/이용 현황",
    data_points: [
      { name: '인스타그램', '20대': 68.5, '30대': 55.2, '40대': 31.8 },
      { name: '유튜브', '20대': 18.2, '30대': 21.5, '40대': 28.1 },
      { name: '생성형 AI', '20대': 8.4, '30대': 6.2, '40대': 3.1 },
      { name: '카카오톡', '20대': 1.8, '30대': 8.8, '40대': 19.5 },
      { name: '기타', '20대': 3.1, '30대': 8.3, '40대': 17.5 },
    ]
  }
];

const HOT_KEYWORDS = ["#20대_SNS", "#생성형AI", "#1인가구", "#숏폼시청", "#커머스트렌드"];

export default function TrendStatSite() {
  const [selectedStat, setSelectedStat] = useState(SAMPLE_STATS[0]);
  const [activeDemographic, setActiveDemographic] = useState<'20대' | '30대' | '40대'>('20대');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [copied, setCopied] = useState(false);
  const [scrapCount, setScrapCount] = useState(3);

  // 출처 복사 기능 (4번 명세)
  const handleCopyCitation = () => {
    navigator.clipboard.writeText(selectedStat.source_citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const colors = { '20대': '#3B82F6', '30대': '#10B981', '40대': '#F59E0B' };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 헤더 & 스크랩 보관함 (4번) */}
        <header className="flex items-center justify-between pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              Trend<span className="text-blue-600">Stat</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 shadow-sm">
              <Bookmark className="w-4 h-4 text-blue-600" />
              나만의 기획서 보관함 ({scrapCount})
            </button>
          </div>
        </header>

        {/* 2. 검색 및 HOT 키워드 큐레이션 (2번) */}
        <section className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
          <h2 className="text-2xl font-bold text-center">어떤 트렌드 통계 데이터가 필요하세요?</h2>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder='"20대", "인스타그램", "1인가구 소비" 등 검색...'
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-slate-400">🔥 HOT 키워드:</span>
            {HOT_KEYWORDS.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 bg-slate-800 rounded-full hover:bg-slate-700 cursor-pointer">{kw}</span>
            ))}
          </div>
        </section>

        {/* 상세 통계 카드 & 차트 시각화 (1~4번 통합) */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-8">
          
          {/* 출처 & 태그 */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">{selectedStat.category}</span>
            <span className="text-slate-500 font-medium">{selectedStat.publisher} ({selectedStat.year})</span>
          </div>

          <h3 className="text-2xl font-bold text-slate-950">{selectedStat.title}</h3>

          {/* 핵심 인사이트 1줄 요약 (2번) */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong className="font-bold mr-2">💡 Key Insight:</strong>
              {selectedStat.insight_summary}
            </p>
          </div>

          {/* 인터랙티브 차트 (3번) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-6">
            <div className="h-[320px] bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={selectedStat.data_points}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis unit="%" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={activeDemographic} fill={colors[activeDemographic]} radius={[4, 4, 0, 0]} barSize={36} />
                  </BarChart>
                ) : (
                  <LineChart data={selectedStat.data_points}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={activeDemographic} stroke={colors[activeDemographic]} strokeWidth={3} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* 필터 컨트롤 */}
            <div className="space-y-4 md:w-56">
              <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
                {(['20대', '30대', '40대'] as const).map(demo => (
                  <button 
                    key={demo} 
                    onClick={() => setActiveDemographic(demo)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${activeDemographic === demo ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    {demo}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setChartType('bar')} className={`flex-1 py-1.5 rounded-lg text-xs border ${chartType === 'bar' ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold' : 'bg-white'}`}>📊 막대</button>
                <button onClick={() => setChartType('line')} className={`flex-1 py-1.5 rounded-lg text-xs border ${chartType === 'line' ? 'bg-blue-50 border-blue-200 text-blue-600 font-bold' : 'bg-white'}`}>📈 선</button>
              </div>
            </div>
          </div>

          {/* 🎯 제안서 퀵 액션 바 (3번, 4번) */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2">
              <button onClick={handleCopyCitation} className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-sm">
                <Copy className="w-3.5 h-3.5" />
                {copied ? "출처 복사완료!" : "📋 출처문구 복사"}
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100">
                <Download className="w-3.5 h-3.5" />
                🖼️ 차트 이미지 (PNG)
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                📊 엑셀 (XLSX)
              </button>
            </div>
            
            {/* 원문 링크 및 구글 연동 */}
            <div className="flex items-center gap-2 text-xs">
              <button className="flex items-center gap-1 text-blue-600 font-semibold hover:underline">
                <ExternalLink className="w-3.5 h-3.5" />
                원문 보고서 ↗
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}