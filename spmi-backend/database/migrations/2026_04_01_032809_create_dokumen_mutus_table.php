<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dokumen_mutus', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Nama/Judul dokumen
            $table->enum('category', ['Kebijakan', 'Manual', 'Standar', 'Formulir', 'SOP']); // Kategori dropdown
            $table->string('file_path')->nullable(); // Lokasi penyimpanan file PDF
            $table->string('size')->nullable(); // Ukuran file (contoh: 2.4 MB)
            $table->timestamps(); // Otomatis membuat kolom created_at (tanggal upload) dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_mutus');
    }
};
