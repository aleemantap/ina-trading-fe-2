<div class="card h-100  border-0 shadow-none"">
    <div class="card-body text-secondary">

        <h6 class="text-muted">Current balance</h6>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold text-dark">$1200</h3>
            <button 
                class="btn btn-sm rounded-3"
                data-bs-toggle="modal"
                data-bs-target="#withdrawModal"
                style="color:#916FF8; border:2px solid #916FF8;">
                Withdraw
            </button>
        </div>

        <div class="mt-4 small position-relative p-4"
            style="background-color:#F5EFEF; border-radius:40px; min-height:190px;">

            <!-- Icon Edit -->
            <button class="position-absolute border-0 bg-white shadow-sm"   
                data-bs-toggle="modal"
                data-bs-target="#changeaccountModal"
                    style="top:10px; right:16px; width:34px; height:34px; border-radius:50%;">
                <img src="img/icons/edit.png" alt="edit" width="18">
            </button>


            <div class="row mb-3">
                <div class="col text-muted">Account Number</div>
                <div class="col text-start fw-medium">1231414141</div>
            </div>

            <div class="row mb-3">
                <div class="col text-muted">Account Name</div>
                <div class="col text-start">Ina Trading</div>
            </div>

            <div class="row mb-3">
                <div class="col text-muted">Bank Name</div>
                <div class="col text-start">Bank Raya</div>
            </div>

        </div>
    </div>
</div>
