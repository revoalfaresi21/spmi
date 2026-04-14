import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(''); // Reset pesan error

    try {
      // PERHATIKAN: Di sinilah VITE_API_URL digunakan dengan backtick (`)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email: email,
        password: password
      });

      // Jika sukses, simpan token ke localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Arahkan ke halaman Admin Dashboard (sesuaikan dengan rute Anda)
        navigate('/admin/upload'); 
      }
    } catch (error) {
      console.error("Login gagal", error);
      // Tampilkan pesan error dari backend jika ada, atau pesan bawaan
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Kredensial tidak valid. Silakan periksa kembali email dan password Anda.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#07101a]">
      
      {/* --- EFEK CAHAYA AMBIENT --- */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* --- KOTAK LOGIN (GLASSMORPHISM) --- */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          {/* Hiasan Cahaya di dalam kotak */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full"></div>

          {/* Header Login */}
          <div className="text-center mb-10 relative z-10">
            <div className="flex justify-center mb-6">
               <img 
                src="/logo.png" 
                alt="Logo STIKOM" 
                className="w-20 h-20 rounded-full object-cover border-4 border-white/10 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
              />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Otentikasi <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Sistem</span></h2>
            <p className="mt-2 text-sm text-slate-400">Masuk untuk mengakses Command Center SPMI</p>
          </div>

          {/* Pesan Error (Muncuk jika gagal login) */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-fade-in relative z-10">
              <span className="text-red-400 mt-0.5">⚠️</span>
              <p className="text-sm text-red-400 font-medium leading-relaxed">{errorMsg}</p>
            </div>
          )}

          {/* Form Login */}
          <form className="space-y-6 relative z-10" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Alamat Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-[#0B192C]/50 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none shadow-inner placeholder-slate-600" 
                placeholder="admin@stikompoltekcirebon.ac.id" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Kata Sandi</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-[#0B192C]/50 border border-white/10 rounded-xl text-white text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none shadow-inner placeholder-slate-600" 
                placeholder="••••••••" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 flex justify-center items-center gap-3 mt-4 ${
                isLoading 
                  ? 'bg-slate-700 text-slate-400 cursor-wait' 
                  : 'bg-linear-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] text-white hover:-translate-y-1'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></div>
                  Memverifikasi...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                  Masuk Sistem
                </>
              )}
            </button>
          </form>

          {/* Footer Bantuan */}
          <div className="mt-8 text-center relative z-10 border-t border-white/5 pt-6">
             <p className="text-xs text-slate-500 font-medium">Lupa kata sandi? Hubungi Tim IT Administrator.</p>
          </div>

        </div>
      </div>
    </div>
  );
}