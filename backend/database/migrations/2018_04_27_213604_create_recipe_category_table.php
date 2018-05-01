<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRecipeCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recipe_category', function(Blueprint $table)
		{
			$table->integer('category_id', true);
			$table->string('category_name');
			$table->boolean('is_parent')->nullable();
			$table->integer('parent_id')->nullable();
			$table->text('category_description', 65535)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('recipe_category');
	}

}
