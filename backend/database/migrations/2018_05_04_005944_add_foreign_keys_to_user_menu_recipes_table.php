<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUserMenuRecipesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('user_menu_recipes', function(Blueprint $table)
		{
			$table->foreign('recipe_id', 'recipe_id_menu')->references('recipe_id')->on('recipes')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('user_id', 'user_id_menu')->references('user_id')->on('users')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user_menu_recipes', function(Blueprint $table)
		{
			$table->dropForeign('recipe_id_menu');
			$table->dropForeign('user_id_menu');
		});
	}

}
