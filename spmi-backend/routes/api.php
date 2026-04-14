<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DokumenMutuController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AkreditasiController;
use App\Http\Controllers\Api\AmiController;
use App\Http\Controllers\Api\UnduhanController;

// Rute Publik (Tanpa Login)
Route::post('/login', [AuthController::class, 'login']);
Route::get('/dokumen-mutu', [DokumenMutuController::class, 'index']); // Semua orang boleh melihat daftar dokumen
Route::get('/akreditasi', [AkreditasiController::class, 'index']);
Route::get('/ami', [AmiController::class, 'index']);
Route::get('/unduhan', [UnduhanController::class, 'index']);

// Rute Terlindungi (Wajib Login / Membawa Token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Hanya admin yang bisa upload dan hapus dokumen
    Route::post('/dokumen-mutu', [DokumenMutuController::class, 'store']);
    Route::delete('/dokumen-mutu/{id}', [DokumenMutuController::class, 'destroy']);

    // --- Manajemen Akreditasi ---
    Route::post('/akreditasi', [AkreditasiController::class, 'store']);
    Route::delete('/akreditasi/{id}', [AkreditasiController::class, 'destroy']);
    
    // --- Manajemen AMI ---
    Route::post('/ami', [AmiController::class, 'store']);
    Route::delete('/ami/{id}', [AmiController::class, 'destroy']);

    // --- Manajemen Unduhan ---
    Route::post('/unduhan', [UnduhanController::class, 'store']);
    Route::delete('/unduhan/{id}', [UnduhanController::class, 'destroy']);
});