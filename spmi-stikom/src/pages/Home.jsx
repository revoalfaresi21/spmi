import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="animate-fade-in relative overflow-hidden min-h-screen">
      
      {/* --- EFEK CAHAYA AMBIENT (BACKGROUND GLOW) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#3B82F6]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-10%] w-100 h-100 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Label Atas */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
          <span className="text-[#3B82F6] text-xs font-bold tracking-[0.2em] uppercase">Sistem Penjaminan Mutu Internal</span>
        </div>

        {/* Judul Utama */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
          Budaya Mutu <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-[#3B82F6] to-indigo-500">
            STIKOM Poltek Cirebon
          </span>
        </h1>

        {/* Deskripsi */}
        <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10">
          Membangun keunggulan akademik yang berkelanjutan melalui Siklus Penetapan, Pelaksanaan, Evaluasi, Pengendalian, dan Peningkatan (PPEPP) untuk menghasilkan lulusan yang berdaya saing global.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <Link to="/dokumen-mutu" className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] hover:-translate-y-1 flex justify-center items-center gap-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Akses Dokumen Mutu
          </Link>
          
          <Link to="/akreditasi" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 rounded-2xl font-bold transition-all duration-300 hover:-translate-y-1 flex justify-center items-center gap-3">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Status Akreditasi BAN-PT
          </Link>
        </div>
      </div>

      {/* --- KOMPONEN UTAMA SECTION --- */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Judul Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Komponen Utama SPMI</h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-rose-500 via-[#3B82F6] to-cyan-400 mx-auto rounded-full"></div>
        </div>

        {/* Grid Kartu Interaktif */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kartu 1: PPEPP */}
          <Link to="/ppepp" className="block bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl hover:-translate-y-2 hover:bg-white/8 hover:border-[#3B82F6]/40 transition-all duration-300 group shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-180 transition-transform duration-700">
              🔄
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#3B82F6] transition-colors">Siklus PPEPP</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Sistem penjaminan mutu yang terintegrasi secara sistematis dari tahap penetapan hingga peningkatan standar.</p>
            <div className="flex items-center text-sm font-bold text-[#3B82F6] group-hover:gap-2 transition-all">
              Pelajari lebih lanjut <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
            </div>
          </Link>

          {/* Kartu 2: AMI */}
          <Link to="/ami" className="block bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl hover:-translate-y-2 hover:bg-white/8 hover:border-rose-500/40 transition-all duration-300 group shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
              🎯
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">Audit Mutu Internal</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">Evaluasi berkala secara mandiri untuk memastikan kepatuhan terhadap standar mutu yang telah ditetapkan di awal.</p>
            <div className="flex items-center text-sm font-bold text-rose-400 group-hover:gap-2 transition-all">
              Lihat riwayat audit <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
            </div>
          </Link>

          {/* Kartu 3: Akreditasi */}
          <Link to="/akreditasi" className="block bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl hover:-translate-y-2 hover:bg-white/8 hover:border-yellow-500/40 transition-all duration-300 group shadow-lg relative overflow-hidden">
            {/* Aksen Glow Sudut */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 blur-2xl rounded-full"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
              🏆
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors relative z-10">Akreditasi BAN-PT</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">Pengakuan eksternal dan legalitas dari BAN-PT atas kualitas dan mutu penyelenggaraan pendidikan perguruan tinggi.</p>
            <div className="flex items-center text-sm font-bold text-yellow-500 group-hover:gap-2 transition-all relative z-10">
              Cek status akreditasi <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">→</span>
            </div>
          </Link>

        </div>
      </div>

    </div>
  );
}