<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiGuest
{
    public function handle($request, \Closure $next)
    {
        if (session()->has('api_token')) {
            return redirect('/dashboard');
        }
        return $next($request);
    }
}

// public function handle($request, Closure $next)
// {
//     if (session()->has('token')) {
//         return redirect()->route('dashboard');
//     }

//     return $next($request);
// }