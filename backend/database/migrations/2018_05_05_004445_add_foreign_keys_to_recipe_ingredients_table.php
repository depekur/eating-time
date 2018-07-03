<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRecipeIngredientsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('recipe_ingredients', function(Blueprint $table)
		{
			$table->foreign('ingredients_id', 'ingredients_id_fk')->references('id')->on('ingredients')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('recipe_id', 'recipe_id_fk')->references('recipe_id')->on('recipes')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('recipe_ingredients', function(Blueprint $table)
		{
			$table->dropForeign('ingredients_id_fk');
			$table->dropForeign('recipe_id_fk');
		});
	}

}
