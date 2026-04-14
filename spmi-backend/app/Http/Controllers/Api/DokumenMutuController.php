<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DokumenMutu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DokumenMutuController extends Controller
{
    public function index()
    {
        $dokumen = DokumenMutu::latest()->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar Dokumen Mutu berhasil diambil',
            'data'    => $dokumen
        ]);
    }

    // Fungsi baru untuk menangani Upload File
    public function store(Request $request)
    {
        // 1. Validasi data yang masuk (Harus ada judul, kategori, dan file wajib PDF maksimal 10MB)
        $request->validate([
            'title'    => 'required|string|max:255',
            'category' => 'required|in:Kebijakan,Manual,Standar,Formulir,SOP',
            'file'     => 'required|mimes:pdf|max:10240', 
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            // 2. Buat nama file unik (gabungan waktu saat ini dan nama asli file)
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            // 3. Simpan file fisik ke dalam folder storage/app/public/dokumen
            $filePath = $file->storeAs('dokumen', $fileName, 'public');
            
            // 4. Hitung ukuran file dalam hitungan MB atau KB
            $bytes = $file->getSize();
            $fileSize = $bytes >= 1048576 
                ? number_format($bytes / 1048576, 2) . ' MB' 
                : number_format($bytes / 1024, 2) . ' KB';

            // 5. Simpan data ke database MySQL
            $dokumen = DokumenMutu::create([
                'title'     => $request->title,
                'category'  => $request->category,
                'file_path' => '/storage/' . $filePath,
                'size'      => $fileSize,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Dokumen berhasil diunggah!',
                'data'    => $dokumen
            ]);
        }

        return response()->json(['success' => false, 'message' => 'Gagal mengunggah file'], 400);
    }
    // Fungsi baru untuk Menghapus Dokumen
    public function destroy($id)
    {
        // 1. Cari dokumen berdasarkan ID
        $dokumen = DokumenMutu::find($id);

        if (!$dokumen) {
            return response()->json(['success' => false, 'message' => 'Dokumen tidak ditemukan'], 404);
        }

        // 2. Hapus file fisik PDF dari folder storage (jika ada dan bukan file dummy '#')
        if ($dokumen->file_path !== '#') {
            // Path di database adalah "/storage/dokumen/namafile.pdf"
            // Kita perlu memotong "/storage/" agar terbaca oleh sistem penghapus Laravel
            $pathFile = str_replace('/storage/', '', $dokumen->file_path);
            
            if (Storage::disk('public')->exists($pathFile)) {
                Storage::disk('public')->delete($pathFile);
            }
        }

        // 3. Hapus data dari database MySQL
        $dokumen->delete();

        return response()->json([
            'success' => true,
            'message' => 'Dokumen dan file fisik berhasil dihapus!'
        ]);
    }
}