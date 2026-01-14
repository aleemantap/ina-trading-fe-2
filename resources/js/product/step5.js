import $ from "jquery";
import {
    apiGet,
    apiPost,
    apiUploadFile,
    // uploadedFileEligible,
} from "@/helpers/apiService";

import api from "@/helpers/api";


export default function Step5() {
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

  
   

    // $("#export-upload").on("change", async function () {
    //     const file = this.files[0];
    //     if (!file) return;

    //     // reset tampilan
    //     $("#file-list").empty();

    //     try {
    //         // HIT API UPLOAD
    //         const res = await apiUploadFile(file);

    //         if (res.responseCode !== "0000") {
    //             alert("Upload gagal");
    //             return;
    //         }

    //         //  SIMPAN FILE ID (STATE)
    //         window.uploadStateEligible.fileId = res.data.fileId;

    //         console.log("FILE ID:", window.uploadStateEligible.fileId);

    //         // tampilkan di UI
    //         const li = `
    //         <li class="d-flex justify-content-between align-items-center
    //                    border rounded px-2 py-1 mb-1 small">
    //             <span class="text-truncate">📎 ${file.name}</span>
    //             <button type="button"
    //                 class="btn btn-sm btn-link text-danger btn-remove-file">
    //                 ✖
    //             </button>
    //         </li>
    //     `;

    //         $("#file-list").append(li);
    //     } catch (err) {
    //         console.error(err);
    //         alert("Gagal upload file");
    //     }

    //     // reset input supaya bisa upload file sama lagi
    //     $(this).val("");
    // });

    // $("[data-upload]").on("change", function () {
    //     const key = $(this).data("upload");
    //     const file = this.files[0];
    //     if (!file) return;

    //     window.uploadState[key].file = file;
    //     window.uploadState[key].fileId = null;

    //     $(`#file-list-${key}`).html(`
    //     <li class="d-flex justify-content-between align-items-center
    //                border rounded px-2 py-1 mb-1 small">
    //         <span class="text-truncate">📎 ${file.name}</span>
    //         <button type="button"
    //             class="btn btn-sm btn-link text-danger btn-remove-file"
    //             data-upload="${key}">
    //             ✖
    //         </button>
    //     </li>
    // `);

    //     this.value = "";
    // });

      $("#export-upload").on("change",  function () {

          const key = $(this).data("upload");
          const file = this.files[0];
          if (!file) return;

           // reset tampilan
           $("#file-list").empty();

           if (!file) return;

           window.uploadState[key].file = file;
           window.uploadState[key].fileId = null;
        //     console.log("key=", key);
        //       console.log("file=", file);
        //    console.log("tew=", window.uploadState[key].file);
        
             
         

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
    });


    $(document).on("click", ".btn-remove-file-export", function () {
        const key = $(this).data("upload");
        // console.log("key=", window.uploadState[key]);
        window.uploadState[key].file = null;
        window.uploadState[key].fileId = null;
        // console.log("key=", window.uploadState[key]);
        // $(`#file-list-${key}`).empty();
        $(`#file-list`).empty();
    });


    // $(document).on("click", ".btn-remove-file", function () {
    //     //  JANGAN HIT API
    //     window.uploadStateEligible.fileId = null;
    //     // hapus UI
    //     $("#file-list").empty();

    //     console.log("File dihapus dari state saja");
    // });


    // action save and post
    $(document).on("click", "#submitBtn_x", function () {
    
        let subCategory = $("#subCategory").val();
        let productName = $("#productName").val(); //product_name
        let description = $("#productDesc").val(); //description
        let isPre = $('input[name="preOrder"]:checked').val(); //isPreOrder
        var isPreOrder = isPre === "1";
        let preOrderDay = $("#preOrderDays").val(); //preOrderDays
        let isN = $('input[name="brand_new"]:checked').val(); //isNewBRand
        var isNew = isN === "1";
        let isEligibleToE = $('input[name="eligible"]:checked').val(); //isEligibleToExport
        var isEligibleToExport = isEligibleToE === "1";
        let fileId_model = window.uploadStateEligible.fileId; 
        // console.log(fileId_model);
        let keywords = [];
        $('input[name="keywords[]"]').each(function () {
            const val = $(this).val().trim();
            if (val !== "") {
                keywords.push(val);
            }
        });

        let productFeatures = [];
        $('input[name="features[]"]').each(function () {
            const val = $(this).val().trim();
            if (val !== "") {
                productFeatures.push(val);
            }
        });
        //productImages
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
        let complianceInformation_fileId = ""; //belum
        let Warantytype = $("#Warantytype").val();
        let WarantyDuration = $("#WarantyDuration").val();
        let durationType = $("#durationType").val();
        // console.log(productFeat ures);
        const payload = {
            subCategory: {
                id: subCategory,
            },
            name: productName,
            description: description,
            isPreOrder: isPreOrder,
            preOrderDay: isPreOrder ? Number(preOrderDay) : null,
            isNew: isNew,
            isEligibleToExport: isEligibleToExport,
            fileId: fileId_model,
            productKeyWords: keywords,
            productFeatures: productFeatures,
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
                duration: Number(WarantyDuration),
                durationType: durationType,
            },
        };
        
        // apiPost("/product", payload)
        //     .then((res) => {})
        //     .catch(() => {});
    });


    //nge-tess ======================================
    
    $(document).on("click", "#submitBtn_tes", function () {
        // const payload2 = {
        //      productModels: [],
        // };


        //     var te = $("#panel-model-wrapper")
        //     .find(".panel-toggle-content")
        //     .each(function(){
        //         var measureYes = $(this).find("#measureYes").is(":checked");
        //         var measureNo = $(this).find("#measureNo").is(":checked");

        //         let name = $(this).find("#ModelName").val();
        //         let sku = $(this).find("#Sku").val();
        //         // console.log("name",name)
        //         // console.log("sku",sku);
        //         let price = $(this).find("#Price").val();
        //         let currency = $(this).find("#Currency").val();
        //         let weight = $(this).find("#Weight").val();
        //         let weightType = $(this).find("#WeightType").val();
        //         let length = $(this).find("#DimensionsL").val();
        //         let width = $(this).find("#DimensionsW").val();
        //         let height = $(this).find("#DimensionsH").val();
        //         let dimensionType = $(this).find("#DimensionType").val();
        //         // let MeasurementName = $(this).find("#MeasurementName").val();
        //         // let MeasurementCountingUnit = $(this)
        //         //     .find("#MeasurementCountingUnit")
        //         //     .val();
        //         var isConfigurePromotionPrice = $(this)
        //             .find("#promoYes")
        //             .is(":checked");
        //         let promotionPrice = $(this).find("#promotionPrice").val();
        //         let promotionCurrency = $(this)
        //             .find("#promotionCurrency")
        //             .val();
        //         let promotionStartDate = $(this)
        //             .find("#promotionStartDate")
        //             .val();
        //         let promotionEndDate = $(this).find("#promotionEndDate").val();
        //         let packagingWeight = $(this).find("#packagingWeight").val();
        //         let packagingWeightType = $(this)
        //             .find("#packagingWeightType")
        //             .val();

        //         let packagingLength = $(this).find("#packagingLength").val();
        //         let packagingWidth = $(this).find("#packagingWidth").val();
        //         let packagingHeight = $(this).find("#packagingHeight").val();
        //         let packagingDimensionType = $(this)
        //             .find("#packagingDimensionType")
        //             .val();
        //         var obj = {
        //             name: name,
        //             sku: sku,
        //             price: price,
        //             currency: currency,
        //             weight: weight,
        //             weightType: weightType,
        //             length: length,
        //             width: width,
        //             height: height,
        //             dimensionType: dimensionType,
        //             isMeasurement: measureYes,
        //             imageId: null, //belum

        //             isConfigurePromotionPrice: isConfigurePromotionPrice,
        //             promotionPrice: promotionPrice,
        //             promotionCurrency: promotionCurrency,
        //             promotionStartDate: promotionStartDate, //tahun-bulan-tanggal
        //             promotionEndDate: promotionEndDate,
        //             packagingWeight: packagingWeight,
        //             packagingWeightType: packagingWeightType,
        //             packagingLength: packagingLength,
        //             packagingWidth: packagingWidth,
        //             packagingHeight: packagingHeight,
        //             packagingDimensionType: packagingDimensionType,
        //             warehouses: [],
        //             productMeasurements: [],
        //         };

        //         $("#warehouse-row")
        //             .find(".cnt-row-wrs")
        //             .each(function () {
        //                 let obw = {
        //                     id: null,
        //                     stock: null,
        //                 };

        //                 let id = $(this).find(".warehouses").val();
        //                 let st = $(this).find(".stock").val();
        //                 if (id !== "") {
        //                     obw.id = id;
        //                 }

        //                 if (st !== "") {
        //                     obw.stock = st;
        //                 }
        //                 payload2.productModels.warehouses.push(obw);
        //             });
                
        //         if (measureYes)
        //         {
        //             $("#measurement-wrapper")
        //             .find(".panel-measurement")
        //             .each(function () {
  


        //                 var ini = $(this);
        //                 let pm = {
        //                     price: $(this).find("#Price").val(),
        //                     currency: $(this).find("#Currency").val(),
        //                     weight: $(this).find("#Weight").val(),
        //                     weightType:  $(this).find("#WeightType").val(),
        //                     length: $(this).find("#DimensionsL").val(),
        //                     width: $(this).find("#DimensionsW").val(),
        //                     height:  $(this).find("#DimensionsH").val(),
        //                     dimensionType:  $(this).find("#DimensionType").val(),
        //                     measurementType: ini.find("#MeasurementName").val(),
        //                     measurementValue: ini
        //                         .find("#MeasurementCountingUnit")
        //                         .val(),
        //                     isConfigurePromotionPrice: $(this)
        //                     .find("#promoYes")
        //                     .is(":checked"),
        //                     promotionPrice: $(this).find("#promotionPrice").val(),
        //                     promotionCurrency:  $(this)
        //                                         .find("#promotionCurrency")
        //                                         .val(),
        //                     promotionStartDate: $(this)
        //                                         .find("#promotionStartDate")
        //                                         .val(),
        //                     promotionEndDate: $(this)
        //                                         .find("#promotionStartDate")
        //                                         .val(),
        //                     packagingWeight:  $(this).find("#packagingWeight").val(),
        //                     packagingWeightType: $(this)
        //                                         .find("#packagingWeightType")
        //                                         .val(),
        //                     packagingLength: $(this).find("#packagingLength").val(),
        //                     packagingWidth:  $(this).find("#packagingWidth").val(),
        //                     packagingHeight: $(this).find("#packagingHeight").val(),
        //                     packagingDimensionType: $(this)
        //                                             .find("#packagingDimensionType")
        //                                             .val(),
        //                     warehouses: [],
        //                 };
        //                 $(this).find("#warehouse-row")
        //                       .find(".cnt-row-wrs")
        //                       .each(function () {
        //                           let obw = {
        //                               id: null,
        //                               stock: null,
        //                           };

        //                           let id = $(this).find(".warehouses").val();
        //                           let st = $(this).find(".stock").val();
        //                           if (id !== "") {
        //                               obw.id = id;
        //                           }

        //                           if (st !== "") {
        //                               obw.stock = st;
        //                           }
        //                           pm.warehouses.push(obw);
        //                       });
        //                 //way
        //                 payload2.productModels.productMeasurements.push(pm);
        //             });
        //         }
        //         payload2.productModels.push(obj);
        //     });
        // console.log(payload2);
            
        // console.log("ss", te);
        let imageModelMeasur = window.uploadState["imageProductModelMeasure"];
        console.log(imageModelMeasur);
        for (const item of imageModelMeasur) {
             //console.log(item.file);
             // const res = await apiUploadFile(item.file);
             // if (res.responseCode !== "0000") {
             //     alert(`Upload gagal (${key})`);
             //     return;
             // }
             // payload.productModels.forEach((it, ind) => {
             //     if (it.imageId == item.panelKe) {
             //         payload.productModels[ind].imageId = res.data.fileId;
             //         // "contoh-data-gambar" + item.panelKe;
             //     }
             // });
         }

    }); 
    
}


