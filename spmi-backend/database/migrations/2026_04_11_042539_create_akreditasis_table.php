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
        Schema::create('akreditasis', function (Blueprint $table) {
            $table->id();
            $table->string('program_studi'); // Contoh: STIKOM Poltek Cirebon, D3/S1 TI
            $table->string('peringkat'); // Contoh: B (Baik Sekali)
            $table->string('nomor_sk'); 
            $table->string('masa_berlaku'); // Contoh: 2026 - 2031
            $table->string('file_path')->nullable(); // Sertifikat PDF
            $table->timestamps();
        });
        Schema::table('akreditasis', function (Blueprint $table) {
        $table->enum('kategori', ['Institusi', 'Program Studi'])->default('Program Studi')->after('id');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akreditasis');
    }
};
