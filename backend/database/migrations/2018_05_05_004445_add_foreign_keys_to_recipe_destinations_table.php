<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRecipeDestinationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('recipe_destinations', function(Blueprint $table)
		{
			$table->foreign('destination_id', 'destination_id')->references('destination_id')->on('destination')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('recipe_id', 'recipe_id_destination')->references('recipe_id')->on('recipes')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('recipe_destinations', function(Blueprint $table)
		{
			$table->dropForeign('destination_id');
			$table->dropForeign('recipe_id_destination');
		});
	}

}
