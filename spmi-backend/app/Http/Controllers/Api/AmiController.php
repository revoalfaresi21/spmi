<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ami;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AmiController extends Controller
{
    // 1. Menampilkan semua data AMI
    public function index()
    {
        $ami = Ami::latest()->get();
        return response()->json(['success' => true, 'data' => $ami]);
    }

    // 2. Mengunggah data & file laporan AMI baru
    public function store(Request $request)
    {
        // Validasi input khusus AMI
        $request->validate([
            'periode'   => 'required|string',
            'pelaksana' => 'required|string',
            'status'    => 'required|in:Selesai,Sedang Berjalan',
            'file'      => 'nullable|mimes:pdf|max:10240', // File boleh kosong (jika status Sedang Berjalan)
        ]);

        $filePath = null; // Default null jika tidak ada file

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            
            // Simpan di folder storage/app/public/ami
            $path = $file->storeAs('ami', $fileName, 'public');
            $filePath = '/storage/' . $path;
        }

        $ami = Ami::create([
            'periode'   => $request->periode,
            'pelaksana' => $request->pelaksana,
            'status'    => $request->status,
            'file_path' => $filePath,
        ]);

        return response()->json(['success' => true, 'message' => 'Laporan AMI berhasil ditambahkan!', 'data' => $ami]);
    }

    // 3. Menghapus data & file laporan AMI
    public function destroy($id)
    {
        $ami = Ami::find($id);
        if (!$ami) return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);

        // Hapus file fisik dari server jika ada
        if ($ami->file_path) {
            $pathFile = str_replace('/storage/', '', $ami->file_path);
            if (Storage::disk('public')->exists($pathFile)) {
                Storage::disk('public')->delete($pathFile);
            }
        }

        $ami->delete();
        return response()->json(['success' => true, 'message' => 'Laporan AMI berhasil dihapus!']);
    }
}