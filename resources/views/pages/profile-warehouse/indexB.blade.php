@extends('layouts.app')

@section('content')
<div class="container py-4">

    {{-- Back --}}
    <a href="#" class="d-inline-flex align-items-center text-muted mb-4 text-decoration-none">
        <i class="bi bi-chevron-left me-2"></i> Settings
    </a>

    {{-- ================= STORE DETAILS ================= --}}
    <div class="mb-5">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="fw-bold">Store Details</h4>
            <a href="#" class="d-flex align-items-center gap-2 text-muted text-decoration-none border-bottom">
                <img src="{{ asset('img/icons/eyeView.png') }}" width="16">
                View Store
            </a>
        </div>

        {{-- Cover --}}
        <div class="position-relative bg-light rounded shadow-sm" style="height:250px">
            <button class="btn btn-light rounded-circle position-absolute bottom-0 end-0 m-3 shadow">
                <img src="{{ asset('img/icons/camera.png') }}" width="16">
            </button>
        </div>

        {{-- Profile --}}
        <div class="position-relative mt-4 ms-3">
            <div class="position-absolute top-0 start-0 translate-middle-y rounded-circle border border-5 bg-light shadow"
                 style="width:160px;height:160px">
                <img src="{{ asset('img/icons/store-profile.png') }}"
                     class="w-100 h-100 rounded-circle object-fit-cover">
            </div>

            <div class="ps-5 ms-5">
                <h4 class="fw-semibold mt-4">Store Profile</h4>
                <p class="text-muted small">
                    Update your store profile photos and settings
                </p>
            </div>
        </div>
    </div>

    {{-- ================= STORE INFORMATION ================= --}}
    <div class="card shadow-sm mb-5">
        <div class="card-header fw-semibold">Store Information</div>
        <div class="card-body">

            <form>
                @php
                    $inputs = [
                        'Store Name' => 'mystore',
                        'Email Address' => 'contact@myshop.com',
                        'Phone Number' => '(575) 336-4330',
                    ];
                @endphp

                @foreach($inputs as $label => $value)
                <div class="row mb-3">
                    <label class="col-md-3 col-form-label">{{ $label }}</label>
                    <div class="col-md-9">
                        <input class="form-control" value="{{ $value }}">
                    </div>
                </div>
                @endforeach

                <div class="row mb-3">
                    <label class="col-md-3 col-form-label">Biography</label>
                    <div class="col-md-9">
                        <textarea class="form-control" rows="4"></textarea>
                    </div>
                </div>

                {{-- Profile Photo --}}
                <div class="row mb-3">
                    <label class="col-md-3 col-form-label">Store profile photo</label>
                    <div class="col-md-9 d-flex align-items-center gap-4">
                        <img src="{{ asset('img/icons/store-profile.png') }}"
                             class="rounded-circle border"
                             width="100">

                        <div>
                            <button class="btn btn-link text-primary p-0">Update</button>
                            <button class="btn btn-link text-danger p-0 ms-3">Delete</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
        <div class="card-footer text-end bg-light">
            <button class="btn btn-primary px-4">Save</button>
        </div>
    </div>

    {{-- ================= STORE ADDRESS ================= --}}
    <div class="card shadow-sm mb-5">
        <div class="card-header fw-semibold">Store Address</div>
        <div class="card-body">

            @foreach([
                'Legal Business Name' => 'Tesla Inc',
                'Address Line 1' => '1028 New Mexico',
                'City' => 'Alto',
                'Postcode / ZIP' => '22222',
                'Country' => 'US',
                'State' => 'New York',
            ] as $label => $value)
            <div class="row mb-3">
                <label class="col-md-3 col-form-label">{{ $label }}</label>
                <div class="col-md-9">
                    <input class="form-control" value="{{ $value }}">
                </div>
            </div>
            @endforeach

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Locate on Maps</label>
                <div class="col-md-9">
                    <input class="form-control" placeholder="Alto New York">
                </div>
            </div>

        </div>
        <div class="card-footer text-end bg-light">
            <button class="btn btn-primary px-4">Save</button>
        </div>
    </div>

    {{-- ================= PRODUCT SETTINGS ================= --}}
    <div class="card shadow-sm mb-5">
        <div class="card-body">
            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Product Per Page</label>
                <div class="col-md-9">
                    <input class="form-control" value="25">
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Terms & Conditions</label>
                <div class="col-md-9">
                    <textarea class="form-control"></textarea>
                </div>
            </div>

            <div class="text-end">
                <span class="badge bg-primary me-2">Beauty</span>
                <span class="badge bg-primary me-2">Fashion</span>
                <span class="badge bg-primary">Cosmetics</span>
            </div>
        </div>
    </div>

    {{-- ================= LINKED ACCOUNTS ================= --}}
    <div class="card shadow-sm">
        <div class="card-header fw-semibold">Linked Accounts</div>
        <div class="card-body">

            @foreach([
                'Twitter' => 'twitter.png',
                'Facebook' => 'fb.png',
                'Instagram' => 'ig.png'
            ] as $name => $icon)

            <div class="row align-items-center mb-3">
                <label class="col-md-3">{{ $name }}</label>
                <div class="col-md-3">
                    <img src="{{ asset('img/icons/'.$icon) }}" width="60">
                </div>
                <div class="col-md-3">
                    <a href="#" class="text-primary">Manage</a>
                </div>
                <div class="col-md-3">
                    <a href="#" class="text-danger">Remove</a>
                </div>
            </div>

            @endforeach

        </div>
        <div class="card-footer text-end bg-light">
            <button class="btn btn-primary px-4">Save</button>
        </div>
    </div>

</div>
@endsection
