<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Podsetnik extends Model
{
    protected $table = 'podsetniks';
    protected $primaryKey = 'idPodsetnik';

    protected $fillable = [
        'vremeSlanja',
        'poruka',
        'idZadatak'
    ];

    public $timestamps = true;
}