<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FE\AuthController;
use App\Http\Controllers\FE\ProductController;
use App\Http\Controllers\FE\OrdersController;
use App\Http\Controllers\FE\ProfileController;
use App\Http\Controllers\FE\IncomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Foundation\Auth\EmailVerificationRequest;


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



// halaman notice
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

// klik link email
// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();

//     return redirect('/dashboard');
// })->middleware(['auth', 'signed'])->name('verification.verify');

use Illuminate\Support\Facades\Auth;
use App\Models\User;
// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    
//     if (!Auth::check()) {
//         return redirect('/login');
//     }

//     $request->fulfill();

//     return redirect('/dashboard')->with('success', 'Email berhasil diverifikasi!');
    
// })->middleware(['signed'])->name('verification.verify');
Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {

    $user = User::findOrFail($id);

    // login otomatis
    Auth::login($user);

    // tandai verified
    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
    }

    return redirect('/dashboard')->with('success', 'Email berhasil diverifikasi!');

})->middleware(['signed'])->name('verification.verify');

// kirim ulang email
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back();
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');



use Illuminate\Support\Facades\Mail;
Route::get('/test-email', function () {
    Mail::raw('Test email dari Laravel', function ($message) {
        $message->to('aleemantap@gmail.com')
                ->subject('Test Email');
    });

    return 'Email terkirim!';
});