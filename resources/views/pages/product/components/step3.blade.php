<div class="mb-1 d-flex justify-content-end gap-2">
    <button type="button" id="add-more-panel-model" class="btn-add-more1">
        Add more +
    </button>
    <button type="button" id="remove-panel-model" class="btn-remove-last1">Remove Last -</button>
</div>  

<div id="panel-model-wrapper" class=""> 
    <div  class="panel-utama-model border-top-red-thick">
        <div class="fw-semibold panel-toggle-header"
            style="margin-top:6px;margin-left:9px; cursor:pointer;">
            <i class="bi bi-chevron-down me-1 toggle-icon"></i>
            Show/Hide
        </div>
        <div class="panel-toggle-content p-4">
             <div class="row mb-2">
                <div class="col-md-8">
                    <label class="form-label fw-semibold">
                        <span class="text-danger">*</span> Product has measurement?
                    </label>
                    <div class="d-flex gap-4 ps-2">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="has_measurement" id="measureYes">
                            <label class="form-check-label" for="measureYes">Yes</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="has_measurement" id="measureNo" checked>
                            <label class="form-check-label" for="measureNo">No</label>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Model Mandatory Info --}}
            <div class="mb-4 ">
                <div class="fw-medium text-light p-1 rounded-top" style="margin-top:6px;margin-left:9px; background-color: #8e9797;">
                    <i class="bi bi-info-circle"></i> Model Mandatory Info
                </div>
                {{-- <div id="panel-model-wrapper" class="p-3"> --}}
                    <div class="card-body ">
                        <div class="row g-4">
                            {{-- LEFT --}}
                            <div class="col-md-7">

                                {{-- Model Name --}}
                                <div class="row mb-3 align-items-center">
                                    <label class="col-sm-3 col-form-label fw-bold">Model Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" id="ModelName" class="form-control">
                                    </div>
                                </div>

                                {{-- SKU --}}
                                <div class="row mb-3 align-items-center">
                                    <label class="col-sm-3 col-form-label fw-bold">SKU</label>
                                    <div class="col-sm-9">
                                        <input type="text" id="Sku"  class="form-control">
                                    </div>
                                </div>

                                @include('pages.product.components.measur')

                                {{-- panel with mandatory info  --}}
                                {{-- @include('pages.product.components.measur-mandatory-info') --}}
                                {{-- panel with non mandatory info  --}}
                                {{-- @include('pages.product.components.no-measur-mandatory-info') --}}
                            </div>
                            {{-- RIGHT IMAGE --}}
                            <div class="col-md-5">
                                @include('pages.product.components.single-image-upload')
                            </div>
                        </div>
                    </div>
                {{-- </div> --}}
            </div>
        </div>
       
    </div>
</div>

{{-- <button type="button" id="submitBtn_tes">submit tes</button> --}}