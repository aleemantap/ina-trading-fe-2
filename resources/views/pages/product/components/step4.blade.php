{{-- ================= General Information ================= --}}
<div class="card mb-4">
        <div class="card-body">

            <h5 class="fw-semibold mb-4">
                ▾ General Information
            </h5>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Brand <span class="text-danger">*</span></label>
                <div class="col-md-9">
                    <input type="text" id="Brand" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Manufacturer</label>
                <div class="col-md-9">
                    <input type="text" id="Manufacturer" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Color</label>
                <div class="col-md-9">
                    <input type="text" id="Color" class="form-control">
                </div>
            </div>

            <div class="row">
                <label class="col-md-3 col-form-label">Material</label>
                <div class="col-md-9">
                    <input type="text" id="Material" class="form-control">
                </div>
            </div>

        </div>
    </div>
 {{-- ================= Category Information ================= --}}
    <div class="card mb-4">
        <div class="card-body">

            <h5 class="fw-semibold mb-4">
                ▾ Category Information
            </h5>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Cable Length</label>
                <div class="col-md-9">
                    <input type="text" id="CableLength" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Voltage</label>
                <div class="col-md-9">
                    <input type="text" id="Voltage" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Data Transfer Rate</label>
                <div class="col-md-9">
                    <input type="text" id="DataTransferRate" class="form-control">
                </div>
            </div>

            <div class="row">
                <label class="col-md-3 col-form-label">Display Size</label>
                <div class="col-md-9">
                    <input type="text" id="DisplaSize" class="form-control">
                </div>
            </div>

        </div>
    </div>

    {{-- ================= Compliance Information ================= --}}
    <div class="card mb-4">
        <div class="card-body">

            <h5 class="fw-semibold mb-4">
                ▾ Compliance Information
            </h5>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Safety Warning</label>
                <div class="col-md-9">
                    <input type="text" id="safetyWarning" class="form-control">
                </div>
            </div>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Country / Region of Origin</label>
                <div class="col-md-9">
                    <input type="text" id="countryOfOrigin" class="form-control">
                </div>
            </div>
            {{-- <div class="row mb-2">
                <label class="col-md-3 col-form-label">
                    Dangerous Good Regulation? <span class="text-danger">*</span>
                </label>

                <div class="col-md-9 d-flex gap-4 align-items-center">
                    <div class="form-check">
                        <input class="form-check-input" type="radio"
                            name="dangerous_goods" id="dg_yes" value="1" checked>
                        <label class="form-check-label" for="dg_yes">Yes</label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio"
                            name="dangerous_goods" id="dg_no" value="0">
                        <label class="form-check-label" for="dg_no">Not Available</label>
                    </div>

                    <div id="dg-upload" class="ms-3">
                        <input type="file"  id="document-regulation-upload" data-upload="documentRegulation" class="form-control">
                    </div>
                </div>
            </div> --}}
            <div class="row mb-2">
                <label class="col-md-3 col-form-label">
                    Dangerous Good Regulation? <span class="text-danger">*</span>
                </label>

                <div class="col-md-9 d-flex flex-column gap-2">
                    <div class="d-flex gap-4 align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="radio"
                                name="dangerous_goods" id="dg_yes" value="1" checked>
                            <label class="form-check-label" for="dg_yes">Yes</label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio"
                                name="dangerous_goods" id="dg_no" value="0">
                            <label class="form-check-label" for="dg_no">Not Available</label>
                        </div>
                    </div>

                    <!-- File Upload Area -->
                    <div id="dg-upload-wrapper">
                        <input type="file" id="document-regulation-upload" data-upload="documentRegulation" class="form-control">
                        <div id="dg-preview" class="mt-2"></div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-9 offset-md-3">
                    <p id="dg-note" class="text-danger small mb-0">
                        Upload your product regulation document
                    </p>
                </div>
            </div>


        </div>
    </div>

    {{-- ================= Warranty Information ================= --}}
    <div class="card mb-4">
        <div class="card-body">

            <h5 class="fw-semibold mb-4">
                ▾ Warranty Information
            </h5>

            <div class="row mb-3">
                <label class="col-md-3 col-form-label">Warranty Type</label>
                <div class="col-md-9">
                    <input type="text" id="Warantytype" class="form-control">
                </div>
            </div>
            <div class="row">
                <label class="col-md-3 col-form-label">Warranty Duration</label>
                <div class="col-md-4">
                    <input type="number" id="WarantyDuration" class="form-control">
                </div>
                <div class="col-md-5">
                    <select class="form-select" id="durationType">
                        <option>DAYS</option>
                        <option>MONTH</option>
                        <option>YEARS</option>
                    </select>
                </div>
            </div>

        </div>
    </div>
