import React, { useState } from 'react';

export default function Kontak() {
  // State untuk simulasi pengiriman pesan
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulasi proses loading ke server (1.5 detik)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset status setelah 3 detik
      setTimeout(() => setSubmitStatus(null), 3000);
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in relative min-h-screen">
      
      {/* --- EFEK CAHAYA AMBIENT --- */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* --- 1. HEADER SECTION --- */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase">Pusat Layanan</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Hubungi <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kami</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Ada pertanyaan terkait penjaminan mutu, dokumen, atau jadwal audit? Silakan kirimkan pesan atau kunjungi kantor kami langsung.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* --- 2. INFORMASI KONTAK (KIRI) --- */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Kartu Alamat */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] flex items-start gap-5 hover:-translate-y-1 hover:border-cyan-500/30 transition-all duration-300 group shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 border border-cyan-500/20">
              📍
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Alamat Kampus</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">STIKOM Poltek Cirebon</p>
              <p className="text-sm text-slate-400 leading-relaxed">Jl. Tuparev, Cirebon, Jawa Barat</p>
            </div>
          </div>

          {/* Kartu Email */}
          <a href="mailto:spmi@stikompoltekcirebon.ac.id" className="block bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] flex items-start gap-5 hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300 group shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
              📧
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Email Resmi</h3>
              <p className="text-sm text-slate-400 leading-relaxed break-all">spmi@stikompoltekcirebon.ac.id</p>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity">Kirim Email →</span>
            </div>
          </a>

          {/* Kartu Telepon */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] flex items-start gap-5 hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 group shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
              📞
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Telepon / WhatsApp</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Humas: (0231) XXXXXXX</p>
              <p className="text-sm text-slate-400 leading-relaxed">Jam Kerja: 08.00 - 16.00 WIB</p>
            </div>
          </div>

        </div>

        {/* --- 3. FORMULIR KONTAK (KANAN) --- */}
        <div className="lg:col-span-7">
          <div className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            
            {/* Aksen Hiasan Form */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"></div>

            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Kirim Pesan Langsung</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              
              {/* Grid untuk Nama & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Masukkan nama Anda..." 
                    className="w-full px-4 py-3.5 bg-[#0B192C]/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Alamat Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="nama@email.com" 
                    className="w-full px-4 py-3.5 bg-[#0B192C]/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Textarea Pesan */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Isi Pesan / Pertanyaan</label>
                <textarea 
                  required
                  rows="5" 
                  placeholder="Tulis pesan Anda di sini secara detail..." 
                  className="w-full px-4 py-3.5 bg-[#0B192C]/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner placeholder:text-slate-600 resize-none custom-scrollbar"
                ></textarea>
              </div>

              {/* Status Pesan Berhasil */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 animate-fade-in">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-sm text-emerald-400 font-bold">Pesan berhasil terkirim! Kami akan segera membalasnya.</p>
                </div>
              )}

              {/* Tombol Kirim */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-2 ${
                  isSubmitting 
                    ? 'bg-slate-700 text-slate-400 cursor-wait' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}