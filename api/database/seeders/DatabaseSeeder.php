<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            ['name' => 'tung', 'email' => 'tung1@gmail.com', 'role' => 'admin', 'password' => Hash::make('tung')]
        );
    }
}
