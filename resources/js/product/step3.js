import $ from "jquery";
import { apiGet } from "@/helpers/apiService";

export default function Step3() {
    reindexPanels();
    loadWarehouse();
    //===================== 

    function initEditStep3(product) {
        if (!product.productModels || !product.productModels.length) return;

        const models = product.productModels;
        const $wrapper = $("#panel-model-wrapper");
        const $firstPanel = $wrapper.find(".panel-utama-model").first();

        models.forEach((model, index) => {
            let $panel;

            // index 0 pakai panel pertama
            if (index === 0) {
                $panel = $firstPanel;
            } else {
                $panel = $firstPanel.clone(false, false);
                $wrapper.append($panel);
            }

            // =============================
            // BASIC INFO
            // =============================

            $panel.find("#ModelName").val(model.name || "");
            $panel.find("#Sku").val(model.sku || "");

           
            // console.log("kaprok", model.isMeasurement);

            let hasMeasurement = model.isMeasurement;

            $panel.find("#measureYes").prop("checked", hasMeasurement);
            $panel.find("#measureNo").prop("checked", !hasMeasurement);

            // =============================
            // DIMENSION
            // =============================
            //Measurement

            //console.log("model.measurementType", model.measurementType);
            $panel.find("#MeasurementName").val(model.measurementType || "");
            $panel.find("#MeasurementCountingUnit").val(model.MeasurementCountingUnit || "");

            
            $panel.find("#DimensionsL").val(model.length || "");
            $panel.find("#DimensionsW").val(model.width || "");
            $panel.find("#DimensionsH").val(model.height || "");
            $panel.find("#DimensionType").val(model.dimensionType || "CM");
            $panel.find("#Price").val(model.price || "");
            $panel.find("#Currency").val(model.currency || "IDR");
            $panel.find("#Weight").val(model.weight || "");
            $panel
                .find("#WeightType")
                .val(model.weightType?.toUpperCase() || "KG");

            // =============================
            // IMAGE PREVIEW
            // =============================
          
            if (model.imageId) {
                $panel
                    .find(".image-preview")
                    .attr("src", model.imageId)
                    .removeClass("d-none");

                $panel.find(".image-placeholder").addClass("d-none");
                $panel.find(".remove-image").removeClass("d-none");
            }

            // =============================
            // WAREHOUSE
            // =============================
            //console.log("s", model);
            if (model.warehouses && model.warehouses.length) {
                const $warehouseWrapper = $panel.find("#warehouse-wrapper");
                const $firstWarehouseRow = $warehouseWrapper
                    .find(".warehouse-row")
                    .first();

                model.warehouses.forEach((wh, wIndex) => {
                    let $row;
                  
                    if (wIndex === 0) {
                        $row = $firstWarehouseRow;
                    } else {
                        $row = $firstWarehouseRow.clone(false, false);
                        $warehouseWrapper.append($row);
                    }

                    // $row.find(".warehouses").val(wh.id);
                    setTimeout(() => {
                        $row.find(".warehouses").val(wh.id);
                    }, 300);
                    $row.find(".stock").val(wh.stock);

                    if (wIndex > 0) {
                        $row.find(".remove-wrapper").removeClass("d-none");
                    }
                });
            }

           
            let promo = model.isConfigurePromotionPrice;

            $panel.find("#promoYes").prop("checked", promo);
            $panel.find("#promoNo").prop("checked", !promo);

            
            $panel.find("#promotionCurrency").val(model.promotionCurrency);
            $panel.find("#promotionPrice").val(model.promotionPrice);
            $panel.find("#promotionStartDate").val(model.promotionStartDate);
            $panel.find("#promotionEndDate").val(model.promotionEndDate);

            // packaging information
            $panel.find("#packagingWeight").val(model.packagingWeight);
            $panel.find("#packagingWeightType").val(model.packagingWeightType);
            $panel.find("#packagingLength").val(model.packagingLength);
            $panel.find("#packagingWidth").val(model.packagingWidth);
            $panel.find("#packagingHeight").val(model.packagingHeight);
            $panel.find("#packagingDimensionType").val(model.packagingDimensionType);
           
        });

        // penting setelah clone
        reindexPanels();
    }

    const appData = window.APP_DATA || {};

    if (appData.mode === "edit" && appData.product) {
        initEditStep3(appData.product);
    }


    //loadWarehouse();
    function loadWarehouse() {
        //warehouse-row cnt-row-wrs
        const select = $(".cnt-row-wrs").find("#warehouse_select");

        select.prop("disabled", true);
        select.empty();
        select.append('<option value="">Loading warehouse...</option>');

        apiGet("/warehouses")
            .then((res) => {
                select.empty();
                // select.append('<option value="">List of Warehouses</option>');
                if (res.responseCode !== "0000") return;

                res.rows.forEach((item) => {
                    select.append(
                        `<option value="${item.id}">${item.city}</option>`
                    );
                });

                select.prop("disabled", false);
            })
            .catch(() => {
                // optional, interceptor sudah handle auth error
                select.html(
                    '<option value="">Failed to load warehouse</option>'
                );
            });
    }
    function toggleMeasurement() {
        if ($("#measureYes").is(":checked")) {
            $("#button-add-measur").show();
            $("#title-Measurement-Mandatory-Info").show();
            $("#row-MeasurementCountingUnit").show();
            $("#row-MeasurementName").show();
        } else {
            $("#button-add-measur").hide();
            $("#title-Measurement-Mandatory-Info").hide();
            $("#row-MeasurementCountingUnit").hide();
            $("#row-MeasurementName").hide();
        }
    }

    // Saat page pertama load
    toggleMeasurement();

    // Saat radio berubah
    $('input[name="has_measurement"]').on("change", function () {
        toggleMeasurement();
    });

    $("#add-warehouse").on("click", function () {
        let $clone = $(".warehouse-row:first").clone();

        // reset value
        $clone.find("select").val("");
        $clone.find("input").val("");

        // tampilkan tombol remove
        $clone.find(".remove-wrapper").removeClass("d-none");

        $("#warehouse-wrapper").append($clone);
    });

    // remove row
    $(document).on("click", ".remove-warehouse", function () {
        $(this).closest(".warehouse-row").remove();
    });

    function togglePromoForm() {
        if ($("#promoYes").is(":checked")) {
            // ENABLE
            $("#promo-form")
                .removeClass("opacity-50")
                .find("input, select")
                .prop("disabled", false);
        } else {
            // DISABLE
            $("#promo-form")
                .addClass("opacity-50")
                .find("input, select")
                .prop("disabled", true);
        }
    }

    // first load
    togglePromoForm();

    // on change
    $('input[name="promo_price"]').on("change", function () {
        togglePromoForm();
    });

    //upload gambar
    // klik box → upload
    $("#image-upload-box").on("click", function (e) {
        // cegah klik tombol X ikut trigger upload
        if ($(e.target).closest("#remove-image").length) return;
        $("#imageInputStep3")[0].click();
    });

    // pilih gambar → preview

  $(document).on("click", ".image-upload-box, .image-placeholder", function () { //alay
      const $panel = $(this).closest(".panel-utama-model");
      const input = $panel.find(".imageInputStep3")[0];

      if (!input) {
          console.error("imageInputStep3 tidak ditemukan");
          return;
      }

      input.click();
  });
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

    /* ================= ADD MEASUREMENT ================= */
    $(".btn-add-more2").on("click", function () {
        const $wrapper = $("#measurement-wrapper");
        const $lastPanel = $wrapper.find(".panel-measurement").last();
        const $newPanel = $lastPanel.clone(true, true);

        // reset semua input/select di panel baru
        $newPanel.find("input").val("");
        $newPanel.find("select").prop("selectedIndex", 0);

        // reset warehouse rows (sisakan 1)
        $newPanel
            .find("#warehouse-wrapper .warehouse-row")
            .not(":first")
            .remove();
        $newPanel.find(".remove-wrapper").addClass("d-none");

        // reset promo
        $newPanel.find("#promoNo").prop("checked", true);
        $newPanel.find("#promoYes").prop("checked", false);
        $newPanel.find("#promo-form").hide();

        $wrapper.append($newPanel);
    });

    /* ================= REMOVE LAST MEASUREMENT ================= */
    $(".btn-remove-last2").on("click", function () {
        const $panels = $("#measurement-wrapper .panel-measurement");

        if ($panels.length > 1) {
            $panels.last().remove();
        } else {
            alert("Minimal harus ada 1 measurement");
        }
    });
    // d="add-more-panel-model"  id="remove-panel-model"

    $("#add-more-panel-model").on("click", function () {
        const $wrapper = $("#panel-model-wrapper");
        const $lastPanel = $wrapper.find(".panel-utama-model").last();
        const $newPanel = $lastPanel.clone(false, false); //  JANGAN clone event

        // reset input
        $newPanel.find("input").val("");
        $newPanel.find("select").prop("selectedIndex", 0);

        // reset image
        $newPanel.find(".image-preview").attr("src", "").addClass("d-none");
        $newPanel.find(".image-placeholder").removeClass("d-none");
        $newPanel.find(".remove-image").addClass("d-none");
        $newPanel.find(".imageInputStep3").val("");

        // pastikan jarak
        $newPanel.addClass("mb-4");

        $wrapper.append($newPanel);

        //  RE-INDEX PANEL
        reindexPanels();

        $("html, body").animate(
            { scrollTop: $newPanel.offset().top - 100 },
            300
        );
    });

    /* ================= REMOVE LAST PANEL ================= */

    $("#remove-panel-model").on("click", function () {
        const $panels = $("#panel-model-wrapper .panel-utama-model");

        if ($panels.length <= 1) {
            alert("Minimal harus ada 1 model");
            return;
        }

        const removedIndex = $panels.last().data("panel-index");

        // hapus panel
        $panels.last().remove();

        //  hapus state sesuai index
        window.uploadState.imageProductModelMeasure.splice(removedIndex, 1);

        //  reindex ulang panel
        reindexPanels();
    });

    /* ===== TOGGLE area model ===*/
    $(document).on("click", ".panel-toggle-header", function () {
        const $section = $(this).closest(".panel-utama-model");
        const $content = $section.children(".panel-toggle-content");
        const $icon = $(this).find(".toggle-icon");

        $content.stop(true, true).slideToggle(200);
        $icon.toggleClass("bi-chevron-down bi-chevron-up");
    });

    /* ==== Model Mandatory Info  ===== */

    /* ==== Model measurement Mandatory Info  ===== */
    $(document).on("click", ".panel-toggle-header2", function () {
        const $section = $(this).closest(".panel-utama-model2");
        const $content = $section.children(".panel-toggle-content2");
        const $icon = $(this).find(".toggle-icon");

        $content.stop(true, true).slideToggle(200);
        $icon.toggleClass("bi-chevron-down bi-chevron-up");
    });

    function reindexPanels() {
        $("#panel-model-wrapper .panel-utama-model").each(function (i) {
            $(this).attr("data-panel-index", i);
        });
    }
}

