<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCommentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('comments', function(Blueprint $table)
		{
			$table->increments('comment_id');
			$table->integer('recipe_id')->unsigned()->index('recipe_id_idx');
			$table->integer('author_id')->unsigned();
			$table->text('body', 65535);
			$table->boolean('is_reply')->nullable();
			$table->integer('reply_to_id')->nullable();
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
		Schema::drop('comments');
	}

}
