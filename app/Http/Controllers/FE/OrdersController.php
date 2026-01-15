<?php

namespace App\Http\Controllers\FE;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Services\ProductApiService;

class OrdersController extends Controller
{


    public function yourOrders()
    {
        return view('pages.order.yourOrders');
       
    }

    public function showDetail(Request $request){
        $id = $request->id;

        return view('pages.order.detail',["id"=>$id]);
    }

    public function trackDetail(Request $request){
        $id = $request->id;

        return view('pages.order.tracking',["id"=>$id]);
    }

}