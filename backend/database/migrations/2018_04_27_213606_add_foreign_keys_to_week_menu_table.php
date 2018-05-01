<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToWeekMenuTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('week_menu', function(Blueprint $table)
		{
			$table->foreign('user_id', 'menu_author')->references('user_id')->on('users')->onUpdate('CASCADE')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('week_menu', function(Blueprint $table)
		{
			$table->dropForeign('menu_author');
		});
	}

}
