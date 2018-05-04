<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateReadyMenuTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ready_menu', function(Blueprint $table)
		{
			$table->increments('ready_menu_id');
			$table->string('menu_name', 100)->nullable();
			$table->text('body', 65535)->nullable();
			$table->integer('user_id')->unsigned()->index('menu_author_idx');
			$table->string('img_name', 50)->nullable();
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
		Schema::drop('ready_menu');
	}

}
