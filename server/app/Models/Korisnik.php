<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // OVO JE BITNO
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Korisnik extends Authenticatable // PROMENJENO sa Model na Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'korisniks';
    protected $primaryKey = 'idKorisnik';

    protected $fillable = [
        'username', 
        'email', 
        'lozinka', 
        'idTip'
    ];

    // Govorimo Laravelu da se kolona za lozinku zove 'lozinka'
    public function getAuthPassword()
    {
        return $this->lozinka;
    }

    public $timestamps = true;
}