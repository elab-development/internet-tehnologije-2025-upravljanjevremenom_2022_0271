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
        Schema::create('podsetniks', function (Blueprint $table) {
    $table->id('idPodsetnik'); 
    $table->dateTime('vremeSlanja');
    $table->string('poruka');
    $table->unsignedBigInteger('idZadatak');
    
    $table->foreign('idZadatak')->references('idZadatak')->on('zadataks')->onDelete('cascade');
    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('podsetniks');
    }
};
