import { Document, ActiveTab } from '../types';
import { Search, FileText, Megaphone, Briefcase, Scroll, ClipboardList, CreditCard, BellRing, ArrowRight, Download, Eye, Handshake, Heart, GraduationCap } from 'lucide-react';
import React, { useState } from 'react';

interface HomeScreenProps {
  documents: Document[];
  onViewDocument: (doc: Document) => void;
  onDownloadDocument: (doc: Document) => void;
  onNavigateToTab: (tab: ActiveTab, search?: string, category?: string) => void;
}

export default function HomeScreen({
  documents,
  onViewDocument,
  onDownloadDocument,
  onNavigateToTab
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Get latest 3 uploads
  const latestUploads = documents.filter(doc => doc.isLatest).slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigateToTab('documents', searchQuery, undefined);
    } else {
      onNavigateToTab('documents');
    }
  };

  const categoriesList = [
    { name: 'Circulars', icon: Scroll, dbCategory: 'Circulars', bg: 'bg-indigo-50 text-indigo-700 hover:border-indigo-500' },
    { name: 'Exam Forms', icon: ClipboardList, dbCategory: 'Forms', bg: 'bg-blue-50 text-blue-700 hover:border-blue-500' },
    { name: 'Scholarship', icon: CreditCard, dbCategory: 'Scholarship', bg: 'bg-emerald-50 text-emerald-700 hover:border-emerald-500' },
    { name: 'Placement', icon: Briefcase, dbCategory: 'Placement', bg: 'bg-amber-50 text-amber-700 hover:border-amber-500' },
    { name: 'Industry Connect', icon: Handshake, dbCategory: 'Industry Connect', bg: 'bg-cyan-50 text-cyan-700 hover:border-cyan-500' },
    { name: 'Wellness & Care', icon: Heart, dbCategory: 'Wellness & Care', bg: 'bg-pink-50 text-pink-700 hover:border-pink-500' },
    { name: 'Faculty', icon: GraduationCap, dbCategory: 'Faculty', bg: 'bg-purple-50 text-purple-700 hover:border-purple-500' },
    { name: 'Academic Notices', icon: BellRing, dbCategory: 'Notices', bg: 'bg-rose-50 text-rose-700 hover:border-rose-500' }
  ];

  // Helper to choose corresponding icons for Latest Upload cards
  const getLatestCardIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('exam') || cat.includes('schedule')) {
      return ClipboardList;
    }
    if (cat.includes('scholarship')) {
      return CreditCard;
    }
    if (cat.includes('placement')) {
      return Briefcase;
    }
    if (cat.includes('industry') || cat.includes('connect')) {
      return Handshake;
    }
    if (cat.includes('wellness') || cat.includes('care')) {
      return Heart;
    }
    if (cat.includes('faculty')) {
      return GraduationCap;
    }
    return FileText;
  };

  const getLatestCardBadgeColor = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('exam')) return 'bg-blue-50 text-blue-800 border-blue-200';
    if (cat.includes('scholarship')) return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    if (cat.includes('placement')) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (cat.includes('industry') || cat.includes('connect')) return 'bg-cyan-50 text-cyan-800 border-cyan-200';
    if (cat.includes('wellness') || cat.includes('care')) return 'bg-pink-50 text-pink-800 border-pink-200';
    if (cat.includes('faculty')) return 'bg-purple-50 text-purple-800 border-purple-200';
    return 'bg-indigo-50 text-indigo-800 border-indigo-200';
  };

  return (
    <div className="animate-fade-in space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-150 overflow-hidden text-center">
        {/* Decorative background radial pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-100/60 px-3.5 py-1.5 rounded-full border border-blue-200 inline-block">
            'Under the initiative of Industry Connect'
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-blue-900 leading-tight">
            TKMIT Student Document Portal
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Access institutional circulars, academic notices, and scholarship forms through our streamlined digital archive.
          </p>

          {/* Quick Search Block */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mt-8 relative" id="hero-quick-search">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for circulars, notices, or forms..."
              className="w-full pl-12 pr-32 py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all shadow-sm outline-none text-sm text-gray-800 font-medium placeholder-gray-400"
            />
            <div className="absolute inset-y-1.5 right-1.5">
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 h-full rounded-lg font-bold text-xs hover:bg-blue-900 active:scale-95 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* LATEST UPLOADS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span>Latest Uploads</span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">Most recent updates from administration</p>
          </div>
          <button
            onClick={() => onNavigateToTab('documents')}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline hover:text-blue-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Archive</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Latest Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestUploads.map((doc, idx) => {
            const CardIcon = getLatestCardIcon(doc.category);
            const badgeColor = getLatestCardBadgeColor(doc.category);
            const relativeTime = idx === 0 ? '2 Hours Ago' : idx === 1 ? '5 Hours Ago' : 'Yesterday';

            return (
              <div
                key={doc.id}
                className="bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group h-full relative"
                id={`latest-card-${doc.id}`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2.5 rounded-lg border ${badgeColor}`}>
                      <CardIcon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded border border-gray-200">
                      {relativeTime}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight leading-snug group-hover:text-blue-900 line-clamp-2 transition-colors mb-2">
                    {doc.title}
                  </h3>
                  
                  <div className="text-[11px] text-gray-400 font-medium mb-6">
                    <span>{doc.filename}</span>
                    <span className="mx-1.5">•</span>
                    <span>{doc.size}</span>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => onDownloadDocument(doc)}
                    className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-2 rounded-lg font-bold text-xs active:scale-98 transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={() => onViewDocument(doc)}
                    className="px-3 border border-gray-300 hover:border-blue-800 hover:bg-blue-50/40 text-gray-700 hover:text-blue-900 py-2 rounded-lg font-semibold text-xs active:scale-98 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BROWSE BY CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-8">
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categoriesList.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => onNavigateToTab('documents', undefined, cat.dbCategory)}
                className={`flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all text-center group cursor-pointer ${cat.bg}`}
                id={`browse-cat-${cat.name.replace(' ', '-').toLowerCase()}`}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 group-hover:bg-blue-800/10 text-blue-900 flex items-center justify-center mb-4 transition-all group-hover:scale-110">
                  <CatIcon className="h-6 w-6 text-blue-800" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight group-hover:text-blue-900">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* VISUAL ANCHOR: CAMPUS ATHMOSPHERE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[360px] group shadow-lg border border-gray-200">
          <img
            alt="Campus Library"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 select-none pointer-events-none"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJbytjjPaVSmbB0celMW6mUOMqzbk8BkPiEjqJKBXabhKNUtv_6U4fpK1AChSgCFIlD9O7m34gHX-X4vRTWWQ8z9uymkfLNzusIKw2HxMbGzUGCZ4xyUmZ530ziCcDf5NzvK9TQEDAE7d4zfokcx4_2K4GISz-6xjQr2mO4F9r9E5a-WqYu-zS2OVZjBUIG9y7NmDLJW0kvz_tcz0CPAmSHO616LC8DVFElPchNiGbXJ0GZbc3SpBnkD2cTUYGAZPSv9ffeziKODXt"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent flex flex-col justify-end p-6 sm:p-12 text-left">
            <h2 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl mb-3 tracking-tight">
              Dedicated to Excellence
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
              TKM Institute of Technology is committed to providing seamless access to essential educational resources and administrative information for every student.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
