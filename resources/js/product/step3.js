import $ from "jquery";
import { apiGet } from "@/helpers/apiService";
// import { createNewWarehouseRow, waitForSelectOptions } from "@/helpers/helpers";



export default function Step3() {


    function initEditStep3(product) {
        if (!product.productModels || !product.productModels.length) return;
        
        // console.log("Kp-", product.productModels);

        const models = product.productModels;
        const $wrapper = $("#panel-model-wrapper");
        // const $firstPanel = $wrapper.find(".panel-utama-model").first();

        models.forEach((model, index) => {
            // console.log("model=", model.isMeasurement);
            let newIndex = index + 1;
            let panel = `<div class="panel-utama-model border-top-red-thick" data-panel-index="${newIndex}">
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
                                        <input class="form-check-input measureYes" type="radio" 
                                            name="has_measurement[${newIndex}]" value="yes">
                                        <label class="form-check-label">Yes</label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input measureNo" type="radio" 
                                            name="has_measurement[${newIndex}]" value="no" checked>
                                        <label class="form-check-label">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mb-4">
                            <div class="fw-medium text-light p-1 rounded-top" style="margin-top:6px;margin-left:9px; background-color: #8e9797;">
                                <i class="bi bi-info-circle"></i> Model Mandatory Info
                            </div>
                            <div class="card-body">
                                <div class="row g-4">
                                    <div class="col-md-7">
                                        
                                        <div class="row mb-3 align-items-center">
                                            <label class="col-sm-3 col-form-label fw-bold">Model Name</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control ModelName">
                                            </div>
                                        </div>
                                        <div class="row mb-3 align-items-center">
                                            <label class="col-sm-3 col-form-label fw-bold">SKU</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control Sku">
                                            </div>
                                        </div>
                                        <div id="measurement-section" class="panel-utama-model2 mb-4">
                                            <div class="fw-semibold mb-3 text-success panel-toggle-header2" 
                                                style="cursor: pointer;" 
                                                id="title-Measurement-Mandatory-Info">
                                                Measurement Mandatory Info
                                                <i class="bi bi-chevron-down me-1 toggle-icon2" style="margin-left:35px;"></i>
                                            </div>
                                            <div id="measurement-wrapper" class="panel-toggle-content2">
                                            
                                                <div class="panel-measurement  rounded-1 p-3 mb-2" style="border: 1px dashed #cf2121 !important;">
                                                    <div class="row mb-3 measurement-name-row" id="row-MeasurementName_">
                                                        <label class="col-sm-6 col-form-label fw-bold">
                                                            Measurement Name
                                                        </label> 
                                                        <div class="col-sm-6"> 
                                                            <input class="form-control MeasurementName">
                                                        </div>
                                                    </div>
                                                    <div class="row mb-3  measurement-unit-row" id="row-MeasurementCountingUnit">
                                                        <label class="col-sm-6 col-form-label fw-bold">
                                                            Measurement Counting Unit
                                                        </label>
                                                        <div class="col-sm-6">
                                                            <input class="form-control MeasurementCountingUnit">
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3 align-items-center">
                                                        <label class="col-sm-3 col-form-label fw-bold">Weight</label>
                                                        <div class="col-sm-6">
                                                            <input type="text" class="form-control decimalInput Weight">
                                                        </div>
                                                        <div class="col-sm-3">
                                                            <select class="form-select WeightType">
                                                                <option value="G">Gram</option>
                                                                <option value="KG">KG</option>
                                                                <option value="TON">Ton</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div class="row mb-3 align-items-center">
                                                        <label class="col-sm-3 col-form-label fw-bold">Dimensions</label>
                                                        <div class="col-sm-9 d-flex gap-2">
                                                            <input class="form-control text-center decimalInput DimensionsL" placeholder="L">
                                                            <input class="form-control text-center decimalInput DimensionsW" placeholder="W">
                                                            <input class="form-control text-center decimalInput DimensionsH" placeholder="H">
                                                            <select class="form-select DimensionType">
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
                                                            <select class="form-select Currency">
                                                                <option value="IDR" selected>IDR</option>
                                                                <option value="USD">Dollar</option>
                                                            </select>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <input type="text" class="form-control Price" placeholder="price">
                                                        </div>
                                                    </div>

                                                    <div class="warehouse-wrapper">
                                                        <div class="warehouse-row" id="warehouse-row">
                                                            <div class="row mb-2 align-items-end cnt-row-wrs">
                                                                <div class="col-md-6">
                                                                    <label class="form-label fw-semibold">
                                                                        <span class="text-danger">*</span> Warehouse
                                                                    </label>
                                                                    <select name="warehouses"
                                                                            class="form-select required warehouses"
                                                                            >
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
                                                                                        
                                                    <button type="button" 
                                                            class="btn  px-0 small fs-10 add-warehouse" style="color:#7D3636;">
                                                        + Add more
                                                    </button>                           
                                                    <div class="border border-5 border-success rounded-4 p-1 my-4">
                                                        <div class="d-flex align-items-center gap-4">

                                                            <div class="fw-semibold" style="margin-left:10px;">
                                                                Configure Promotion Price?
                                                            </div>

                                                            <div class="form-check">
                                                                <input class="form-check-input promo-yes promoYes" type="radio" name="promo_price" value="yes">
                                                                <label class="form-check-label" for="promoYes">Yes</label>
                                                            </div>

                                                            <div class="form-check">
                                                                <input class="form-check-input promo-no promoNo" type="radio" name="promo_price" value="no" checked>
                                                                <label class="form-check-label" for="promoNo">No</label>
                                                            </div>

                                                        </div>
                                                    </div>                                  
                                                    <div class="promo-form">
                                                        <div class="row mb-4 align-items-center">
                                                            <label class="col-sm-3 col-form-label fw-bold">
                                                                Sale Price
                                                            </label>
                                                            <div class="col-sm-3">
                                                                <select class="form-select promotionCurrency">
                                                                    <option value="IDR" selected>IDR</option>
                                                                    <option value="USD">Dollar</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-sm-6">
                                                                <input type="text"  class="form-control decimalInput promotionPrice" placeholder="price">
                                                            </div>
                                                        </div>
                                                        <div class="row mb-4 align-items-center">
                                                            <label class="col-sm-3 col-form-label fw-bold">
                                                            Start Date
                                                            </label>
                                                            <div class="col-sm-9">
                                                                <input type="date" class="form-control datepicker promotionStartDate" placeholder="DD/MM/YYYY">
                                                            </div>
                                                        </div>
                                                        <div class="row mb-4 align-items-center">
                                                            <label class="col-sm-3 col-form-label fw-bold">
                                                            End Date
                                                            </label>
                                                            <div class="col-sm-9">
                                                                <input type="date" class="form-control datepicker promotionEndDate" placeholder="DD/MM/YYYY">
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                                <input type="text" class="form-control decimalInput packagingWeight">
                                                            </div>
                                                                <div class="col-sm-3">
                                                                <select class="form-select packagingWeightType">
                                                                    <option value="G">Gram</option>
                                                                    <option value="KG">KG</option>
                                                                    <option value="TON">Ton</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3 align-items-center">
                                                            <label class="col-sm-4 col-form-label fw-medium">Package Dimensions</label>
                                                            <div class="col-sm-8 d-flex gap-2">
                                                                <input  class="form-control text-center decimalInput packagingLength" placeholder="L">
                                                                <input  class="form-control text-center decimalInput packagingWidth" placeholder="W">
                                                                <input  class="form-control text-center decimalInput packagingHeight" placeholder="H">
                                                                <select class="form-select packagingDimensionType">
                                                                    <option value="CM">CM</option>
                                                                    <option value="M">Meter</option>
                                                                    <option value="MM">Mili Meter</option>
                                                                </select>
                                                            </div>
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
                                    <div class="col-md-5">
                                        <div 
                                            class="image-upload-box border rounded bg-light position-relative overflow-hidden"
                                            style="height:300px; cursor:pointer"> 

                                            <div class="position-absolute top-0 start-0 m-2 small text-muted fw-semibold">
                                                <span class="text-danger">*</span> Model Image
                                            </div>
                                            <div 
                                                class="image-placeholder position-absolute top-50 start-50 translate-middle
                                                        text-muted text-center">
                                                <i class="bi bi-plus-lg fs-1"></i>
                                            </div>
                                            <img  class="image-preview w-100 h-100 d-none" style="object-fit:cover">
                                            <button type="button"                                                    
                                                    class=" remove-image btn btn-danger btn-sm position-absolute top-0 end-0 m-2 d-none">
                                                <i class="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                        <input type="file" class="imageInputStep3 d-none" accept="image/*">
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        `;

            let pn = $wrapper.append(panel);
            const radioName = `has_measurement[${newIndex}]`;
            const radios = document.getElementsByName(radioName);

            if (model.isMeasurement) {
                // Check radio Yes jika true
                radios.forEach((radio) => {
                    if (radio.value === "yes") {
                        radio.checked = true;
                    }
                });
                pn.find(".measurement-name-row").show();
                pn.find(".measurement-unit-row").show();
                pn.find(".panel-toggle-header2").show();
            } else {
                // Check radio No jika false
                radios.forEach((radio) => {
                    if (radio.value === "no") {
                        radio.checked = true;
                    }
                });
                pn.find(".measurement-name-row").hide();
                pn.find(".measurement-unit-row").hide();
                pn.find(".panel-toggle-header2").hide();
            }

            pn.find(".ModelName").val(model.name);
            pn.find(".Sku").val(model.sku);

            let panelMe = document.getElementsByClassName("panel-measurement");
            Array.from(panelMe).forEach((panel, index) => {
                panel.querySelector(".MeasurementName").value =
                    model.measurementType || "";
                panel.querySelector(".MeasurementCountingUnit").value =
                    model.measurementValue || "";

                panel.querySelector(".Weight").value = model.weight;
                panel.querySelector(".WeightType").value = model.weightType;

                panel.querySelector(".DimensionsL").value =
                    model.packagingLength;
                panel.querySelector(".DimensionsW").value =
                    model.packagingWeight;
                panel.querySelector(".DimensionsH").value =
                    model.packagingHeight;
                panel.querySelector(".Currency").value = model.currency;
                panel.querySelector(".Price").value = model.price;
                const selectElement = panel.querySelector(".DimensionType");
                selectElement.value = model.packagingDimensionType;
                panel.querySelector(".promotionCurrency").value =
                    model.promotionCurrency;
                panel.querySelector(".promotionPrice").value =
                    model.promotionPrice;
                panel.querySelector(".promotionStartDate").value =
                    model.promotionStartDate;
                panel.querySelector(".promotionEndDate").value =
                    model.promotionEndDate;
                panel.querySelector(".packagingWeight").value =
                    model.packagingWeight;
                panel.querySelector(".packagingWeightType").value =
                    model.packagingWeightType;
                panel.querySelector(".packagingLength").value =
                    model.packagingLength;
                panel.querySelector(".packagingWidth").value =
                    model.packagingWidth;
                panel.querySelector(".packagingHeight").value =
                    model.packagingHeight;


                    //

                        if (model.warehouses && model.warehouses.length > 0) {
                            // Cari panel measurement yang sesuai
                            // let $measurementPanels =
                                // pn.find(".panel-measurement");

                            // Loop melalui setiap warehouse yang akan diisi
                            model.warehouses.forEach(
                                (warehouseData, wIndex) => {
                                    //console.log("warehouseData", warehouseData.id);
                                    let $warehouseRow;

                                    if (wIndex === 0) {
                                        // Untuk warehouse pertama, gunakan row yang sudah ada
                                        $warehouseRow = pn
                                            .find(".warehouse-row")
                                            .first();
                                    } else {
                                        // Untuk warehouse berikutnya, klik tombol "Add more" untuk membuat row baru
                                        // atau buat manual
                                        $warehouseRow = createNewWarehouseRow(
                                            pn,
                                            wIndex,
                                        );
                                    }

                                    // Set value stock
                                    $warehouseRow
                                        .find(".stock")
                                        .val(warehouseData.stock);

                                    // Set selected warehouse di select
                                    let $select =
                                        $warehouseRow.find(".warehouses");

                                    // Karena select akan di-load async oleh loadWarehouseForSelect,
                                    // kita perlu menunggu sampai options tersedia
                                    waitForSelectOptions(
                                        $select,
                                        warehouseData.id,
                                    );
                                },
                            );
                        }


                    //

            });

           

            if (model.isConfigurePromotionPrice) {
                console.log("TESSS");
                pn.find(".promoYes").prop(
                    "checked",
                    model.isConfigurePromotionPrice,
                );
            } else {
                pn.find(".promoNo").prop(
                    "checked",
                    model.isConfigurePromotionPrice,
                );
            }
        });
    }

    //============================================//
    const appData = window.APP_DATA || {};

    if (appData.mode === "edit" && appData.product) {
       
        initEditStep3(appData.product);
        loadWarehouse();
    }
    else
    {

        if ($(".panel-utama-model").length === 0) {
            addNewPanel();
            loadWarehouse();

            setTimeout(function () {
                toggleMeasurement();
                toggleAllPromoForms(); // Panggil untuk semua panel
            }, 100);
        } else {
            toggleMeasurement();
            toggleAllPromoForms(); // Panggil untuk semua panel
        }

    }


    

    // ===== FUNGSI 1: RADIO BUTTON =====
    // Saat radio has_measurement berubah
    $(document).on("change", 'input[name^="has_measurement"]', function () {
        let $panel = $(this).closest(".panel-utama-model");
        let $measureYes = $panel.find(".measureYes");

        // Ini persis seperti kode asli Anda, tapi dalam scope per panel
        if ($measureYes.is(":checked")) {
            $panel.find("#button-add-measur").show();
            $panel.find("#title-Measurement-Mandatory-Info").show();
            $panel.find("#row-MeasurementCountingUnit").show();
            $panel.find("#row-MeasurementName_").show(); // Perhatikan underscore
        } else {
            $panel.find("#button-add-measur").hide();
            $panel.find("#title-Measurement-Mandatory-Info").hide();
            $panel.find("#row-MeasurementCountingUnit").hide();
            $panel.find("#row-MeasurementName_").hide();
        }
    });

    // ===== FUNGSI 2: TOGGLE MEASUREMENT MANDATORY INFO =====
    // Event toggle untuk Measurement Mandatory Info (slide tutup/buka)
    $(document).on("click", "#title-Measurement-Mandatory-Info", function () {
        let $title = $(this);
        let $panel = $title.closest(".panel-utama-model");
        let $measurementWrapper = $panel.find("#measurement-wrapper");
        let $icon = $title.find("i");

        // Toggle konten dengan animasi slide
        $measurementWrapper.slideToggle(200, function () {
            // Ganti icon setelah animasi selesai
            if ($measurementWrapper.is(":visible")) {
                $icon.removeClass("bi-chevron-down").addClass("bi-chevron-up");
            } else {
                $icon.removeClass("bi-chevron-up").addClass("bi-chevron-down");
            }
        });
    });

   

    // ===== FUNGSI 3: ADD MORE MEASUREMENT =====
    $(document).on("click", ".btn-add-more2", function () {
        let $panel = $(this).closest(".panel-utama-model");
        let $measurementWrapper = $panel.find("#measurement-wrapper");
        let $firstMeasurement = $measurementWrapper.find(
            ".panel-measurement:first",
        );

        // Clone panel measurement pertama
        let $clone = $firstMeasurement.clone();

        let measurementIndex =
            $measurementWrapper.find(".panel-measurement").length + 1;


        // Set name radio supaya unik
        $clone.find(".promo-yes").attr("name", "promo_price[" + measurementIndex + "]");
        $clone.find(".promo-no").attr("name", "promo_price[" + measurementIndex + "]");




        // --- PERBAIKAN PENTING: Hapus SEMUA atribut ID di dalam clone ---
        $clone.find("[id]").each(function () {
            $(this).removeAttr("id"); // Hapus semua ID untuk menghindari duplikasi
        });

        // --- Reset semua nilai input ---
        $clone.find("input[type='text'], input[type='number']").val("");
        $clone.find("select").prop("selectedIndex", 0);

        // --- Reset radio buttons ---
       

        $clone.find(".promo-no").prop("checked", true);
        $clone.find(".promo-yes").prop("checked", false);

        // --- Reset warehouse wrapper ---
        let $warehouseWrapper = $clone.find(".warehouse-wrapper");
        $warehouseWrapper.empty(); // Kosongkan

        // Buat warehouse row baru
        let $newWarehouseRow = $(`
        <div class="warehouse-row">
            <div class="row mb-2 align-items-end cnt-row-wrs">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">
                        <span class="text-danger">*</span> Warehouse
                    </label>
                    <select name="warehouses" class="form-select required warehouses">
                        <option value="">Loading ...</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label fw-semibold">Stock</label>
                    <input type="number" class="form-control stock">
                </div>
                <div class="col-md-3 d-none remove-wrapper">
                    <button type="button" class="btn px-0 small remove-warehouse" style="color:#7D3636;">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `);
        $warehouseWrapper.append($newWarehouseRow);

        // Load warehouse untuk select di clone
        $clone.find("select.warehouses").each(function () {
            loadWarehouseForSelect($(this));
        });

        // Reset image preview
        $clone.find(".image-preview").attr("src", "").addClass("d-none");
        $clone.find(".image-placeholder").removeClass("d-none");
        $clone.find(".remove-image").addClass("d-none");
        $clone.find(".imageInputStep3").val("");

        // Append ke measurement wrapper
        $measurementWrapper.append($clone);

        // Panggil fungsi toggle untuk panel ini
        togglePromoFormInPanel($panel);
    });

    // ===== FUNGSI 4: REMOVE LAST MEASUREMENT =====
    $(document).on("click", ".btn-remove-last2", function () {
        let $panel = $(this).closest(".panel-utama-model");
        let $measurementWrapper = $panel.find("#measurement-wrapper");
        let $measurementPanels = $measurementWrapper.find(".panel-measurement");

        // Cek jumlah panel measurement
        if ($measurementPanels.length <= 1) {
            alert("Minimal harus ada 1 measurement panel!");
            return;
        }

        // Hapus panel measurement terakhir
        $measurementPanels.last().fadeOut(300, function () {
            $(this).remove();
        });
    });

    

   

    $(document).on("change", ".promo-yes, .promo-no", function () {
       
         let $measurementPanel = $(this).closest(".panel-measurement");
         if (!$measurementPanel.length) return;

         let $promoYes = $measurementPanel.find(".promo-yes");
         let $promoForm = $measurementPanel.find(".promo-form");

         if (!$promoForm.length) return;

         if ($promoYes.is(":checked")) {
             $promoForm
                 .removeClass("opacity-50")
                 .find("input, select")
                 .prop("disabled", false);
         } else {
             $promoForm
                 .addClass("opacity-50")
                 .find("input, select")
                 .prop("disabled", true);
         }
    });

    // Event add more warehouse
    $(document).on("click", ".add-warehouse", function () {
        // Cari measurement panel tempat tombol diklik (bukan panel utama)
        let $measurementPanel = $(this).closest(".panel-measurement");

        // Cari warehouse-wrapper di measurement panel yang sama
        let $warehouseWrapper = $measurementPanel.find(".warehouse-wrapper");

        // Clone warehouse-row pertama dari wrapper yang sama
        let $firstRow = $warehouseWrapper.find(".warehouse-row:first");
        let $clone = $firstRow.clone();

        // Reset value
        $clone.find("select.warehouses").val("");
        $clone.find("input.stock").val("");

        // Tampilkan tombol remove
        $clone.find(".remove-wrapper").removeClass("d-none");

        // Load warehouse untuk select baru
        let $newSelect = $clone.find("select.warehouses");
        loadWarehouseForSelect($newSelect);

        // Append ke wrapper (hanya di measurement panel yang sesuai)
        $warehouseWrapper.append($clone);
    });

    // remove row warehouse
    $(document).on("click", ".remove-warehouse", function () {
        // Cek apakah ini bukan row pertama
        let $row = $(this).closest(".warehouse-row");
        let $wrapper = $row.closest(".warehouse-wrapper");

        // Hitung jumlah row di wrapper ini
        let rowCount = $wrapper.find(".warehouse-row").length;

        // Hanya hapus jika lebih dari 1 row
        if (rowCount > 1) {
            $row.remove();
        } else {
            alert("Minimal harus ada 1 warehouse row!");
        }
    });

    $(document).on("click", "#add-more-panel-model", function () {
        addNewPanel();
        loadWarehouse();

        // Setelah panel baru ditambahkan, atur promo form
        setTimeout(function () {
            let $newPanel = $(".panel-utama-model").last();
            togglePromoFormInPanel($newPanel);
        }, 100);
    });

    // Event klik tombol remove panel model
    $(document).on("click", "#remove-panel-model", function () {
        var totalPanel = $(".panel-utama-model").length;

        if (totalPanel <= 1) {
            alert(
                "Minimal harus ada 1 panel! Tidak boleh menghapus panel terakhir.",
            );
            return;
        }

        // Hapus panel terakhir dengan animasi fadeOut (optional)
        $(".panel-utama-model:last").fadeOut(300, function () {
            $(this).remove();
            console.log(
                "Panel terakhir berhasil dihapus. Sisa panel: " +
                    $(".panel-utama-model").length,
            );
        });
    });

    //event untuk show/hide panel utama
    // Event handler untuk toggle panel (menggunakan event delegation)
    $(document).on("click", ".panel-toggle-header", function () {
        // Cari konten panel dalam elemen yang sama
        var $content = $(this)
            .closest(".panel-utama-model")
            .find(".panel-toggle-content");
        var $icon = $(this).find(".toggle-icon");

        // Toggle konten
        $content.slideToggle(200, function () {
            // Ganti icon setelah animasi selesai
            if ($content.is(":visible")) {
                $icon.removeClass("bi-chevron-down").addClass("bi-chevron-up");
            } else {
                $icon.removeClass("bi-chevron-up").addClass("bi-chevron-down");
            }
        });
    });

    //================ handler image upload ====================
    $(document).on("click", "#image-upload-box", function (e) {
        // cegah klik tombol X ikut trigger upload
        if ($(e.target).closest("#remove-image").length) return;
        $("#imageInputStep3")[0].click();
    });

    // pilih gambar → preview
    $(document).on(
        "click",
        ".image-upload-box, .image-placeholder",
        function () {
            //alay
            const $panel = $(this).closest(".panel-utama-model");
            const input = $panel.find(".imageInputStep3")[0];

            if (!input) {
                console.error("imageInputStep3 tidak ditemukan");
                return;
            }

            input.click();
        },
    );
    $(document).on("change", ".imageInputStep3", function () {
        const file = this.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar");
            this.value = "";
            return;
        }

        const $panel = $(this).closest(".panel-utama-model");
        const imageItem = {
            file: file,
            imageId: null,
            // panelKe: null,
        };
        const reader = new FileReader();
        reader.onload = (e) => {
            // imageItem.preview = e.target.result;
            window.uploadState.imageProductModelMeasure.push(imageItem);
            $panel
                .find(".image-preview")
                .attr("src", e.target.result)
                .removeClass("d-none");

            $panel.find(".image-placeholder").addClass("d-none");
            $panel.find(".remove-image").removeClass("d-none");
        };

        reader.readAsDataURL(file);
    });

    // hapus preview
    $(document).on("click", ".remove-image", function (e) {
        e.stopPropagation();

        const $panel = $(this).closest(".panel-utama-model");

        $panel.find(".image-preview").attr("src", "").addClass("d-none");

        $panel.find(".image-placeholder").removeClass("d-none");
        $panel.find(".remove-image").addClass("d-none");
        $panel.find(".imageInputStep3").val("");
    });
}

