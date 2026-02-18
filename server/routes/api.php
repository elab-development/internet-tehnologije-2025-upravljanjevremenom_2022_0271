<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KorisnikController;
use App\Http\Controllers\ZadatakController; // DODATO

// Javne rute (svako moze da im pristupi)
Route::post('/registracija', [KorisnikController::class, 'registracija']);
Route::post('/login', [KorisnikController::class, 'login']); // DODATO

// Zasticene rute (mora Token u Headeru)
Route::middleware('auth:sanctum')->group(function () {
    
    // Rute za zadatke
    Route::get('/moji-zadaci', [ZadatakController::class, 'index']);
    Route::post('/dodaj-zadatak', [ZadatakController::class, 'store']);
    
    // Autentifikacija
    Route::post('/logout', [KorisnikController::class, 'logout']);
});