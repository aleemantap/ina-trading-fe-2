import $ from "jquery";
import { apiGet } from "@/helpers/apiService";

export default function Step4() {
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
            '<div class="d-flex align-items-center gap-2"></div>'
        );
        const $fileName = $("<span></span>").text(file.name);
        const $removeBtn = $(
            '<button type="button" class="btn btn-sm btn-danger">Remove</button>'
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
