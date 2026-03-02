import $ from "jquery";
// import { apiGet } from "@/helpers/apiService";

export default function Step4() {
    function initEditStep4(product) {
        // console.log(product.complianceInformation);
        const productInformations = product.productInformations;
        const categoryInformations = product.categoryInformations;
        const warrantyInformation = product.warrantyInformation;
        const complianceInformation = product.complianceInformation;

        // ====== General Information ====
        if (!productInformations || !Array.isArray(productInformations)) {
            console.error("Data productInformations tidak valid");
            return;
        }

        // Loop melalui setiap item dalam array
        productInformations.forEach((item) => {
            const { paramName, paramValue } = item;

            // Cari elemen input berdasarkan id yang sesuai dengan paramName
            const inputElement = document.getElementById(paramName);

            // Jika elemen ditemukan, isi dengan paramValue
            if (inputElement) {
                inputElement.value = paramValue || ""; // Gunakan string kosong jika paramValue null/undefined
            } else {
                console.warn(
                    `Elemen dengan id "${paramName}" tidak ditemukan di form`,
                );
            }
        });

        // ====== Category Information =========

        categoryInformations.forEach((item) => {
            const input = document.querySelector(
                `input[data-param="${item.paramName}"]`,
            );

            if (input) {
                input.value = item.paramValue;
            }
        });

        //======= Compliance Information ========

        //Safety Warning
        const safetyWarningInput = document.getElementById("safetyWarning");
        if (safetyWarningInput) {
            safetyWarningInput.value =
                complianceInformation.safetyWarning ?? "";
        }

        //Country of Origin
        const countryInput = document.getElementById("countryOfOrigin");
        if (countryInput) {
            countryInput.value = complianceInformation.countryOfOrigin ?? "";
        }

        //Radio Dangerous Goods
        const dgYes = document.getElementById("dg_yes");
        const dgNo = document.getElementById("dg_no");
        const uploadWrapper = document.getElementById("dg-upload-wrapper");
        const dgNote = document.getElementById("dg-note");

        if (complianceInformation.isDangerousGoodRegulation) {
            dgYes.checked = true;
            uploadWrapper.style.display = "block";
            dgNote.style.display = "block";
        } else {
            dgNo.checked = true;
            uploadWrapper.style.display = "none";
            dgNote.style.display = "none";
        }

        //Preview Existing File
        const previewContainer = document.getElementById("dg-preview");

        if (complianceInformation.fileId && previewContainer) {
           const fileUrl = complianceInformation.fileId;
           const extension = fileUrl.split(".").pop().toLowerCase();
           const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];

           if (imageExtensions.includes(extension)) {
               previewContainer.innerHTML = `
            <div class="mt-2" id="preview-wrapper">
                <img src="${fileUrl}" 
                     alt="Document Preview"
                     style="max-width: 200px; border-radius: 8px; border:1px solid #ddd;">
                <div class="mt-2">
                    <button type="button" 
                            id="btn-remove-preview" 
                            class="btn btn-sm btn-danger">
                        Remove
                    </button>
                </div>
            </div>
        `;
           } else {
               previewContainer.innerHTML = `
            <div class="mt-2" id="preview-wrapper">
                <a href="${fileUrl}" target="_blank">
                    ${fileUrl.split("/").pop()}
                </a>
                <button type="button" 
                        id="btn-remove-preview" 
                        class="btn btn-sm btn-danger ms-2">
                    Remove
                </button>
            </div>
        `;
           }

           // Event Listener pakai ID
           const removeBtn = document.getElementById("btn-remove-preview");
           if (removeBtn) {
               removeBtn.addEventListener("click", function () {
                   document.getElementById("preview-wrapper").remove();

                   // Optional: reset file input
                   const fileInput = document.getElementById(
                       "document-regulation-upload",
                   );
                   if (fileInput) fileInput.value = "";
               });
           }
       }

        // ======= Warranty Information ========

        // Isi Warranty Type
        const warrantyTypeInput = document.getElementById("Warantytype");
        if (warrantyTypeInput) {
            warrantyTypeInput.value = warrantyInformation.type;
        }

        // Isi Warranty Duration
        const warrantyDurationInput =
            document.getElementById("WarantyDuration");
        if (warrantyDurationInput) {
            warrantyDurationInput.value = warrantyInformation.duration;
        }

        // Set Select Duration Type
        const durationTypeSelect = document.getElementById("durationType");
        if (durationTypeSelect) {
            durationTypeSelect.value = warrantyInformation.durationType;
        }
    }

    const appData = window.APP_DATA || {};
    if (appData.mode === "edit" && appData.product) {
        initEditStep4(appData.product);
    }

    function toggleDangerousUpload() {
        if ($("#dg_yes").is(":checked")) {
            $("#dg-upload").show();
            $("#dg-note").show();
        } else {
            $("#dg-upload").hide();
            $("#dg-note").hide();
        }
    }

    // default on load
    toggleDangerousUpload();

    // on change
    $('input[name="dangerous_goods"]').on("change", function () {
        toggleDangerousUpload();
    });

    /* uppload *doc */
    $("#document-regulation-upload").on("change", function () {
        const key = $(this).data("upload");
        const file = this.files[0];
        const $preview = $("#dg-preview");
        $preview.empty(); // reset preview

        if (!file) return;

        window.uploadState[key].file = file;
        window.uploadState[key].fileId = null;
        // console.log("sss", window.uploadState[key].file);

        // buat preview nama file + remove
        const $previewItem = $(
            '<div class="d-flex align-items-center gap-2"></div>',
        );
        const $fileName = $("<span></span>").text(file.name);
        const $removeBtn = $(
            '<button type="button" class="btn btn-sm btn-danger">Remove</button>',
        );

        $removeBtn.on("click", function () {
            $("#document-regulation-upload").val(""); // hapus file

            window.uploadState[key].file = null;
            window.uploadState[key].fileId = null;

            //  console.log("ss2s", window.uploadState[key].file);
            $preview.empty(); // hapus preview
        });

        $previewItem.append($fileName, $removeBtn);
        $preview.append($previewItem);
    });
}
