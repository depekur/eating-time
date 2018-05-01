<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRecipesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recipes', function(Blueprint $table)
		{
			$table->integer('recipe_id', true);
			$table->string('title');
			$table->integer('calories')->nullable();
			$table->integer('country_id')->nullable()->index('country_id');
			$table->integer('category_id')->nullable()->index('category_id');
			$table->integer('user_id')->nullable()->index('user_id');
			$table->string('img_name')->nullable();
            $table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('recipes');
	}

}
