<?php 

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// public routes
Route::post('/login', [ApiAuthController::class, "login"]);
Route::post('/register',[ApiAuthController::class,'register']);
Route::post('/logout', [ApiAuthController::class,'logout']);