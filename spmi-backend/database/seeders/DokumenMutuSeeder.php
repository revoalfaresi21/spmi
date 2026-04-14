<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Membuat akun admin utama
        User::create([
            'name' => 'Administrator SPMI',
            'email' => 'admin@stikompoltekcirebon.ac.id',
            'password' => Hash::make('adminspmi123'), // Password untuk login nanti
        ]);
    }
}