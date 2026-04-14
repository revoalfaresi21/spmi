<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DokumenMutu extends Model
{
    use HasFactory;

    // Mengizinkan kolom-kolom ini diisi data secara massal (saat upload)
    protected $fillable = [
        'title',
        'category',
        'file_path',
        'size',
    ];
}