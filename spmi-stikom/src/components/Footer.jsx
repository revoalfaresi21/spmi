import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  // Mendefinisikan Tautan Cepat secara spesifik agar URL tidak meleset
  const tautanCepat = [
    { label: 'Beranda', url: '/' },
    { label: 'Profil', url: '/profil' },
    { label: 'Siklus PPEPP', url: '/ppepp' },
    { label: 'Dokumen Mutu', url: '/dokumen-mutu' },
    { label: 'Audit Internal (AMI)', url: '/ami' }
  ];

  return (
    <footer className="relative bg-[#07101a] border-t border-white/5 pt-20 pb-8 mt-24 overflow-hidden">
      
      {/* Efek Garis Cahaya di Atas Footer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent blur-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* --- KOLOM 1: IDENTITAS (Lebih Lebar) --- */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              
              {/* Tag Gambar Logo Bundar Baru */}
              <img 
                src="/logo.png" 
                alt="Logo STIKOM" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
              />
              
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none">
                  SPMI <span className="text-[#3B82F6]">STIKOM</span>
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
              Sistem Penjaminan Mutu Internal (SPMI) mengawal standar pendidikan, penelitian, dan pengabdian masyarakat untuk menciptakan lulusan unggul berdaya saing global.
            </p>
            
            {/* Social Media atau Tombol External */}
            <div className="flex gap-3">
              <a href="https://stikompoltekcirebon.ac.id" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-2">
                🌐 Website Utama
              </a>
              <a href="https://riset.stikompoltekcirebon.ac.id" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-2">
                📚 Portal Riset
              </a>
            </div>
          </div>

          {/* --- KOLOM 2: TAUTAN CEPAT --- */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Tautan Cepat</h3>
            <ul className="space-y-4">
              {/* Render dari Array yang sudah diperbaiki */}
              {tautanCepat.map((item, i) => (
                <li key={i}>
                  <Link to={item.url} className="text-sm text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- KOLOM 3: KONTAK --- */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Hubungi Kami</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">📍</div>
                <div>
                  <p className="text-sm text-white font-bold mb-1">STIKOM Poltek Cirebon</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Jl. Sriwijaya No. 1, Kedawung,</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Kabupaten Cirebon, Jawa Barat.</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">📧</div>
                <a href="mailto:spmi@stikompoltekcirebon.ac.id" className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
                  spmi@stikompoltekcirebon.ac.id
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- COPYRIGHT & WATERMARK BOTTOM BAR --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-xs text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} Tim IT STIKOM Poltek Cirebon. All rights reserved.
            </p>
            {/* Watermark Revo Alfaresi */}
            <p className="text-[11px] text-slate-600 font-medium flex items-center justify-center md:justify-start gap-1">
              Engineered by <span className="text-cyan-500/80 hover:text-cyan-400 transition-colors font-bold tracking-wide cursor-default">Revo Alfaresi</span>
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium mt-2 md:mt-0">
            <Link to="/login" className="hover:text-white transition-colors">Admin Login</Link>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>Versi 2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}