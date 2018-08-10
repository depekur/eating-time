<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RefactorUserMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('user_menu_recipes', function($table) {
        $table->dropForeign('recipe_id_menu');


        $table->dropColumn('dish_order');
        $table->dropColumn('eating_order');
        $table->dropColumn('recipe_id');


        $table->json('food');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