function addNewPanel() {
    var panelCount = $(".panel-utama-model").length;
    var newIndex = panelCount + 1;

    var tmp_utama = `<div class="panel-utama-model border-top-red-thick" data-panel-index="${newIndex}">
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
                            <input class="form-check-input measureYes" type="radio" 
                                name="has_measurement[${newIndex}]" value="yes">
                            <label class="form-check-label">Yes</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input measureNo" type="radio" 
                                name="has_measurement[${newIndex}]" value="no" checked>
                            <label class="form-check-label">No</label>
                        </div>
                    </div>
                </div>
            </div>
            
           
            <div class="mb-4 ">
                <div class="fw-medium text-light p-1 rounded-top" style="margin-top:6px;margin-left:9px; background-color: #8e9797;">
                    <i class="bi bi-info-circle"></i> Model Mandatory Info
                </div>
                
                    <div class="card-body">
                        <div class="row g-4">                           
                            <div class="col-md-7">
                                <div class="row mb-3 align-items-center">
                                    <label class="col-sm-3 col-form-label fw-bold">Model Name</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control ModelName">
                                    </div>
                                </div>
                                <div class="row mb-3 align-items-center">
                                    <label class="col-sm-3 col-form-label fw-bold">SKU</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control Sku">
                                    </div>
                                </div>
                                <div id="measurement-section" class="panel-utama-model2 mb-4">
                                    <div class="fw-semibold mb-3 text-success panel-toggle-header2" 
                                        style="cursor: pointer;" 
                                        id="title-Measurement-Mandatory-Info">
                                        Measurement Mandatory Info
                                        <i class="bi bi-chevron-down me-1 toggle-icon2" style="margin-left:35px;"></i>
                                    </div>
                                    <div id="measurement-wrapper" class="panel-toggle-content2">
                                        <div class="panel-measurement  rounded-1 p-3 mb-2" style="border: 1px dashed #cf2121 !important;">
                                            <div class="row mb-3 measurement-name-row" id="row-MeasurementName_">
                                                <label class="col-sm-6 col-form-label fw-bold">
                                                    Measurement Name
                                                </label> 
                                                <div class="col-sm-6"> 
                                                    <input class="form-control MeasurementName">
                                                </div>
                                            </div>
                                            <div class="row mb-3  measurement-unit-row" id="row-MeasurementCountingUnit">
                                                <label class="col-sm-6 col-form-label fw-bold">
                                                    Measurement Counting Unit
                                                </label>
                                                <div class="col-sm-6">
                                                    <input class="form-control MeasurementCountingUnit">
                                                </div>
                                            </div>

                                            <div class="row mb-3 align-items-center">
                                                <label class="col-sm-3 col-form-label fw-bold">Weight</label>
                                                <div class="col-sm-6">
                                                    <input type="text" class="form-control decimalInput Weight">
                                                </div>
                                                <div class="col-sm-3">
                                                    <select class="form-select WeightType">
                                                        <option value="G">Gram</option>
                                                        <option value="KG">KG</option>
                                                        <option value="TON">Ton</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="row mb-3 align-items-center">
                                                <label class="col-sm-3 col-form-label fw-bold">Dimensions</label>
                                                <div class="col-sm-9 d-flex gap-2">
                                                    <input class="form-control text-center decimalInput DimensionsL" placeholder="L">
                                                    <input class="form-control text-center decimalInput DimensionsW" placeholder="W">
                                                    <input class="form-control text-center decimalInput DimensionsH" placeholder="H">
                                                    <select class="form-select DimensionType">
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
                                                    <select class="form-select Currency">
                                                        <option value="IDR" selected>IDR</option>
                                                        <option value="USD">Dollar</option>
                                                    </select>
                                                </div>
                                                <div class="col-sm-6">
                                                    <input type="text" class="form-control Price" placeholder="price">
                                                </div>
                                            </div>

                                            <div class="warehouse-wrapper">
                                                <div class="warehouse-row" id="warehouse-row">
                                                    <div class="row mb-2 align-items-end cnt-row-wrs">
                                                        <div class="col-md-6">
                                                            <label class="form-label fw-semibold">
                                                                <span class="text-danger">*</span> Warehouse
                                                            </label>
                                                            <select name="warehouses"
                                                                    class="form-select required warehouses"
                                                                    >
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
                                          
                                            <button type="button" 
                                                    class="btn  px-0 small fs-10 add-warehouse" style="color:#7D3636;">
                                                + Add more
                                            </button>


                                          
                                            <div class="border border-5 border-success rounded-4 p-1 my-4">
                                                <div class="d-flex align-items-center gap-4">

                                                    <div class="fw-semibold" style="margin-left:10px;">
                                                        Configure Promotion Price?
                                                    </div>

                                                    <div class="form-check">
                                                        <input class="form-check-input promo-yes promoYes" type="radio" name="promo_price" value="yes">
                                                        <label class="form-check-label" for="promoYes">Yes</label>
                                                    </div>

                                                    <div class="form-check">
                                                        <input class="form-check-input promo-no promoNo" type="radio" name="promo_price" value="no" checked>
                                                        <label class="form-check-label" for="promoNo">No</label>
                                                    </div>

                                                </div>
                                            </div>

                                            
                                            <div class="promo-form">
                                                <div class="row mb-4 align-items-center">
                                                    <label class="col-sm-3 col-form-label fw-bold">
                                                        Sale Price
                                                    </label>
                                                    <div class="col-sm-3">
                                                        <select class="form-select promotionCurrency">
                                                            <option value="IDR" selected>IDR</option>
                                                            <option value="USD">Dollar</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <input type="text"  class="form-control decimalInput promotionPrice" placeholder="price">
                                                    </div>
                                                </div>
                                                <div class="row mb-4 align-items-center">
                                                    <label class="col-sm-3 col-form-label fw-bold">
                                                    Start Date
                                                    </label>
                                                    <div class="col-sm-9">
                                                        <input type="date" class="form-control datepicker promotionStartDate" placeholder="DD/MM/YYYY">
                                                    </div>
                                                </div>
                                                <div class="row mb-4 align-items-center">
                                                    <label class="col-sm-3 col-form-label fw-bold">
                                                    End Date
                                                    </label>
                                                    <div class="col-sm-9">
                                                        <input type="date" class="form-control datepicker promotionEndDate" placeholder="DD/MM/YYYY">
                                                    </div>
                                                </div>
                                            </div>

                                           
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
                                                        <input type="text" class="form-control decimalInput packagingWeight">
                                                    </div>
                                                        <div class="col-sm-3">
                                                        <select class="form-select packagingWeightType">
                                                            <option value="G">Gram</option>
                                                            <option value="KG">KG</option>
                                                            <option value="TON">Ton</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3 align-items-center">
                                                    <label class="col-sm-4 col-form-label fw-medium">Package Dimensions</label>
                                                    <div class="col-sm-8 d-flex gap-2">
                                                        <input  class="form-control text-center decimalInput packagingLength" placeholder="L">
                                                        <input  class="form-control text-center decimalInput packagingWidth" placeholder="W">
                                                        <input  class="form-control text-center decimalInput packagingHeight" placeholder="H">
                                                        <select class="form-select packagingDimensionType">
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
                            </div>                           
                            <div class="col-md-5">
                                <div 
                                    class="image-upload-box border rounded bg-light position-relative overflow-hidden"
                                    style="height:300px; cursor:pointer"> 

                                    <div class="position-absolute top-0 start-0 m-2 small text-muted fw-semibold">
                                        <span class="text-danger">*</span> Model Image
                                    </div>

                                    <div 
                                        class="image-placeholder position-absolute top-50 start-50 translate-middle
                                                text-muted text-center">
                                        <i class="bi bi-plus-lg fs-1"></i>
                                    
                                    </div>

                                    <img  class="image-preview w-100 h-100 d-none" style="object-fit:cover">

   
                                    <button type="button"
                                            
                                            class=" remove-image btn btn-danger btn-sm position-absolute top-0 end-0 m-2 d-none">
                                        <i class="bi bi-x-lg"></i>
                                    </button>
                                </div>

                                <input type="file" class="imageInputStep3 d-none" accept="image/*">

                            </div>
                        </div>
                    </div>
               
            </div>
        </div>
    </div>`;

    $("#panel-model-wrapper").append(tmp_utama);
}

