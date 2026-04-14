<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Ami extends Model
{
    protected $fillable = ['periode', 'pelaksana', 'status', 'file_path'];
}