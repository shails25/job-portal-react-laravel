<?php

use App\Http\Controllers\JobController;
use App\Http\Controllers\Auth\ApiAuthController;
use App\Models\Job;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'auth:api'], function() {
    // create new job
    Route::post("/job/", [JobController::class, 'create']);  

    // update a job
    Route::put("/job/{job_id}", [JobController::class, 'update']);  
    
    // Route::delete("/job/{job_id}", [JobController::class, 'update']);

    Route::get("/userJobs", [JobController::class, 'getUserAppliedJobs']);
    Route::get("/recruiterJobs", [JobController::class, 'getRecruiterJobs']);
    Route::post("/apply/{job_id}", [JobController::class, 'applyJob']);
    Route::post('/logout', [ApiAuthController::class,'logout']);
});

//get all jobs list
Route::get("/jobs", [JobController::class, 'index']);

// get selected job details
Route::get("/job/{job_id}", [JobController::class, 'getJob']);  


// Route::get("/details", [ApiAuthController::class, "details"])
// public routes
Route::get("/login", [ApiAuthController::class, "login"])->name("login");
Route::post('/login', [ApiAuthController::class, "login"]);
Route::post('/register',[ApiAuthController::class,'register']);

