<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRecipeCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('recipe_categories', function(Blueprint $table)
		{
			$table->foreign('category_id', 'category_id')->references('category_id')->on('category')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('recipe_id', 'recipe_id_cat')->references('recipe_id')->on('recipes')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('recipe_categories', function(Blueprint $table)
		{
			$table->dropForeign('category_id');
			$table->dropForeign('recipe_id_cat');
		});
	}

}
