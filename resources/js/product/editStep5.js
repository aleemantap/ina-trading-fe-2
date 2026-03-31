import $ from "jquery";


export default function EditStep5(product) {
    // console.log("t==", product);
    const files = product.productFiles || []; // array of {id, fileId}
    const isEligibleToExport = product.isEligibleToExport;
    const yesRadio = document.getElementById("eligible_yes");
    const noRadio = document.getElementById("eligible_no");
    const uploadSection = document.getElementById("upload-section");
    const fileList = document.getElementById("file-list");
   
    const uploadInput = document.getElementById("export-upload");
    // Set Radio
    if (isEligibleToExport) {
        yesRadio.checked = true;
        uploadSection.style.display = "block";
    } else {
        noRadio.checked = true;
        uploadSection.style.display = "none";
    }
    // Tampilkan Daftar File (multiple files)
    if (files.length > 0 && isEligibleToExport) {
        let listHtml = "";
        files.forEach((file, index) => {
            // ambil nama file dari fileId (link)
            console.log(file);
            //  const file = files[i];

            const fileName = file.fileId
                ? file.fileId.split("/").pop()
                : "Unknown file";

            window.uploadState.productFiles.push({
                id: file.id,
                file: fileName,
                fileId: file.fileId,
            });    
            listHtml += `
                   
                    <li class="d-flex justify-content-between align-items-center
                            border rounded px-2 py-1 mb-1 small">
                        <span class="text-truncate">📎 ${fileName}</span>
                        <button type="button"
                            data-index="${index}"
                            class="btn btn-sm btn-link text-danger btn-remove-file-export">
                            ✖
                        </button>
                    </li>
                `;
        });
       

        fileList.innerHTML = listHtml;
      
    }
    // Toggle ketika user klik radio
    document.querySelectorAll('input[name="eligible"]').forEach((radio) => {
        radio.addEventListener("change", function () {
            const show = this.value === "1";
            uploadSection.style.display = show ? "block" : "none";
            if (!show) {
                fileList.innerHTML = "";
                uploadInput.value = "";
            }
        });
    });
}