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
    <div class="card shadow-sm mt-4 mb-4">
    <div class="card-header fw-semibold">Product Models</div>

    <div class="card-body">

        @forelse($product['productModels'] ?? [] as $model)

        <div class="border rounded p-3 mb-4">

            <div class="mb-2 fw-semibold text-primary">
                {{ $model['name'] }} (SKU: {{ $model['sku'] }})
            </div>

            <table class="table table-sm table-bordered align-middle mb-3">
                <tbody>

                    <tr>
                        <th width="25%">Price</th>
                        <td>{{ $model['currency'] }} {{ number_format($model['price']) }}</td>

                        <th width="25%">Promotion Price</th>
                        <td>
                            @if($model['isConfigurePromotionPrice'])
                                {{ $model['promotionCurrency'] }} {{ number_format($model['promotionPrice']) }}
                            @else
                                -
                            @endif
                        </td>
                    </tr>

                    <tr>
                        <th>Weight</th>
                        <td>{{ $model['weight'] }} {{ $model['weightType'] }}</td>

                        <th>Dimension</th>
                        <td>
                            {{ $model['length'] }} x
                            {{ $model['width'] }} x
                            {{ $model['height'] }}
                            {{ $model['dimensionType'] }}
                        </td>
                    </tr>

                    <tr>
                        <th>Packaging Weight</th>
                        <td>{{ $model['packagingWeight'] }} {{ $model['packagingWeightType'] }}</td>

                        <th>Packaging Dimension</th>
                        <td>
                            {{ $model['packagingLength'] }} x
                            {{ $model['packagingWidth'] }} x
                            {{ $model['packagingHeight'] }}
                            {{ $model['packagingDimensionType'] }}
                        </td>
                    </tr>

                    @if($model['isConfigurePromotionPrice'])
                    <tr>
                        <th>Promotion Period</th>
                        <td colspan="3">
                            {{ $model['promotionStartDate'] }}
                            -
                            {{ $model['promotionEndDate'] }}
                        </td>
                    </tr>
                    @endif

                </tbody>
            </table>

            {{-- Warehouse Section --}}
            <div class="fw-semibold mb-2">Warehouse</div>

            <table class="table table-sm table-striped table-bordered">
                <thead class="table-light">
                    <tr>
                        <th>Country</th>
                        <th>Province</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Stock</th>
                    </tr>
                </thead>

                <tbody>

                @forelse($model['warehouses'] ?? [] as $warehouse)

                    <tr>
                        <td>{{ $warehouse['country'] }}</td>
                        <td>{{ $warehouse['province'] }}</td>
                        <td>{{ $warehouse['city'] }}</td>
                        <td>{{ $warehouse['address'] }}</td>
                        <td class="fw-semibold">{{ $warehouse['stock'] }}</td>
                    </tr>

                @empty

                    <tr>
                        <td colspan="5" class="text-center text-muted">
                            No warehouse data
                        </td>
                    </tr>

                @endforelse

                </tbody>
            </table>

        </div>

        @empty

        <div class="text-muted text-center">
            No product models
        </div>

        @endforelse

    </div>
</div>
   

    {{-- document --}}
    <div class="card shadow-sm mt-4 mb-4">
        <div class="card-header fw-semibold">Documents</div>
        <div class="card-body">
     
                <ul class="list-group">
                    @forelse($product['productFiles'] ?? [] as $file)

                        @if(!empty($file['fileId']))
                        <li class="list-group-item d-flex justify-content-between align-items-center">

                            <span>📄 {{ basename(parse_url($file['fileId'], PHP_URL_PATH)) }}</span>

                            <div>
                                <a href="{{ $file['fileId'] }}"
                                target="_blank"
                                class="btn btn-sm btn-outline-primary">
                                Download
                                </a>

                                <button type="button"
                                        class="btn btn-sm btn-outline-primary view-document-btn"
                                        data-pdf-url="{{ $file['fileId'] }}">
                                    <i class="bi bi-eye"></i>
                                </button>
                            </div>

                        </li>
                        @endif

                    @empty
                        {{-- tidak menampilkan apa apa --}}
                    @endforelse
                </ul>
        </div>
    </div>

</div>

<!-- Modal -->
<div class="modal fade" id="documentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="bi bi-file-pdf"></i> Document Preview
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body p-0">
                <iframe id="pdfViewer" src="" width="100%" height="600px" style="border: none;"></iframe>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <a href="#" id="downloadLink" target="_blank" class="btn btn-primary">
                    <i class="bi bi-download"></i> Download
                </a>
            </div>
        </div>
    </div>
</div>
@endsection




@push('scripts')
<script>


// document.addEventListener("click", function(e){

//     const btn = e.target.closest(".view-document-btn");
//     if(!btn) return;

//     const pdfUrl = btn.dataset.pdfUrl;

//     const pdfViewer = document.getElementById('pdfViewer');
//     const downloadLink = document.getElementById('downloadLink');

//     if (pdfViewer && pdfUrl) {
//         pdfViewer.src = pdfUrl + '#toolbar=1';
//     }

//     if (downloadLink && pdfUrl) {
//         downloadLink.href = pdfUrl;
//     }

//     const modal = new bootstrap.Modal(document.getElementById('documentModal'));
//     modal.show();

// });

// document.addEventListener("click", function(e){

//     const btn = e.target.closest(".view-document-btn");
//     if(!btn) return;

//     const pdfUrl = btn.dataset.pdfUrl;

//     const pdfViewer = document.getElementById('pdfViewer');
//     const downloadLink = document.getElementById('downloadLink');

//     if (pdfViewer && pdfUrl) {

//         const viewerUrl =
//         "https://docs.google.com/gview?embedded=1&url=" +
//         encodeURIComponent(pdfUrl);

//         // pdfViewer.src = viewerUrl;
//         pdfViewer.src = "/pdf-viewer?url=" + encodeURIComponent(pdfUrl);
//     }

//     if (downloadLink && pdfUrl) {
//         downloadLink.href = pdfUrl;
//     }

//     const modal = new bootstrap.Modal(
//         document.getElementById('documentModal')
//     );

//     modal.show();

// });

document.addEventListener("click", function(e){

    const btn = e.target.closest(".view-document-btn");
    if(!btn) return;

    const pdfUrl = btn.dataset.pdfUrl;

    const pdfViewer = document.getElementById("pdfViewer");
    const downloadLink = document.getElementById("downloadLink");

    if (pdfViewer && pdfUrl) {

        const proxyUrl = "/pdf-viewer?url=" + encodeURIComponent(pdfUrl);

        // tampilkan PDF di iframe melalui proxy Laravel
        pdfViewer.src = proxyUrl;
    }

    if (downloadLink && pdfUrl) {
        // tombol download tetap ke API asli
        downloadLink.href = pdfUrl;
    }

    const modal = new bootstrap.Modal(
        document.getElementById("documentModal")
    );

    modal.show();

});
</script>
@endpush