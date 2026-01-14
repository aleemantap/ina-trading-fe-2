@extends('layouts.app')

@section('content')
<div class="container-fluid p-4">
    <h2 class="mb-4" id="pageTitle">
        Hello, {{ session('auth_user.name') ?? 'PT Contoh Seller' }}
    </h2>
    {{-- BREADCRUMB --}}
    <nav aria-label="breadcrumb" id="pageBreadcrumb" class="d-none" style="margin-top:-15px;">
        {{-- <ol class="breadcrumb mb-3">
            <li class="breadcrumb-item">
                <span class="text-muted">Post Product</span>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Input Product Detail
            </li>
        </ol> --}}
    </nav>
    {{-- STEP COUNTER --}}
    <div class="mb-3 text-muted">
        Step <span id="stepCounter">1</span> of 5
    </div>
    {{-- Progress --}}
    <div class="card shadow-sm p-3">
        <div class="mb-1">
            <ul class="step-tabs">
                <li class="active" data-step="1">Step1</li>
                <li data-step="2">Step2</li>
                <li data-step="3">Step3</li>
                <li data-step="4">Step4</li>
                <li data-step="5">Step5</li>
            </ul>        
        </div>

        <form id="stepForm" method="POST" action="#">
            @csrf

            {{-- STEP 1 --}}
            <div class="step step-1 active">
                {{-- <h5 class="mb-4">Category</h5> --}}

                <div class="row mb-3 align-items-center">
                    <label class="col-md-3 col-form-label fw-semibold">
                        Main Category
                    </label>
                    <div class="col-md-9">
                        <select name="main_category_id"
                                class="form-select required"
                                id="mainCategory">
                            <option value="">Loading category...</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-3 align-items-center">
                    <label class="col-md-3 col-form-label fw-semibold">
                        Sub categories
                    </label>
                    <div class="col-md-9">
                        <select name="sub_category_id"
                                class="form-select required"
                                id="subCategory"
                                disabled>
                            <option value="">Sub category</option>
                        </select>
                    </div>
                </div>
            </div>


            {{-- STEP 2 --}}
            <div class="step step-2">
                @include('pages.product.components.step2')
            </div>

            {{-- STEP 3 --}}
            <div class="step step-3">
                @include('pages.product.components.step3')
            </div>

            {{-- STEP 4 --}}
            <div class="step step-4">
                @include('pages.product.components.step4')
            </div>
              {{-- STEP 5 --}}
            <div class="step step-5">
               @include('pages.product.components.step5')
            </div>

            {{-- Buttons --}}
            <div class="d-flex justify-content-start gap-2" style="margin-top:70px;">
                <button type="button" class="btn btn-secondary-cancel" id="prevBtn">Previous</button>
                <button type="button" class="btn btn-primary-next" id="nextBtn">Next</button>
                <button type="button" class="btn btn-primary-next d-none" id="submitBtn">Save & Post</button>
                <button type="button" class="btn btn-success-save-to-draft d-none" id="saveToDraft">Save to Draft</button>
            </div>
        </form> 
    </div>
    
</div>
@endsection


@push('scripts')
<script>

// window.addEventListener('load', function () {
//     const API_BASE = '{{ config("services.api.host") }}'; 
//     let currentStep = 1;
//     const totalSteps = 5;
//     loadMainCategories();

//     function showStep(step) {
//         $('.step').removeClass('active');
//         $('.step-' + step).addClass('active');

//         $('#stepCounter').text(step);

//         if (step === 1) {
//             $('#pageTitle').text(
//                 'Hello, {{ session("auth_user.name") ?? "PT Contoh Seller" }}'
//             );
//             $('#pageBreadcrumb').addClass('d-none');

//             // Tombol step 1
//             $('#prevBtn').addClass('d-none');
//             $('#nextBtn').removeClass('d-none');
//             $('#submitBtn').addClass('d-none');
//             $('#saveToDraft').addClass('d-none');

//         } else if (step >= 2 && step <= 4) {
//             $('#prevBtn').removeClass('d-none');
//             $('#nextBtn').removeClass('d-none');
//             $('#submitBtn').addClass('d-none');
//             $('#saveToDraft').removeClass('d-none');

//         } else if (step === 5) {
//             $('#prevBtn').removeClass('d-none');
//             $('#nextBtn').addClass('d-none');
//             $('#submitBtn').removeClass('d-none');
//             $('#saveToDraft').removeClass('d-none');
//         }
//     }