function loadWarehouse() {
    // Load semua select warehouse di semua panel
    $(".panel-utama-model").each(function () {
        let $panel = $(this);
        let $selects = $panel.find("select.warehouses");

        $selects.each(function () {
            loadWarehouseForSelect($(this));
        });
    });
}

function loadWarehouse2() {
    // Load semua select warehouse di semua panel
    $(".panel-utama-model").each(function () {
        let $panel = $(this);
        let $selects = $panel.find("select.warehouses");

        $selects.each(function () {
            loadWarehouseForSelect($(this));
        });
    });
}

function loadWarehouseForSelect($select) {
    $select.prop("disabled", true);
    $select.empty();
    $select.append('<option value="">Loading warehouse...</option>');

    apiGet("/warehouses")
        .then((res) => {
            $select.empty();
            if (res.responseCode !== "0000") return;

            res.rows.forEach((item) => {
                $select.append(
                    `<option value="${item.id}">${item.city}</option>`,
                );
            });

            $select.prop("disabled", false);
        })
        .catch(() => {
            $select.html('<option value="">Failed to load warehouse</option>');
        });
}

function toggleMeasurement() {
    $(".panel-utama-model").each(function () {
        let $panel = $(this);
        let $measureYes = $panel.find(".measureYes");

        // Ini persis logika asli Anda
        if ($measureYes.is(":checked")) {
            $panel.find("#button-add-measur").show();
            $panel.find("#title-Measurement-Mandatory-Info").show();
            $panel.find("#row-MeasurementCountingUnit").show();
            $panel.find("#row-MeasurementName_").show();
        } else {
            $panel.find("#button-add-measur").hide();
            $panel.find("#title-Measurement-Mandatory-Info").hide();
            $panel.find("#row-MeasurementCountingUnit").hide();
            $panel.find("#row-MeasurementName_").hide();
        }
    });
}


