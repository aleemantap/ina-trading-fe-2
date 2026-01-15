@extends('layouts.app')

@section('content')
<div class="container py-4" style="margin-top:-30px;">
    {{-- Header --}}
    <div class="d-flex justify-content-between align-items-center mt-4 mb-4">
        <h4 class="fw-semibold">Your Orders</h4>
        <form class="d-flex gap-2">
            <div class="input-group" style="width: 300px">
                <span class="input-group-text bg-white">
                    <i class="bi bi-search text-muted"></i>
                </span>
                <input type="text"
                       name="q"
                       class="form-control border-start-0"
                       placeholder="Search all orders">
            </div>
            <button class="btn btn-primary rounded-pill px-4">
                Search Orders
            </button>
        </form>
    </div>

    {{-- Tabs --}}
    @include('pages.order.partials.tabs')

    {{-- Filter --}}
    <div id="orders-filter" class="mt-3">
        @include('pages.order.partials.filter')
    </div>

    {{-- Tab Content --}}
    <div class="tab-content mt-4 text-muted small">

        {{-- ORDERS --}}
        <div class="tab-pane fade show active" id="orders">
            <div class="row g-3 mb-4">
                <div class="col-md-4">@include('pages.order.partials.shipping-detail')</div>
                <div class="col-md-4">@include('pages.order.partials.order-detail')</div>
                <div class="col-md-4">
                    @include('pages.order.partials.order-summary', [
                        'id' => '1234',
                        'total' => '365.00',
                        'shipping' => 'Post Indonesia',
                        'awb' => 'awb1234556'
                    ])
                </div>
            </div>

            <div class="row g-3">
                <div class="col-md-4">@include('pages.order.partials.shipping-detail')</div>
                <div class="col-md-4">@include('pages.order.partials.order-detail')</div>
                <div class="col-md-4">
                    @include('pages.order.partials.order-summary', [
                        'id' => '1234',
                        'total' => '365.00',
                        'shipping' => 'Post Indonesia',
                        'awb' => 'awb1234556'
                    ])
                </div>
            </div>
        </div>

        <div class="tab-pane fade" id="waiting">Waiting confirmation orders...</div>
        <div class="tab-pane fade" id="not-yet-shipped">Orders not yet shipped...</div>
        <div class="tab-pane fade" id="shipped">Shipped orders...</div>
        <div class="tab-pane fade" id="cancelled">Cancelled orders...</div>
        <div class="tab-pane fade" id="completed">Completed orders...</div>

    </div>
</div>
@endsection

@push('styles') 
<style>
.btn-search{
    height: 35px !important;
}
.btn-search:hover {
    background-color: #24060b;
    color: #ffffff;
  
}
</style>
@endpush
