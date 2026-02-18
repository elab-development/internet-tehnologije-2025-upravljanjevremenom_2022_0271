<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    // 1. Ubacujemo Tipove Korisnika (student i obican)
    \DB::table('tip_korisnikas')->insert([
        ['idTip' => 1, 'naziv' => 'student'],
        ['idTip' => 2, 'naziv' => 'obican'],
        ['idTip' => 3, 'naziv' => 'premium'],
    ]);

    // 2. Ubacujemo Tipove Zadataka (posao, fakultet...)
    \DB::table('tip_zadatkas')->insert([
        ['idTipZadatka' => 1, 'nazivTipZad' => 'posao'],
        ['idTipZadatka' => 2, 'nazivTipZad' => 'fakultet'],
        ['idTipZadatka' => 3, 'nazivTipZad' => 'personal'],
        ['idTipZadatka' => 4, 'nazivTipZad' => 'shoping'],
    ]);
    }
}
