import $ from "jquery";
import { apiGet } from "@/helpers/apiService";


export default function Step3() {
    reindexPanels();

    // function toggleMeasurement() {
    //     if ($("#measureYes").is(":checked")) {
    //         $("#measurement-section").slideDown();
    //         $("#no-measurement-section").slideUp();
    //         //  no - measurement - section;
    //     } else {
    //         $("#measurement-section").slideUp();
    //         $("#no-measurement-section").slideDown();
    //     }
    // }
    //loadWarehouse();
    function loadWarehouse() {
        const select = $("#warehouse");

        select.prop("disabled", true);
        select.empty();
        select.append('<option value="">Loading warehouse...</option>');

        apiGet("/warehouses")
            .then((res) => {
                select.empty();
                select.append('<option value="">List of Warehouses</option>');

                if (res.responseCode !== "0000") return;

                res.rows.forEach((item) => {
                    select.append(
                        `<option value="${item.id}">${item.name}</option>`
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
    /*$("#imageInputStep3").on("change", function () {
        const file = this.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("File harus berupa gambar");
            this.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            $("#image-preview")
                .attr("src", e.target.result)
                .removeClass("d-none");

            $("#image-placeholder").addClass("d-none");
            $("#remove-image").removeClass("d-none");
        };
        reader.readAsDataURL(file);
    });

    // hapus preview
    $("#remove-image").on("click", function (e) {
        e.stopPropagation(); // cegah buka file picker

        $("#image-preview").attr("src", "").addClass("d-none");

        $("#image-placeholder").removeClass("d-none");
        $("#remove-image").addClass("d-none");

        $("#imageInputStep3").val("");
    });*/
    // $(document).on("click", ".panel-toggle-header", function () {
    // $(".panel-utama-model")
    //     .find("#imageInputStep3")
    //     .on("change", function () {

    //           //const file = this.files[0]; //  BENAR
    //           //console.log(file);

    //         // var $this = $(this)
    //         const file = this.files[0];
    //         if (!file) return;

    //         if (!file.type.startsWith("image/")) {
    //             alert("File harus berupa gambar");
    //             this.value = "";
    //             return;
    //         }

    //         const reader = new FileReader();
    //         reader.onload = function (e) {
    //             this.find("#image-preview")
    //                 .attr("src", e.target.result)
    //                 .removeClass("d-none");

    //             this.find("#image-placeholder").addClass("d-none");
    //             this.find("#remove-image").removeClass("d-none");
    //         };
    //         reader.readAsDataURL(file);
    //     }); $(".image-upload-box");
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

      const reader = new FileReader();
      reader.onload = (e) => {
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
    /* ================= ADD PANEL MODEL ================= */
    // $("#add-more-panel-model").on("click", function () {
    //     const $wrapper = $("#panel-model-wrapper");
    //     const $lastPanel = $wrapper.find(".panel-utama-model").last();
    //     const $newPanel = $lastPanel.clone(true, true);

    //     // reset semua input & select
    //     $newPanel.find("input").val("");
    //     $newPanel.find("select").prop("selectedIndex", 0);

    //     // reset image preview (jika ada)
    //     $newPanel.find("img").attr("src", "").addClass("d-none");
    //     $newPanel.find(".image-placeholder").removeClass("d-none");

    //     // pastikan jarak antar panel
    //     if (!$newPanel.hasClass("mb-4")) {
    //         $newPanel.addClass("mb-4");
    //     }

    //     $wrapper.append($newPanel);

    //     // auto scroll ke panel baru
    //     $("html, body").animate(
    //         {
    //             scrollTop: $newPanel.offset().top - 100,
    //         },
    //         300
    //     );
    // });
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

        // ambil panel index TERBARU
        const panelIndex = $newPanel.data("panel-index");

        //  SINKRONKAN STATE
        window.uploadState.imageProductModelMeasure.push({
            file: null,
            imageId: null,
            panelKe: panelIndex,
        });

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