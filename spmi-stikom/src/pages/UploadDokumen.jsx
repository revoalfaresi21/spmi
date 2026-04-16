import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ==========================================
// KOMPONEN UTAMA (DASHBOARD ADMIN)
// ==========================================
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dokumen');
  const navigate = useNavigate();

  // Proteksi Halaman
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  const handleLogout = async () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari panel admin?')) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (error) {
        console.error('Logout error', error);
      } finally {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  const tabs = [
    { id: 'dokumen', label: 'Dokumen Mutu', icon: '📄', color: 'blue' },
    { id: 'akreditasi', label: 'Akreditasi', icon: '🏆', color: 'yellow' },
    { id: 'ami', label: 'Laporan AMI', icon: '🎯', color: 'rose' },
    { id: 'unduhan', label: 'Unduhan', icon: '🗃️', color: 'violet' },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-360 mx-auto animate-fade-in min-h-screen flex flex-col">
      
      {/* --- HEADER ADMIN --- */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-4xladow-2xl mb-8 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-linear-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Command <span className="text-transparent bg-clip-text bg-linear-to-rrom-cyan-400 to-blue-500">Center</span></h1>
            <p className="text-sm text-slate-400 font-medium">Sistem Penjaminan Mutu Internal - Mode Administrator</p>
          </div>
        </div>

        <button onClick={handleLogout} className="relative z-10 px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-red-500 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Akhiri Sesi
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 growtive z-10">
        {/* --- SIDEBAR NAVIGASI --- */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl p-4 sticky top-28 shadow-xl">
            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4 px-4 pt-2">Modul Manajemen</h2>
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? `bg-${tab.color}-500 text-white shadow-[0_0_20px_rgba(var(--tw-color-${tab.color}-500),0.4)]`
                      : 'text-slate-400 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  Kelola {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- AREA KONTEN (TABS) --- */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-150">
          <div className="transition-opacity duration-300">
            {activeTab === 'dokumen' && <TabDokumenMutu />}
            {activeTab === 'akreditasi' && <TabAkreditasi />}
            {activeTab === 'ami' && <TabAMI />}
            {/* TAMBAHKAN BARIS DI BAWAH INI */}
            {activeTab === 'unduhan' && <TabUnduhan />}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MODUL 1: POST & DELETE DOKUMEN MUTU
// ==========================================
function TabDokumenMutu() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Kebijakan' });
  const [file, setFile] = useState(null);

  const categories = ['Kebijakan', 'Manual', 'Standar', 'Formulir', 'SOP'];

const fetchDocs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/dokumen-mutu`);
      
      // Sabuk Pengaman Ekstra Ketat
      // Pastikan kita mengekstrak array-nya, entah itu ada di res.data.data, res.data, atau res sendiri
      let dataArray = [];
      if (Array.isArray(res.data.data)) {
        dataArray = res.data.data;
      } else if (Array.isArray(res.data)) {
        dataArray = res.data;
      } else if (Array.isArray(res)) {
        dataArray = res;
      }

      setDocuments(dataArray);

    } catch (err) { 
      console.error("Error fetching docs:", err);
      setDocuments([]); // Set ke array kosong jika error
    }
  };
  useEffect(() => { fetchDocs(); }, []);

  // FUNGSI POST (TAMBAH DATA)
  const handlePost = async (e) => {
    e.preventDefault();
    if (!form.title || !file) return alert('Data belum lengkap!');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('file', file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/dokumen-mutu`, formData, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setForm({ title: '', category: 'Kebijakan' }); setFile(null);
      document.getElementById('file-upload').value = '';
      fetchDocs(); // Refresh tabel setelah sukses POST
    } catch (err) { alert('Gagal mengunggah dokumen.'); } 
    finally { setIsLoading(false); }
  };

  // FUNGSI DELETE (HAPUS DATA)
  const handleDelete = async (id) => {
    if (window.confirm('PERINGATAN: Dokumen ini akan dihapus permanen. Lanjutkan?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/dokumen-mutu/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        fetchDocs(); // Refresh tabel setelah sukses DELETE
      } catch (err) { alert('Gagal menghapus dokumen.'); }
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 animate-fade-in">
      
      {/* FORM POST */}
      <div className="xl:col-span-4">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2"><span className="text-[#3B82F6]">➕</span> Unggah Baru</h2>
        <form onSubmit={handlePost} className="space-y-5 bg-[#0B192C]/50 border border-white/10 p-6 rounded-3xl">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Judul Dokumen</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all outline-none" placeholder="Ketik judul resmi..." />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Kategori</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 bg-[#0f233f] border border-white/10 rounded-xl text-white text-sm focus:border-[#3B82F6] transition-all outline-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">File (PDF)</label>
            <input id="file-upload" type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-[#3B82F6]/20 file:text-[#3B82F6] file:font-bold hover:file:bg-[#3B82F6] hover:file:text-white transition-all cursor-pointer" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-3.5 mt-4 bg-linear-to-r from-[#3B82F6] to-cyan-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all">
            {isLoading ? 'Mengunggah...' : 'Simpan Dokumen'}
          </button>
        </form>
      </div>

      {/* TABEL LIST & DELETE */}
      <div className="xl:col-span-8">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2"><span className="text-cyan-400">🗂️</span> Database Dokumen</h2>
        <div className="bg-[#0B192C]/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col h-150">
          <div className="overflow-y-auto custom-scrollbar p-4 space-y-3 flex-1">
            {/* Cek ganda: apakah documents itu array dan apakah panjangnya > 0 */}
            {Array.isArray(documents) && documents.length > 0 ? documents.map(doc => (
              <div key={doc.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4 hover:border-[#3B82F6]/50 transition-colors group">
                <div>
                  <span className="px-2.5 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-md text-[10px] font-black uppercase tracking-wider mb-2 inline-block">{doc.category}</span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{doc.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{doc.size || 'PDF Document'}</p>
                </div>
                <button onClick={() => handleDelete(doc.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]" title="Hapus Permanen">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            )) : <p className="text-center text-slate-500 py-10">Data dokumen masih kosong.</p>}
          </div>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// MODUL 2: POST & DELETE AKREDITASI
// ==========================================
function TabAkreditasi() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ 
    kategori: 'Program Studi', 
    program_studi: '', 
    peringkat: 'B (Baik Sekali)', 
    nomor_sk: '', 
    masa_berlaku: '' 
  });
  const [file, setFile] = useState(null);

  const fetchData = async () => {
    try { 
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/akreditasi`); 
      
      // Sabuk Pengaman (Bulletproof Array Check)
      let dataArray = [];
      if (Array.isArray(res.data.data)) {
        dataArray = res.data.data;
      } else if (Array.isArray(res.data)) {
        dataArray = res.data;
      } else if (Array.isArray(res)) {
        dataArray = res;
      }
      setData(dataArray);
      
    } catch (err) { 
      console.error(err);
      setData([]); 
    }
  };
  
  useEffect(() => { fetchData(); }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!form.program_studi || !file) return alert('Lengkapi nama dan file PDF!');
    setIsLoading(true);
    
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    formData.append('file', file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/akreditasi`, formData, { 
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
      });
      
      // Reset Form setelah sukses
      setForm({ kategori: 'Program Studi', program_studi: '', peringkat: 'B (Baik Sekali)', nomor_sk: '', masa_berlaku: '' }); 
      setFile(null); 
      document.getElementById('file-akred').value = '';
      fetchData();
    } catch (err) { 
      alert('Gagal menyimpan sertifikat.'); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('PERINGATAN: Sertifikat ini akan dihapus permanen. Lanjutkan?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/akreditasi/${id}`, { 
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
        fetchData();
      } catch (err) {
        alert('Gagal menghapus data.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 animate-fade-in">
      
      {/* --- FORM POST (KIRI) --- */}
      <div className="xl:col-span-4">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <span className="text-yellow-500">➕</span> Tambah Sertifikat
        </h2>
        <form onSubmit={handlePost} className="space-y-5 bg-[#0B192C]/50 border border-white/10 p-6 rounded-3xl relative overflow-hidden">
          {/* Efek Glow Kuning di Form */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/10 blur-2xl rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Kategori</label>
            <select value={form.kategori} onChange={e => setForm({...form, kategori: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none">
              <option value="Program Studi" className="bg-[#0B192C]">Program Studi</option>
              <option value="Institusi" className="bg-[#0B192C]">Institusi</option>
            </select>
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Nama {form.kategori}</label>
            <input type="text" value={form.program_studi} onChange={e => setForm({...form, program_studi: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none" placeholder={form.kategori === 'Institusi' ? "Contoh: STIKOM Poltek Cirebon" : "Contoh: D3 Teknik Informatika"} />
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Peringkat</label>
              <input type="text" value={form.peringkat} onChange={e => setForm({...form, peringkat: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-yellow-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Masa Berlaku</label>
              <input type="text" value={form.masa_berlaku} onChange={e => setForm({...form, masa_berlaku: e.target.value})} placeholder="Contoh: 2026-2031" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-yellow-500 outline-none" />
            </div>
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Nomor SK</label>
            <input type="text" value={form.nomor_sk} onChange={e => setForm({...form, nomor_sk: e.target.value})} placeholder="Nomor Surat Keputusan" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-yellow-500 outline-none" />
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">File Sertifikat (PDF)</label>
            <input id="file-akred" type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-yellow-500/20 file:text-yellow-500 file:font-bold hover:file:bg-yellow-500 hover:file:text-black transition-all cursor-pointer" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-3.5 mt-4 bg-linear-to-r from-yellow-500 to-yellow-600 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] text-black rounded-xl text-sm font-black uppercase tracking-widest transition-all relative z-10 hover:-translate-y-0.5">
            {isLoading ? 'Menyimpan...' : 'Simpan Sertifikat'}
          </button>
        </form>
      </div>

      {/* --- TABEL LIST & DELETE (KANAN) --- */}
      <div className="xl:col-span-8">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <span className="text-yellow-500">🏆</span> Database Akreditasi
        </h2>
        <div className="bg-[#0B192C]/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col h-162.5">
          <div className="overflow-y-auto custom-scrollbar p-4 space-y-3 flex-1">
            
            {Array.isArray(data) && data.length > 0 ? data.map(item => (
              <div key={item.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4 hover:border-yellow-500/50 transition-colors group relative overflow-hidden">
                
                {/* Aksen Garis Kuning di Kiri */}
                <div className="absolute left-0 top-0 w-1.5 h-full bg-slate-700 group-hover:bg-yellow-500 transition-colors"></div>
                
                <div className="pl-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider mb-2 inline-block ${item.kategori === 'Institusi' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'bg-slate-500/20 text-slate-400'}`}>
                    {item.kategori}
                  </span>
                  <h3 className="text-base font-bold text-white mb-1">{item.program_studi}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>Peringkat: <strong className="text-yellow-500">{item.peringkat}</strong></span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span>SK: {item.nomor_sk}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                    <span>Berlaku: {item.masa_berlaku}</span>
                  </div>
                </div>

                <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] shrink-0" title="Hapus Permanen">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-70">
                <div className="text-5xl mb-4">📭</div>
                <p>Data akreditasi masih kosong.</p>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// MODUL 3: POST & DELETE LAPORAN AMI
// ==========================================
function TabAMI() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ 
    tahun_akademik: '', 
    semester: 'Ganjil', 
    deskripsi: '' 
  });
  const [file, setFile] = useState(null);

  const fetchData = async () => {
    try { 
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ami`); 
      
      // Sabuk Pengaman Array
      let dataArray = [];
      if (Array.isArray(res.data.data)) dataArray = res.data.data;
      else if (Array.isArray(res.data)) dataArray = res.data;
      else if (Array.isArray(res)) dataArray = res;
      
      setData(dataArray);
    } catch (err) { 
      console.error(err);
      setData([]); 
    }
  };
  
  useEffect(() => { fetchData(); }, []);

const handlePost = async (e) => {
    e.preventDefault();
    if (!form.tahun_akademik || !file) return alert('Lengkapi Tahun Akademik dan File PDF Laporan!');
    setIsLoading(true);
    
    const formData = new FormData();
    
    // --- PROSES PENERJEMAHAN UNTUK LARAVEL ---
    
    // 1. Gabungkan Tahun Akademik dan Semester menjadi "periode"
    const periodeGabungan = `${form.tahun_akademik} (${form.semester})`;
    formData.append('periode', periodeGabungan);
    
    // 2. Isi "pelaksana" (karena wajib, kita bisa isi dengan deskripsi atau teks default)
    formData.append('pelaksana', form.deskripsi ? form.deskripsi : 'Tim SPMI STIKOM');
    
    // 3. Isi "status" (Laravel hanya menerima 'Selesai' atau 'Sedang Berjalan')
    formData.append('status', 'Selesai'); 
    
    // 4. Masukkan file PDF-nya (Ternyata namanya memang 'file' di Laravel)
    formData.append('file', file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/ami`, formData, { 
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        } 
      });
      
      setForm({ tahun_akademik: '', semester: 'Ganjil', deskripsi: '' }); 
      setFile(null); 
      document.getElementById('file-ami').value = '';
      fetchData();
    } catch (err) { 
      console.error(err.response?.data); // Cek detail error di console jika masih gagal
      alert('Gagal mengunggah laporan AMI.'); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('PERINGATAN: Laporan AMI ini akan dihapus permanen. Lanjutkan?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/ami/${id}`, { 
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
        fetchData();
      } catch (err) {
        alert('Gagal menghapus laporan.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 animate-fade-in">
      
      {/* --- FORM POST (KIRI) --- */}
      <div className="xl:col-span-4">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <span className="text-rose-500">➕</span> Unggah Laporan
        </h2>
        <form onSubmit={handlePost} className="space-y-5 bg-[#0B192C]/50 border border-white/10 p-6 rounded-3xl relative overflow-hidden">
          {/* Efek Glow Rose di Form */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Tahun Akademik</label>
              <input type="text" value={form.tahun_akademik} onChange={e => setForm({...form, tahun_akademik: e.target.value})} placeholder="Contoh: 2025/2026" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-rose-500 outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Semester</label>
              <select value={form.semester} onChange={e => setForm({...form, semester: e.target.value})} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-rose-500 outline-none transition-all">
                <option value="Ganjil" className="bg-[#0B192C]">Ganjil</option>
                <option value="Genap" className="bg-[#0B192C]">Genap</option>
              </select>
            </div>
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Deskripsi Singkat (Opsional)</label>
            <textarea rows="3" value={form.deskripsi} onChange={e => setForm({...form, deskripsi: e.target.value})} placeholder="Catatan tambahan mengenai laporan ini..." className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-rose-500 outline-none transition-all resize-none custom-scrollbar"></textarea>
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">File Laporan (PDF)</label>
            <input id="file-ami" type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-rose-500/20 file:text-rose-500 file:font-bold hover:file:bg-rose-500 hover:file:text-white transition-all cursor-pointer" />
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-3.5 mt-4 bg-linear-to-r from-rose-500 to-rose-600 hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all relative z-10 hover:-translate-y-0.5">
            {isLoading ? 'Mengunggah...' : 'Simpan Laporan'}
          </button>
        </form>
      </div>

      {/* --- TABEL LIST & DELETE (KANAN) --- */}
      <div className="xl:col-span-8">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <span className="text-rose-500">🎯</span> Arsip Laporan AMI
        </h2>
        <div className="bg-[#0B192C]/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col h-137.5">
          <div className="overflow-y-auto custom-scrollbar p-4 space-y-3 flex-1">
            
            {Array.isArray(data) && data.length > 0 ? data.map(item => (
              <div key={item.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4 hover:border-rose-500/50 transition-colors group relative overflow-hidden">
                
                {/* Aksen Garis Merah Muda di Kiri */}
                <div className="absolute left-0 top-0 w-1.5 h-full bg-slate-700 group-hover:bg-rose-500 transition-colors"></div>
                
                <div className="pl-3 w-full">
                  <div className="flex items-center gap-3 mb-1.5">
                     <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider inline-block ${item.semester === 'Ganjil' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                      Semester {item.semester}
                    </span>
                    <h3 className="text-base font-bold text-white">T.A {item.tahun_akademik}</h3>
                  </div>
                  
                  <p className="text-xs text-slate-400 line-clamp-2 pr-10">
                    {item.deskripsi || 'Tidak ada catatan tambahan.'}
                  </p>
                </div>

                <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] shrink-0" title="Hapus Permanen">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-70">
                <div className="text-5xl mb-4">📭</div>
                <p>Belum ada laporan AMI yang diunggah.</p>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}
// ==========================================
// MODUL 4: POST & DELETE UNDUHAN (RESOURCE CENTER)
// ==========================================
function TabUnduhan() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ 
    title: '', 
    category: 'Aset Visual' 
  });
  const [file, setFile] = useState(null);

  const categories = ['Aset Visual', 'Template', 'Panduan', 'Dokumen Lain'];

  const fetchData = async () => {
    try { 
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/unduhan`); 
      
      // Sabuk Pengaman Array
      let dataArray = [];
      if (Array.isArray(res.data.data)) dataArray = res.data.data;
      else if (Array.isArray(res.data)) dataArray = res.data;
      else if (Array.isArray(res)) dataArray = res;
      
      setData(dataArray);
    } catch (err) { 
      console.error(err);
      setData([]); 
    }
  };
  
  useEffect(() => { fetchData(); }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!form.title || !file) return alert('Lengkapi Nama Aset dan Filenya!');
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('file', file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/unduhan`, formData, { 
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
      });
      
      setForm({ title: '', category: 'Aset Visual' }); 
      setFile(null); 
      document.getElementById('file-unduhan').value = '';
      fetchData();
    } catch (err) { 
      alert('Gagal mengunggah aset.'); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('PERINGATAN: File aset ini akan dihapus permanen. Lanjutkan?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/unduhan/${id}`, { 
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
        fetchData();
      } catch (err) {
        alert('Gagal menghapus aset.');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 animate-fade-in">
      
      {/* --- FORM POST (KIRI) --- */}
      <div className="xl:col-span-4">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <span className="text-violet-500">➕</span> Unggah Aset Baru
        </h2>
        <form onSubmit={handlePost} className="space-y-5 bg-[#0B192C]/50 border border-white/10 p-6 rounded-3xl relative overflow-hidden">
          {/* Efek Glow Violet di Form */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/10 blur-2xl rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Nama Aset / Template</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Contoh: Template PPT Sidang" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all" />
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Kategori</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-3 bg-[#0B192C] border border-white/10 rounded-xl text-white text-sm focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition-all">
              {categories.map(c => <option key={c} value={c} className="bg-[#0B192C]">{c}</option>)}
            </select>
          </div>

          <div className="relative z-10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">File Upload</label>
            {/* Accept dibuat lebih bebas karena bisa gambar, rar, zip, pdf, ppt */}
            <input id="file-unduhan" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.zip,.rar" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-violet-500/20 file:text-violet-400 file:font-bold hover:file:bg-violet-500 hover:file:text-white transition-all cursor-pointer" />
            <p className="text-[10px] text-slate-500 mt-2 ml-1">Format: PDF, PPT, Word, Image, atau ZIP</p>
          </div>

          <button type="submit" disabled={isLoading} className="w-full py-3.5 mt-4 bg-linear-to-r from-violet-500 to-indigo-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all relative z-10 hover:-translate-y-0.5">
            {isLoading ? 'Mengunggah...' : 'Simpan Aset'}
          </button>
        </form>
      </div>

      {/* --- TABEL LIST & DELETE (KANAN) --- */}
      <div className="xl:col-span-8">
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          <span className="text-violet-500">🗃️</span> Arsip Resource Center
        </h2>
        <div className="bg-[#0B192C]/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col h-137.5">
          <div className="overflow-y-auto custom-scrollbar p-4 space-y-3 flex-1">
            
            {Array.isArray(data) && data.length > 0 ? data.map(item => (
              <div key={item.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between gap-4 hover:border-violet-500/50 transition-colors group relative overflow-hidden">
                
                {/* Aksen Garis Violet di Kiri */}
                <div className="absolute left-0 top-0 w-1.5 h-full bg-slate-700 group-hover:bg-violet-500 transition-colors"></div>
                
                <div className="pl-3 w-full">
                  <span className="px-2.5 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-md text-[10px] font-black uppercase tracking-wider mb-2 inline-block">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">{item.size || 'File Aset'}</span>
                  </div>
                </div>

                <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-500/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] shrink-0" title="Hapus Permanen">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-70">
                <div className="text-5xl mb-4">📭</div>
                <p>Aset atau template masih kosong.</p>
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}