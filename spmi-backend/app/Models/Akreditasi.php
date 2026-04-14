<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Akreditasi extends Model{
    protected $fillable = ['kategori', 'program_studi', 'peringkat', 'nomor_sk', 'masa_berlaku', 'file_path'];
}