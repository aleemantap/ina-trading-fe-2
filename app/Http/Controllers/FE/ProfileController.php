<?php

namespace App\Http\Controllers\FE;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
// use App\Services\ProductApiService;

class ProfileController extends Controller
{


  
    public function index(Request $request){
        $id = $request->id;

        return view('pages.profile-warehouse.index',["id"=>$id]);
    }


}