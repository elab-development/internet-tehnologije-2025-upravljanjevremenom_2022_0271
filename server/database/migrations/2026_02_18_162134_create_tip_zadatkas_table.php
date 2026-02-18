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
       Schema::create('tip_zadatkas', function (Blueprint $table) {
    $table->id('idTipZadatka'); 
    $table->string('nazivTipZad'); // posao, fakultet, personal, shoping
    $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tip_zadatkas');
    }
};
