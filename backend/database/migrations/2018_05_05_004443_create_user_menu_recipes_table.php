<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserMenuRecipesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_menu_recipes', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned()->index('user_id');
			$table->integer('recipe_id')->unsigned()->index('recipe_id_idx');
			$table->integer('ready_menu_id')->unsigned()->nullable()->index('ready_menu_id_idx');
			$table->dateTime('date')->nullable();
			$table->boolean('dish_order');
			$table->boolean('eating_order');
			$table->boolean('is_ready_menu_pattern')->nullable()->default(0);
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
		Schema::drop('user_menu_recipes');
	}

}
