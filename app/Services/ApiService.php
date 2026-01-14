<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class ApiService
{
    public static function client()
    {
        return Http::acceptJson()
            ->timeout(10);
    }
}
