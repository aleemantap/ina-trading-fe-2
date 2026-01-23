import $ from "jquery";

$(function () {
    $(document).on("input", ".decimalInput", function () {
        let value = $(this).val();

        // Hanya angka dan titik
        value = value.replace(/[^0-9.]/g, "");

        // Batasi hanya satu titik
        let parts = value.split(".");
        if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("");
        }

        $(this).val(value);
    });
});
