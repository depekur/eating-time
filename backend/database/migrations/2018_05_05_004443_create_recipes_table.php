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
			$table->increments('recipe_id');
			$table->string('title');
			$table->text('body', 65535)->nullable();
			$table->boolean('is_short_recipe')->nullable()->default(0);
			$table->integer('calories')->nullable();
			$table->string('cooking_time')->nullable();
			$table->smallInteger('country_id')->unsigned()->nullable()->index('country_id_idx');
			$table->integer('user_id')->unsigned()->index('user_id');
			$table->string('img_name', 50)->nullable();
			$table->string('recipe_link')->nullable();
			$table->string('seo_description')->nullable();
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
