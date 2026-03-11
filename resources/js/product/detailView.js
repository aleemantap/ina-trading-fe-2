import $ from "jquery";
// import api from "../helpers/api";
//import { apiGet } from "@/helpers/apiService";


export default function DetailView() {
   
    //  $(".view-document").click(function () {
    //      var pdfUrl = $(this).data("pdf-url");
    //      $("#pdfViewer").attr("src", pdfUrl + "#toolbar=1");
    //      $("#downloadLink").attr("href", pdfUrl);
    //      $("#documentModal").modal("show");
    //  });
     $(document).on("click", ".view-document", function () {
        var pdfUrl = $(this).data("pdf-url");
        $("#pdfViewer").attr("src", pdfUrl + "#toolbar=1");
        $("#downloadLink").attr("href", pdfUrl);
        $("#documentModal").modal("show");
     });

     // Reset jika modal ditutup
     $("#documentModal").on("hidden.bs.modal", function () {
         $("#pdfViewer").attr("src", "");
     });
}