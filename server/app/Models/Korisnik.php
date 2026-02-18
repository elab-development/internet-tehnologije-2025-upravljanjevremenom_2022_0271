<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Korisnik extends Model
{
    protected $table = 'korisniks';
    protected $primaryKey = 'idKorisnik';

    // Kolone koje React sme da popuni
    protected $fillable = [
        'username', 
        'email', 
        'lozinka', 
        'idTip'
    ];

    public $timestamps = true;
}