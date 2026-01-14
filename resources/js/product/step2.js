import $ from "jquery";

export default function Step2() {
    $("#productName").on("input", function () {
        $("#productNameCount").text(this.value.length + "/150");
    });
    // Product Description
    $("#productDesc").on("input", function () {
        $("#descCount").text(this.value.length + "/3000");
    });
    // Keywords
    function updateKeywordCount(input) {
        $(input)
            .siblings("small")
            .text($(input).val().length + "/30");
    }
    $("#keywordsContainer").on("input", ".keyword-input", function () {
        updateKeywordCount(this);
    });
    // Pre Order Enable/Disable Days
    $('input[name="preOrder"]').change(function () {
        if ($(this).val() == "1") {
            $("#preOrderDays").prop("disabled", false);
        } else {
            $("#preOrderDays").prop("disabled", true).val("");
        }
    });
    $("#addKeyword").on("click", function () {
        $("#keywordsContainer").append(`
                <div class="keyword-item position-relative mb-2">
                    <input type="text" name="keywords[]" class="form-control keyword-input" maxlength="30" style="padding-right: 50px;">
                    <small class="text-muted position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%);">0/30</small>
                </div>
            `);
    });
    $("#removeKeyword").on("click", function () {
        $("#keywordsContainer .keyword-item").last().remove();
    });
    $(document).on("input", ".keyword-input", function () {
        $(this)
            .siblings(".keyword-count")
            .text(this.value.length + "/30");
    });
    // Features
    function updateFeatureCount(input) {
        $(input)
            .siblings("small")
            .text($(input).val().length + "/200");
    }
    $("#featuresContainer").on("input", ".feature-input", function () {
        updateFeatureCount(this);
    });
    // Features Add/Remove
    $("#addFeature").on("click", function () {
        $("#featuresContainer").append(`
            <div class="feature-item position-relative mb-2">
                <input type="text" name="features[]" class="form-control feature-input" maxlength="200" style="padding-right: 60px;">
                <small class="text-muted position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%);">0/200</small>
            </div>
            `);
    });
    $("#removeFeature").on("click", function () {
        $("#featuresContainer .feature-item").last().remove();
    });
    $(document).on("input", ".feature-input", function () {
        $(this)
            .siblings(".feature-count")
            .text(this.value.length + "/200");
    });
    // Description Count
    $("#productDesc").on("input", function () {
        $("#descCount").text(this.value.length + "/3000");
    });
    // Multi Image Upload logic
    /*
    let images = [];
    // Render thumbnails
    function renderImages() {
        // Big thumb
        $("#bigThumb").html(
            images[0]
                ? `
                <div class="position-relative h-100 w-100">
                    <img src="${images[0]}" class="img-fluid h-100 w-100 object-fit-cover">
                    <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="0">x</button>
                </div>
            `
                : "+"
        );
        // Small thumbs (1,2,3)
        $("#multiImageUpload .smallThumb").each(function (i) {
            let idx = i + 1;
            if (images[idx]) {
                $(this).html(`
                        <div class="position-relative h-100 w-100">
                            <img src="${images[idx]}" class="img-fluid h-100 w-100 object-fit-cover">
                            <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${idx}">x</button>
                        </div>
                    `);
            } else {
                $(this).html("+");
            }
        });
        // Extra thumbs
        $("#extraThumbs").html("");
        if (images.length > 4) {
            for (let i = 4; i < images.length; i++) {
                $("#extraThumbs").append(`
                        <div class="position-relative border rounded" style="width:100px; height:100px;">
                            <img src="${images[i]}" class="img-fluid h-100 w-100 object-fit-cover">
                            <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${i}">x</button>
                        </div>
                    `);
            }
        }
    }
    // Handle files
    function handleFiles(files) {
        for (let file of files) {
           
            let reader = new FileReader();
            reader.onload = function (e) {
                images.push(e.target.result);
                renderImages();
            };
            reader.readAsDataURL(file);
        }
    }

    

    // Klik upload (+) → trigger input file
    // Hanya trigger upload jika klik langsung di div kosong (+)
    $("#bigThumb, .smallThumb")
        .off("click")
        .on("click", function (e) {
            // Jangan trigger jika klik tombol remove
            if ($(e.target).hasClass("removeImage")) return;
            // Hanya trigger upload jika div kosong (tampil '+')
            if ($(this).text().trim() === "+") {
                $("#imageInput").trigger("click");
            }
        });
    // Tombol "Add More" selalu trigger input
    $("#addMoreImages")
        .off("click")
        .on("click", function () {
            $("#imageInput").trigger("click");
        });
    // Pilih file
    $("#imageInput").on("change", function () {
        handleFiles(this.files);
        $(this).val("");
    });
    // Hapus gambar
    $(document)
        .off("click", ".removeImage")
        .on("click", ".removeImage", function (e) {
            e.stopPropagation(); // penting supaya klik tombol x tidak trigger upload
            let index = parseInt($(this).attr("data-index"));
            if (!isNaN(index)) {
                images.splice(index, 1); // hapus gambar dari array
                renderImages(); // rerender semua thumbnails
            }
    }); 
    */
   

   $("#bigThumb, .smallThumb").on("click", function (e) {
       if ($(e.target).hasClass("removeImage")) return;
       if ($(this).find("img").length === 0) {
           $("#imageInput").trigger("click");
       }
   });
     // Tombol "Add More" selalu trigger input
     $("#addMoreImages")
         .off("click")
         .on("click", function () {
             $("#imageInput").trigger("click");
         });
     // Pilih file
     $("#imageInput").on("change", function () {
         handleFiles(this.files);
         $(this).val("");
     });
   
    function renderImages() {
        const images = window.uploadState.primaryProductImages;

        $("#bigThumb").html(
            images[0]
                ? `
            <div class="position-relative h-100 w-100">
                <img src="${images[0].preview}" class="img-fluid h-100 w-100 object-fit-cover">
                <span class="badge bg-dark position-absolute bottom-0 start-0 m-1">
                    #${images[0].sequence}
                </span>
                <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="0">x</button>
            </div>
            `
                : "+"
        );

        $("#multiImageUpload .smallThumb").each(function (i) {
            const idx = i + 1;
            if (images[idx]) {
                $(this).html(`
                <div class="position-relative h-100 w-100">
                    <img src="${images[idx].preview}" class="img-fluid h-100 w-100 object-fit-cover">
                    <span class="badge bg-dark position-absolute bottom-0 start-0 m-1">
                        #${images[idx].sequence}
                    </span>
                    <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${idx}">x</button>
                </div>
            `);
            } else {
                $(this).html("+");
            }
        });

        $("#extraThumbs").empty();
        if (images.length > 4) {
            images.slice(4).forEach((img, i) => {
                $("#extraThumbs").append(`
                <div class="position-relative border rounded" style="width:100px;height:100px">
                    <img src="${
                        img.preview
                    }" class="img-fluid h-100 w-100 object-fit-cover">
                    <span class="badge bg-dark position-absolute bottom-0 start-0 m-1">
                        #${img.sequence}
                    </span>
                    <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 removeImage" data-index="${
                        i + 4
                    }">x</button>
                </div>
            `);
            });
        }
    }

    const MAX_IMAGES = 8;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
    const MAX_SIZE = 2 * 1024 * 1024; // 2MB
    function handleFiles(files) {
        for (let file of files) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                alert("Format gambar tidak didukung");
                continue;
            }

            if (window.uploadState.primaryProductImages.length >= MAX_IMAGES) {
                alert("Maksimal 8 gambar");
                return;
            }

            if (file.size > MAX_SIZE) {
                alert("Ukuran gambar maksimal 2MB");
                continue;
            }

            const imageItem = {
                file: file,
                imageId: null,
                preview: "",
                sequence: null,
            };

            const reader = new FileReader();
            reader.onload = function (e) {
                imageItem.preview = e.target.result;
                window.uploadState.primaryProductImages.push(imageItem);

                updateImageSequence(); // 
                renderImages();
            };

            reader.readAsDataURL(file);
        }
    }

    function updateImageSequence() {
        window.uploadState.primaryProductImages.forEach((item, index) => {
            item.sequence = index + 1;
        });
    }

    $(document).on("click", ".removeImage", function (e) {
        e.stopPropagation();
        const index = Number($(this).data("index"));

        window.uploadState.primaryProductImages.splice(index, 1);
        updateImageSequence(); //
        renderImages();
    });

   
}