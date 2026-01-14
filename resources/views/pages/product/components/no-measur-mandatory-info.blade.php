   {{-- no Measurement Mandatory --}}
<div id="no-measurement-section" class="mb-4">
    <div class="">
       
        {{-- Weight --}}
        <div class="row mb-3 align-items-center">
            <label class="col-sm-3 col-form-label fw-bold">Weight</label>
            <div class="col-sm-6">
                <input type="number" class="form-control">
            </div>
            <div class="col-sm-3">
                <select class="form-select">
                    <option value="G">Gram</option>
                    <option value="KG">KG</option>
                    <option value="TON">Ton</option>
                </select>
            </div>
        </div>

        {{-- Dimension --}}
        <div class="row mb-3 align-items-center">
            <label class="col-sm-3 col-form-label fw-bold">Dimensions</label>
            <div class="col-sm-9 d-flex gap-2">
                <input class="form-control text-center" placeholder="L">
                <input class="form-control text-center" placeholder="W">
                <input class="form-control text-center" placeholder="H">
                {{-- <span class="input-group-text">CM</span> --}}
                <select class="form-select">
                    <option value="CM">CM</option>
                    <option value="M">Meter</option>
                    <option value="MM">Mili Meter</option>
                </select>
            </div>
        </div>

        <div class="row mb-4 align-items-center">
            <label class="col-sm-3 col-form-label fw-bold">
                Price
            </label>

            <div class="col-sm-3">
                <select class="form-select">
                    <option value="IDR" selected>IDR</option>
                    <option value="USD">Dollar</option>
                </select>
            </div>

            <div class="col-sm-6">
                <input type="number" class="form-control" placeholder="price">
            </div>
        </div>


        {{-- Warehouse --}}
        <div id="warehouse-wrapper">

            <div class="warehouse-row">
                <div class="row mb-2 align-items-end">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold">
                            <span class="text-danger">*</span> Warehouse
                        </label>
                        <select class="form-select">
                            <option value="">Choose Warehouse</option>
                            <option value="7d864086-2467-4561-8be1-897fe639ea6d">
                                Warehouse-1
                            </option>
                        </select>
                    </div>

                    <div class="col-md-3">
                        <label class="form-label fw-semibold">Stock</label>
                        <input type="number" class="form-control">
                    </div>

                    <div class="col-md-3 d-none remove-wrapper">
                        <button type="button" class="btn  px-0 small remove-warehouse" style="color:#7D3636;">
                            Remove
                        </button>
                    </div>
                </div>
            </div>

        </div>
        <button type="button" id="add-warehouse"
                class="btn  px-0 small fs-10" style="color:#7D3636;">
            + Add more
        </button>


        {{-- Promotion --}}
        <div class="border border-5 border-success rounded-4 p-1 my-4">
            <div class="d-flex align-items-center gap-4">

                <div class="fw-semibold" style="margin-left:10px;">
                    Configure Promotion Price?
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="promo_price" id="promoYes">
                    <label class="form-check-label" for="promoYes">Yes</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" name="promo_price" id="promoNo" checked>
                    <label class="form-check-label" for="promoNo">No</label>
                </div>

            </div>
        </div>

                
        {{-- PROMO FORM --}}
        <div id="promo-form">
            <div class="row mb-4 align-items-center">
                <label class="col-sm-3 col-form-label fw-bold">
                    Sale Price
                </label>
                <div class="col-sm-3">
                    <select class="form-select">
                        <option value="IDR" selected>IDR</option>
                        <option value="USD">Dollar</option>
                    </select>
                </div>
                <div class="col-sm-6">
                    <input type="number" class="form-control" placeholder="price">
                </div>
            </div>
            <div class="row mb-4 align-items-center">
                <label class="col-sm-3 col-form-label fw-bold">
                Start Date
                </label>
                <div class="col-sm-9">
                    <input type="text" class="form-control datepicker" placeholder="MM/DD/YYYY">
                </div>
            </div>
            <div class="row mb-4 align-items-center">
                <label class="col-sm-3 col-form-label fw-bold">
                End Date
                </label>
                <div class="col-sm-9">
                    <input type="text" class="form-control datepicker" placeholder="MM/DD/YYYY">
                </div>
            </div>
        </div>


        {{-- Packaging --}}
        <div class="border rounded p-3">
            <div class="fw-semibold mb-3">
                <i class="bi bi-chevron-down me-1"></i>
                Packaging Information
            </div>
            <div class="row mb-3">
                <label class="col-sm-4 col-form-label fw-medium">
                    Package Weight
                </label>
                <div class="col-sm-5">
                    <input type="number" class="form-control">
                </div>
                    <div class="col-sm-3">
                    <select class="form-select">
                        <option value="G">Gram</option>
                        <option value="KG">KG</option>
                        <option value="TON">Ton</option>
                    </select>
                </div>
                
            </div>
            <div class="row mb-3 align-items-center">
                <label class="col-sm-4 col-form-label fw-medium">Package Dimensions</label>
                <div class="col-sm-8 d-flex gap-2">
                    <input class="form-control text-center" placeholder="L">
                    <input class="form-control text-center" placeholder="W">
                    <input class="form-control text-center" placeholder="H">
                    {{-- <span class="input-group-text">CM</span> --}}
                    <select class="form-select">
                        <option value="CM">CM</option>
                        <option value="M">Meter</option>
                        <option value="MM">Mili Meter</option>
                    </select>
                </div>
            </div>
        </div>    
    </div>
</div>