import axios from 'axios';

// Membuat "salinan" Axios khusus untuk proyek SPMI Anda
const axiosInstance = axios.create({
    // Ganti URL ini sesuai dengan URL backend Anda (cPanel)
    // Jika di lokal, gunakan http://localhost:8000
    baseURL: 'https://spmi.stikompoltekcirebon.ac.id', 
    
    // INI ADALAH KUNCI UTAMANYA: Wajib membawa Cookie/Kredensial
    withCredentials: true, 

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;