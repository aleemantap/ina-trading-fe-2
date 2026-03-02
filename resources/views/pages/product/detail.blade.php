@extends('layouts.app')

@section('content')
<div class="container-fluid p-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-bold mb-0">{{ $product['name'] ?? '-' }}</h3>
        <span class="badge bg-secondary">{{ $product['state'] ?? '-' }}</span>
    </div>

    <div class="row">

        {{-- LEFT COLUMN --}}
        <div class="col-md-6">

            {{-- Basic Info --}}
            <div class="card shadow-sm mb-4">
                <div class="card-header fw-semibold">Basic Information</div>
                <div class="card-body">
                    <p>{{ $product['description'] ?? '-' }}</p>

                    <div class="d-flex flex-wrap gap-2">
                        <span class="badge bg-success">
                            Export: {{ ($product['isEligibleToExport'] ?? false) ? 'Yes' : 'No' }}
                        </span>
                        <span class="badge bg-info">
                            New: {{ ($product['isNew'] ?? false) ? 'Yes' : 'No' }}
                        </span>
                        <span class="badge bg-warning text-dark">
                            PreOrder: {{ ($product['isPreOrder'] ?? false) ? $product['preOrderDay'].' Days' : 'No' }}
                        </span>
                    </div>
                </div>
            </div>

            {{-- Category --}}
            <div class="card shadow-sm mb-4">
                <div class="card-header fw-semibold">Category</div>
                <div class="card-body">
                    <p><strong>Category:</strong> {{ $product['subCategory']['category']['name'] ?? '-' }}</p>
                    <p><strong>Sub Category:</strong> {{ $product['subCategory']['name'] ?? '-' }}</p>

                    <hr>

                    @foreach($product['categoryInformations'] ?? [] as $cat)
                        <p class="mb-1">
                            <strong>{{ $cat['paramName'] }}:</strong> 
                            {{ $cat['paramValue'] }}
                        </p>
                    @endforeach
                </div>
            </div>

            {{-- Seller --}}
            <div class="card shadow-sm mb-4">
                <div class="card-header fw-semibold">Seller</div>
                <div class="card-body">
                    <p class="mb-0 fw-semibold">
                        {{ $product['seller']['name'] ?? '-' }}
                    </p>
                </div>
            </div>

        </div>


        {{-- RIGHT COLUMN --}}
        <div class="col-md-6">

            {{-- Product Information --}}
            <div class="card shadow-sm mb-4">
                <div class="card-header fw-semibold">Product Information</div>
                <div class="card-body">
                    @foreach($product['productInformations'] ?? [] as $info)
                        <div class="d-flex justify-content-between border-bottom py-1">
                            <span>{{ $info['paramName'] }}</span>
                            <span class="fw-semibold">{{ $info['paramValue'] }}</span>
                        </div>
                    @endforeach
                </div>
            </div>

            {{-- Warranty --}}
            <div class="card shadow-sm mb-4">
                <div class="card-header fw-semibold">Warranty</div>
                <div class="card-body">
                    <p class="mb-1">
                        <strong>Type:</strong> {{ $product['warrantyInformation']['type'] ?? '-' }}
                    </p>
                    <p class="mb-0">
                        <strong>Duration:</strong> 
                        {{ $product['warrantyInformation']['duration'] ?? '-' }}
                        {{ $product['warrantyInformation']['durationType'] ?? '' }}
                    </p>
                </div>
            </div>

            {{-- Compliance --}}
            <div class="card shadow-sm mb-4">
                <div class="card-header fw-semibold">Compliance</div>
                <div class="card-body">
                    <p><strong>Origin:</strong> {{ $product['complianceInformation']['countryOfOrigin'] ?? '-' }}</p>
                    <p>
                        <strong>Dangerous Goods:</strong> 
                        {{ ($product['complianceInformation']['isDangerousGoodRegulation'] ?? false) ? 'Yes' : 'No' }}
                    </p>
                    <p><strong>Safety:</strong> {{ $product['complianceInformation']['safetyWarning'] ?? '-' }}</p>

                    @if(!empty($product['complianceInformation']['fileId']))
                        <a href="{{ $product['complianceInformation']['fileId'] }}" 
                           target="_blank" 
                           class="btn btn-sm btn-outline-primary mt-2">
                           Download Compliance File
                        </a>
                    @endif
                </div>
            </div>

        </div>
    </div>


    {{-- PRODUCT MODELS --}}
    <div class="card shadow-sm mt-4">
        <div class="card-header fw-semibold">Product Models</div>
        <div class="card-body">

            @foreach($product['productModels'] ?? [] as $model)

                <div class="border rounded p-3 mb-4">

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="mb-0">{{ $model['name'] ?? '-' }}</h5>
                        <span class="badge bg-dark">{{ $model['sku'] ?? '-' }}</span>
                    </div>

                    @if(!empty($model['imageId']))
                        <img src="{{ $model['imageId'] }}" 
                             class="img-thumbnail mb-3" 
                             style="max-width:200px;">
                    @endif

                    @foreach($model['productMeasurements'] ?? [] as $measure)

                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead class="table-light">
                                    <tr>
                                        <th>Color</th>
                                        <th>Price</th>
                                        <th>Weight</th>
                                        <th>Dimension</th>
                                        <th>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ $measure['measurementValue'] ?? '-' }}</td>
                                        <td>
                                            {{ $measure['currency'] ?? '' }}
                                            {{ number_format($measure['price'] ?? 0) }}
                                        </td>
                                        <td>
                                            {{ $measure['weight'] ?? '-' }}
                                            {{ $measure['weightType'] ?? '' }}
                                        </td>
                                        <td>
                                            {{ $measure['length'] ?? '-' }} x
                                            {{ $measure['width'] ?? '-' }} x
                                            {{ $measure['height'] ?? '-' }}
                                            {{ $measure['dimensionType'] ?? '' }}
                                        </td>
                                        <td>
                                            @foreach($measure['warehouses'] ?? [] as $wh)
                                                <div>
                                                    {{ $wh['city'] ?? '-' }} :
                                                    <strong>{{ $wh['stock'] ?? 0 }}</strong>
                                                </div>
                                            @endforeach
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    @endforeach

                </div>

            @endforeach

        </div>
    </div>

</div>
@endsection