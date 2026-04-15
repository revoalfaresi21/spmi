import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Deteksi scroll untuk mengubah gaya Navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil', path: '/profil' },
    { name: 'Dokumen Mutu', path: '/dokumen-mutu' },
    { name: 'Siklus PPEPP', path: '/ppepp' },
    { name: 'AMI', path: '/ami' },
    { name: 'Akreditasi', path: '/akreditasi' },
    { name: 'Unduhan', path: '/unduhan' },
    { name: 'Kontak', path: '/kontak' },
  ];

  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-[#0B192C]/85 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] py-1' 
          : 'bg-[#0B192C]/40 backdrop-blur-md border-transparent py-3'
      }`}
    >
      {/* Garis Gradasi Tipis di Bawah Navbar */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#3B82F6]/50 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- LOGO --- */}
          <Link to="/" className="shrink-0 flex items-center gap-4 group">
            <div className="relative">
              {/* Efek Cahaya di belakang logo */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:bg-[#3B82F6]/30 transition-colors duration-500"></div>
              <img 
                src="/logo.png" 
                alt="Logo STIKOM" 
                className="relative w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-white/20 drop-shadow-xl group-hover:scale-105 group-hover:border-white/40 transition-all duration-300" 
              />
            </div>
            <div className="font-black text-lg md:text-xl tracking-wider text-white flex flex-col justify-center">
              <span className="leading-none group-hover:text-cyan-100 transition-colors">
                SPMI <span className="text-transparent bg-clip-text bg-linear-to-r from-[#3B82F6] to-cyan-400">STIKOM</span>
              </span>
            </div>
          </Link>
          
          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-white/5 px-2 py-1.5 rounded-full border border-white/5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`relative px-4 py-2 rounded-full text-xs lg:text-sm font-bold tracking-wide transition-all duration-300 group ${
                    isActive 
                      ? 'bg-[#3B82F6]/10 text-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  {/* Titik Cahaya Biru untuk Menu Aktif */}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                isMenuOpen ? 'bg-[#3B82F6]/20 text-[#3B82F6]' : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0B192C]/95 backdrop-blur-2xl border-white/10 shadow-2xl absolute w-full left-0 ${
          isMenuOpen ? 'max-h-125 border-b opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`block px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive 
                    ? 'bg-linear-to-r from-[#3B82F6]/20 to-transparent text-[#3B82F6] border-l-4 border-[#3B82F6] translate-x-1' 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border-l-4 border-transparent hover:translate-x-1'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;