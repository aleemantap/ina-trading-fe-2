<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FE\AuthController;
use App\Http\Controllers\FE\ProductController;
use App\Http\Controllers\FE\OrdersController;
use App\Http\Controllers\FE\ProfileController;
use App\Http\Controllers\FE\IncomeController;


Route::get('/', function () {
    return isLoggedIn()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
});

Route::middleware('api.guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::get('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/register', [AuthController::class, 'submitRegister'])->name('register.submit');
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

    Route::get('/product-edit/{id}', [ProductController::class, 'edit'])
    ->name('product.edit');

    Route::get('/product-detail/{id}', [ProductController::class, 'detailMobile'])
    ->name('product.detailM');

    
    //orders
    Route::get('/your-orders', [OrdersController::class, 'yourOrders'])
    ->name('your.orders');

    Route::get('/your-orders/show-orders-detail/{id}', [OrdersController::class, 'showDetail'])
    ->name('show.detail');

    Route::get('/your-orders/tracking/{id}', [OrdersController::class, 'trackDetail'])
    ->name('show.track');


    //inocome dan report
    Route::get('/income-balance', [IncomeController::class, 'incomeBalance'])
    ->name('income.balance');
    Route::get('/income-report', [IncomeController::class, 'incomeReport'])
    ->name('income.report');
  
  

    //profile 
    Route::get('/store-profile', [ProfileController::class, 'index'])
    ->name('your.profile');


    
});

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

Route::get('/pdf-viewer', function (Request $request) {

    $url = $request->query('url');

    if (!$url) {
        abort(404);
    }

    $response = Http::get($url);

    return response($response->body(), 200)
        ->header('Content-Type', 'application/pdf')
        ->header('Content-Disposition', 'inline');

});