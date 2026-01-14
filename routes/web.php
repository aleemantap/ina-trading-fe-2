<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FE\AuthController;
use App\Http\Controllers\FE\ProductController;



Route::get('/', function () {
    return isLoggedIn()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

Route::middleware('api.guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
});
Route::middleware('api.auth')->group(function () {
    Route::get('/dashboard', fn () => view('dashboard'))->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/force-logout', function (\Illuminate\Http\Request $request) {
        $request->session()->flush();
        return response()->json(['message' => 'session cleared']);
    });

    Route::get('/post-product', [ProductController::class, 'postProduct'])
    ->name('post.product');
    Route::get('/list-product', [ProductController::class, 'listProduct'])
    ->name('list.product');
    Route::get('/product/{id}', [ProductController::class, 'detail'])
    ->name('product.detail');

    
});

// Route::get('/debug-env', function () {
//     dd(env('API_HOST'));
// });

// Route::get('/debug-config', function () {
//     dd(config('services.api.host'));
// });

// Route::get('/debug-env2', function () {
//     dd(
//         file_exists(base_path('.env')),
//         env('API_URL'),
//         config('services.api.host')
//     );
// });