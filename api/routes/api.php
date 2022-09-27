<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Faker\Provider\Image;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/email/{email}', [UserController::class, 'emailUnique']);
Route::post('/{id}/upload-image', [UserController::class, 'upload']);
Route::group(['middleware' => ["auth:sanctum"]], function () {
    Route::get('/member', [UserController::class, 'index']);
    Route::get('/member/{id}', [UserController::class, 'show']);
    Route::post('/member/edit/{id}', [UserController::class, 'update']);
    Route::post('/member/create', [UserController::class, 'store']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::get('/phone/{phone}', [UserController::class, 'phoneUnique']);
    Route::delete('/delete/{id}', [UserController::class, 'destroy']);
});
