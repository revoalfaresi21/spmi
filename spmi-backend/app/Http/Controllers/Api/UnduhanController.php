<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unduhan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UnduhanController extends Controller
{
    // 1. Menampilkan semua data Unduhan
    public function index()
    {
        $unduhan = Unduhan::latest()->get();
        return response()->json(['success' => true, 'data' => $unduhan]);
    }

    // 2. Mengunggah data & file aset baru
    public function store(Request $request)
    {
        // Validasi input khusus Unduhan (Memperbolehkan lebih banyak format file)
        $request->validate([
            'title'    => 'required|string',
            'category' => 'required|string',
            'file'     => 'required|mimes:pdf,png,jpg,jpeg,doc,docx,ppt,pptx,zip,rar|max:51200', // Boleh gambar, office, zip max 50MB
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            // Simpan di folder storage/app/public/unduhan
            $path = $file->storeAs('unduhan', $fileName, 'public');
            $filePath = '/storage/' . $path;

            // Hitung ukuran file
            $bytes = $file->getSize();
            $fileSize = $bytes >= 1048576 
                ? number_format($bytes / 1048576, 2) . ' MB' 
                : number_format($bytes / 1024, 2) . ' KB';

            $unduhan = Unduhan::create([
                'title'     => $request->title,
                'category'  => $request->category,
                'size'      => $fileSize,
                'file_path' => $filePath,
            ]);

            return response()->json(['success' => true, 'message' => 'Aset Unduhan berhasil ditambahkan!', 'data' => $unduhan]);
        }

        return response()->json(['success' => false, 'message' => 'Gagal mengunggah file'], 400);
    }

    // 3. Menghapus data & file aset Unduhan
    public function destroy($id)
    {
        $unduhan = Unduhan::find($id);
        if (!$unduhan) return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);

        // Hapus file fisik dari server
        if ($unduhan->file_path) {
            $pathFile = str_replace('/storage/', '', $unduhan->file_path);
            if (Storage::disk('public')->exists($pathFile)) {
                Storage::disk('public')->delete($pathFile);
            }
        }

        $unduhan->delete();
        return response()->json(['success' => true, 'message' => 'Aset Unduhan berhasil dihapus!']);
    }
}