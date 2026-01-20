
import $ from "jquery";
// import api from "@/helpers/api";
import {
    apiGet,
    apiPost,
    apiUploadFile,

} from "@/helpers/apiService";

// import api from "@/helpers/api";


import Quill from "quill";
import "quill/dist/quill.snow.css";

$(function () {
//   const element = document.querySelector("#biography");

//   if (!element) return;

//   const editor = new Editor({
//       element: element,
//       extensions: [StarterKit],
//       content: "<p>Write your store biography...</p>",
//   });

//   // Kalau mau kirim ke form
//   const form = element.closest("form");
//   if (form) {
//       form.addEventListener("submit", () => {
//           const hidden = document.createElement("input");
//           hidden.type = "hidden";
//           hidden.name = "biography";
//           hidden.value = editor.getHTML();
//           form.appendChild(hidden);
//       });
//   }
 const el = document.querySelector("#biography");
 if (!el) return;

 new Quill(el, {
     theme: "snow",
     placeholder: "Write your store biography...",
     modules: {
         toolbar: [
             ["bold", "italic", "underline"],
             [{ list: "ordered" }, { list: "bullet" }],
             ["link"],
         ],
     },
 });


//  const form = el.closest("form");
//  if (form) {
//      form.addEventListener("submit", () => {
//          form.querySelector('input[name="biography"]').value =
//              el.querySelector(".ql-editor").innerHTML;
//      });
//  }

    $("#submitBtnWarehouseProfile").on("click", async function () {
        const $btn = $(this);
        const originalHtml = $btn.html();

        $btn.prop("disabled", true);
        $btn.html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        `);
        //
        //5.54829,95.323753,
        var ls = $("#location-warehouse").val();
        const [latitude, longitude] = ls.split(",");

        try {
            const datax = {
                "address": $("#address_line").val(),
                "country": $("#country").val(),
                "province": $("#state").val(),
                "city": $("#city").val(),
                "postalCode": $("#postcode").val(),
                "latitude": latitude,
                "longitude": longitude,
                "warehouseType": $("#warehouse_name").val(),
            };
            console.log(datax)

            // const res = await api.post("/warehouses", datax, {
                // timeout: 60000,
            // });
            const res = await apiPost("/warehouses", datax);

            if (res.responseCode !== "0000") {
                alert("Submit gagal");
                return;
            }

            alert("Submit berhasil");
            //window.location.href = "/post-product";
        } catch (e) {
            console.error(e);
            // alert("Terjadi kesalahan");
        } finally {
            $btn.prop("disabled", false);
            $btn.html(originalHtml);
        }
    })


});

