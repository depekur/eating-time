<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRecipeStepsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recipe_steps', function(Blueprint $table)
		{
			$table->increments('recipe_step_id');
			$table->integer('recipe_id')->unsigned()->index('recipe_id');
			$table->boolean('step_number');
			$table->text('description', 65535);
			$table->string('img_name', 50)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('recipe_steps');
	}

}
