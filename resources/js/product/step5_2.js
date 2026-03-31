// ===
// function initEditStep5(product) {
//     const files = product.productFiles || []; // array of {id, fileId}
//     const isEligibleToExport = product.isEligibleToExport;

//     const yesRadio = document.getElementById("eligible_yes");
//     const noRadio = document.getElementById("eligible_no");
//     const uploadSection = document.getElementById("upload-section");
//     const fileList = document.getElementById("file-list");
//     const uploadInput = document.getElementById("export-upload");

//     // Set Radio
//     if (isEligibleToExport) {
//         yesRadio.checked = true;
//         uploadSection.style.display = "block";
//     } else {
//         noRadio.checked = true;
//         uploadSection.style.display = "none";
//     }

//     // Tampilkan Daftar File (multiple files)
//     if (files.length > 0 && isEligibleToExport) {
//         let listHtml = "";
        
//         files.forEach((file, index) => {
//             // ambil nama file dari fileId (link)
//             const fileName = file.fileId ? file.fileId.split("/").pop() : "Unknown file";
            
//             listHtml += `
//                 <li class="d-flex align-items-center gap-2" data-file-id="${file.id}">
//                     <span>${fileName}</span>
//                     <button type="button" 
//                             class="btn btn-sm btn-danger remove-file"
//                             data-file-index="${index}">
//                         Remove
//                     </button>
//                 </li>
//             `;
//         });
        
//         fileList.innerHTML = listHtml;

//         // Event remove menggunakan class (event delegation)
//         fileList.addEventListener("click", function(e) {
//             if (e.target.classList.contains("remove-file")) {
//                 // Hapus li yang berisi button yang diklik
//                 e.target.closest('li').remove();
                
//                 // Jika tidak ada file lagi, kosongkan input
//                 if (fileList.children.length === 0) {
//                     uploadInput.value = "";
//                 }
                
//                 // Optional: Trigger event bahwa file telah dihapus
//                 // Bisa digunakan untuk update data di backend nanti
//                 console.log("File removed, remaining files:", fileList.children.length);
//             }
//         });
//     }

//     // Toggle ketika user klik radio
//     document.querySelectorAll('input[name="eligible"]').forEach((radio) => {
//         radio.addEventListener("change", function () {
//             const show = this.value === "1";
//             uploadSection.style.display = show ? "block" : "none";

//             if (!show) {
//                 fileList.innerHTML = "";
//                 uploadInput.value = "";
//             }
//         });
//     });
// }

// ===

// function initEditStep5(product) {
//     const files = product.productFiles || [];
//     const isEligibleToExport = product.isEligibleToExport;

//     const yesRadio = document.getElementById("eligible_yes");
//     const noRadio = document.getElementById("eligible_no");
//     const uploadSection = document.getElementById("upload-section");
//     const fileList = document.getElementById("file-list");
//     const uploadInput = document.getElementById("export-upload");

//     // Set Radio
//     if (isEligibleToExport) {
//         yesRadio.checked = true;
//         uploadSection.style.display = "block";
//     } else {
//         noRadio.checked = true;
//         uploadSection.style.display = "none";
//     }

//     // Tampilkan Daftar File
//     function renderFileList() {
//         if (files.length > 0 && isEligibleToExport) {
//             let listHtml = "";
            
//             files.forEach((file, index) => {
//                 const fileName = file.fileId ? file.fileId.split("/").pop() : "Unknown file";
                
//                 listHtml += `
//                     <li class="d-flex align-items-center gap-2 justify-content-between p-2 border-bottom" 
//                         data-file-id="${file.id}">
//                         <div class="d-flex align-items-center gap-2">
//                             <i class="bi bi-file-pdf text-danger"></i>
//                             <span>${fileName}</span>
//                             <small class="text-muted">(ID: ${file.id})</small>
//                         </div>
//                         <button type="button" 
//                                 class="btn btn-sm btn-outline-danger remove-file"
//                                 data-file-index="${index}">
//                             <i class="bi bi-trash"></i> Remove
//                         </button>
//                     </li>
//                 `;
//             });
            
//             fileList.innerHTML = listHtml;
//         }
//     }

//     renderFileList();

//     // Event remove dengan konfirmasi
//     fileList.addEventListener("click", function(e) {
//         if (e.target.classList.contains("remove-file") || 
//             e.target.closest(".remove-file")) {
            
//             const button = e.target.classList.contains("remove-file") ? 
//                           e.target : e.target.closest(".remove-file");
            
//             const li = button.closest('li');
//             const fileId = li.dataset.fileId;
//             const fileName = li.querySelector('span').textContent;
            
//             // Konfirmasi sebelum hapus
//             if (confirm(`Apakah Anda yakin ingin menghapus file "${fileName}"?`)) {
//                 li.remove();
                
//                 // Hapus juga dari array files (jika perlu)
//                 const fileIndex = files.findIndex(f => f.id == fileId);
//                 if (fileIndex !== -1) {
//                     files.splice(fileIndex, 1);
//                 }
                
//                 // Update hidden input untuk menyimpan daftar file yang tersisa
//                 updateRemainingFiles();
                
//                 if (fileList.children.length === 0) {
//                     uploadInput.value = "";
//                 }
                
//                 console.log("File removed. Remaining files:", files);
//             }
//         }
//     });

//     // Fungsi untuk update daftar file yang tersisa (jika perlu dikirim ke server)
//     function updateRemainingFiles() {
//         // Buat hidden input untuk menyimpan file IDs yang masih ada
//         let hiddenInput = document.getElementById("remaining-files");
//         if (!hiddenInput) {
//             hiddenInput = document.createElement("input");
//             hiddenInput.type = "hidden";
//             hiddenInput.id = "remaining-files";
//             hiddenInput.name = "remaining_files";
//             uploadSection.appendChild(hiddenInput);
//         }
        
//         // Simpan ID file yang masih ada sebagai JSON
//         const remainingFileIds = files.map(f => f.id);
//         hiddenInput.value = JSON.stringify(remainingFileIds);
//     }

//     // Toggle ketika user klik radio
//     document.querySelectorAll('input[name="eligible"]').forEach((radio) => {
//         radio.addEventListener("change", function () {
//             const show = this.value === "1";
//             uploadSection.style.display = show ? "block" : "none";

//             if (!show) {
//                 fileList.innerHTML = "";
//                 uploadInput.value = "";
//                 // Kosongkan juga array files jika perlu
//                 files.length = 0;
//             }
//         });
//     });
// }
// ===