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

        // 2. NOVA LOGIKA: Provera domena emaila za tipove korisnika
        $email = $request->email;
        
        if (str_contains($email, '@student')) {
            $idTip = 1; // Student
            $tipNaziv = 'student';
        } elseif (str_contains($email, '@premium')) {
            $idTip = 3; // Premium korisnik
            $tipNaziv = 'premium korisnik';
        } else {
            $idTip = 2; // Običan korisnik
            $tipNaziv = 'obican korisnik';
        }

        // 3. Kreiranje korisnika u bazi
        $korisnik = Korisnik::create([
            'username' => $request->username,
            'email' => $request->email,
            'lozinka' => Hash::make($request->lozinka),
            'idTip' => $idTip
        ]);

        return response()->json([
            'poruka' => 'Uspesna registracija!',
            'tip' => $tipNaziv,
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
        $request->validate([
            'email' => 'required|email',
            'lozinka' => 'required'
        ]);

        $korisnik = Korisnik::where('email', $request->email)->first();

        if (!$korisnik || !Hash::check($request->lozinka, $korisnik->lozinka)) {
            return response()->json(['poruka' => 'Pogresni podaci'], 401);
        }

        $token = $korisnik->createToken('auth_token')->plainTextToken;

        return response()->json([
            'poruka' => 'Uspesan login!',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'idTip' => $korisnik->idTip 
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'poruka' => 'Uspesno ste se izlogovali!'
        ]);
    }
}