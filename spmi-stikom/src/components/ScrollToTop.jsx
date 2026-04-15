import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // Mengambil informasi URL saat ini
  const { pathname } = useLocation();

  // useEffect akan berjalan setiap kali 'pathname' berubah
  useEffect(() => {
    // Memaksa browser scroll ke koordinat X:0, Y:0 (Paling Kiri, Paling Atas)
    window.scrollTo(0, 0);
  }, [pathname]);

  // Komponen ini bekerja di belakang layar, jadi tidak me-render apapun
  return null; 
}