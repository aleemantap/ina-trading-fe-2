@extends('layouts.app')

@section('content')
<div class="container py-4" style="margin-top:-30px;">
   {{-- HEADER --}}
    <div class="d-flex align-items-center justify-content-between mt-4 mb-4">
        <h1 class="fw-bold fs-3 mb-0">Your Orders Tracking</h1>

        <form method="GET" class="d-flex align-items-center gap-2">
            <div class="input-group" style="width:300px;">
                <span class="input-group-text bg-white">
                    <i class="bi bi-search text-secondary"></i>
                </span>
                <input
                    type="text"
                    name="q"
                    value="{{ request('q') }}"
                    class="form-control"
                    placeholder="Search all orders"
                >
            </div>

            <button class="btn btn-primary btn-sm rounded-pill">
                Search Orders
            </button>
        </form>
    </div>

    {{-- TRACKING --}}
    @include('pages.order.partials.tracking-order', ['orderId' => $orderId ?? null])
</div>
@endsection

@push('styles') 
<style>

</style>
@endpush
