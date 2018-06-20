<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSettingsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('settings', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('user_id')->unsigned()->index('user_id_settings_idx');
			$table->boolean('notification')->nullable()->default(1);
			$table->string('role', 10)->nullable()->default('user');
			$table->dateTime('first_dish_time')->nullable()->default('2018-05-01 08:00:00');
			$table->dateTime('second_dish_time')->nullable()->default('2018-05-01 10:00:00');
			$table->dateTime('third_dish_time')->nullable()->default('2018-05-01 13:00:00');
			$table->dateTime('fourth_dish_time')->nullable()->default('2018-05-01 17:00:00');
			$table->dateTime('fifth_dish_time')->nullable()->default('2018-05-01 20:00:00');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('settings');
	}

}