// $("#submitBtn").on("click", async function () {
//     const $btn = $(this);
//     const originalHtml = $btn.html();

//     $btn.prop("disabled", true);
//     $btn.html(`
//             <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//         `);
//     });

$("#submitBtn___").on("click", async function () {
    const $btn = $(this);
    const originalHtml = $btn.html();
    // $btn.find(".btn-text").text("Processing...");
    // $btn.find(".btn-spinner").removeClass("d-none");
    // ===== tampilkan loading =====
    $btn.prop("disabled", true);
    $btn.html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        `);

    let subCategory = $("#subCategory").val();
    let productName = $("#productName").val(); //product_name
    let description = $("#productDesc").val(); //description
    let isPre = $('input[name="preOrder"]:checked').val(); //isPreOrder
    var isPreOrder = isPre === "1";
    let preOrderDay = $("#preOrderDays").val(); //preOrderDays
    let isN = $('input[name="brand_new"]:checked').val(); //isNewBRand
    var isNew = isN === "1";
    let isEligibleToE = $('input[name="eligible"]:checked').val(); //isEligibleToExport
    var isEligibleToExport = isEligibleToE === "1";
    let fileId_model = null;
    // console.log(fileId_model);
    let keywords = [];
    $('input[name="keywords[]"]').each(function () {
        const val = $(this).val().trim();
        if (val !== "") {
            keywords.push(val);
        }
    });

    let productFeatures = [];
    $('input[name="features[]"]').each(function () {
        const val = $(this).val().trim();
        if (val !== "") {
            productFeatures.push(val);
        }
    });
    //productImages
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

    const payload = {
        "subCategory": {
            "id": subCategory,
        },
        "name": productName,
        "description": description,
        "isPreOrder": isPreOrder,
        "preOrderDay": preOrderDay,
        "isNew": isNew,
        "isEligibleToExport": isEligibleToExport,
        "fileId": fileId_model,
        "productKeyWords": keywords,
        "productFeatures": productFeatures,
        "productImages": [],
        //  productModels : [],
        "productInformations": [
            {
                "paramName": "Brand",
                "paramValue": Brand,
            },
            {
                "paramName": "Manufacturer",
                "paramValue": Manufacturer,
            },
            {
                "paramName": "Color",
                "paramValue": Color,
            },
            {
                "paramName": "Material",
                "paramValue": Material,
            },
        ],
        "categoryInformations": [
            {
                "paramName": "Cable Length",
                "paramValue": CableLength,
            },
            {
                "paramName": "Voltage",
                "paramValue": Voltage,
            },
            {
                "paramName": "Data Transfer rate",
                "paramValue": DataTransferRate,
            },
            {
                "paramName": "Display Size",
                "paramValue": DisplaSize,
            },
        ],
        "complianceInformation": {
            "safetyWarning": safetyWarning,
            "countryOfOrigin": countryOfOrigin,
            "isDangerousGoodRegulation": isDangerousGoodRegulation,
            "fileId": complianceInformation_fileId,
        },
        "warrantyInformation": {
            "type": Warantytype,
            "duration": WarantyDuration,
            "durationType": durationType,
        },
    };

    const payload2 = {
        productModels: [],
    };

    var te = $("#panel-model-wrapper")
        .find(".panel-toggle-content")
        .each(function () {
            var measureYes = $(this).find("#measureYes").is(":checked");
            var measureNo = $(this).find("#measureNo").is(":checked");

            let name = $(this).find("#ModelName").val();
            let sku = $(this).find("#Sku").val();
            // console.log("name",name)
            // console.log("sku",sku);
            let price = $(this).find("#Price").val();
            let currency = $(this).find("#Currency").val();
            let weight = $(this).find("#Weight").val();
            let weightType = $(this).find("#WeightType").val();
            let length = $(this).find("#DimensionsL").val();
            let width = $(this).find("#DimensionsW").val();
            let height = $(this).find("#DimensionsH").val();
            let dimensionType = $(this).find("#DimensionType").val();
            // let MeasurementName = $(this).find("#MeasurementName").val();
            // let MeasurementCountingUnit = $(this)
            //     .find("#MeasurementCountingUnit")
            //     .val();
            //   const imageIdTemp = $(this)
            //       .closest(".panel-utama-model")
            //       .data("panel-index");
            // var imageIdTemp = $(this)
            //     .parent(".panel-utama-model")
            //     .data("panel-index");

            var imageIdTemp = null;
            // var img = $(this).find(".imageInputStep3");
            // const file = img.prop("files")[0];
            // //console.log("tes", file);
            // if (!file){
            //     imageIdTemp = null;
            // }
            // else
            // {
            //     const res = await apiUploadFile(file);
            //     // if (res.responseCode !== "0000") {
            //     //     alert(`Upload gagal (${key})`);
            //     //     return;
            //     // }
            //     if(res.responseCode == "0000")
            //     {
            //        imageIdTemp = res.data.fileId;
            //     }
            // }
            
            var isConfigurePromotionPrice = $(this)
            .find("#promoYes")
            .is(":checked");

            let promotionPrice = $(this).find("#promotionPrice").val();
            let promotionCurrency = $(this).find("#promotionCurrency").val();
            let promotionStartDate = $(this).find("#promotionStartDate").val();
            let promotionEndDate = $(this).find("#promotionEndDate").val();
            let packagingWeight = $(this).find("#packagingWeight").val();
            let packagingWeightType = $(this)
                .find("#packagingWeightType")
                .val();

            let packagingLength = $(this).find("#packagingLength").val();
            let packagingWidth = $(this).find("#packagingWidth").val();
            let packagingHeight = $(this).find("#packagingHeight").val();
            let packagingDimensionType = $(this)
                .find("#packagingDimensionType")
                .val();
            var obj = {
                name: name,
                sku: sku,
                price: Number(price),
                currency: currency,
                weight: Number(weight),
                weightType: weightType,
                length: Number(length),
                width: Number(width),
                height: Number(height),
                dimensionType: dimensionType,
                isMeasurement: measureYes,
                imageId: imageIdTemp,

                isConfigurePromotionPrice: isConfigurePromotionPrice,
                promotionPrice: Number(promotionPrice),
                promotionCurrency: promotionCurrency,
                promotionStartDate: promotionStartDate, //tahun-bulan-tanggal
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

            $("#warehouse-row")
                .find(".cnt-row-wrs")
                .each(function () {
                    let obw = {
                        "id": null,
                        "stock": null,
                    };

                    let id = $(this).find(".warehouses").val();
                    let st = $(this).find(".stock").val();
                    if (id !== "") {
                        obw.id = id;
                    }

                    if (st !== "") {
                        obw.stock = Number(st);
                    }
                    //   payload2.productModels.warehouses.push(obw);
                    obj.warehouses.push(obw);
                });

            if (measureYes) {
                $("#measurement-wrapper")
                    .find(".panel-measurement")
                    .each(function () {
                        var ini = $(this);
                        let pm = {
                            price: Number($(this).find("#Price").val()),
                            currency: $(this).find("#Currency").val(),
                            weight: Number($(this).find("#Weight").val()),
                            weightType: $(this).find("#WeightType").val(),
                            length: Number($(this).find("#DimensionsL").val()),
                            width: Number($(this).find("#DimensionsW").val()),
                            height: Number($(this).find("#DimensionsH").val()),
                            dimensionType: $(this).find("#DimensionType").val(),
                            measurementType: ini.find("#MeasurementName").val(),
                            measurementValue: ini
                                .find("#MeasurementCountingUnit")
                                .val(),
                            isConfigurePromotionPrice: $(this)
                                .find("#promoYes")
                                .is(":checked"),
                            promotionPrice: $(this)
                                .find("#promotionPrice")
                                .val(),
                            promotionCurrency: $(this)
                                .find("#promotionCurrency")
                                .val(),
                            promotionStartDate: $(this)
                                .find("#promotionStartDate")
                                .val(),
                            promotionEndDate: $(this)
                                .find("#promotionStartDate")
                                .val(),
                            packagingWeight: $(this)
                                .find("#packagingWeight")
                                .val(),
                            packagingWeightType: $(this)
                                .find("#packagingWeightType")
                                .val(),
                            packagingLength: $(this)
                                .find("#packagingLength")
                                .val(),
                            packagingWidth: $(this)
                                .find("#packagingWidth")
                                .val(),
                            packagingHeight: $(this)
                                .find("#packagingHeight")
                                .val(),
                            packagingDimensionType: $(this)
                                .find("#packagingDimensionType")
                                .val(),
                            warehouses: [],
                        };
                        $(this)
                            .find("#warehouse-row")
                            .find(".cnt-row-wrs")
                            .each(function () {
                                let obw = {
                                    "id": null,
                                    "stock": null,
                                };

                                let id = $(this).find(".warehouses").val();
                                let st = $(this).find(".stock").val();
                                if (id !== "") {
                                    obw.id = id;
                                }

                                if (st !== "") {
                                    obw.stock = st;
                                }
                                pm.warehouses.push(obw);
                            });
                        //way
                        //   payload2.productModels.productMeasurements.push(pm);
                        obj.productMeasurements.push(pm);
                    });
            }
            payload2.productModels.push(obj);
        });

    Object.assign(payload, payload2);
    try {
        var w = 1;
        
        // for (const key in window.uploadState) {
        //     const item = window.uploadState[key];

        //     if (item.file && !item.fileId) {
        //         //console.log('e',item.file)

        //         const res = await apiUploadFile(item.file);

        //         if (res.responseCode !== "0000") {
        //             alert(`Upload gagal (${key})`);
        //             return;
        //         }


        //         if (key == "exportDocEligible") {
                  
        //             payload.fileId = res.data.fileId;
                 
        //         }
        //         if (key == "documentRegulation") {
        //             payload.complianceInformation.fileId = res.data.fileId;
        //         }
        //     }
        //     w++;
        // }
        const uploadTasks = [];

        // 1️⃣ Kumpulkan task upload
        for (const [key, item] of Object.entries(window.uploadState)) {
            if (!item?.file || item.fileId) continue;

            uploadTasks.push({
                key,
                file: item.file,
            });
        }

        // 2️⃣ Upload paralel
        const uploadResults = await Promise.all(
            uploadTasks.map((task) => apiUploadFile(task.file))
        );

        // 3️⃣ Mapping hasil upload ke payload
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



        // let imageProduct = window.uploadState["primaryProductImages"];
        // //console.log("imageProduct",imageProduct);
        // for (const item of imageProduct) {
        //     //console.log(item.imageId)
        //     const res = await apiUploadFile(item.file);

        //     if (res.responseCode !== "0000") {
        //         alert(`Upload gagal (${key})`);
        //         return;
        //     }

        //     payload.productImages.push({
        //         "imageId": res.data.fileId,
        //         "sequence": item.sequence,
        //     });
        // }

        const uploadPrimaryImages = window.uploadState.primaryProductImages.map(
            (item) => apiUploadFile(item.file)
        );

        const imageResults = await Promise.all(uploadPrimaryImages);

        imageResults.forEach((res, index) => {
            if (res.responseCode !== "0000") {
                throw new Error("Upload image gagal");
            }

            payload.productImages.push({
                imageId: res.data.fileId,
                sequence:
                    window.uploadState.primaryProductImages[index].sequence,
            });
        });


        //
        /*
        let imageModelMeasur = window.uploadState["imageProductModelMeasure"];
        //console.log(imageModelMeasur);
        for (const item of imageModelMeasur) {
            //console.log(item.file);
            
            const res = await apiUploadFile(item.file);

            if (res.responseCode !== "0000") {
                alert(`Upload gagal (${key})`);
                return;
            }

            payload.productModels.forEach((it, ind) => {
                // if (it.imageId == item.panelKe) {
                //     payload.productModels[ind].imageId = res.data.fileId;
                //     // "contoh-data-gambar" + item.panelKe;
                // }
                payload.productModels[ind].imageId = res.data.fileId;
            });
            
        }*/
        let imageModelMeasur = window.uploadState["imageProductModelMeasure"];
       
        const uploadPromises = imageModelMeasur.map((item) =>
            apiUploadFile(item.file)
        );

        const results = await Promise.all(uploadPromises);

        results.forEach((res, index) => {
            if (res.responseCode !== "0000") {
                throw new Error("Upload gagal");
            }

            payload.productModels[index].imageId = res.data.fileId;
        });


        

        // console.log("window.uploadState", window.uploadState);
       
        payload.preOrderDay = payload.isPreOrder
            ? Number(payload.preOrderDay)
            : null;
        payload.warrantyInformation.duration = Number(
            payload.warrantyInformation.duration
        );

        console.log("payload=", payload);

        // await apiPost("/product", payload);

        // apiPost("/product", payload)
        //     .then((res) => {
        //         if (res.responseCode !== "0000") return;

        //         alert("Submit berhasil");
        //         window.location.href = "/post-product";
        //     })
        //     .catch((e) => {
        //         console.log("error", e);
        //         alert("Terjadi kesalahan");
        //     });

        // api.post("/product", payload, {
        //     timeout: 60000,
        // }) 
        
        // .then((res) => {
        //         if (res.responseCode !== "0000") return;

        //         alert("Submit berhasil");
        //         window.location.href = "/post-product";
        // })
        // .catch((e) => {
        //         console.log("error", e);
        //         alert("Terjadi kesalahan");
        // })
        // let data = JSON.stringify(payload, null, 2);
                // console.log("data=", data);


    


    

         const res = await api.post("/product", payload, {
             timeout: 60000,
         });

         if (res.responseCode !== "0000") {
             alert("Submit gagal");
             return;
         }

         alert("Submit berhasil");
         window.location.href = "/post-product";

        //  alert("Submit berhasil");
    } catch (e) {
        console.error(e);
        // alert("Terjadi kesalahan");
    } finally {
        // ===== kembalikan tombol =====
        $btn.prop("disabled", false);
        $btn.html(originalHtml);
    }
});

$("#submitBtn").on("click", async function () {


try {

        
let data = {
    subCategory: {
        id: "e2d1e365-5ac5-4528-b769-1cabf73a99d3",
    },
    name: "Smartphone XYZ",
    description: "Smartphone terbaru dengan fitur lengkap.",
    isPreOrder: false,
    preOrderDay: null,
    isNew: true,
    isEligibleToExport: true,
    fileId: "product-manual.pdf",
    state: "DRAFT",
    productKeyWords: ["smartphone", "android", "5g"],
    productFeatures: ["Layar 6.5 inch", "Baterai 5000mAh", "Kamera 64MP"],
    productImages: [
        {
            imageId: "img1.jpg",
            sequence: 1,
        },
        {
            imageId: "img2.jpg",
            sequence: 2,
        },
    ],
    productModels: [
        {
            name: "XYZ - Black 128GB",
            price: 4500000,
            currency: "IDR",
            weight: 180,
            weightType: "G",
            length: 15.2,
            width: 7.4,
            height: 0.8,
            dimensionType: "CM",
            isMeasurement: true,
            imageId: "model-black.jpg",
            sku: "XYZ-BLK-128",
            isConfigurePromotionPrice: true,
            promotionPrice: 4200000,
            promotionCurrency: "IDR",
            promotionStartDate: "2025-01-01",
            promotionEndDate: "2025-01-15",
            packagingWeight: 250,
            packagingWeightType: "G",
            packagingLength: 20.0,
            packagingWidth: 10.0,
            packagingHeight: 5.0,
            packagingDimensionType: "CM",
            warehouses: [
                {
                    id: "e344b19c-657f-4c36-b198-262c4d1a168a",
                    stock: 120,
                },
            ],
            productMeasurements: [
                {
                    price: 4500000,
                    currency: "IDR",
                    weight: 180,
                    weightType: "G",
                    length: 15.2,
                    width: 7.4,
                    height: 0.8,
                    dimensionType: "CM",
                    measurementType: "COLOR",
                    measurementValue: "Black",
                    isConfigurePromotionPrice: false,
                    promotionPrice: null,
                    promotionCurrency: null,
                    promotionStartDate: null,
                    promotionEndDate: null,
                    packagingWeight: 250,
                    packagingWeightType: "G",
                    packagingLength: 20.0,
                    packagingWidth: 10.0,
                    packagingHeight: 5.0,
                    packagingDimensionType: "CM",
                    warehouses: [
                        {
                            id: "e344b19c-657f-4c36-b198-262c4d1a168a",
                            stock: 30,
                        },
                    ],
                },
            ],
        },
    ],
    productInformations: [
        {
            paramName: "Brand",
            paramValue: "XYZ Corp",
        },
        {
            paramName: "Battery",
            paramValue: "5000mAh",
        },
    ],
    categoryInformations: [
        {
            paramName: "Electronics Type",
            paramValue: "Smartphone",
        },
    ],
    complianceInformation: {
        safetyWarning: "Jauhkan dari panas ekstrem",
        countryOfOrigin: "China",
        isDangerousGoodRegulation: false,
        fileId: "compliance.pdf",
    },
    warrantyInformation: {
        type: "Official Warranty",
        duration: 12,
        durationType: "MONTH",
    },
};

            const res = await api.post("/product", data, {
                timeout: 60000
            });      

        //  const res = await api.post("/product", payload, {
        //      timeout: 60000,
        //  });

         if (res.responseCode !== "0000") {
             alert("Submit gagal");
             return;
         }

         alert("Submit berhasil");
         window.location.href = "/post-product";

        //  alert("Submit berhasil");
    } catch (e) {
        console.error(e);
        // alert("Terjadi kesalahan");
    } finally {
        // ===== kembalikan tombol =====
        $btn.prop("disabled", false);
        $btn.html(originalHtml);
    }
})