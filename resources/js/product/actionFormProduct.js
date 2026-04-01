import $ from "jquery";
import {
    apiGet,
    apiPost,
    apiUploadFile,
    // uploadedFileEligible,
} from "@/helpers/apiService";
import api from "@/helpers/api";


export default function ActionFormProduct(data) {
    //submitBtn
    const appData = window.APP_DATA || {};
    $(document).on("click", "#submitBtn", async function () {
        const $btn = $(this);
        const originalHtml = $btn.html();

        // ===== tampilkan loading =====
        $btn.prop("disabled", true);
        $btn.html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        `);

        // let kd = $("#saveToDraft").data("id");
        // if(kd)
        // {

        // }

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
            categoryInformations: [],
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

        $("#box-category-information")
            .find("input")
            .each(function () {
                let value = $(this).val();
                let paramName = $(this).data("param");

                payload.categoryInformations.push({
                    paramName: paramName,
                    paramValue: value,
                });
            });

        const payload2 = {
            productModels: [],
        };

        var gh = $("#panel-model-wrapper")
            .find(".panel-utama-model")
            .each(function () {
                var panelToggleContent = $(this);

                var waya = panelToggleContent.find(".panel-toggle-content");
                waya.each(function () {
                    var measureYes = $(this).find(".measureYes").is(":checked");
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
                                    price: Number($(this).find(".Price").val()),
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
                    uploadTasks
                        .filter((task) => task.file !== null)
                        .map((task) => apiUploadFile(task.file)),
                );
                if (uploadResults.length > 0) {
                    // 3 Mapping hasil upload ke payload
                    uploadResults.forEach((res, index) => {
                        const { key } = uploadTasks[index];

                        if (res.responseCode !== "0000") {
                            throw new Error(`Upload gagal (${key})`);
                        }

                        // if (key === "exportDocEligible") {
                        // payload.fileId = res.data.fileId;
                        // }

                        if (key === "documentRegulation") {
                            payload.complianceInformation.fileId =
                                res.data.fileId;
                        }
                    });
                }
            }

            if (window.uploadState.primaryProductImages.length > 0) {
                const uploadPrimaryImages =
                    window.uploadState.primaryProductImages
                        .filter((item) => item.file !== null)
                        .map((item) => apiUploadFile(item.file));

                if (uploadPrimaryImages.length > 0) {
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
            }

            if (window.uploadState["imageProductModelMeasure"].length > 0) {
                const uploadPromises = window.uploadState[
                    "primaryProductImages"
                ]
                    .filter((item) => item.file !== null)
                    .map((item) => apiUploadFile(item.file));

                if (uploadPromises.length > 0) {
                    const results = await Promise.all(uploadPromises);
                    results.forEach((res, index) => {
                        if (res.responseCode !== "0000") {
                            throw new Error("Upload gagal");
                        }
                        payload.productModels[index].imageId = res.data.fileId;
                    });
                }
            }

            if (window.uploadState.productFiles.length > 0) {
                const uploadPromises = window.uploadState.productFiles
                    .filter((item) => !item.id) // Akan lolos jika id null, undefined, 0, atau ""
                    .map((item) => apiUploadFile(item.file));

                if (uploadPromises.length > 0) {
                    const results = await Promise.all(uploadPromises);

                    payload.productFiles = results.map((res) => {
                        if (res.responseCode !== "0000") {
                            throw new Error("Upload gagal");
                        }

                        return res.data.fileId;
                    });
                }
            }

            payload.preOrderDay = payload.isPreOrder
                ? Number(payload.preOrderDay)
                : null;
            payload.warrantyInformation.duration = Number(
                payload.warrantyInformation.duration,
            );

            // console.log("payload", payload);
            //appData.id (appData.mode == "edit")
            console.log("payload=", payload);
            //alert(appData.mode);
            if (appData.mode == "edit") {
                const res = await api.put(
                    `/product/draft/${appData.id}`,
                    payload,
                    {
                        timeout: 60000,
                    },
                );
                if (res.responseCode !== "0000") {
                    alert("Submit gagal");
                    return;
                }
                alert("Update   berhasil");
                $("#stepForm")[0].reset();
                window.location.href = "/post-product";
            } else {
                
                const res = await api.post("/product", payload, {
                    timeout: 60000,
                });
                console.log(res);
                if (res.responseCode !== "0000") {
                    alert("Submit gagal");
                    return;
                }
                alert("Submit berhasil");
                $("#stepForm")[0].reset();
                window.location.href = "/post-product";
            }
        } catch (e) {
            console.error(e);
            console.log(e.responseDesc);
            console.log(e);
            alert(
                "Terjadi kesalahan:",
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
   
    //----- save draft -----

    $(document).on("click", "#saveToDraftx", async function () {
        // console.log("window.uploadState-", window.uploadState);
        // console.log(
        // "window.uploadState.primaryProductImages.length-",
        // window.uploadState.primaryProductImages,
        // );
        // console.log(
        //     "window.uploadState.imageProductModelMeasure-",
        //     window.uploadState["imageProductModelMeasure"],
        // );
        // console.log(
        // "window.uploadState.productFiles-",
        // window.uploadState.productFiles,
        // );
    });

    $(document).on("click", "#saveToDraft", async function () {
        const $btn = $(this);
        const originalHtml = $btn.html();

        // ===== tampilkan loading =====
        $btn.prop("disabled", true);
        $btn.html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        `);

        // let kd = $("#saveToDraft").data("id");
        // if(kd)
        // {

        // }

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
            categoryInformations: [],
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

        $("#box-category-information")
            .find("input")
            .each(function () {
                let value = $(this).val();
                let paramName = $(this).data("param");

                payload.categoryInformations.push({
                    paramName: paramName,
                    paramValue: value,
                });
            });

        const payload2 = {
            productModels: [],
        };

        var gh = $("#panel-model-wrapper")
            .find(".panel-utama-model")
            .each(function () {
                var panelToggleContent = $(this);

                var waya = panelToggleContent.find(".panel-toggle-content");
                waya.each(function () {
                    var measureYes = $(this).find(".measureYes").is(":checked");
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
                                    price: Number($(this).find(".Price").val()),
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
                    uploadTasks
                        .filter((task) => task.file !== null)
                        .map((task) => apiUploadFile(task.file)),
                );
                if (uploadResults.length > 0) {
                    // 3 Mapping hasil upload ke payload
                    uploadResults.forEach((res, index) => {
                        const { key } = uploadTasks[index];

                        if (res.responseCode !== "0000") {
                            throw new Error(`Upload gagal (${key})`);
                        }

                        // if (key === "exportDocEligible") {
                        // payload.fileId = res.data.fileId;
                        // }

                        if (key === "documentRegulation") {
                            payload.complianceInformation.fileId =
                                res.data.fileId;
                        }
                    });
                }
            }

            if (window.uploadState.primaryProductImages.length > 0) {
                const uploadPrimaryImages =
                    window.uploadState.primaryProductImages
                        .filter((item) => item.file !== null)
                        .map((item) => apiUploadFile(item.file));

                if (uploadPrimaryImages.length > 0) {
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
            }

            if (window.uploadState["imageProductModelMeasure"].length > 0) {
                const uploadPromises = window.uploadState[
                    "primaryProductImages"
                ]
                    .filter((item) => item.file !== null)
                    .map((item) => apiUploadFile(item.file));

                if (uploadPromises.length > 0) {
                    const results = await Promise.all(uploadPromises);
                    results.forEach((res, index) => {
                        if (res.responseCode !== "0000") {
                            throw new Error("Upload gagal");
                        }
                        payload.productModels[index].imageId = res.data.fileId;
                    });
                }
            }

            if (window.uploadState.productFiles.length > 0) {
                const uploadPromises = window.uploadState.productFiles
                    .filter((item) => !item.id) // Akan lolos jika id null, undefined, 0, atau ""
                    .map((item) => apiUploadFile(item.file));

                if (uploadPromises.length > 0) {
                    const results = await Promise.all(uploadPromises);

                    payload.productFiles = results.map((res) => {
                        if (res.responseCode !== "0000") {
                            throw new Error("Upload gagal");
                        }

                        return res.data.fileId;
                    });
                }
            }

            payload.preOrderDay = payload.isPreOrder
                ? Number(payload.preOrderDay)
                : null;
            payload.warrantyInformation.duration = Number(
                payload.warrantyInformation.duration,
            );

            // console.log("payload", payload);
            //appData.id (appData.mode == "edit")
            console.log("payload=", payload);

            if (appData.mode == "edit") {
                const res = await api.put(
                    `/product/draft/${appData.id}`,
                    payload,
                    {
                        timeout: 60000,
                    },
                );
                if (res.responseCode !== "0000") {
                    alert("Submit gagal");
                    return;
                }
                alert("Update  Draft berhasil");
                $("#stepForm")[0].reset();
                window.location.href = "/post-product";
            } else {
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
            }
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
}