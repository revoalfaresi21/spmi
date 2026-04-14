import React from 'react';

export default function Profil() {
  const misiList = [
    "Merencanakan dan melaksanakan sistem penjaminan mutu internal secara terstruktur dan berkelanjutan.",
    "Membangun dan mengembangkan standar mutu pendidikan, penelitian, dan pengabdian kepada masyarakat.",
    "Melakukan audit mutu internal (AMI) secara berkala, independen, dan terdokumentasi.",
    "Meningkatkan kesadaran budaya mutu bagi seluruh sivitas akademika STIKOM Poltek Cirebon."
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in relative">
      
      {/* --- EFEK CAHAYA AMBIENT (BACKGROUND GLOW) --- */}
      <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* --- 1. HEADER SECTION --- */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-indigo-400 text-xs font-bold tracking-[0.2em] uppercase">Tentang Kami</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Profil <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">SPMI</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Mengenal lebih dekat struktur, visi, dan arah gerak Sistem Penjaminan Mutu Internal di lingkungan STIKOM Poltek Cirebon.
        </p>
      </div>

      {/* --- 2. VISI & MISI SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 relative z-10">
        
        {/* Kartu VISI */}
        <div className="bg-gradient-to-br from-[#3B82F6]/10 to-transparent backdrop-blur-xl border border-[#3B82F6]/20 p-10 md:p-12 rounded-[3rem] relative overflow-hidden group shadow-2xl">
          {/* Ikon Tanda Kutip Air (Watermark) */}
          <div className="absolute -right-8 -bottom-10 text-[12rem] text-[#3B82F6]/5 font-serif leading-none select-none group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700">"</div>
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/20 flex items-center justify-center text-3xl border border-[#3B82F6]/30 shadow-inner">
              👁️
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide">Visi SPMI</h2>
          </div>
          
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light relative z-10">
            "Menjadi lembaga penjaminan mutu yang <span className="text-[#3B82F6] font-bold">unggul</span> dan <span className="text-[#3B82F6] font-bold">profesional</span> dalam mengawal STIKOM Poltek Cirebon menuju institusi pendidikan tinggi yang berdaya saing global melalui penerapan budaya mutu berkelanjutan."
          </p>
        </div>

        {/* Kartu MISI */}
        <div className="bg-gradient-to-br from-rose-500/10 to-transparent backdrop-blur-xl border border-rose-500/20 p-10 md:p-12 rounded-[3rem] relative overflow-hidden group shadow-2xl">
           {/* Aksen Garis Kiri */}
           <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-rose-500 to-transparent opacity-50"></div>

          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 flex items-center justify-center text-3xl border border-rose-500/30 shadow-inner">
              🎯
            </div>
            <h2 className="text-2xl font-black text-white tracking-wide">Misi SPMI</h2>
          </div>
          
          <ul className="space-y-6 relative z-10">
            {misiList.map((misi, index) => (
              <li key={index} className="flex items-start gap-4 group/item">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0 mt-1 border border-rose-500/20 group-hover/item:bg-rose-500 group-hover/item:text-white transition-colors duration-300">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed group-hover/item:text-white transition-colors">
                  {misi}
                </p>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* --- 3. STRUKTUR ORGANISASI SECTION --- */}
      <div className="relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Struktur Organisasi</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        {/* Kanvas Blueprint */}
        <div className="bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md border border-white/10 rounded-[3rem] p-4 md:p-8 shadow-2xl">
          <div className="border-2 border-dashed border-white/10 rounded-[2rem] bg-[#0B192C]/50 p-12 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            
            {/* Animasi Scanline (Efek Teknologi) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.5)] transform -translate-y-full group-hover:animate-[scan_3s_ease-in-out_infinite]"></div>

            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              🏢
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Bagan Struktur SPMI</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
              Bagan struktur organisasi STIKOM Poltek Cirebon sedang dalam tahap penyempurnaan digital. Silakan unduh dokumen resmi SK Tim Penjaminan Mutu di bawah ini.
            </p>
            
            <button className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-1 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              Unduh SK Struktur SPMI
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}