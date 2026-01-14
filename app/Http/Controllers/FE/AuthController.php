<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Log;
// use Illuminate\Http\Client\Response;


class AuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        // Basic Auth
        $basicAuth = base64_encode(
            $request->username . ':' . $request->password
        );
        // $url = config('services.api.host') . '/api/v1.0/seller/login';
        /** @var Response $response */
         $response = Http::withHeaders([
            'Content-Type'     => 'application/json',
            'Authorization'    => 'Basic ' . base64_encode($request->username . ':' . $request->password),
            'Reference-Number' => 'REF20230708100000001',
            'Channel-Id'       => 'WEB',
            'Origin'           => 'local',
            'Request-Time'     => now()->toISOString(),
        ])->post(config('services.api.host') . '/seller/login');


        
        if ($response->failed()) {

            Log::error('LOGIN API FAILED', [
                'url'        => '/api/v1.0/seller/login',
                'status'     => $response->status(),
                'response'   => $response->json(),
                'body_raw'   => $response->body(),
                'headers'    => $response->headers(),
            ]);

            return back()->withErrors([
                'login' => 'Login gagal. Silakan cek username atau password'
            ]);
        }

        $body = $response->json();

        // API business error
        if (($body['responseCode'] ?? null) !== '0000') {
            return back()->withErrors([
                'login' => $body['responseDesc'] ?? 'Login gagal'
            ]);
        }

        //  SIMPAN KE SESSION
        session([
            'api_token' => $body['data']['session'], // JWT
            'auth_user' => [
                'id'             => $body['data']['id'],
                'name'           => $body['data']['name'],
                'user_type'      => $body['data']['userType'],
                'is_active'      => $body['data']['isSellerActive'],
            ],
        ]);

        return redirect('/dashboard');
    }

    public function logout()
    {
        session()->flush();
        return redirect('/login');
    }
}
