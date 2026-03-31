import $ from "jquery";


export default function DetailView() {
   
  
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