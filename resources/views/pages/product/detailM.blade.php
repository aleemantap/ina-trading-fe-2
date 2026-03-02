@extends('layouts.app')

@section('content')
<div class="container-fluid p-4">

    <h2 class="mb-4">Detail Product</h2>

    {{-- BASIC INFO --}}
    <div class="card mb-4">
        <div class="card-body">
            <h4>{{ $product['name'] ?? '-' }}</h4>
            <p><strong>Description:</strong> {{ $product['description'] ?? '-' }}</p>
            <p><strong>State:</strong> {{ $product['state'] ?? '-' }}</p>
            <p><strong>Eligible to Export:</strong> 
                {{ ($product['isEligibleToExport'] ?? false) ? 'Yes' : 'No' }}
            </p>
            <p><strong>New:</strong> {{ ($product['isNew'] ?? false) ? 'Yes' : 'No' }}</p>
            <p><strong>Pre Order:</strong> 
                {{ ($product['isPreOrder'] ?? false) ? 'Yes ('.$product['preOrderDay'].' Days)' : 'No' }}
            </p>
        </div>
    </div>

    {{-- CATEGORY --}}
    <div class="card mb-4">
        <div class="card-header">Category Information</div>
        <div class="card-body">
            <p><strong>Category:</strong> {{ $product['subCategory']['category']['name'] ?? '-' }}</p>
            <p><strong>Sub Category:</strong> {{ $product['subCategory']['name'] ?? '-' }}</p>

            @foreach($product['categoryInformations'] ?? [] as $cat)
                <p><strong>{{ $cat['paramName'] }}:</strong> {{ $cat['paramValue'] }}</p>
            @endforeach
        </div>
    </div>

    {{-- PRODUCT INFORMATION --}}
    <div class="card mb-4">
        <div class="card-header">Product Information</div>
        <div class="card-body">
            @foreach($product['productInformations'] ?? [] as $info)
                <p><strong>{{ $info['paramName'] }}:</strong> {{ $info['paramValue'] }}</p>
            @endforeach
        </div>
    </div>

    {{-- FEATURES --}}
    <div class="card mb-4">
        <div class="card-header">Features</div>
        <div class="card-body">
            <ul>
                @foreach($product['productFeatures'] ?? [] as $feature)
                    <li>{{ $feature }}</li>
                @endforeach
            </ul>
        </div>
    </div>

    {{-- WARRANTY --}}
    <div class="card mb-4">
        <div class="card-header">Warranty Information</div>
        <div class="card-body">
            <p><strong>Type:</strong> {{ $product['warrantyInformation']['type'] ?? '-' }}</p>
            <p><strong>Duration:</strong> 
                {{ $product['warrantyInformation']['duration'] ?? '-' }}
                {{ $product['warrantyInformation']['durationType'] ?? '' }}
            </p>
        </div>
    </div>

    {{-- COMPLIANCE --}}
    <div class="card mb-4">
        <div class="card-header">Compliance Information</div>
        <div class="card-body">
            <p><strong>Country of Origin:</strong> {{ $product['complianceInformation']['countryOfOrigin'] ?? '-' }}</p>
            <p><strong>Dangerous Goods:</strong> 
                {{ ($product['complianceInformation']['isDangerousGoodRegulation'] ?? false) ? 'Yes' : 'No' }}
            </p>
            <p><strong>Safety Warning:</strong> {{ $product['complianceInformation']['safetyWarning'] ?? '-' }}</p>

            @if(!empty($product['complianceInformation']['fileId']))
                <p>
                    <strong>Compliance File:</strong>
                    <a href="{{ $product['complianceInformation']['fileId'] }}" target="_blank">
                        Download File
                    </a>
                </p>
            @endif
        </div>
    </div>

    {{-- SELLER --}}
    <div class="card mb-4">
        <div class="card-header">Seller</div>
        <div class="card-body">
            <p><strong>Name:</strong> {{ $product['seller']['name'] ?? '-' }}</p>
        </div>
    </div>

    {{-- MODELS --}}
    <div class="card mb-4">
        <div class="card-header">Product Models</div>
        <div class="card-body">

            @foreach($product['productModels'] ?? [] as $model)

                <div class="border p-3 mb-3">
                    <h5>{{ $model['name'] ?? '-' }}</h5>
                    <p><strong>SKU:</strong> {{ $model['sku'] ?? '-' }}</p>

                    @if(!empty($model['imageId']))
                        <img src="{{ $model['imageId'] }}" width="150" class="mb-3">
                    @endif

                    @foreach($model['productMeasurements'] ?? [] as $measure)
                        <div class="bg-light p-2 mb-2">
                            <p><strong>Color:</strong> {{ $measure['measurementValue'] ?? '-' }}</p>
                            <p><strong>Price:</strong> 
                                {{ $measure['currency'] ?? '' }}
                                {{ number_format($measure['price'] ?? 0) }}
                            </p>
                            <p><strong>Weight:</strong> 
                                {{ $measure['weight'] ?? '-' }}
                                {{ $measure['weightType'] ?? '' }}
                            </p>
                            <p><strong>Dimension:</strong>
                                {{ $measure['length'] ?? '-' }} x
                                {{ $measure['width'] ?? '-' }} x
                                {{ $measure['height'] ?? '-' }}
                                {{ $measure['dimensionType'] ?? '' }}
                            </p>

                            {{-- Warehouse --}}
                            @foreach($measure['warehouses'] ?? [] as $wh)
                                <div class="border p-2 mt-2">
                                    <p><strong>Warehouse:</strong> {{ $wh['city'] ?? '-' }}, {{ $wh['province'] ?? '-' }}</p>
                                    <p><strong>Stock:</strong> {{ $wh['stock'] ?? 0 }}</p>
                                    <p><strong>Address:</strong> {{ $wh['address'] ?? '-' }}</p>
                                </div>
                            @endforeach

                        </div>
                    @endforeach
                </div>

            @endforeach

        </div>
    </div>

</div>
@endsection