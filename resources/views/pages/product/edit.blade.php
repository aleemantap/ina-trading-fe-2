@extends('layouts.app')

@php $page = 'product-form'; @endphp

@push('before-scripts')
<script>
    window.APP_DATA = {
        page: "product-form",
        mode: "edit",
        product: @json($product ?? null),
        id: @json($id ?? null)
    };
</script>
@endpush

@section('content')
    @include('pages.product.formProduct')
@endsection