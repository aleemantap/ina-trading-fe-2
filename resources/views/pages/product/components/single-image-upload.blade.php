{{-- <div class="border rounded bg-light d-flex align-items-center justify-content-center"
     style="height:300px">

    <label class="text-center text-muted" style="cursor:pointer">
        <i class="bi bi-image fs-2"></i>
        <div class="small">Upload</div>
        <input type="file" id="imageInputStep3" class="d-none" accept="image/*">
    </label>

</div> --}}
<div 
     class="image-upload-box border rounded bg-light position-relative overflow-hidden"
     style="height:300px; cursor:pointer">

    {{-- LABEL POJOK KIRI --}}
    <div class="position-absolute top-0 start-0 m-2 small text-muted fw-semibold">
        <span class="text-danger">*</span> Model Image
    </div>

    {{-- ICON PLUS TENGAH --}}
    <div 
         class="image-placeholder position-absolute top-50 start-50 translate-middle
                text-muted text-center">
        <i class="bi bi-plus-lg fs-1"></i>
        {{-- <div class="small">Upload</div> --}}
    </div>

    {{-- PREVIEW --}}
    <img 
         class="image-preview w-100 h-100 d-none"
         style="object-fit:cover">

    {{-- REMOVE ICON POJOK KANAN --}}
    <button type="button"
            
            class=" remove-image btn btn-danger btn-sm position-absolute top-0 end-0 m-2 d-none">
        <i class="bi bi-x-lg"></i>
    </button>
</div>

<input type="file"
    
       class="imageInputStep3 d-none"
       accept="image/*">
