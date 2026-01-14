<?php

if (! function_exists('isLoggedIn')) {
    function isLoggedIn(): bool
    {
        return session()->has('api_token');
    }
}

if (! function_exists('authUser')) {
    function authUser(): ?array
    {
        return session('auth_user');
    }
}
