import $ from "jquery";



export const createNewWarehouseRow = ($panel, index) => {
   let $newRow = $(`
        <div class="warehouse-row">
            <div class="row mb-2 align-items-end cnt-row-wrs">
                <div class="col-md-6">
                    <label class="form-label fw-semibold">
                        <span class="text-danger">*</span> Warehouse
                    </label>
                    <select name="warehouses" class="form-select required warehouses">
                        <option value="">Loading ...</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label fw-semibold">Stock</label>
                    <input type="number" class="form-control stock">
                </div>
                <div class="col-md-3 remove-wrapper">
                    <button type="button" class="btn px-0 small remove-warehouse" style="color:#7D3636;">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `);

   $panel.find(".warehouse-wrapper").append($newRow);

   // Load warehouse untuk select baru
   loadWarehouseForSelect($newRow.find("select.warehouses"));

   return $newRow;
};


export const waitForSelectOptions = ($select, selectedId, maxAttempts = 20) => {

    let attempts = 0;

    function checkOptions() {
        attempts++;
        let options = $select.find("option").length;

        // Jika sudah ada options (lebih dari 1, karena ada option loading/default)
        if (options > 1) {
            $select.val(selectedId);
            console.log(
                `Select set to: ${selectedId}, value sekarang: ${$select.val()}`,
            );
        } else if (attempts < maxAttempts) {
            // Jika belum ada options, cek lagi setelah 100ms
            setTimeout(checkOptions, 100);
        } else {
            console.warn("Timeout waiting for select options");
        }
    }

    checkOptions();
}