// Fungsi untuk toggle semua promo form di semua panel
function togglePromoFormInPanel($panel) {
    $panel.find(".panel-measurement").each(function () {
        let $measurement = $(this);

        // Cari radio Yes dengan class promo-yes
        let $promoYes = $measurement.find(".promo-yes");
        let $promoForm = $measurement.find(".promo-form");

        if ($promoForm.length > 0) {
            if ($promoYes.is(":checked")) {
                $promoForm
                    .removeClass("opacity-50")
                    .find("input, select")
                    .prop("disabled", false);
            } else {
                $promoForm
                    .addClass("opacity-50")
                    .find("input, select")
                    .prop("disabled", true);
            }
        }
    });
}

function toggleAllPromoForms() {
    $(".panel-utama-model").each(function() {
        togglePromoFormInPanel($(this));
    })
}


const createNewWarehouseRow = ($panel, index) => {
    let $newRow = $(`
        <div class="warehouse-row">
            <div class="row mb-2 align-items-end cnt-row-wrs">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">
                        <span class="text-danger">*</span> Warehouse
                    </label>
                    <select name="warehouses" class="form-select required warehouses">
                        <option value="">Loading ...</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label fw-semibold">Stock</label>
                    <input type="number" class="form-control stock">
                </div>
                <div class="col-md-3 remove-wrapper">
                    <button type="button" class="btn px-0 small remove-warehouse" style="color:#7D3636;">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `);

    $panel.find(".warehouse-wrapper").append($newRow);

    // Load warehouse untuk select baru
    loadWarehouseForSelect($newRow.find("select.warehouses"));

    return $newRow;
};

const waitForSelectOptions = ($select, selectedId, maxAttempts = 20) => {
    let attempts = 0;

    function checkOptions() {
        attempts++;
        let options = $select.find("option").length;

        // Jika sudah ada options (lebih dari 1, karena ada option loading/default)
        if (options > 1) {
            $select.val(selectedId);
            console.log(
                `Select set to: ${selectedId}, value sekarang: ${$select.val()}`,
            );
        } else if (attempts < maxAttempts) {
            // Jika belum ada options, cek lagi setelah 100ms
            setTimeout(checkOptions, 100);
        } else {
            console.warn("Timeout waiting for select options");
        }
    }

    checkOptions();
};
