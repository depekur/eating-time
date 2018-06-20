<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIngredientsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ingredients', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name', 100);
			$table->text('description', 65535)->nullable();
			$table->integer('calories')->unsigned()->nullable();
			$table->float('fat', 10, 0)->unsigned()->nullable();
			$table->float('proteins', 10, 0)->unsigned()->nullable();
			$table->float('carbs', 10, 0)->unsigned()->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ingredients');
	}

}
