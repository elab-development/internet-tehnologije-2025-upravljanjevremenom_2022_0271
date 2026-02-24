<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zadatak;
use App\Models\Korisnik;
use App\Models\TipZadatka;
use App\Models\Podsetnik;
use Carbon\Carbon;

class ZadatakController extends Controller
{
    // Vraća sve tipove zadataka za Combobox na frontendu
    public function getTipovi() 
    {
        return response()->json(TipZadatka::all(), 200);
    }

    // Vraća zadatke ulogovanog korisnika
    public function index()
    {
        $korisnik = auth()->user(); 
        $zadaci = Zadatak::where('idKorisnik', $korisnik->idKorisnik)->get();
        return response()->json($zadaci, 200);
    }

    public function store(Request $request) 
    {

        $vremeObavljanja = Carbon::parse($request->vremeObavljanja);

        if ($vremeObavljanja->isPast()) {
            return response()->json(['poruka' => 'Vreme obavljanja mora biti u budućnosti.'], 422);
        }
        $korisnik = auth()->user();

        // 1. Proširena validacija za sva polja sa forme
        $request->validate([
            'nazivZadatka' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'vremeObavljanja' => 'required|date', // Format: YYYY-MM-DD HH:mm:ss
            'idTipZadatka' => 'required|integer',
            'prioritet' => 'required|string',
        ]);
        
        // 2. Provera limita (Studenti max 10)
        $brojZadataka = Zadatak::where('idKorisnik', $korisnik->idKorisnik)->count();
        $limit = 20; 
        if ($korisnik->idTip == 1) $limit = 10; 
        if ($korisnik->idTip == 3) $limit = 30; 

        if ($brojZadataka >= $limit) {
            return response()->json([
                'poruka' => "Dostigli ste limit od $limit zadataka za vaš tip naloga!"
            ], 403);
        }

        // 3. Kreiranje zadatka
        $podaci = $request->all();
        $podaci['idKorisnik'] = $korisnik->idKorisnik;
        $zadatak = Zadatak::create($podaci);

        // 4. LOGIKA ZA PODSETNIK (5 minuta ranije)
        // Uzimamo vreme obavljanja i oduzimamo 5 minuta
        $vremeObavljanja = Carbon::parse($request->vremeObavljanja);
        $vremeSlanja = $vremeObavljanja->copy()->subMinutes(5);

        Podsetnik::create([
    'vremeSlanja' => $vremeObavljanja->copy()->subMinutes(5),
    'poruka' => "Podsetnik za " . $zadatak->nazivZadatka,
    'idZadatak' => $zadatak->idZadatak // Proveri da li se kolona ovako zove u bazi!
]);

        return response()->json([
            'poruka' => 'Zadatak i podsetnik su uspešno kreirani!',
            'podaci' => $zadatak
        ], 201);
    }

    public function destroy($id)
{
    $korisnik = auth()->user();
    // Proveravamo da li zadatak pripada baš tom korisniku pre brisanja
    $zadatak = Zadatak::where('idZadatak', $id)
                      ->where('idKorisnik', $korisnik->idKorisnik)
                      ->first();

    if (!$zadatak) {
        return response()->json(['poruka' => 'Zadatak nije pronađen ili nemate dozvolu'], 404);
    }

    $zadatak->delete();

    return response()->json(['poruka' => 'Zadatak uspešno obrisan'], 200);
}
}