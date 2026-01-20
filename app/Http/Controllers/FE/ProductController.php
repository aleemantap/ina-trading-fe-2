<?php

namespace App\Http\Controllers\FE;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductApiService;

class ProductController extends Controller
{
    /**
     * Halaman post product
     */
    public function postProduct()
    {
        return view('pages.product.postProduct');
    }

   

    public function listProduct(
        Request $request,
        ProductApiService $productApi
    ) {
        try {
            $page  = $request->integer('page', 1);
            $size  = 10;
            $param = $request->get('q', '');

            $result = $productApi->fetchProducts(
                $page,
                $size,
                $param
            );

            return view('pages.product.listProduct', [
                'products'   => $result['data'] ?? [],
                'pagination' => $result['pagination'] ?? null,
                'param'      => $param,
            ]);

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function detail(
        Request $request
      
    ) {
       
       return view('pages.product.detail');
    }

}
