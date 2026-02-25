<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Zadatak extends Model
{
    // Naziv tabele u bazi 
    protected $table = 'zadataks';
    protected $primaryKey = 'idZadatak';

    // Polja koja je dozvoljeno masovno popunjavati
    protected $fillable = [
        'nazivZadatka',
        'opis',
        'vremeObavljanja',
        'idTipZadatka',
        'prioritet',
        'idKorisnik'
    ];

    public $timestamps = true; // Ako imaš created_at i updated_at kolone
}