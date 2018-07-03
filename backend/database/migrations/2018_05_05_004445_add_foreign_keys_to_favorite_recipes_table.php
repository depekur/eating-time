<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToFavoriteRecipesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('favorite_recipes', function(Blueprint $table)
		{
			$table->foreign('recipe_id', 'favorite_recipe_id')->references('recipe_id')->on('recipes')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('user_id', 'favorite_user_id')->references('user_id')->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('favorite_recipes', function(Blueprint $table)
		{
			$table->dropForeign('favorite_recipe_id');
			$table->dropForeign('favorite_user_id');
		});
	}

}
