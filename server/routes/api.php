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
    Route::get('/user', function (Request $request) {
        return $request->user();
        });
    // Rute za zadatke
    Route::get('/tipovi-zadataka', [ZadatakController::class, 'getTipovi']);
    Route::get('/moji-zadaci', [ZadatakController::class, 'index']);
    Route::post('/dodaj-zadatak', [ZadatakController::class, 'store']);
    Route::delete('/obrisi-zadatak/{id}', [ZadatakController::class, 'destroy']);
    
    // Autentifikacija
    Route::post('/logout', [KorisnikController::class, 'logout']);
});