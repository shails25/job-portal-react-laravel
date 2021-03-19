<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Job;

class JobsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Job::truncate();
        $faker = \Faker\Factory::create();

        // And now, let's create a few articles in our database:
        for ($i = 0; $i < 10; $i++) {
            Job::create([
                'title' => $faker->sentence,
                "recruiter_id" => 2,
                'image' => "",
                'description' => $faker->sentence,
                'skills' => join(",", $faker->words($nb = 3, $asText = false)),
                'location' => $faker->state                               ,
            ]);
        }
    }
}
