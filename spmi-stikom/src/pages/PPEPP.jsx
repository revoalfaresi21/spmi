import React from 'react';

export default function PPEPP() {
  // Data Siklus PPEPP dengan palet warna dan ikon khusus
  const steps = [
    {
      id: 'P1',
      letter: 'P',
      title: 'Penetapan',
      desc: 'Tahap awal berupa perancangan dan penetapan Standar Pendidikan Tinggi (Standar Dikti) serta standar tambahan spesifik yang berlaku di lingkungan STIKOM Poltek Cirebon.',
      icon: '🎯',
      color: 'from-cyan-400 to-blue-600',
      textColor: 'text-cyan-400',
      borderColor: 'group-hover:border-cyan-500/50',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]'
    },
    {
      id: 'P2',
      letter: 'P',
      title: 'Pelaksanaan',
      desc: 'Proses penerapan dan pelaksanaan standar mutu yang telah ditetapkan pada tahap sebelumnya ke dalam setiap kegiatan akademik maupun non-akademik.',
      icon: '⚙️',
      color: 'from-emerald-400 to-green-600',
      textColor: 'text-emerald-400',
      borderColor: 'group-hover:border-emerald-500/50',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]'
    },
    {
      id: 'E',
      letter: 'E',
      title: 'Evaluasi',
      desc: 'Melakukan pemantauan dan pengukuran terhadap hasil pelaksanaan standar. Evaluasi ini utamanya dilakukan melalui kegiatan Audit Mutu Internal (AMI).',
      icon: '🔍',
      color: 'from-yellow-400 to-amber-600',
      textColor: 'text-yellow-400',
      borderColor: 'group-hover:border-yellow-500/50',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(250,204,21,0.2)]'
    },
    {
      id: 'P3',
      letter: 'P',
      title: 'Pengendalian',
      desc: 'Analisis hasil evaluasi untuk melakukan tindakan koreksi apabila ditemukan ketidaksesuaian atau penyimpangan terhadap standar yang telah ditetapkan.',
      icon: '⚖️',
      color: 'from-orange-400 to-red-500',
      textColor: 'text-orange-400',
      borderColor: 'group-hover:border-orange-500/50',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]'
    },
    {
      id: 'P4',
      letter: 'P',
      title: 'Peningkatan',
      desc: 'Upaya meningkatkan dan mengembangkan standar mutu secara berkelanjutan (Kaizen) agar melampaui standar sebelumnya demi keunggulan institusi.',
      icon: '🚀',
      color: 'from-rose-400 to-pink-600',
      textColor: 'text-rose-400',
      borderColor: 'group-hover:border-rose-500/50',
      shadow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]'
    }
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in relative min-h-screen overflow-hidden">
      
      {/* --- EFEK CAHAYA AMBIENT (BACKGROUND GLOW) --- */}
      <div className="absolute top-[5%] left-[10%] w-125 h-125 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[5%] right-[10%] w-125 h-125 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* --- 1. HEADER SECTION --- */}
      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] animate-pulse"></span>
          <span className="text-[#3B82F6] text-xs font-bold tracking-[0.2em] uppercase">Siklus Penjaminan Mutu</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
          Siklus <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-[#3B82F6] to-indigo-500">PPEPP</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          STIKOM Poltek Cirebon menerapkan siklus PPEPP secara konsisten sebagai landasan utama dalam membangun dan mengembangkan budaya mutu yang berkelanjutan.
        </p>
      </div>

      {/* --- 2. TIMELINE SECTION --- */}
      <div className="relative max-w-5xl mx-auto z-10 py-10">
        
        {/* Garis Vertikal Tengah (Glow Line) */}
        <div className="absolute left-9.75 md:left-1/2 top-0 bottom-0 w-1.5 bg-linear-to-b from-cyan-500 via-yellow-500 to-rose-500 rounded-full opacity-30 transform md:-translate-x-1/2"></div>

        {/* Pemetaan Item Siklus */}
        <div className="space-y-16">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0; // Menentukan posisi kiri atau kanan untuk Desktop
            
            return (
              <div key={step.id} className={`relative flex items-center justify-between w-full ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'} flex-row-reverse group`}>
                
                {/* Spasi Kosong untuk menyeimbangkan Flexbox di Desktop */}
                <div className="hidden md:block w-5/12"></div>

                {/* Node Tengah (Bulatan Huruf) */}
                <div className="z-20 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-[#0B192C] shadow-[0_0_0_6px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_0_8px_rgba(255,255,255,0.08)] rounded-full border-2 border-slate-700 group-hover:border-white/40 transition-all duration-500 shrink-0">
                  <span className={`text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-linear-to-br ${step.color} group-hover:scale-110 transition-transform duration-300`}>
                    {step.letter}
                  </span>
                </div>

                {/* Kartu Konten */}
                <div className="w-[calc(100%-6rem)] md:w-5/12">
                  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 ${step.borderColor} ${step.shadow}`}>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${step.color} bg-opacity-10 p-px`}>
                        <div className="w-full h-full bg-[#0B192C]/80 rounded-2xl flex items-center justify-center text-2xl">
                          {step.icon}
                        </div>
                      </div>
                      <h3 className={`text-2xl font-black ${step.textColor} tracking-tight`}>
                        {titleCase(step.title)} {/* Fungsi tambahan jika diperlukan, tapi title sudah sesuai */}
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                      {step.desc}
                    </p>
                    
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

// Fungsi kecil agar teks kapital rapi (opsional)
function titleCase(str) {
  return '';
}