<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('korisniks', function (Blueprint $table) {
    $table->id('idKorisnik'); 
    $table->string('username')->unique();
    $table->string('email')->unique();
    $table->string('lozinka');
    $table->unsignedBigInteger('idTip'); // Veza 1,1 ka TipKorisnika
    
    $table->foreign('idTip')->references('idTip')->on('tip_korisnikas');
    $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('korisniks');
    }
};
