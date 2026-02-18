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
        Schema::create('zadataks', function (Blueprint $table) {
    $table->id('idZadatak'); 
    $table->string('nazivZadatka');
    $table->text('opis')->nullable();
    $table->dateTime('vremeObavljanja'); // Format: dd/mm/yyyy HH:mm
    $table->unsignedBigInteger('idKorisnik');
    $table->unsignedBigInteger('idTipZadatka');
    
    $table->foreign('idKorisnik')->references('idKorisnik')->on('korisniks')->onDelete('cascade');
    $table->foreign('idTipZadatka')->references('idTipZadatka')->on('tip_zadatkas');
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zadataks');
    }
};
