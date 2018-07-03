<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToRatingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('rating', function(Blueprint $table)
		{
			$table->foreign('comment_id', 'comment_id_rating')->references('comment_id')->on('comments')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('recipe_id', 'recipe_id_rating')->references('recipe_id')->on('recipes')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('rating', function(Blueprint $table)
		{
			$table->dropForeign('comment_id_rating');
			$table->dropForeign('recipe_id_rating');
		});
	}

}
