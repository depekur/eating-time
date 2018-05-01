<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToUserWeekMenuTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('user_week_menu', function(Blueprint $table)
		{
			$table->foreign('user_id', 'user_id_fk')->references('user_id')->on('users')->onUpdate('CASCADE')->onDelete('RESTRICT');
			$table->foreign('week_menu_id', 'user_week_menu_id')->references('week_menu_id')->on('week_menu')->onUpdate('CASCADE')->onDelete('RESTRICT');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('user_week_menu', function(Blueprint $table)
		{
			$table->dropForeign('user_id_fk');
			$table->dropForeign('user_week_menu_id');
		});
	}

}
