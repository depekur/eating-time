<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRecipeIngredientsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recipe_ingredients', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('recipe_id')->index('recipe_id');
			$table->integer('ingredients_id')->index('ingredients_id');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('recipe_ingredients');
	}

}
