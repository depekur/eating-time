<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Jeka',
            'email' => 'depekur@gmail.com',
            'password' => bcrypt('secret'),
        ]);

        DB::table('destination')->insert([
            'name' => 'Обед'
        ]);

        DB::table('destination')->insert([
            'name' => 'ужин'
        ]);

        DB::table('countries')->insert([
            'name' => 'Украина'
        ]);

        DB::table('countries')->insert([
            'name' => 'Украина'
        ]);
    }
}
