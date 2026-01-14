<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class ProductApiService
{
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl =  config('services.api.host');
       
    }

    public function fetchProducts(
        int $page = 1,
        int $size = 10,
        string $param = ''
    ): array {
        $token = Session::get('api_token'); 

        $response = Http::withHeaders([
            'Content-Type'      => 'application/json',
            'Accept'            => 'application/json',
            'Reference-Number'  => 'REF20230708100000001',
            'Channel-Id'        => 'WEB',
            'Request-Time'      => now()->format('Y-m-d H:i:s'),
            'Authorization'     => $token ? "Bearer {$token}" : null,
        ])->get("{$this->baseUrl}/product", [
            'page'  => $page,
            'size'  => $size,
            'param' => $param,
        ]);
         /** @var Response $response */
        if ($response->failed()) {
            throw new \Exception(
                $response->json('message') ?? 'Failed to fetch products'
            );
        }

        return $response->json();
    }
}
