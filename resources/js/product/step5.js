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
                id:null,
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


    $(document).on("click", ".btn-remove-file-export", function () {
        const index = $(this).data("index");

        window.uploadState.productFiles.splice(index, 1);

        $(this).closest("li").remove();
    });




   
}
 
