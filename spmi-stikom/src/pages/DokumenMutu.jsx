import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DokumenMutu() {
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['Semua', 'Kebijakan', 'Manual', 'Standar', 'Formulir', 'SOP'];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dokumen-mutu`);
        
        // --- Sabuk Pengaman Ekstra Ketat ---
        let dataArray = [];
        if (Array.isArray(response.data?.data)) dataArray = response.data.data;
        else if (Array.isArray(response.data)) dataArray = response.data;
        else if (Array.isArray(response)) dataArray = response;
        
        setDocuments(dataArray);
      } catch (error) {
        console.error("Gagal mengambil dokumen", error);
        setDocuments([]); // Wajib diset array kosong jika error
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  // Logika Filter Pencarian & Kategori (Sangat Aman)
  const filteredDocuments = Array.isArray(documents) ? documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  }) : [];

  // Fungsi untuk menentukan ikon berdasarkan kategori
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Kebijakan': return '🏛️';
      case 'Manual': return '📖';
      case 'Standar': return '📏';
      case 'Formulir': return '📝';
      case 'SOP': return '⚙️';
      default: return '📄';
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in relative min-h-screen">
      
      {/* Background Glow */}
      <div className="absolute top-[5%] left-[10%] w-125 h-125 bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* --- 1. HEADER SECTION --- */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
          <span className="text-[#3B82F6] text-xs font-bold tracking-[0.2em] uppercase">Pusat Arsip Digital</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Lumbung <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3B82F6] to-cyan-400">Dokumen Mutu</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">
          "Pusat unduhan dan arsip Sistem Penjaminan Mutu Internal (SPMI) STIKOM Poltek Cirebon. Gunakan fitur pencarian untuk menemukan dokumen yang Anda butuhkan dengan cepat."
        </p>
      </div>

      {/* --- 2. CONTROL PANEL (SEARCH & FILTER) --- */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-4xl shadow-xl mb-10 sticky top-24 z-20">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full lg:w-1/3 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#3B82F6] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Ketik nama dokumen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-[#0B192C]/50 border border-white/10 focus:border-[#3B82F6]/50 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 transition-all shadow-inner"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#3B82F6] text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] -translate-y-0.5'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
        </div>
      </div>

      {/* --- 3. DOCUMENT LIST SECTION --- */}
      <div className="space-y-4 relative z-10">
        {isLoading ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-4xl">
            <div className="inline-block w-8 h-8 border-4 border-[#3B82F6]/30 border-t-[#3B82F6] rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 text-sm font-bold animate-pulse">Memuat arsip dokumen...</p>
          </div>
        ) : filteredDocuments.length > 0 ? (
          filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 pr-5 md:pr-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/8 hover:border-[#3B82F6]/40 transition-all duration-300 group shadow-lg">
              
              {/* Info Dokumen */}
              <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#3B82F6]/20 to-transparent border border-[#3B82F6]/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {getCategoryIcon(doc.category)}
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#3B82F6] transition-colors line-clamp-1">{doc.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {doc.created_at || 'Baru ditambahkan'}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span className="font-mono">{doc.size || 'PDF'}</span>
                  </div>
                </div>
              </div>

              {/* Kategori Badge & Tombol Download */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t border-white/5 md:border-t-0 pt-4 md:pt-0">
                
                <span className="px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  {doc.category}
                </span>

                {/* Tombol Unduh Menggunakan VITE_BASE_URL */}
                {doc.file_path ? (
                  <a href={`${import.meta.env.VITE_BASE_URL}${doc.file_path}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Unduh File
                  </a>
                ) : (
                  <button disabled className="px-5 py-2.5 bg-white/5 text-slate-500 rounded-xl text-xs font-bold border border-white/5 cursor-not-allowed">
                    File Kosong
                  </button>
                )}
              </div>

            </div>
          ))
        ) : (
          /* --- EMPTY STATE --- */
          <div className="text-center py-24 bg-white/5 border border-dashed border-white/10 rounded-4xl">
            <div className="text-6xl mb-6 opacity-40 grayscale">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Dokumen tidak ditemukan</h3>
            <p className="text-slate-400 text-sm">Coba gunakan kata kunci lain atau ubah filter kategori di atas.</p>
          </div>
        )}
      </div>

    </div>
  );
}