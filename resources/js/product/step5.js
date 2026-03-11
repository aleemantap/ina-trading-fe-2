import $ from "jquery";
import {
    apiGet,
    apiPost,
    apiUploadFile,
    // uploadedFileEligible,
} from "@/helpers/apiService";

import api from "@/helpers/api";


export default function Step5() {

    function initEditStep5(product) {
        const  fileId =product.fileId 
        const  isEligibleToExport = product.isEligibleToExport


        const yesRadio = document.getElementById("eligible_yes");
        const noRadio = document.getElementById("eligible_no");
        const uploadSection = document.getElementById("upload-section");
        const fileList = document.getElementById("file-list");

        // Set Radio
        if (isEligibleToExport) {
            yesRadio.checked = true;
            uploadSection.style.display = "block";
        } else {
            noRadio.checked = true;
            uploadSection.style.display = "none";
        }
        // 2 Tampilkan Nama File (hanya 1 file)
        if (fileId && isEligibleToExport) {
            // ambil nama file saja
            const fileName = fileId.split("/").pop();

            fileList.innerHTML = `
        <li class="d-flex align-items-center gap-2">
            <span>${fileName}</span>
            <button type="button" 
                    id="remove-file" 
                    class="btn btn-sm btn-danger">
                Remove
            </button>
        </li>
    `;

            // event remove
            const removeBtn = document.getElementById("remove-file");
            removeBtn.addEventListener("click", function () {
                fileList.innerHTML = "";
                document.getElementById("export-upload").value = "";
            });
        }

        // Toggle ketika user klik radio
        document.querySelectorAll('input[name="eligible"]').forEach((radio) => {
            radio.addEventListener("change", function () {
                const show = this.value === "1";
                uploadSection.style.display = show ? "block" : "none";

                if (!show) {
                    fileList.innerHTML = "";
                    document.getElementById("export-upload").value = "";
                }
            });
        });


    }

    const appData = window.APP_DATA || {};
    if (appData.mode === "edit" && appData.product) {
         initEditStep5(appData.product);
    }


    function toggleUploadSection() {
        const eligible = $('input[name="eligible"]:checked').val();
        if (eligible === "1") {
            $("#upload-section").show();
        } else {
            $("#upload-section").hide();
        }
    }

    //  jalan saat halaman pertama kali load
    toggleUploadSection();

    //  jalan saat radio berubah
    $('input[name="eligible"]').on("change", function () {
        toggleUploadSection();
    });

    /* ================= ELIGIBLE TO EXPORT ================= */
    $('input[name="eligible"]').on("change", function () {
        if ($(this).val() === "1") {
            $("#upload-section").show();
        } else {
            $("#upload-section").hide();
        }
    });

    /* ================= FILE UPLOAD UI ================= */
    $("#btn-upload").on("click", function () {
        $("#export-upload").click();
    });

    /*$("#export-upload").on("change",  function () {
       
          const key = $(this).data("upload");
          const file = this.files[0];
          if (!file) return;

           // reset tampilan
           $("#file-list").empty();

           if (!file) return;

           window.uploadState[key].file = file;
           window.uploadState[key].fileId = null;
       
            // tampilkan di UI
            const li = `
            <li class="d-flex justify-content-between align-items-center
                    border rounded px-2 py-1 mb-1 small">
                <span class="text-truncate">📎 ${file.name}</span>
                <button type="button" data-upload="`+key+`"
                    class="btn btn-sm btn-link text-danger btn-remove-file-export">
                    ✖
                </button>
            </li>
            `;

              $("#file-list").append(li);
          

           // reset input supaya bisa upload file sama lagi
           $(this).val("");
    });*/

    // $("#export-upload").on("change", function () {
    //     const key = $(this).data("upload");
    //     const files = this.files;

    //     if (!files.length) return;

    //     // pastikan array ada
    //     if (!window.uploadState[key].files) {
    //         window.uploadState[key].files = [];
    //     }

    //     for (let i = 0; i < files.length; i++) {
    //         const file = files[i];

    //         window.uploadState[key].files.push({
    //             file: file,
    //             fileId: null,
    //         });

    //         const li = `
    //     <li class="d-flex justify-content-between align-items-center
    //             border rounded px-2 py-1 mb-1 small">
    //         <span class="text-truncate">📎 ${file.name}</span>
    //         <button type="button"
    //             data-index="${window.uploadState[key].files.length - 1}"
    //             data-upload="${key}"
    //             class="btn btn-sm btn-link text-danger btn-remove-file-export">
    //             ✖
    //         </button>
    //     </li>
    //     `;

    //         $("#file-list").append(li);
    //     }

    //     // reset supaya bisa upload file yang sama lagi
    //     $(this).val("");
    // });

    $("#export-upload").on("change", function () {
        const files = this.files;
        if (!files.length) return;

        // pastikan array ada
        if (!window.uploadState.productFiles) {
            window.uploadState.productFiles = [];
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            window.uploadState.productFiles.push({
                file: file,
                fileId: null,
            });

            const index = window.uploadState.productFiles.length - 1;

            const li = `
        <li class="d-flex justify-content-between align-items-center
                border rounded px-2 py-1 mb-1 small">
            <span class="text-truncate">📎 ${file.name}</span>
            <button type="button"
                data-index="${index}"
                class="btn btn-sm btn-link text-danger btn-remove-file-export">
                ✖
            </button>
        </li>
        `;

            $("#file-list").append(li);
        }

        // reset supaya bisa upload file yang sama lagi
        $(this).val("");
    });


    // $(document).on("click", ".btn-remove-file-export", function () {
    //     const key = $(this).data("upload");
    //     // console.log("key=", window.uploadState[key]);
    //     window.uploadState[key].file = null;
    //     window.uploadState[key].fileId = null;
    //     // console.log("key=", window.uploadState[key]);
    //     // $(`#file-list-${key}`).empty();
    //     $(`#file-list`).empty();
    // });

    $(document).on("click", ".btn-remove-file-export", function () {
        const index = $(this).data("index");

        window.uploadState.productFiles.splice(index, 1);

        $(this).closest("li").remove();
    });



   

     $(document).on("click", "#submitBtn", async function () {
         const $btn = $(this);
         const originalHtml = $btn.html();

         // ===== tampilkan loading =====
         $btn.prop("disabled", true);
         $btn.html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        `);

         let subCategory = $("#subCategory").val();
         let productName = $("#productName").val();
         let description = $("#productDesc").val();
         let isPre = $('input[name="preOrder"]:checked').val(); //isPreOrder
         var isPreOrder = isPre === "1";
         let preOrderDay = $("#preOrderDays").val(); //preOrderDays
         let isN = $('input[name="brand_new"]:checked').val(); //isNewBRand
         var isNew = isN === "1";
         //preOrderDay
         let keywords = [];
         $('input[name="keywords[]"]').each(function () {
             const val = $(this).val().trim();
             if (val !== "") {
                 keywords.push(val);
             }
         });

         let productKeyWords = keywords || [];

         let productF = [];
         $('input[name="features[]"]').each(function () {
             const val = $(this).val().trim();
             if (val !== "") {
                 productF.push(val);
             }
         });

         let productFeatures = productF || [];

         // general information /
         let Brand = $("#Brand").val();
         let Manufacturer = $("#Manufacturer").val();
         let Color = $("#Color").val();
         let Material = $("#Material").val();
         // categori information /
         let CableLength = $("#CableLength").val();
         let Voltage = $("#Voltage").val();
         let DataTransferRate = $("#DataTransferRate").val();
         let DisplaSize = $("#DisplaSize").val();
         // complience information /
         let safetyWarning = $("#safetyWarning").val();
         let countryOfOrigin = $("#countryOfOrigin").val();
         let dangerous_goods = $('input[name="dangerous_goods"]:checked').val(); //dangerous_goods
         var isDangerousGoodRegulation = dangerous_goods === "1";
         let complianceInformation_fileId = "";
         let Warantytype = $("#Warantytype").val();
         let WarantyDuration = $("#WarantyDuration").val();
         let durationType = $("#durationType").val();

         let isEligibleToE = $('input[name="eligible"]:checked').val(); //isEligibleToExport
         var isEligibleToExport = isEligibleToE === "1";

         const payload = {
             subCategory: {
                 id: subCategory,
             },
             name: productName || "test",
             description: description || "description",
             isPreOrder: isPreOrder,
             preOrderDay: preOrderDay,
             isNew: isNew,
             isEligibleToExport: isEligibleToExport,
             fileId: null,
             imageId: null,
             state: "PUBLISHED",

             productKeyWords: productKeyWords,
             productFeatures: productFeatures,
             productImages: [],
             // productModels: [],
             productInformations: [
                 {
                     paramName: "Brand",
                     paramValue: Brand,
                 },
                 {
                     paramName: "Manufacturer",
                     paramValue: Manufacturer,
                 },
                 {
                     paramName: "Color",
                     paramValue: Color,
                 },
                 {
                     paramName: "Material",
                     paramValue: Material,
                 },
             ],
             categoryInformations: [
                 {
                     paramName: "Cable Length",
                     paramValue: CableLength,
                 },
                 {
                     paramName: "Voltage",
                     paramValue: Voltage,
                 },
                 {
                     paramName: "Data Transfer rate",
                     paramValue: DataTransferRate,
                 },
                 {
                     paramName: "Display Size",
                     paramValue: DisplaSize,
                 },
             ],
             complianceInformation: {
                 safetyWarning: safetyWarning,
                 countryOfOrigin: countryOfOrigin,
                 isDangerousGoodRegulation: isDangerousGoodRegulation,
                 fileId: complianceInformation_fileId,
             },
             warrantyInformation: {
                 type: Warantytype,
                 duration: WarantyDuration,
                 durationType: durationType,
             },
             productFiles: [],
         };

         const payload2 = {
             productModels: [],
         };

         var gh = $("#panel-model-wrapper")
             .find(".panel-utama-model")
             .each(function () {
                 var panelToggleContent = $(this);

                 var waya = panelToggleContent.find(".panel-toggle-content");
                 waya.each(function () {
                     var measureYes = $(this)
                         .find(".measureYes")
                         .is(":checked");
                     var measureNo = $(this).find(".measureNo").is(":checked");

                     let name = $(this).find(".ModelName").val();
                     let sku = $(this).find(".Sku").val();

                     let price = $(this).find(".Price").val();
                     let currency = $(this).find(".Currency").val();
                     let weight = $(this).find(".Weight").val();
                     let weightType = $(this).find(".WeightType").val();
                     let length = $(this).find(".DimensionsL").val();
                     let width = $(this).find(".DimensionsW").val();
                     let height = $(this).find(".DimensionsH").val();
                     let dimensionType = $(this).find(".DimensionType").val();

                     var isConfigurePromotionPriceU = $(this)
                         .find(".promoYes")
                         .is(":checked");
                     let promotionPrice = $(this).find(".promotionPrice").val();
                     let promotionStartDate = $(this)
                         .find(".promotionStartDate")
                         .val();

                     let promotionEndDate = $(this)
                         .find(".promotionEndDate")
                         .val();
                     let packagingWeight = $(this)
                         .find(".packagingWeight")
                         .val();
                     let packagingWeightType = $(this)
                         .find(".packagingWeightType")
                         .val();
                     let packagingLength = $(this)
                         .find(".packagingLength")
                         .val();
                     let packagingWidth = $(this).find(".packagingWidth").val();
                     let packagingHeight = $(this)
                         .find(".packagingHeight")
                         .val();
                     let packagingDimensionType = $(this)
                         .find(".packagingDimensionType")
                         .val();
                     var obj = {
                         name: name,
                         price: Number(price),
                         currency: currency,
                         weight: Number(weight),
                         weightType: weightType,
                         length: Number(length),
                         width: Number(width),
                         height: Number(height),
                         dimensionType: dimensionType,
                         isMeasurement: measureYes,
                         imageId: null,
                         sku: sku,
                         isConfigurePromotionPrice: isConfigurePromotionPriceU,
                         promotionPrice: Number(promotionPrice),
                         promotionCurrency: $(this)
                             .find(".promotionCurrency")
                             .val(),
                         promotionStartDate: promotionStartDate,
                         promotionEndDate: promotionEndDate,
                         packagingWeight: Number(packagingWeight),
                         packagingWeightType: packagingWeightType,
                         packagingLength: Number(packagingLength),
                         packagingWidth: Number(packagingWidth),
                         packagingHeight: Number(packagingHeight),
                         packagingDimensionType: packagingDimensionType,
                         warehouses: [],
                         productMeasurements: [],
                     };

                     let warehouserow = $(this)
                         .find(".warehouse-row")
                         .each(function () {
                             let obw = {
                                 id: null,
                                 stock: null,
                             };

                             let id = $(this).find(".warehouses").val();
                             let st = $(this).find(".stock").val();
                             if (id !== "") {
                                 obw.id = id;
                             }

                             if (st !== "") {
                                 obw.stock = Number(st);
                             }
                             obj.warehouses.push(obw);
                         });

                     //looping container measurement
                     if (measureYes) {
                         let panelmeasurement = $(this)
                             .find(".panel-measurement")
                             .each(function () {
                                 let pm = {
                                     price: Number(
                                         $(this).find(".Price").val(),
                                     ),
                                     currency: $(this).find(".Currency").val(),
                                     weight: Number(
                                         $(this).find(".Weight").val(),
                                     ),
                                     weightType: $(this)
                                         .find(".WeightType")
                                         .val(),
                                     length: Number(
                                         $(this).find(".DimensionsL").val(),
                                     ),
                                     width: Number(
                                         $(this).find(".DimensionsW").val(),
                                     ),
                                     height: Number(
                                         $(this).find(".DimensionsH").val(),
                                     ),
                                     dimensionType: $(this)
                                         .find(".DimensionType")
                                         .val(),
                                     measurementType: $(this)
                                         .find(".MeasurementName")
                                         .val(),
                                     measurementValue: $(this)
                                         .find(".MeasurementCountingUnit")
                                         .val(),
                                     isConfigurePromotionPrice: $(this)
                                         .find(".promoYes")
                                         .is(":checked"),
                                     promotionPrice: Number(
                                         $(this).find(".promotionPrice").val(),
                                     ),
                                     promotionCurrency: $(this)
                                         .find(".promotionCurrency")
                                         .val(),
                                     promotionStartDate: $(this)
                                         .find(".promotionStartDate")
                                         .val(),
                                     promotionEndDate: $(this)
                                         .find(".promotionStartDate")
                                         .val(),
                                     packagingWeight: Number(
                                         $(this).find(".packagingWeight").val(),
                                     ),
                                     packagingWeightType: $(this)
                                         .find(".packagingWeightType")
                                         .val(),
                                     packagingLength: Number(
                                         $(this).find(".packagingLength").val(),
                                     ),
                                     packagingWidth: Number(
                                         $(this).find(".packagingWidth").val(),
                                     ),
                                     packagingHeight: Number(
                                         $(this).find(".packagingHeight").val(),
                                     ),
                                     packagingDimensionType: $(this)
                                         .find(".packagingDimensionType")
                                         .val(),
                                     warehouses: [],
                                 };
                                 let warehouserow = $(this)
                                     .find(".warehouse-row")
                                     .each(function () {
                                         let obw = {
                                             id: null,
                                             stock: null,
                                         };

                                         let id = $(this)
                                             .find(".warehouses")
                                             .val();
                                         let st = $(this).find(".stock").val();
                                         if (id !== "") {
                                             obw.id = id;
                                         }

                                         if (st !== "") {
                                             obw.stock = st;
                                         }
                                         pm.warehouses.push(obw);
                                     });

                                 obj.productMeasurements.push(pm);
                             });
                     }
                     payload2.productModels.push(obj);
                 });
             });

         Object.assign(payload, payload2);

         // console.log("payload-", payload);

         try {
             const uploadTasks = [];

             // 1️ Kumpulkan task upload
             for (const [key, item] of Object.entries(window.uploadState)) {
                 if (!item?.file || item.fileId) continue;

                 uploadTasks.push({
                     key,
                     file: item.file,
                 });
             }
             //console.log(uploadTasks);

             // 2 Upload paralel
             if (uploadTasks.length > 0) {
                 const uploadResults = await Promise.all(
                     uploadTasks.map((task) => apiUploadFile(task.file)),
                 );

                 // 3 Mapping hasil upload ke payload
                 uploadResults.forEach((res, index) => {
                     const { key } = uploadTasks[index];

                     if (res.responseCode !== "0000") {
                         throw new Error(`Upload gagal (${key})`);
                     }

                     if (key === "exportDocEligible") {
                         payload.fileId = res.data.fileId;
                     }

                     if (key === "documentRegulation") {
                         payload.complianceInformation.fileId = res.data.fileId;
                     }
                 });
             }

             if (window.uploadState.primaryProductImages.length > 0) {
                 const uploadPrimaryImages =
                     window.uploadState.primaryProductImages.map((item) =>
                         apiUploadFile(item.file),
                     );

                 const imageResults = await Promise.all(uploadPrimaryImages);

                 imageResults.forEach((res, index) => {
                     if (res.responseCode !== "0000") {
                         throw new Error("Upload image gagal");
                     }

                     payload.productImages.push({
                         imageId: res.data.fileId,
                         sequence:
                             window.uploadState.primaryProductImages[index]
                                 .sequence,
                     });
                 });
             }

             if (window.uploadState["imageProductModelMeasure"].length > 0) {
                 let imageModelMeasur =
                     window.uploadState["imageProductModelMeasure"];
                 const uploadPromises = imageModelMeasur.map((item) =>
                     apiUploadFile(item.file),
                 );
                 const results = await Promise.all(uploadPromises);
                 results.forEach((res, index) => {
                     if (res.responseCode !== "0000") {
                         throw new Error("Upload gagal");
                     }
                     payload.productModels[index].imageId = res.data.fileId;
                 });
             }

             if (window.uploadState.productFiles.length > 0) {
                 const uploadPromises = window.uploadState.productFiles.map(
                     (item) => apiUploadFile(item.file),
                 );

                 const results = await Promise.all(uploadPromises);

                 payload.productFiles = results.map((res) => {
                     if (res.responseCode !== "0000") {
                         throw new Error("Upload gagal");
                     }

                     return res.data.fileId;
                 });
             }

             payload.preOrderDay = payload.isPreOrder
                 ? Number(payload.preOrderDay)
                 : null;
             payload.warrantyInformation.duration = Number(
                 payload.warrantyInformation.duration,
             );

             // console.log("payload", payload);
             //appData.id (appData.mode == "edit")
             // console.log("payload=", payload);

             // if (appData.mode == "edit") {
             //      const res = await api.put(
             //          `/product/draft/${appData.id}`,
             //          payload,
             //          {
             //              timeout: 60000,
             //          },
             //      );
             //       if (res.responseCode !== "0000") {
             //           alert("Submit gagal");
             //           return;
             //       }
             //       alert("Save to Draft berhasil");
             //       $("#stepForm")[0].reset();
             //       window.location.href = "/post-product";
             // }
             // else
             // {
             const res = await api.post("/product", payload, {
                 timeout: 60000,
             });
             if (res.responseCode !== "0000") {
                 alert("Submit gagal");
                 return;
             }
             alert("Save to Draft berhasil");
             $("#stepForm")[0].reset();
             window.location.href = "/post-product";
             // }
         } catch (e) {
             console.error(e);
             console.log(e.responseDesc);
             alert(
                 "Terjadi kesalahan :",
                 e.responseCode,
                 "-Silahkan Ulangi lagi",
             );
             window.location.href = "/post-product";
         } finally {
             // ===== kembalikan tombol =====
             $btn.prop("disabled", false);
             $btn.html(originalHtml);
         }
     });
  

    $(document).on("click", "#saveToDraft", async function () {
         const $btn = $(this);
         const originalHtml = $btn.html();

         // ===== tampilkan loading =====
         $btn.prop("disabled", true);
         $btn.html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        `);

         let subCategory = $("#subCategory").val();
         let productName = $("#productName").val();
         let description = $("#productDesc").val();
         let isPre = $('input[name="preOrder"]:checked').val(); //isPreOrder
         var isPreOrder = isPre === "1";
         let preOrderDay = $("#preOrderDays").val(); //preOrderDays
         let isN = $('input[name="brand_new"]:checked').val(); //isNewBRand
         var isNew = isN === "1";
         //preOrderDay
         let keywords = [];
         $('input[name="keywords[]"]').each(function () {
             const val = $(this).val().trim();
             if (val !== "") {
                 keywords.push(val);
             }
         });

         let productKeyWords = keywords || [];

         let productF = [];
         $('input[name="features[]"]').each(function () {
             const val = $(this).val().trim();
             if (val !== "") {
                 productF.push(val);
             }
         });

         let productFeatures = productF || [];

         // general information /
         let Brand = $("#Brand").val();
         let Manufacturer = $("#Manufacturer").val();
         let Color = $("#Color").val();
         let Material = $("#Material").val();
         // categori information /
         let CableLength = $("#CableLength").val();
         let Voltage = $("#Voltage").val();
         let DataTransferRate = $("#DataTransferRate").val();
         let DisplaSize = $("#DisplaSize").val();
         // complience information /
         let safetyWarning = $("#safetyWarning").val();
         let countryOfOrigin = $("#countryOfOrigin").val();
         let dangerous_goods = $('input[name="dangerous_goods"]:checked').val(); //dangerous_goods
         var isDangerousGoodRegulation = dangerous_goods === "1";
         let complianceInformation_fileId = "";
         let Warantytype = $("#Warantytype").val();
         let WarantyDuration = $("#WarantyDuration").val();
         let durationType = $("#durationType").val();

         let isEligibleToE = $('input[name="eligible"]:checked').val(); //isEligibleToExport
         var isEligibleToExport = isEligibleToE === "1";

         const payload = {
             subCategory: {
                 id: subCategory,
             },
             name: productName || "test",
             description: description || "description",
             isPreOrder: isPreOrder,
             preOrderDay: preOrderDay,
             isNew: isNew,
             isEligibleToExport: isEligibleToExport,
             fileId: null,
             imageId: null,
             state: "DRAFT",

             productKeyWords: productKeyWords,
             productFeatures: productFeatures,
             productImages: [],
             // productModels: [],
             productInformations: [
                 {
                     paramName: "Brand",
                     paramValue: Brand,
                 },
                 {
                     paramName: "Manufacturer",
                     paramValue: Manufacturer,
                 },
                 {
                     paramName: "Color",
                     paramValue: Color,
                 },
                 {
                     paramName: "Material",
                     paramValue: Material,
                 },
             ],
             categoryInformations: [
                 {
                     paramName: "Cable Length",
                     paramValue: CableLength,
                 },
                 {
                     paramName: "Voltage",
                     paramValue: Voltage,
                 },
                 {
                     paramName: "Data Transfer rate",
                     paramValue: DataTransferRate,
                 },
                 {
                     paramName: "Display Size",
                     paramValue: DisplaSize,
                 },
             ],
             complianceInformation: {
                 safetyWarning: safetyWarning,
                 countryOfOrigin: countryOfOrigin,
                 isDangerousGoodRegulation: isDangerousGoodRegulation,
                 fileId: complianceInformation_fileId,
             },
             warrantyInformation: {
                 type: Warantytype,
                 duration: WarantyDuration,
                 durationType: durationType,
             },
             productFiles : []
         };

         const payload2 = {
             productModels: [],
         };

         var gh = $("#panel-model-wrapper")
             .find(".panel-utama-model")
             .each(function () {
                 var panelToggleContent = $(this);

                 var waya = panelToggleContent.find(".panel-toggle-content");
                 waya.each(function () {
                     var measureYes = $(this)
                         .find(".measureYes")
                         .is(":checked");
                     var measureNo = $(this).find(".measureNo").is(":checked");

                     let name = $(this).find(".ModelName").val();
                     let sku = $(this).find(".Sku").val();

                     let price = $(this).find(".Price").val();
                     let currency = $(this).find(".Currency").val();
                     let weight = $(this).find(".Weight").val();
                     let weightType = $(this).find(".WeightType").val();
                     let length = $(this).find(".DimensionsL").val();
                     let width = $(this).find(".DimensionsW").val();
                     let height = $(this).find(".DimensionsH").val();
                     let dimensionType = $(this).find(".DimensionType").val();

                     var isConfigurePromotionPriceU = $(this)
                         .find(".promoYes")
                         .is(":checked");
                     let promotionPrice = $(this).find(".promotionPrice").val();
                     let promotionStartDate = $(this)
                         .find(".promotionStartDate")
                         .val();

                     let promotionEndDate = $(this)
                         .find(".promotionEndDate")
                         .val();
                     let packagingWeight = $(this)
                         .find(".packagingWeight")
                         .val();
                     let packagingWeightType = $(this)
                         .find(".packagingWeightType")
                         .val();
                     let packagingLength = $(this)
                         .find(".packagingLength")
                         .val();
                     let packagingWidth = $(this).find(".packagingWidth").val();
                     let packagingHeight = $(this)
                         .find(".packagingHeight")
                         .val();
                     let packagingDimensionType = $(this)
                         .find(".packagingDimensionType")
                         .val();
                     var obj = {
                         name: name,
                         price: Number(price),
                         currency: currency,
                         weight: Number(weight),
                         weightType: weightType,
                         length: Number(length),
                         width: Number(width),
                         height: Number(height),
                         dimensionType: dimensionType,
                         isMeasurement: measureYes,
                         imageId: null,
                         sku: sku,
                         isConfigurePromotionPrice: isConfigurePromotionPriceU,
                         promotionPrice: Number(promotionPrice),
                         promotionCurrency: $(this)
                             .find(".promotionCurrency")
                             .val(),
                         promotionStartDate: promotionStartDate,
                         promotionEndDate: promotionEndDate,
                         packagingWeight: Number(packagingWeight),
                         packagingWeightType: packagingWeightType,
                         packagingLength: Number(packagingLength),
                         packagingWidth: Number(packagingWidth),
                         packagingHeight: Number(packagingHeight),
                         packagingDimensionType: packagingDimensionType,
                         warehouses: [],
                         productMeasurements: [],
                     };

                     let warehouserow = $(this)
                         .find(".warehouse-row")
                         .each(function () {
                             let obw = {
                                 id: null,
                                 stock: null,
                             };

                             let id = $(this).find(".warehouses").val();
                             let st = $(this).find(".stock").val();
                             if (id !== "") {
                                 obw.id = id;
                             }

                             if (st !== "") {
                                 obw.stock = Number(st);
                             }
                             obj.warehouses.push(obw);
                         });

                     //looping container measurement
                     if (measureYes) {
                         let panelmeasurement = $(this)
                             .find(".panel-measurement")
                             .each(function () {
                                 let pm = {
                                     price: Number(
                                         $(this).find(".Price").val(),
                                     ),
                                     currency: $(this).find(".Currency").val(),
                                     weight: Number(
                                         $(this).find(".Weight").val(),
                                     ),
                                     weightType: $(this)
                                         .find(".WeightType")
                                         .val(),
                                     length: Number(
                                         $(this).find(".DimensionsL").val(),
                                     ),
                                     width: Number(
                                         $(this).find(".DimensionsW").val(),
                                     ),
                                     height: Number(
                                         $(this).find(".DimensionsH").val(),
                                     ),
                                     dimensionType: $(this)
                                         .find(".DimensionType")
                                         .val(),
                                     measurementType: $(this)
                                         .find(".MeasurementName")
                                         .val(),
                                     measurementValue: $(this)
                                         .find(".MeasurementCountingUnit")
                                         .val(),
                                     isConfigurePromotionPrice: $(this)
                                         .find(".promoYes")
                                         .is(":checked"),
                                     promotionPrice: Number(
                                         $(this).find(".promotionPrice").val(),
                                     ),
                                     promotionCurrency: $(this)
                                         .find(".promotionCurrency")
                                         .val(),
                                     promotionStartDate: $(this)
                                         .find(".promotionStartDate")
                                         .val(),
                                     promotionEndDate: $(this)
                                         .find(".promotionStartDate")
                                         .val(),
                                     packagingWeight: Number(
                                         $(this).find(".packagingWeight").val(),
                                     ),
                                     packagingWeightType: $(this)
                                         .find(".packagingWeightType")
                                         .val(),
                                     packagingLength: Number(
                                         $(this).find(".packagingLength").val(),
                                     ),
                                     packagingWidth: Number(
                                         $(this).find(".packagingWidth").val(),
                                     ),
                                     packagingHeight: Number(
                                         $(this).find(".packagingHeight").val(),
                                     ),
                                     packagingDimensionType: $(this)
                                         .find(".packagingDimensionType")
                                         .val(),
                                     warehouses: [],
                                 };
                                 let warehouserow = $(this)
                                     .find(".warehouse-row")
                                     .each(function () {
                                         let obw = {
                                             id: null,
                                             stock: null,
                                         };

                                         let id = $(this)
                                             .find(".warehouses")
                                             .val();
                                         let st = $(this).find(".stock").val();
                                         if (id !== "") {
                                             obw.id = id;
                                         }

                                         if (st !== "") {
                                             obw.stock = st;
                                         }
                                         pm.warehouses.push(obw);
                                     });

                                 obj.productMeasurements.push(pm);
                             });
                     }
                     payload2.productModels.push(obj);
                 });
             });

         Object.assign(payload, payload2);

         // console.log("payload-", payload);

       
         try {
             const uploadTasks = [];

             // 1️ Kumpulkan task upload
             for (const [key, item] of Object.entries(window.uploadState)) {
                 if (!item?.file || item.fileId) continue;

                 uploadTasks.push({
                     key,
                     file: item.file,
                 });
             }
             //console.log(uploadTasks);

             // 2 Upload paralel
             if (uploadTasks.length > 0) {
                 const uploadResults = await Promise.all(
                     uploadTasks.map((task) => apiUploadFile(task.file)),
                 );

                 // 3 Mapping hasil upload ke payload
                 uploadResults.forEach((res, index) => {
                     const { key } = uploadTasks[index];

                     if (res.responseCode !== "0000") {
                         throw new Error(`Upload gagal (${key})`);
                     }

                     if (key === "exportDocEligible") {
                         payload.fileId = res.data.fileId;
                     }

                     if (key === "documentRegulation") {
                         payload.complianceInformation.fileId = res.data.fileId;
                     }
                 });
             }

             if (window.uploadState.primaryProductImages.length > 0) {
                 const uploadPrimaryImages =
                     window.uploadState.primaryProductImages.map((item) =>
                         apiUploadFile(item.file),
                     );

                 const imageResults = await Promise.all(uploadPrimaryImages);

                 imageResults.forEach((res, index) => {
                     if (res.responseCode !== "0000") {
                         throw new Error("Upload image gagal");
                     }

                     payload.productImages.push({
                         imageId: res.data.fileId,
                         sequence:
                             window.uploadState.primaryProductImages[index]
                                 .sequence,
                     });
                 });
             }

             if (window.uploadState["imageProductModelMeasure"].length > 0) {
                 let imageModelMeasur =
                     window.uploadState["imageProductModelMeasure"];
                 const uploadPromises = imageModelMeasur.map((item) =>
                     apiUploadFile(item.file),
                 );
                 const results = await Promise.all(uploadPromises);
                 results.forEach((res, index) => {
                     if (res.responseCode !== "0000") {
                         throw new Error("Upload gagal");
                     }
                     payload.productModels[index].imageId = res.data.fileId;
                 });
             }


            if (window.uploadState.productFiles.length > 0) {
                const uploadPromises = window.uploadState.productFiles.map(
                    (item) => apiUploadFile(item.file),
                );

                const results = await Promise.all(uploadPromises);

                payload.productFiles = results.map((res) => {
                    if (res.responseCode !== "0000") {
                        throw new Error("Upload gagal");
                    }

                    return res.data.fileId;
                });
            }

             payload.preOrderDay = payload.isPreOrder
                 ? Number(payload.preOrderDay)
                 : null;
             payload.warrantyInformation.duration = Number(
                 payload.warrantyInformation.duration,
             );

            // console.log("payload", payload);
            //appData.id (appData.mode == "edit")
            // console.log("payload=", payload);

            // if (appData.mode == "edit") {
            //      const res = await api.put(
            //          `/product/draft/${appData.id}`,
            //          payload,
            //          {
            //              timeout: 60000,
            //          },
            //      );
            //       if (res.responseCode !== "0000") {
            //           alert("Submit gagal");
            //           return;
            //       }
            //       alert("Save to Draft berhasil");
            //       $("#stepForm")[0].reset();
            //       window.location.href = "/post-product";
            // }
            // else
            // {
                 const res = await api.post("/product", payload, {
                     timeout: 60000,
                 });
                  if (res.responseCode !== "0000") {
                      alert("Submit gagal");
                      return;
                  }
                  alert("Save to Draft berhasil");
                  $("#stepForm")[0].reset();
                  window.location.href = "/post-product";
            // }
           
            
         } catch (e) {
            console.error(e);
            console.log(e.responseDesc)
            alert("Terjadi kesalahan :", e.responseCode,"-Silahkan Ulangi lagi");
            window.location.href = "/post-product";
         } finally {
             // ===== kembalikan tombol =====
             $btn.prop("disabled", false);
             $btn.html(originalHtml);
         }
     });
  
}
 
