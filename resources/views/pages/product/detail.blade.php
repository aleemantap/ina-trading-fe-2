@extends('layouts.app')

@section('content')
<div class="container-fluid p-4">
    <h2 class="mb-4">
       Detail Product
    </h2>
    <!-- HEADER -->
    <div class="card shadow-sm mb-4">
        <div class="card-body">
            <h4 class="fw-bold">Smartphone BIASA</h4>
            <p class="text-muted mb-2">Smartphone terbaru dengan fitur lengkap.</p>

            <span class="badge bg-secondary">DRAFT</span>
            <span class="badge bg-success">NEW</span>
            <span class="badge bg-primary">EXPORT</span>
        </div>
    </div>

    <!-- BASIC INFO -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Basic Information</div>
        <div class="card-body">
            <div class="row g-3 small">
                <div class="col-md-6">
                    <div class="text-muted">Category ID</div>
                    <div class="fw-semibold">e2d1e365-5ac5-4528-b769-1cabf73a99d3</div>
                </div>
                <div class="col-md-6">
                    <div class="text-muted">Manual File</div>
                    <div class="fw-semibold">product-manual.pdf</div>
                </div>
            </div>
        </div>
    </div>

    <!-- KEYWORDS -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Keywords</div>
        <div class="card-body">
            <span class="badge bg-light text-dark border">smartphone</span>
            <span class="badge bg-light text-dark border">android</span>
            <span class="badge bg-light text-dark border">5G</span>
        </div>
    </div>

    <!-- FEATURES -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Features</div>
        <div class="card-body">
            <ul class="mb-0">
                <li>Layar 6.5 inch</li>
                <li>Baterai 5000mAh</li>
                <li>Kamera 64MP</li>
            </ul>
        </div>
    </div>

    <!-- IMAGES -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Product Images</div>
        <div class="card-body">
            <div class="row g-2">
                <div class="col-md-2">
                    <div class="border rounded p-2 text-center">
                        <div class="bg-light rounded mb-2" style="height:80px;"></div>
                        <div class="small">img1.jpg</div>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="border rounded p-2 text-center">
                        <div class="bg-light rounded mb-2" style="height:80px;"></div>
                        <div class="small">img2.jpg</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- PRODUCT MODELS -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Product Models</div>
        <div class="card-body">

            <div class="border rounded p-3 mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="fw-bold mb-0">XYZ - Black 128GB</h6>
                    <span class="badge bg-warning text-dark">PROMO</span>
                </div>

                <div class="row small mb-2">
                    <div class="col-md-3"><span class="text-muted">SKU:</span> XYZ-BLK-128</div>
                    <div class="col-md-3"><span class="text-muted">Price:</span> 4.500.000 IDR</div>
                    <div class="col-md-3"><span class="text-muted">Weight:</span> 180 G</div>
                    <div class="col-md-3"><span class="text-muted">Dimension:</span> 15.2 x 7.4 x 0.8 CM</div>
                </div>

                <div class="alert alert-warning py-2 small mb-3">
                    Promo Price: <strong>4.200.000 IDR</strong><br>
                    Period: 2025-01-01 - 2025-01-15
                </div>

                <h6 class="fw-semibold mt-2">Warehouses</h6>
                <table class="table table-sm table-bordered small">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>e344b19c-657f-4c36-b198-262c4d1a168a</td>
                            <td>120</td>
                        </tr>
                    </tbody>
                </table>

                <h6 class="fw-semibold mt-2">Measurements</h6>
                <table class="table table-sm table-bordered small">
                    <thead class="table-light">
                        <tr>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Price</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>COLOR</td>
                            <td>Black</td>
                            <td>4.500.000 IDR</td>
                            <td>180 G</td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>

    <!-- PRODUCT INFO -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Product Information</div>
        <div class="card-body">
            <table class="table table-sm table-bordered">
                <tr>
                    <td>Brand</td>
                    <td>XYZ Corp</td>
                </tr>
                <tr>
                    <td>Battery</td>
                    <td>5000mAh</td>
                </tr>
            </table>
        </div>
    </div>

    <!-- COMPLIANCE -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Compliance Information</div>
        <div class="card-body small">
            <p><strong>Safety Warning:</strong> Jauhkan dari panas ekstrem</p>
            <p><strong>Country:</strong> China</p>
            <p><strong>File:</strong> compliance.pdf</p>
        </div>
    </div>

    <!-- WARRANTY -->
    <div class="card shadow-sm mb-4">
        <div class="card-header fw-semibold">Warranty</div>
        <div class="card-body small">
            <p><strong>Type:</strong> Official Warranty</p>
            <p><strong>Duration:</strong> 12 MONTH</p>
        </div>
    </div>

</div>


@endsection
