<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRecipeDestinationsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recipe_destinations', function(Blueprint $table)
		{
			$table->integer('id')->unsigned()->primary();
			$table->integer('recipe_id')->unsigned()->index('recipe_id_destination_idx');
			$table->boolean('destination_id')->index('destination_id_idx');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('recipe_destinations');
	}

}
