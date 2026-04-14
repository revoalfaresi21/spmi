import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Komponen Layout
import Navbar from './components/Navbar';
import Footer from './components/footer';

// Import Halaman
import Home from './pages/Home';
import DokumenMutu from './pages/DokumenMutu';
import Profil from './pages/Profil';
import PPEPP from './pages/PPEPP';
import AMI from './pages/AMI';
import Akreditasi from './pages/Akreditasi';
import Unduhan from './pages/Unduhan';
import Kontak from './pages/Kontak';
import UploadDokumen from './pages/UploadDokumen';
import Login from './pages/Login';

function App() {
  return (
    <div className="min-h-screen bg-[#0B192C] font-['Inter',sans-serif] text-slate-300 selection:bg-[#3B82F6] selection:text-white flex flex-col">
      
      <Navbar />

      {/* Area Konten Dinamis */}
      <main className="flex-grow">
        <div className="pt-24 min-h-screen"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dokumen-mutu" element={<DokumenMutu />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/ppepp" element={<PPEPP />} />
            <Route path="/ami" element={<AMI />} />
            <Route path="/akreditasi" element={<Akreditasi />} />
            <Route path="/unduhan" element={<Unduhan />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/admin/upload" element={<UploadDokumen />} />
            <Route path="/login" element={<Login />} />

            {/* Rute 404 / Belum Dibuat */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center h-96 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">404</h2>
                <p>Halaman sedang dalam tahap pengembangan.</p>
              </div>
            } />
          </Routes>
        </div>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;