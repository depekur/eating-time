<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteRecipeIngredientsMeasureField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('recipe_ingredients', function($table) {
        $table->dropColumn('count');
        $table->dropColumn('measure');
      });

      Schema::table('recipe_ingredients', function($table) {
        $table->string('quantity');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
