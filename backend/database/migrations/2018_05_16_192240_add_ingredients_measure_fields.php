<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIngredientsMeasureFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		 Schema::table('recipe_ingredients', function($table) {
			 $table->string('count', 40);
			 $table->string('measure', 40);
		 });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		 Schema::table('recipe_ingredients', function($table) {
			 $table->dropColumn('count');
			 $table->dropColumn('measure');
		 });
    }
}
