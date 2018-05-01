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
			$table->integer('comment_id', true);
			$table->integer('recipe_id')->nullable()->index('recipe_id_idx');
			$table->integer('week_menu_id')->nullable()->index('week_menu_id_comment_idx');
			$table->integer('author_id');
			$table->text('body', 65535);
			$table->boolean('is_reply')->nullable();
			$table->integer('reply_to_id')->nullable();
			$table->string('comment_type', 20)->nullable();
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
