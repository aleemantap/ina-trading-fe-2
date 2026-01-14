<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuth
{
    // public function handle(Request $request, Closure $next)
    // {
    //     if (!session()->has('api_token')) {
    //         return redirect('/login');
    //     }

    //     return $next($request);
    // }
    public function handle(Request $request, Closure $next): Response
    {
        if (!isLoggedIn()) {
            return redirect()->route('login');
        }

        return $next($request);
    }
}
