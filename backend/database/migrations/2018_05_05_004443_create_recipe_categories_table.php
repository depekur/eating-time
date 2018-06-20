<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRecipeCategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recipe_categories', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('recipe_id')->unsigned()->index('recipe_id');
			$table->integer('category_id')->unsigned()->index('category_id');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('recipe_categories');
	}

}
