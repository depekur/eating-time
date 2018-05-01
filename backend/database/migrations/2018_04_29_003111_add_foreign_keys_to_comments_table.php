<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToCommentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('comments', function(Blueprint $table)
		{
			$table->foreign('recipe_id', 'recipe_id_comment')->references('recipe_id')->on('recipes')->onUpdate('CASCADE')->onDelete('RESTRICT');
			$table->foreign('week_menu_id', 'week_menu_id_comment')->references('week_menu_id')->on('week_menu')->onUpdate('CASCADE')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('comments', function(Blueprint $table)
		{
			$table->dropForeign('recipe_id_comment');
			$table->dropForeign('week_menu_id_comment');
		});
	}

}
