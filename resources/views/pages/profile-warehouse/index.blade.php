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
        <div class="position-relative bg-light rounded shadow-sm" style="height:250px; border:1px solid #EAEAEA;">
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
                <h4 class="fw-semibold mt-4">Store Store Profile</h4>
                <p class="text-muted small">
                    <span class="fw-bold" style="padding-left:60px;">Update your store profile photos and settings</span>
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
                    <div class="col-md-9" style="padding-bottom:20px;">
                          <div id="biography" class="border rounded"></div>
                    </div>
                    <input type="hidden" name="biography">
                
                </div>

                {{-- Profile Photo --}}
                

            </form>
        </div>
        <div class="card-footer text-end bg-light">
            <button class="btn btn-primary px-4">Save</button>
        </div>
    </div>

    {{-- ================= STORE ADDRESS ================= --}}
    <div class="card shadow-sm mb-5">
        <div class="card-header fw-semibold">Warehouse Address</div>
        <div class="card-body">

           <div class="row mb-3">
                <label for="warehouse_name" class="col-md-3 col-form-label">
                    Warehouse Name
                </label>
                <div class="col-md-9">
                    <input
                        type="text"
                        id="warehouse_name"
                        name="warehouse_name"
                        class="form-control"
                        value="{{ old('warehouse_name') }}"
                    >
                </div>
            </div>           

            <div class="row mb-3">
                <label for="address_line" class="col-md-3 col-form-label">
                    Address Line
                </label>
                <div class="col-md-9">
                    <input
                        type="text"
                        id="address_line"
                        name="address_line"
                        class="form-control"
                        value="{{ old('address_line') }}"
                    >
                </div>
            </div>

            <div class="row mb-3">
                <label for="city" class="col-md-3 col-form-label">
                    City
                </label>
                <div class="col-md-9">
                    <input
                        type="text"
                        id="city"
                        name="city"
                        class="form-control"
                        value="{{ old('city') }}"
                    >
                </div>
            </div>

            <div class="row mb-3">
                <label for="postcode" class="col-md-3 col-form-label">
                    Postcode / ZIP
                </label>
                <div class="col-md-9">
                    <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        class="form-control"
                        value="{{ old('postcode') }}"
                    >
                </div>
            </div>

            <div class="row mb-3">
                <label for="country" class="col-md-3 col-form-label">
                    Country
                </label>
                <div class="col-md-9">
                    <input
                        type="text"
                        id="country"
                        name="country"
                        class="form-control"
                        value="{{ old('country') }}"
                    >
                </div>
            </div>

            <div class="row mb-3">
                <label for="state" class="col-md-3 col-form-label">
                    State
                </label>
                <div class="col-md-9">
                    <input
                        type="text"
                        id="state"
                        name="state"
                        class="form-control"
                        value="{{ old('state') }}"
                    >
                </div>
            </div> 


            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Locate on Maps</label>
                <div class="col-md-9">
                    <input class="form-control" placeholder="" id="location-warehouse">
                </div>
            </div>

           </div>
        <div class="card-footer text-end bg-light">
            <button class="btn btn-primary px-4" id="submitBtnWarehouseProfile">Save</button>
        </div>
    </div>

</div>
@endsection
