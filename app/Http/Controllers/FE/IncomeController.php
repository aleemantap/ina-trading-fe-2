<?php

namespace App\Http\Controllers\FE;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Services\ProductApiService;

class IncomeController extends Controller
{
    /**
     * Halaman post product
     */
    public function incomeBalance()
    {
        return view('pages.income.incomeBalance');
    }

    public function incomeReport(){
        return view('pages.income.incomeReport');
    }

    // public function listProduct(
    //     Request $request,
    //     ProductApiService $productApi
    // ) {
    //     try {
    //         $page  = $request->integer('page', 1);
    //         $size  = 10;
    //         $param = $request->get('q', '');

    //         $result = $productApi->fetchProducts(
    //             $page,
    //             $size,
    //             $param
    //         );

    //         return view('pages.product.listProduct', [
    //             'products'   => $result['data'] ?? [],
    //             'pagination' => $result['pagination'] ?? null,
    //             'param'      => $param,
    //         ]);

    //     } catch (\Exception $e) {
    //         return back()->with('error', $e->getMessage());
    //     }
    // }

    // public function detail(
    //     Request $request
      
    // ) {
       
    //    return view('pages.product.detail');
    // }

}
