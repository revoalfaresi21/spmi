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
        Schema::create('amis', function (Blueprint $table) {
            $table->id();
            $table->string('periode'); // Contoh: 2026 Semester Ganjil
            $table->string('pelaksana'); // Contoh: Tim AMI Internal
            $table->enum('status', ['Selesai', 'Sedang Berjalan']); 
            $table->string('file_path')->nullable(); // Laporan PDF
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amis');
    }
};
