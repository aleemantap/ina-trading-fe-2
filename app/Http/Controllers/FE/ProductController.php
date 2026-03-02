<?php

namespace App\Http\Controllers\FE;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductApiService;
use Illuminate\Support\Facades\Log;
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

       $id = $request->id; 
       
       return view('pages.product.detail');
    }


    public function detailMobile(
        Request $request,
        ProductApiService $productApi
      
    ) {

        $id = $request->id;

        try {

            $response = $productApi->fetchProductById($id);
            $product = $response['data'] ?? null;           

            if (!$product) {
                return redirect()
                    ->route('list.product')
                    ->with('error', 'Product tidak ditemukan.');
            }
            return view('pages.product.detailM', compact('product'));

        } catch (\Throwable $e) {

            Log::error('Failed to fetch product detail', [
                'product_id' => $id,
                'error' => $e->getMessage()
            ]);

            return redirect()
                ->route('list.product')
                ->with('error', 'Product tidak ditemukan atau gagal dimuat.');
        }
       
   
    }


    

    public function edit(Request $request, ProductApiService $productApi)
    {
        $id = $request->id;

        try {

            $response = $productApi->fetchProductById($id);
            $product = $response['data'] ?? null;

            $response2 = $productApi->fetchProductByIdReview($id);
            $product2 = $response2['data'] ?? null;

            if($product)
            {
                return view('pages.product.edit', compact('product'));
            }
            else if($product2)
            {
                $product = $product2;
                return view('pages.product.edit', compact('product'));
            }
            else
            {
                 return redirect()
                    ->route('list.product')
                    ->with('error', 'Product tidak ditemukan.');
            }

            // if (!$product) {
            //     return redirect()
            //         ->route('list.product')
            //         ->with('error', 'Product tidak ditemukan.');
            // }
            // return view('pages.product.edit', compact('product'));

        } catch (\Throwable $e) {

            Log::error('Failed to fetch product detail', [
                'product_id' => $id,
                'error' => $e->getMessage()
            ]);

            return redirect()
                ->route('list.product')
                ->with('error', 'Product tidak ditemukan atau gagal dimuat.');
        }
    }

        

}
