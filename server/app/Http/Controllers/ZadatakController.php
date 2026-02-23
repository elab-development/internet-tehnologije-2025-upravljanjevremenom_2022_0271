<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zadatak; // OBAVEZNO DODAJ OVO
use App\Models\Korisnik; // OBAVEZNO DODAJ OVO

class ZadatakController extends Controller
{

public function index()
{
    // 1. Uzimamo ulogovanog korisnika preko Sanctum tokena
    $korisnik = auth()->user(); 

    // 2. Uzimamo sve zadatke koji pripadaju baš tom korisniku
    // Pazi da li se kolona u bazi zove idKorisnik ili id_korisnik!
    $zadaci = Zadatak::where('idKorisnik', $korisnik->idKorisnik)->get();

    // 3. Vraćamo ih React-u kao JSON
    return response()->json($zadaci, 200);
}

    public function store(Request $request) 
    {
        $korisnik = auth()->user(); // Uzimamo trenutno ulogovanog preko tokena

        // Validacija onoga što stiže sa frontenda
        $request->validate([
            'nazivZadatka' => 'required|string|max:255',
            'idTipZadatka' => 'required|integer',
            // dodaj ostala polja po potrebi
        ]);
        
        // Brojimo koliko korisnik već ima zadataka u bazi
        $brojZadataka = Zadatak::where('idKorisnik', $korisnik->idKorisnik)->count();

        // Definišemo limite na osnovu idTip
        $limit = 20; // Default za obične
        if ($korisnik->idTip == 1) $limit = 10; // Student
        if ($korisnik->idTip == 3) $limit = 30; // Premium

        // PROVERA LIMITA
        if ($brojZadataka >= $limit) {
            return response()->json([
                'poruka' => "Dostigli ste limit od $limit zadataka za vas tip naloga!"
            ], 403); // 403 Forbidden - savršeno za REST konvenciju
        }

        // Kreiranje zadatka tako da idKorisnik uvek bude od ulogovanog korisnika
        $podaci = $request->all();
        $podaci['idKorisnik'] = $korisnik->idKorisnik;

        $zadatak = Zadatak::create($podaci);

        return response()->json([
            'poruka' => 'Zadatak uspesno kreiran',
            'podaci' => $zadatak
        ], 201);
    }
}