//     function validateStep(step) {
//         let valid = true;
//         $('.step-' + step + ' .required').each(function () {
//             if ($(this).val().trim() === '') {
//                 $(this).addClass('is-invalid');
//                 valid = false;
//             } else {
//                 $(this).removeClass('is-invalid');
//             }
//         });
//         return valid;
//     }

//     // NEXT
//     $('#nextBtn').on('click', function () {
//         if (!validateStep(currentStep)) return;
//         currentStep++;
//         showStep(currentStep);
//     });

//     // PREV
//     $('#prevBtn').on('click', function () {
//         currentStep--;
//         showStep(currentStep);
//     });

//     // TAB CLICK
//     $('.step-tabs li').on('click', function () {
//         const step = $(this).data('step');

//         // Cegah loncat kalau step sebelumnya belum valid
//         for (let i = 1; i < step; i++) {
//             if (!validateStep(i)) return;
//         }

//         currentStep = step;
//         showStep(step);
//     });

//     // INIT — INI PENTING
//     showStep(1);

//     $('#mainCategory').on('change', function () {
//         const categoryId = $(this).val();
//         const subCategory = $('#subCategory');

//         subCategory.prop('disabled', true);
//         subCategory.empty();
//         subCategory.append('<option value="">Loading sub category...</option>');

//         if (!categoryId) {
//             subCategory.html('<option value="">Sub category</option>');
//             return;
//         }

//         $.ajax({
//             url: API_BASE + '/sub/' + categoryId + '/categories',
//             type: 'GET',
//             headers: {
//                 'Authorization': 'Bearer {{ session("api_token") }}',
//                 'Reference-Number': 'REF20230708100000001',
//                 'Channel-Id': 'WEB',
//                 'Request-Time' : formatDateAndTime(),
//             },
//             success: function (res) {
//                 subCategory.empty();
//                 subCategory.append('<option value="">Sub category</option>');

//                 if (res.responseCode !== '0000') return;

//                 res.rows.forEach(item => {
//                     subCategory.append(
//                         `<option value="${item.id}">${item.name}</option>`
//                     );
//                 });

//                 subCategory.prop('disabled', false);
//             },
//             // error: function () {
//             //     subCategory.html(
//             //         '<option value="">Failed to load sub category</option>'
//             //     );
//             // }
//             error: function (xhr) {
//                     if (xhr.status === 401 || xhr.status === 403) {

//                         $.post('/force-logout', {
//                             _token: '{{ csrf_token() }}'
//                         }).always(function () {
//                             alert('Session anda habis. Silakan login kembali.');
//                             window.location.href = '/login';
//                         });

//                         return;
//                     }

//                     alert('Terjadi kesalahan.');
//             }
//         });
//     });


//     function loadMainCategories() {
//         $.ajax({
//             url: API_BASE + '/categories',
//             type: 'GET',
//             headers: {
//                 'Authorization': 'Bearer {{ session("api_token") }}',
//                 'Reference-Number': 'REF20230708100000001',
//                 'Channel-Id': 'WEB',
//                 'Request-Time' : formatDateAndTime(),
//             },
//             success: function (res) {
//                 const select = $('#mainCategory');
//                 select.empty();
//                 select.append('<option value="">List of Main category</option>');

//                 if (res.responseCode !== '0000') return;

//                 res.rows.forEach(item => {
//                     select.append(
//                         `<option value="${item.id}">${item.name}</option>`
//                     );
//                 });
//             },
//             // error: function () {
//             //     $('#mainCategory').html(
//             //         '<option value="">Failed to load category</option>'
//             //     );
//             // }
//             error: function (xhr) {
//                     if (xhr.status === 401 || xhr.status === 403) {

//                         $.post('/force-logout', {
//                             _token: '{{ csrf_token() }}'
//                         }).always(function () {
//                             alert('Session anda habis. Silakan login kembali.');
//                             window.location.href = '/login';
//                         });

//                         return;
//                     }

//                     alert('Terjadi kesalahan.');
//             }
//         });
//     }


//     // ini bagian script step 2

//     // Product Name Count
//     $('#productName').on('input', function() {
//         $('#productNameCount').text(this.value.length + '/150');
//     });

//     // Product Description
//     $('#productDesc').on('input', function() {
//         $('#descCount').text(this.value.length + '/3000');
//     });

//     // Keywords
//     function updateKeywordCount(input) {
//         $(input).siblings('small').text($(input).val().length + '/30');
//     }

//     $('#keywordsContainer').on('input', '.keyword-input', function() {
//         updateKeywordCount(this);
//     });

