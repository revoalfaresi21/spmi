import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Akreditasi() {
  const [akreditasis, setAkreditasis] = useState([]);
  // INI YANG SEBELUMNYA HILANG:
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
      const fetchAkreditasi = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/akreditasi`);
          
          // Sabuk Pengaman Ekstra Ketat
          let dataArray = [];
          if (Array.isArray(res.data?.data)) dataArray = res.data.data;
          else if (Array.isArray(res.data)) dataArray = res.data;
          else if (Array.isArray(res)) dataArray = res;
          
          setAkreditasis(dataArray);
        } catch (error) {
          console.error("Gagal mengambil data akreditasi", error);
          setAkreditasis([]); // Wajib diset array kosong jika error
        } finally {
          setIsLoading(false); // Sekarang sakelarnya sudah ada!
        }
      };
      fetchAkreditasi();
    }, []);

  // ==========================================
  // SMART FILTER (Otomatis mendeteksi Institusi)
  // ==========================================
  const dataInstitusi = akreditasis.filter(item => 
    item.kategori === 'Institusi' || 
    item.program_studi.toLowerCase().includes('stikom') ||
    item.program_studi.toLowerCase().includes('institusi')
  );

  const dataProdi = akreditasis.filter(item => 
    item.kategori !== 'Institusi' && 
    !item.program_studi.toLowerCase().includes('stikom') &&
    !item.program_studi.toLowerCase().includes('institusi')
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* --- HEADER SECTION --- */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
          <span className="text-yellow-500 text-xs font-bold tracking-[0.2em] uppercase">Penjaminan Mutu Eksternal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Akreditasi <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">BAN-PT</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Bukti pengakuan formal dari Badan Akreditasi Nasional Perguruan Tinggi terhadap kelayakan dan mutu penyelenggaraan pendidikan di STIKOM Poltek Cirebon.
        </p>
      </div>

      {/* --- INFO CARDS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: '🎯', title: 'Tujuan Akreditasi', desc: 'Menjamin kelayakan Program Studi dan Perguruan Tinggi berdasarkan kriteria yang mengacu pada Standar Nasional Pendidikan Tinggi.', color: 'from-blue-500/20 to-transparent', border: 'border-blue-500/30', text: 'text-blue-400' },
          { icon: '⏳', title: 'Frekuensi & Masa Berlaku', desc: 'Evaluasi dilakukan secara berkala. Sertifikat akreditasi memiliki masa berlaku 5 (lima) tahun dan wajib di-reakreditasi sebelum masa kedaluwarsa.', color: 'from-yellow-500/20 to-transparent', border: 'border-yellow-500/30', text: 'text-yellow-400' },
          { icon: '🎓', title: 'Tindak Lanjut & Legalitas', desc: 'Menjadi acuan peningkatan mutu berkelanjutan (Kaizen) serta syarat mutlak legalitas ijazah lulusan untuk memasuki dunia kerja profesional.', color: 'from-emerald-500/20 to-transparent', border: 'border-emerald-500/30', text: 'text-emerald-400' }
        ].map((info, i) => (
          <div key={i} className={`bg-linear-to-b ${info.color} bg-white/5 backdrop-blur-xl border ${info.border} p-6 md:p-8 rounded-4xl hover:-translate-y-1 transition-transform duration-300 shadow-lg`}>
            <div className="text-4xl mb-4">{info.icon}</div>
            <h3 className={`text-lg font-bold ${info.text} mb-3`}>{info.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed opacity-90">{info.desc}</p>
          </div>
        ))}
      </div>

      {/* --- LOADING STATE / CONTENT --- */}
      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block w-10 h-10 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-400 text-sm font-bold animate-pulse tracking-widest uppercase">Memuat Data Akreditasi...</p>
        </div>
      ) : (
        <>
          {/* --- SECTION 1: AKREDITASI INSTITUSI (VVIP HERO CARD) --- */}
          {dataInstitusi.length > 0 && (
            <div className="mb-20">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-bold text-yellow-500 uppercase tracking-widest shrink-0">Akreditasi Institusi</h2>
                <div className="h-px flex-1 bg-linear-to-r from-yellow-500/40 to-transparent"></div>
              </div>
              
              <div className="flex justify-center">
                {dataInstitusi.map((item) => (
                  <div key={item.id} className="w-full bg-linear-to-br from-[#0B192C] to-[#0f233f] border border-yellow-500/40 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-[0_10px_40px_rgba(234,179,8,0.1)] group">
                    {/* Glow Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                      {/* Icon Samping */}
                      <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-yellow-500/10 border border-yellow-500/30 rounded-full flex items-center justify-center text-5xl md:text-6xl shadow-inner">
                        🏛️
                      </div>
                      
                      {/* Konten Utama Institusi */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] font-black uppercase tracking-widest rounded-md mb-4 border border-yellow-500/30">
                          Institusi Terakreditasi
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">{item.program_studi}</h3>
                        
                        {/* Kotak Info Detail */}
                        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8 justify-center md:justify-start">
                          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-xl flex items-center gap-3">
                            <span className="text-xs text-slate-400 uppercase font-bold">Peringkat</span>
                            <span className="text-lg font-black text-yellow-500">{item.peringkat}</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-xl flex flex-col justify-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Nomor SK</span>
                            <span className="text-sm font-mono text-white">{item.nomor_sk}</span>
                          </div>
                          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-xl flex flex-col justify-center">
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Masa Berlaku</span>
                            <span className="text-sm text-white">{item.masa_berlaku}</span>
                          </div>
                        </div>

                        {/* Tombol Download */}
                        {item.file_path && (
                          <a href={`${import.meta.env.VITE_BASE_URL}${item.file_path}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl text-sm font-black transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Unduh Sertifikat Institusi
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- SECTION 2: AKREDITASI PROGRAM STUDI (GRID) --- */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">Akreditasi Program Studi</h2>
              <div className="h-px flex-1 bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataProdi.length > 0 ? (
                dataProdi.map((item) => (
                  <div key={item.id} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl relative hover:bg-white/10 transition-colors group flex flex-col h-full">
                    {/* Aksen Biru di Kiri */}
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#3B82F6]/50 group-hover:bg-[#3B82F6] transition-colors rounded-l-3xl"></div>
                    
                    <div className="pl-4 flex-1">
                      <p className="text-[10px] text-[#3B82F6] font-black tracking-widest mb-1.5 uppercase">Program Studi</p>
                      <h3 className="text-xl font-bold text-white mb-5 leading-snug">{item.program_studi}</h3>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-xs text-slate-400 font-medium">Peringkat</span>
                          <span className="text-sm font-black text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">{item.peringkat}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-xs text-slate-400 font-medium">Nomor SK</span>
                          <span className="text-[11px] text-white font-mono">{item.nomor_sk}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-400 font-medium">Berlaku</span>
                          <span className="text-xs text-white">{item.masa_berlaku}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tombol di Bawah */}
                    <div className="pl-4 mt-auto">
                      {item.file_path ? (
                        <a href={`${import.meta.env.VITE_BASE_URL}${item.file_path}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 w-full py-2.5 bg-[#3B82F6]/10 hover:bg-[#3B82F6] text-[#3B82F6] hover:text-white border border-[#3B82F6]/20 rounded-xl text-xs font-bold transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          Lihat Sertifikat
                        </a>
                      ) : (
                        <button disabled className="w-full py-2.5 bg-white/5 text-slate-500 rounded-xl text-xs font-bold border border-white/5 cursor-not-allowed">
                          File Belum Tersedia
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <p className="text-slate-400 text-sm">Data akreditasi program studi belum tersedia.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}