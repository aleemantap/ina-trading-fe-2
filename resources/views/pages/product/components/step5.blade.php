     <div class="p-4 mb-4" style="background:#D9D9D959">
        <label class="form-label fw-semibold">
            Eligible to export? <span class="text-danger">*</span>
        </label>

        <div class="d-flex gap-4 ps-3 mt-2 mb-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="eligible" id="eligible_yes" value="1" checked>
                <label class="form-check-label" for="eligible_yes">Yes</label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="radio" name="eligible" id="eligible_no" value="0">
                <label class="form-check-label" for="eligible_no">No</label>
            </div>
        </div>

       
        <div id="upload-section" class="ps-3">
          
            <input type="file" id="export-upload"  data-upload="exportDocEligible" class="d-none">

            <button type="button" id="btn-upload"
                class="btn btn-outline-secondary btn-sm">
                Choose File
            </button>

            <ul id="file-list" class="list-unstyled mt-3"></ul>
        </div>
    </div>

   
   

   {{-- <div class="p-4 mb-4" style="background:#D9D9D959">
    <label class="form-label fw-semibold">
        Eligible to export? <span class="text-danger">*</span>
    </label>

    <div class="d-flex gap-4 ps-3 mt-2 mb-3">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="eligible" id="eligible_yes" value="1" checked>
            <label class="form-check-label" for="eligible_yes">Yes</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="eligible" id="eligible_no" value="0">
            <label class="form-check-label" for="eligible_no">No</label>
        </div>
    </div>

    <div id="upload-section" class="ps-3">

      
        <div id="upload-container">
            <div class="upload-row d-flex align-items-center gap-2 mb-2">
                <input type="file" class="d-none export-upload-input">
                <button type="button" class="btn btn-outline-secondary btn-sm btn-upload">Choose File</button>
                <ul class="file-list list-unstyled mb-0 flex-fill"></ul>
            </div>
        </div>

      
        <button type="button" id="btn-add-more-export-upload" class="btn  btn-sm mt-2" style="color:#7D3636;"> 
            Add More +
        </button>
    </div>
</div> --}}
