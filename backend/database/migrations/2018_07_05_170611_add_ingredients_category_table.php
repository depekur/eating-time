<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIngredientsCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('ingredients_categories', function(Blueprint $table)
      {
        $table->increments('id');
        $table->string('category', 50);
      });

      Schema::table('ingredients', function(Blueprint $table)
      {
        $table->foreign('category', 'category_id_fk')->references('id')->on('ingredients_categories')->onUpdate('RESTRICT')->onDelete('RESTRICT');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::drop('ingredients_categories');

      Schema::table('ingredients', function(Blueprint $table)
      {
        $table->dropForeign('category_id_fk');
      });
    }
}
