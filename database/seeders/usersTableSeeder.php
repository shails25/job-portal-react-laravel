<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class usersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's clear the users table first
        User::truncate();

        $faker = \Faker\Factory::create();

        $password = Hash::make('admin');

        User::create([
            'name' => 'user',
            'email' => 'user@test.com',
            'user_type' => 'user',
            'password' => $password,
        ]);

        User::create([
            'name' => 'recruit',
            'email' => 'recruiter@test.com',
            'user_type' => 'recruiter',
            'password' => $password,
        ]);

        // And now let's generate a few dozen users for our app:
        // for ($i = 0; $i < 5; $i++) {
        //     User::create([
        //         'name' => $faker->name,
        //         'email' => $faker->email,
        //         'password' => $password,
        //         'user_type' => 'user',
        //     ]);
        // }
    }
}
