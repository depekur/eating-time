<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReadyMenuRecipesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ready_menu_recipes', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('recipe_id')->unsigned()->index('day_menu_recipe_id');
			$table->integer('week_menu_id')->unsigned()->index('week_menu_id_idx');
			$table->boolean('dish_number');
			$table->smallInteger('day_number')->unsigned();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ready_menu_recipes');
	}

}
