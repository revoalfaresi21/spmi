import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AMI() {
  const [amis, setAmis] = useState([]);

  useEffect(() => {
      const fetchAMI = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/ami`);
          
          // --- Sabuk Pengaman Ekstra Ketat ---
          let dataArray = [];
          if (Array.isArray(response.data?.data)) {
            dataArray = response.data.data;
          } else if (Array.isArray(response.data)) {
            dataArray = response.data;
          } else if (Array.isArray(response)) {
            dataArray = response;
          }
          
          // UBAH 1: Gunakan setAmis, bukan setAmiData
          setAmis(dataArray); 
          
        } catch (error) {
          console.error("Gagal mengambil data AMI", error);
          // UBAH 2: Gunakan setAmis, bukan setAmiData
          setAmis([]); 
        }
      };
      fetchAMI();
    }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
      
      {/* --- HEADER SECTION --- */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span className="text-rose-500 text-xs font-bold tracking-[0.2em] uppercase">Evaluasi Standar</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Audit Mutu <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-400 to-rose-600">Internal (AMI)</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed italic">
          "Proses pengujian yang sistematis, mandiri, dan terdokumentasi untuk memastikan pelaksanaan kegiatan di STIKOM Poltek Cirebon sesuai dengan prosedur dan standar."
        </p>
      </div>

      {/* --- INFO CARDS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {[
          { icon: '🎯', title: 'Tujuan AMI', desc: 'Mengetahui kesesuaian standar dengan pelaksanaan yang dilakukan oleh berbagai unit kerja di kampus untuk menjamin budaya mutu.', color: 'from-rose-500/20 to-transparent', border: 'border-rose-500/30', text: 'text-rose-400' },
          { icon: '🔄', title: 'Frekuensi Siklus', desc: 'Dilaksanakan secara rutin minimal 1 (satu) kali dalam setahun untuk setiap unit kerja atau program studi di lingkungan kampus.', color: 'from-[#3B82F6]/20 to-transparent', border: 'border-[#3B82F6]/30', text: 'text-[#3B82F6]' },
          { icon: '📈', title: 'Tindak Lanjut', desc: 'Hasil temuan AMI digunakan sebagai dasar Rapat Tinjauan Manajemen (RTM) untuk merumuskan langkah peningkatan mutu berkelanjutan.', color: 'from-emerald-500/20 to-transparent', border: 'border-emerald-500/30', text: 'text-emerald-400' }
        ].map((info, i) => (
          <div key={i} className={`bg-linear-to-b ${info.color} bg-white/5 backdrop-blur-xl border ${info.border} p-6 md:p-8 rounded-4xl hover:-translate-y-1 transition-transform duration-300 shadow-lg`}>
            <div className="text-4xl mb-4">{info.icon}</div>
            <h3 className={`text-lg font-bold ${info.text} mb-3`}>{info.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed opacity-90">{info.desc}</p>
          </div>
        ))}
      </div>

      {/* --- HISTORY SECTION --- */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] shrink-0">Riwayat Pelaksanaan AMI</h2>
          <div className="h-px flex-1 bg-linear-to-r from-white/20 to-transparent"></div>
        </div>

        <div className="space-y-6">
          {/* UBAH 3: Tambahkan pengaman Array.isArray */}
          {Array.isArray(amis) && amis.length > 0 ? (
            amis.map((item) => (
              <div key={item.id} className="bg-linear-to-rrom-white/5 to-transparent backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-4xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-white/8 hover:border-rose-500/30 transition-all duration-300 group shadow-lg relative overflow-hidden">
                
                {/* Aksen Garis Samping */}
                <div className="absolute top-0 left-0 w-2 h-full bg-slate-800 group-hover:bg-rose-500 transition-colors"></div>

                <div className="flex items-center gap-6 pl-4">
                  {/* Ikon Dokumen */}
                  <div className="w-16 h-16 rounded-2xl bg-[#0B192C]/80 border border-white/5 flex items-center justify-center text-2xl shadow-inner shrink-0">
                    📋
                  </div>
                  
                  {/* Info Utama */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.periode || `T.A ${item.tahun_akademik} ${item.semester}`}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        {item.pelaksana || 'Tim AMI Internal'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto pl-4 md:pl-0">
                  {/* Status Badge */}
                  <div className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 shrink-0 ${
                    item.status === 'Selesai' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' // Disesuaikan karena data AMI biasanya sudah selesai saat diunggah
                  }`}>
                    {item.status === 'Sedang Berjalan' && <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>}
                    {(item.status === 'Selesai' || !item.status) && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                    {item.status || 'Selesai'}
                  </div>

                  {/* Tombol Aksi */}
                  {item.file_path ? (
                    <a href={`${import.meta.env.VITE_BASE_URL}${item.file_path}`} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-rose-500 hover:text-white text-rose-500 border border-rose-500/20 hover:border-transparent rounded-xl text-xs font-bold transition-all shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      Lihat Laporan
                    </a>
                  ) : (
                    <button disabled className="w-full sm:w-auto px-6 py-3 bg-white/5 text-slate-500 rounded-xl text-xs font-bold border border-white/5 cursor-not-allowed">
                      Belum Tersedia
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[2.5rem]">
              <div className="text-5xl mb-4 opacity-50">📂</div>
              <p className="text-slate-400">Belum ada riwayat pelaksanaan AMI yang terdaftar.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}