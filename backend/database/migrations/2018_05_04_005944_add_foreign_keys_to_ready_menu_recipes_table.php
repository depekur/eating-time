<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToReadyMenuRecipesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('ready_menu_recipes', function(Blueprint $table)
		{
			$table->foreign('recipe_id', 'day_menu_recipe_id')->references('recipe_id')->on('recipes')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('week_menu_id', 'week_menu_id')->references('ready_menu_id')->on('ready_menu')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('ready_menu_recipes', function(Blueprint $table)
		{
			$table->dropForeign('day_menu_recipe_id');
			$table->dropForeign('week_menu_id');
		});
	}

}
