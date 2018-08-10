<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserSettingsRefactoring extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::table('settings', function($table) {

        $table->dropColumn('first_dish_time');
        $table->dropColumn('second_dish_time');
        $table->dropColumn('third_dish_time');
        $table->dropColumn('fourth_dish_time');
        $table->dropColumn('fifth_dish_time');


        $table->json('eating_time');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
