<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Akreditasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AkreditasiController extends Controller
{
    // 1. Menampilkan semua data Akreditasi
    public function index()
    {
        $akreditasi = Akreditasi::latest()->get();
        return response()->json(['success' => true, 'data' => $akreditasi]);
    }

    // 2. Mengunggah data & file sertifikat baru
    public function store(Request $request)
    {
        $request->validate([
            'program_studi' => 'required|string',
            'peringkat'     => 'required|string',
            'nomor_sk'      => 'required|string',
            'masa_berlaku'  => 'required|string',
            'file'          => 'required|mimes:pdf|max:10240', // Wajib PDF max 10MB
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            // Simpan di folder storage/app/public/akreditasi
            $filePath = $file->storeAs('akreditasi', $fileName, 'public');

            $akreditasi = Akreditasi::create([
                'program_studi' => $request->program_studi,
                'peringkat'     => $request->peringkat,
                'nomor_sk'      => $request->nomor_sk,
                'masa_berlaku'  => $request->masa_berlaku,
                'file_path'     => '/storage/' . $filePath,
            ]);

            return response()->json(['success' => true, 'message' => 'Sertifikat berhasil ditambahkan!', 'data' => $akreditasi]);
        }
        return response()->json(['success' => false, 'message' => 'Gagal mengunggah file'], 400);
    }

    // 3. Menghapus data & file sertifikat
    public function destroy($id)
    {
        $akreditasi = Akreditasi::find($id);
        if (!$akreditasi) return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);

        // Hapus file fisik dari server
        if ($akreditasi->file_path) {
            $pathFile = str_replace('/storage/', '', $akreditasi->file_path);
            if (Storage::disk('public')->exists($pathFile)) {
                Storage::disk('public')->delete($pathFile);
            }
        }

        $akreditasi->delete();
        return response()->json(['success' => true, 'message' => 'Sertifikat berhasil dihapus!']);
    }
}