//     // Pre Order Enable/Disable Days
//     $('input[name="preOrder"]').change(function(){
//         if ($(this).val() == '1') {
//             $('#preOrderDays').prop('disabled', false);
//         } else {
//             $('#preOrderDays').prop('disabled', true).val('');
//         }
//     });

    
//     $('#addKeyword').on('click', function() {
//         $('#keywordsContainer').append(`
//             <div class="keyword-item position-relative mb-2">
//                 <input type="text" name="keywords[]" class="form-control keyword-input" maxlength="30" style="padding-right: 50px;">
//                 <small class="text-muted position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%);">0/30</small>
//             </div>
//         `);
//     });
//     $('#removeKeyword').on('click', function() {
//         $('#keywordsContainer .keyword-item').last().remove();
//     });

//     $(document).on('input', '.keyword-input', function(){
//         $(this).siblings('.keyword-count').text(this.value.length + '/30');
//     });

//     // Features
//     function updateFeatureCount(input) {
//         $(input).siblings('small').text($(input).val().length + '/200');
//     }

//     $('#featuresContainer').on('input', '.feature-input', function() {
//         updateFeatureCount(this);
//     });

//     // Features Add/Remove
//     $('#addFeature').on('click', function() {
//     $('#featuresContainer').append(`
//         <div class="feature-item position-relative mb-2">
//             <input type="text" name="features[]" class="form-control feature-input" maxlength="200" style="padding-right: 60px;">
//             <small class="text-muted position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%);">0/200</small>
//         </div>
//         `);
//     });
//     $('#removeFeature').on('click', function() {
//         $('#featuresContainer .feature-item').last().remove();
//     });
//     $(document).on('input', '.feature-input', function(){
//         $(this).siblings('.feature-count').text(this.value.length + '/200');
//     });

//     // Description Count
//     $('#productDesc').on('input', function() {
//         $('#descCount').text(this.value.length + '/3000');
//     });


    
//     // Multi Image Upload logic

//     let images = [];

//     // Render thumbnails
//     function renderImages() {
//         // Big thumb
//         $('#bigThumb').html(images[0] ? `
//             <div class="position-relative h-100 w-100">
//                 <img src="${images[0]}" class="img-fluid h-100 w-100 object-fit-cover">
//                 <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="0">x</button>
//             </div>
//         ` : '+');

//         // Small thumbs (1,2,3)
//         $('#multiImageUpload .smallThumb').each(function(i){
//             let idx = i+1;
//             if (images[idx]) {
//                 $(this).html(`
//                     <div class="position-relative h-100 w-100">
//                         <img src="${images[idx]}" class="img-fluid h-100 w-100 object-fit-cover">
//                         <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${idx}">x</button>
//                     </div>
//                 `);
//             } else {
//                 $(this).html('+');
//             }
//         });

//         // Extra thumbs
//         $('#extraThumbs').html('');
//         if (images.length > 4) {
//             for (let i=4; i<images.length; i++) {
//                 $('#extraThumbs').append(`
//                     <div class="position-relative border rounded" style="width:100px; height:100px;">
//                         <img src="${images[i]}" class="img-fluid h-100 w-100 object-fit-cover">
//                         <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${i}">x</button>
//                     </div>
//                 `);
//             }
//         }
//     }

//     // Handle files
//     function handleFiles(files) {
//         for (let file of files) {
//             let reader = new FileReader();
//             reader.onload = function(e){
//                 images.push(e.target.result);
//                 renderImages();
//             }
//             reader.readAsDataURL(file);
//         }
//     }

//     // Klik upload (+) → trigger input file
//     // Hanya trigger upload jika klik langsung di div kosong (+)
//     $('#bigThumb, .smallThumb').off('click').on('click', function(e){
//         // Jangan trigger jika klik tombol remove
//         if ($(e.target).hasClass('removeImage')) return;

//         // Hanya trigger upload jika div kosong (tampil '+')
//         if ($(this).text().trim() === '+') {
//             $('#imageInput').trigger('click');
//         }
//     });

//     // Tombol "Add More" selalu trigger input
//     $('#addMoreImages').off('click').on('click', function(){
//         $('#imageInput').trigger('click');
//     });

//     // Pilih file
//     $('#imageInput').on('change', function(){
//         handleFiles(this.files);
//         $(this).val('');
//     });

//     // Hapus gambar
//     $(document).off('click', '.removeImage').on('click', '.removeImage', function(e){
//         e.stopPropagation(); // penting supaya klik tombol x tidak trigger upload
//         let index = parseInt($(this).attr('data-index'));
//         if (!isNaN(index)) {
//             images.splice(index, 1); // hapus gambar dari array
//             renderImages();          // rerender semua thumbnails
//         }
//     });



// });
</script>
@endpush
