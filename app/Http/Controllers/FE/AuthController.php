<?php

namespace App\Http\Controllers\FE;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Log;
// use Illuminate\Http\Client\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

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

    public function register(){
       return view('auth.register');  
    }

    public function submitRegister(Request $request)
    {
        // VALIDASI
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|max:255',
            'mobile'   => 'required|string|max:20',
            'password' => 'required|min:6|confirmed',
        ]);

        try {

            $response = Http::withHeaders([
                'Content-Type'     => 'application/json',
                'Authorization'    => 'Basic ' . base64_encode($request->username . ':' . $request->password),
                'Reference-Number' => 'REF' . now()->format('YmdHis'),
                'Channel-Id'       => 'WEB',
                'Origin'           => 'local',
                'Request-Time'     => now()->toISOString(), 

                
            ])->post(config('services.api.host') . '/seller/register', [
                'name'     => $request->name,
                'email'    => $request->email,
                'mobile'   => $request->mobile,
                'password' => $request->password,
            ]);
            //
           /** @var Response $response */
            $result = $response->json();

            // Cek responseCode dari API
            if (isset($result['responseCode']) && $result['responseCode'] === '0000') {

                
                // start coba2
                // SIMPAN USER LOKAL
                $user = User::create([
                    'name'     => $request->name,
                    'email'    => $request->email,
                    'password' => Hash::make($request->password),
                ]);

                // KIRIM EMAIL VERIFIKASI
                event(new Registered($user));

                // LOGIN USER
                auth()->login($user);

                // return redirect('/email/verify');
                return redirect('/email/verify')
                  ->with('success', 'Registrasi berhasil! Silakan cek email untuk verifikasi.');

                // end coba2
                


                /*return redirect()
                    ->route('login')
                    ->with('success', 'Register berhasil. Silakan login.');*/
            }

            //  Jika responseCode bukan 0000
            return back()->withErrors([
                'api_error' => $result['responseDesc'] ?? 'Register gagal.'
            ])->withInput();

        } catch (\Exception $e) {

            Log::error('Register API Error: ' . $e->getMessage());

            return back()->withErrors([
                'api_error' => 'Terjadi kesalahan pada server.'
            ])->withInput();
        }
    }
}
