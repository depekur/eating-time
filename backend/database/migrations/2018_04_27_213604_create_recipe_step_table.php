<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRecipeStepTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recipe_step', function(Blueprint $table)
		{
			$table->integer('recipe_step_id', true);
			$table->integer('recipe_id')->index('recipe_id');
			$table->boolean('step_number');
			$table->text('description', 65535);
			$table->string('img_name')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('recipe_step');
	}

}
