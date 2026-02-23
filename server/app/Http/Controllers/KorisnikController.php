<?php

namespace App\Http\Controllers;
use OpenApi\Annotations as OA;
use Illuminate\Http\Request;
use App\Models\Korisnik;
use Illuminate\Support\Facades\Hash;

class KorisnikController extends Controller
{
    public function registracija(Request $request)
    {
        // 1. Validacija podataka sa frontenda
        $request->validate([
            'username' => 'required|unique:korisniks',
            'email' => 'required|email|unique:korisniks',
            'lozinka' => 'required|min:6'
        ]);

        // 2. TVOJA LOGIKA: Provera domena emaila
        // Ako sadrzi fon.bg.ac.rs, idTip je 1 (student), inače je 2 (obican)
        $idTip = str_contains($request->email, 'fon.bg.ac.rs') ? 1 : 2;

        // 3. Kreiranje korisnika u bazi
        $korisnik = Korisnik::create([
            'username' => $request->username,
            'email' => $request->email,
            'lozinka' => Hash::make($request->lozinka), // Kriptujemo lozinku zbog sigurnosti
            'idTip' => $idTip
        ]);

        return response()->json([
            'poruka' => 'Uspesna registracija!',
            'tip' => $idTip == 1 ? 'student' : 'obican korisnik',
            'podaci' => $korisnik
        ], 201);
    }

    /**
     * @OA\Post(
     * path="/api/login",
     * summary="Logovanje korisnika",
     * @OA\Response(response="200", description="Uspesan login"),
     * @OA\Response(response="401", description="Pogresni podaci")
     * )
     */
    public function login(Request $request)
    {
    // 1. Provera da li je korisnik uneo podatke
    $request->validate([
        'email' => 'required|email',
        'lozinka' => 'required'
    ]);

    // 2. Pronalazak korisnika u bazi
    $korisnik = Korisnik::where('email', $request->email)->first();

    // 3. Provera lozinke
    if (!$korisnik || !Hash::check($request->lozinka, $korisnik->lozinka)) {
        return response()->json(['poruka' => 'Pogresni podaci'], 401);
    }

    // 4. Generisanje digitalnog kljuca (Tokena)
    $token = $korisnik->createToken('auth_token')->plainTextToken;

    return response()->json([
        'poruka' => 'Uspesan login!',
        'access_token' => $token,
        'token_type' => 'Bearer',
        'idTip' => $korisnik->idTip // Saljemo Reactu informaciju o tipu (1 ili 2)
    ]);
    }

    public function logout(Request $request)
    {
    // Brišemo trenutni token kojim je korisnik pristupio
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'poruka' => 'Uspesno ste se izlogovali!'
    ]);
    }

}