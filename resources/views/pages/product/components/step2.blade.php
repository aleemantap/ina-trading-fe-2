{{-- Product Name --}}
<div class="mb-3 col-md-8 position-relative">
    <label for="productName" class="form-label">Product Name <span class="text-danger">*</span></label>
    <input type="text" id="productName" class="form-control" maxlength="150" style="padding-right: 60px;">
    <small class="text-muted position-absolute" style="right: 10px; top: 70%; transform: translateY(-50%);" id="productNameCount">0/150</small>
</div>


{{-- Pre Order --}}
<div class="mb-3 col-md-8">

    <label class="form-label fw-medium">
        Product Pre Order? <span class="text-danger">*</span>
    </label>

    <div class="d-flex gap-4 ps-1">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="preOrder" value="1" id="preYes">
            <label class="form-check-label" for="preYes">YES</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="preOrder" value="0" id="preNo" checked>
            <label class="form-check-label" for="preNo">NO</label>
        </div>
    </div>

    <div class="mt-2 d-flex align-items-center ps-1">
        <input type="text"
               id="preOrderDays"
               class="form-control me-2"
               style="width:100px;"
               disabled>
        <input type="text"
           class="form-control text-center"
           style="width:63px;"
           value="Days"
           readonly>
    </div>

</div>


{{-- Brand New --}}
<div class="mb-3 col-md-8">
    <label class="form-label fw-medium">
        Product Brand New? <span class="text-danger">*</span>
    </label>
    <div class="d-flex gap-4 ps-1">
        <div class="form-check">
            <input class="form-check-input" type="radio" name="brand_new" value="1" >
            <label class="form-check-label">YES</label>
        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" name="brand_new" value="0" checked>
            <label class="form-check-label">NO</label>
        </div>
    </div>   
</div>

{{-- Keywords --}}
<div class="mb-3 col-md-8">
    <label class="form-label">Product Keywords <span class="text-danger">*</span></label>
    <div id="keywordsContainer">
        <div class="keyword-item position-relative mb-2">
            <input type="text" name="keywords[]" class="form-control keyword-input" maxlength="30" style="padding-right: 50px;">
            <small class="text-muted position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%);">0/30</small>
        </div>
    </div>
    <div class="mt-2">
        <button type="button" id="addKeyword" class="btn-add-more1  me-2">Add More +</button>
        <button type="button" id="removeKeyword" class="btn-remove-last1   btn-sm">Remove Last -</button>
    </div>
</div>


{{-- Description --}}
<div class="mb-3 col-md-8 position-relative">
    <label class="form-label">Product Description <span class="text-danger">*</span></label>
    <textarea id="productDesc" class="form-control" rows="6" maxlength="3000" style="padding-bottom: 25px;"></textarea>
    <small class="text-muted position-absolute" style="right: 10px; bottom: 5px;" id="descCount">0/3000</small>
</div>


{{-- Features --}}
<div class="mb-3 col-md-8">
    <label class="form-label">Product Features <span class="text-danger">*</span></label>
    <div id="featuresContainer">
        <div class="feature-item position-relative mb-2">
            <input type="text" name="features[]" class="form-control feature-input" maxlength="200" style="padding-right: 60px;">
            <small class="text-muted position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%);">0/200</small>
        </div>
    </div>
    <div class="mt-2">
        <button type="button" id="addFeature" class="btn-add-more1  me-2">Add More +</button>
        <button type="button" id="removeFeature" class="btn-remove-last1 ">Remove Last -</button>
    </div>
</div>


{{-- Multi Image Upload Bootstrap 5 --}}
<div class="mb-3 col-md-8">
    <div class="form-label"><span class="text-danger">*</span> Primary Product Images</div>
    <div id="multiImageUpload" class="d-flex flex-column">
        <div class="d-flex mb-2 gap-2">
            <div id="bigThumb" class="flex-fill border rounded bg-light d-flex align-items-center justify-content-center" style="height: 300px; cursor:pointer;">+</div>
            <div class="d-flex flex-column gap-2" style="width:100px;">
                <div class="smallThumb border rounded bg-light flex-fill d-flex align-items-center justify-content-center" style="cursor:pointer;">+</div>
                <div class="smallThumb border rounded bg-light flex-fill d-flex align-items-center justify-content-center" style="cursor:pointer;">+</div>
                <div class="smallThumb border rounded bg-light flex-fill d-flex align-items-center justify-content-center" style="cursor:pointer;">+</div>
            </div>
        </div>
        <div id="extraThumbs" class="d-flex flex-wrap gap-2"></div>
        <input type="file" id="imageInput" accept="image/*" multiple class="d-none">
        <div class="mt-2">
            <button type="button" id="addMoreImages" class="btn-add-more1">Add More +</button>
        </div>
    </div>
</div> 
{{-- Multi Image Upload Bootstrap 5 --}}
{{-- <div class="mb-3 col-md-8">

    <div id="multiImageUpload" class="d-flex flex-column">

        <div class="d-flex mb-2 gap-2">

          
            <div id="bigThumb"
                 class="flex-fill border rounded bg-light position-relative
                        d-flex align-items-center justify-content-center"
                 style="height:300px; cursor:pointer;">

               
                <div class="position-absolute top-0 start-0 m-2 small text-muted fw-semibold">
                    <span class="text-danger">*</span> Primary Product Images
                </div>

             
                <div class="text-muted fs-1">+</div>
            </div>

          
            <div class="d-flex flex-column gap-2" style="width:100px;">
                <div class="smallThumb border rounded bg-light flex-fill
                            d-flex align-items-center justify-content-center"
                     style="cursor:pointer;">+</div>

                <div class="smallThumb border rounded bg-light flex-fill
                            d-flex align-items-center justify-content-center"
                     style="cursor:pointer;">+</div>

                <div class="smallThumb border rounded bg-light flex-fill
                            d-flex align-items-center justify-content-center"
                     style="cursor:pointer;">+</div>
            </div>

        </div>

       
        <div id="extraThumbs" class="d-flex flex-wrap gap-2"></div>

      
        <input type="file"
               id="imageInput"
               accept="image/*"
               multiple
               class="d-none">

      
        <div class="mt-2">
            <button type="button" id="addMoreImages" class="btn-add-more1">
                Add More +
            </button>
        </div>

    </div>
</div> --}}
