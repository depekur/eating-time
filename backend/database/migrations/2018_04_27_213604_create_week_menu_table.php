<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWeekMenuTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('week_menu', function(Blueprint $table)
		{
			$table->integer('week_menu_id', true);
			$table->string('menu_name')->nullable();
			$table->text('menu_description', 65535)->nullable();
			$table->boolean('is_official')->nullable()->default(0);
			$table->integer('user_id')->index('menu_author_idx');
			$table->string('img_name')->nullable();
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
		Schema::drop('week_menu');
	}

}
