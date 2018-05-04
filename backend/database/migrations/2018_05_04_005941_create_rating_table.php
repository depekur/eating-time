<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRatingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('rating', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('recipe_id')->unsigned()->index('recipe_id');
			$table->integer('comment_id')->unsigned()->index('comment_id_rating_idx');
			$table->string('rating_type', 20)->nullable();
			$table->boolean('vote')->nullable();
			$table->integer('user_id')->nullable();
			$table->string('user_ip', 100)->nullable();
			$table->boolean('is_anonymous')->nullable();
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
		Schema::drop('rating');
	}

}
