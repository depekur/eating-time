<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRecipeStepsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('recipe_steps', function(Blueprint $table)
		{
			$table->foreign('recipe_id', 'recipe_id')->references('recipe_id')->on('recipes')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('recipe_steps', function(Blueprint $table)
		{
			$table->dropForeign('recipe_id');
		});
	}

}
