<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWeekMenuRecipesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('week_menu_recipes', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('recipe_id')->index('day_menu_recipe_id');
			$table->integer('week_menu_id')->index('week_menu_id_idx');
			$table->boolean('dish_count');
			$table->integer('day_count');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('week_menu_recipes');
	}

}
