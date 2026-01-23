   {{-- Measurement Mandatory --}}   
<div id="measurement-section" class="panel-utama-model2 mb-4">
    <div class="fw-semibold mb-3 text-success panel-toggle-header2" id="title-Measurement-Mandatory-Info">
        Measurement Mandatory Info
        <i class="bi bi-chevron-down me-1" style="margin-left:35px;"></i>
    </div>
    <div id="measurement-wrapper" class="panel-toggle-content2">
        <div class="panel-measurement  rounded-1 p-3 mb-2" style="border: 1px dashed #cf2121 !important;">
            <div class="row mb-3" id="row-MeasurementName">
                <label class="col-sm-6 col-form-label fw-bold">
                    Measurement Name
                </label> 
                <div class="col-sm-6"> 
                    <input class="form-control" id="MeasurementName">
                </div>
            </div>
            <div class="row mb-3" id="row-MeasurementCountingUnit">
                <label class="col-sm-6 col-form-label fw-bold">
                    Measurement Counting Unit
                </label>
                <div class="col-sm-6">
                    <input class="form-control" id="MeasurementCountingUnit">
                </div>
            </div>

            {{-- Weight --}}
            <div class="row mb-3 align-items-center">
                <label class="col-sm-3 col-form-label fw-bold">Weight</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control decimalInput" id="Weight">
                </div>
                <div class="col-sm-3">
                    <select class="form-select" id="WeightType">
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
                    <input class="form-control text-center decimalInput" placeholder="L" id="DimensionsL">
                    <input class="form-control text-center decimalInput" placeholder="W" id="DimensionsW">
                    <input class="form-control text-center decimalInput" placeholder="H" id="DimensionsH">
                    {{-- <span class="input-group-text">CM</span> --}}
                    <select class="form-select" id="DimensionType">
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
                    <select class="form-select" id="Currency">
                        <option value="IDR" selected>IDR</option>
                        <option value="USD">Dollar</option>
                    </select>
                </div>
                <div class="col-sm-6">
                    <input type="text" class="form-control" placeholder="price" id="Price">
                </div>
            </div>
            {{-- Warehouse --}}
            <div id="warehouse-wrapper">
                <div class="warehouse-row" id="warehouse-row">
                    <div class="row mb-2 align-items-end cnt-row-wrs">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">
                                <span class="text-danger">*</span> Warehouse
                            </label>
                            {{-- <select class="form-select warehouses">
                                <option value="">Choose Warehouse</option>
                                <option value="7d864086-2467-4561-8be1-897fe639ea6d">
                                    Warehouse-1
                                </option>
                            </select> --}}
                            <select name="warehouses"
                                    class="form-select required warehouses"
                                    id="warehouse_select">
                                <option value="">Loading ...</option>
                            </select>

                        </div>
                        <div class="col-md-3">
                            <label class="form-label fw-semibold">Stock</label>
                            <input type="number" class="form-control stock">
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
                        <select class="form-select" id="promotionCurrency">
                            <option value="IDR" selected>IDR</option>
                            <option value="USD">Dollar</option>
                        </select>
                    </div>
                    <div class="col-sm-6">
                        <input type="text" id="promotionPrice" class="form-control decimalInput" placeholder="price">
                    </div>
                </div>
                <div class="row mb-4 align-items-center">
                    <label class="col-sm-3 col-form-label fw-bold">
                    Start Date
                    </label>
                    <div class="col-sm-9">
                        <input type="date" id="promotionStartDate" class="form-control datepicker" placeholder="DD/MM/YYYY">
                    </div>
                </div>
                <div class="row mb-4 align-items-center">
                    <label class="col-sm-3 col-form-label fw-bold">
                    End Date
                    </label>
                    <div class="col-sm-9">
                        <input type="date" id="promotionEndDate" class="form-control datepicker" placeholder="DD/MM/YYYY">
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
                        <input type="text" id="packagingWeight" class="form-control decimalInput">
                    </div>
                        <div class="col-sm-3">
                        <select class="form-select" id="packagingWeightType">
                            <option value="G">Gram</option>
                            <option value="KG">KG</option>
                            <option value="TON">Ton</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3 align-items-center">
                    <label class="col-sm-4 col-form-label fw-medium">Package Dimensions</label>
                    <div class="col-sm-8 d-flex gap-2">
                        <input id="packagingLength" class="form-control text-center decimalInput" placeholder="L">
                        <input id="packagingWidth" class="form-control text-center decimalInput" placeholder="W">
                        <input id="packagingHeight" class="form-control text-center decimalInput" placeholder="H">
                        {{-- <span class="input-group-text">CM</span> --}}
                        <select class="form-select" id="packagingDimensionType">
                            <option value="CM">CM</option>
                            <option value="M">Meter</option>
                            <option value="MM">Mili Meter</option>
                        </select>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
    
    <div class="mt-3 mb-5" id="button-add-measur">
        <button type="button" class="btn-add-more2">
            Add more measurement +
        </button>
        <button type="button" class="btn-remove-last2">Remove Last -</button>
    </div> 

</div>