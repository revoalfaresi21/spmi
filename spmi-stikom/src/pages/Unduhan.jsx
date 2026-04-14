import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Unduhan() {
  const [unduhans, setUnduhans] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['Semua', 'Aset Visual', 'Template', 'Panduan', 'Dokumen Lain'];

  useEffect(() => {
    const fetchUnduhan = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/unduhan`);
        
        // --- Sabuk Pengaman Ekstra Ketat ---
        let dataArray = [];
        if (Array.isArray(response.data?.data)) dataArray = response.data.data;
        else if (Array.isArray(response.data)) dataArray = response.data;
        else if (Array.isArray(response)) dataArray = response;
        
        setUnduhans(dataArray);
      } catch (error) {
        console.error("Gagal mengambil data unduhan", error);
        setUnduhans([]); // Wajib diset array kosong jika error
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnduhan();
  }, []);

  // --- Filter Aman (Mencegah error 'filter is not a function') ---
  const filteredUnduhans = Array.isArray(unduhans) 
    ? unduhans.filter(item => activeCategory === 'Semua' || item.category === activeCategory)
    : [];

  // Helper Ikon Berdasarkan Kategori
  const getIcon = (category) => {
    if (!category) return '🗃️';
    if (category.includes('Visual')) return '🎨';
    if (category.includes('Template')) return '📑';
    if (category.includes('Panduan')) return '📘';
    return '🗃️';
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in relative min-h-screen">
      
      {/* --- EFEK CAHAYA AMBIENT --- */}
      <div className="absolute top-0 right-[20%] w-100 h-100 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* --- 1. HEADER SECTION --- */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-6 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
          <span className="text-violet-400 text-xs font-bold tracking-[0.2em] uppercase">Resource Center</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Pusat <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-500">Unduhan</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">
          "Kumpulan aset visual resmi, template dokumen, dan panduan umum untuk mendukung kebutuhan administratif dan publikasi."
        </p>
      </div>

      {/* --- 2. FILTER KATEGORI --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] -translate-y-0.5'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* --- 3. GRID KARTU UNDUHAN --- */}
      {isLoading ? (
        <div className="text-center py-20 relative z-10">
          <div className="inline-block w-8 h-8 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 text-sm font-bold animate-pulse">Memuat resource center...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredUnduhans.length > 0 ? (
            filteredUnduhans.map((item) => (
              <div key={item.id} className="bg-linear-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-4xl hover:-translate-y-2 hover:border-violet-500/40 transition-all duration-500 group shadow-lg flex flex-col h-full relative overflow-hidden">
                
                {/* Efek Glow di Kanan Atas Kartu */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-500/10 blur-xl rounded-full group-hover:bg-violet-500/20 transition-all"></div>

                {/* Bagian Atas Kartu: Ikon & Ukuran */}
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
                    {getIcon(item.category)}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-lg text-[10px] font-black uppercase tracking-widest">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {item.size || 'Format Tersedia'}
                    </span>
                  </div>
                </div>

                {/* Judul & Info */}
                <div className="flex-1 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                {/* Tombol Unduh Full-Width */}
                <div className="mt-8 relative z-10">
                  {item.file_path ? (
                    // PERHATIKAN PENGGUNAAN VITE_BASE_URL DI SINI
                    <a href={`${import.meta.env.VITE_BASE_URL}${item.file_path}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-3 w-full py-3.5 bg-white/5 hover:bg-violet-600 text-white border border-white/10 hover:border-violet-500 rounded-xl text-sm font-bold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Unduh Aset
                    </a>
                  ) : (
                    <button disabled className="w-full py-3.5 bg-white/5 text-slate-600 rounded-xl text-sm font-bold border border-white/5 cursor-not-allowed">
                      File Tidak Tersedia
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] relative z-10">
              <div className="text-6xl mb-6 opacity-30 grayscale">📂</div>
              <h3 className="text-xl font-bold text-white mb-2">Belum Ada Aset</h3>
              <p className="text-slate-400 text-sm">Aset untuk kategori ini belum diunggah oleh administrator.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}