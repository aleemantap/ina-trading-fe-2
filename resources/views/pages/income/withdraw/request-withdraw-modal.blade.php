<div class="modal fade" id="withdrawModal" tabindex="-1">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">Request For Withdrawal</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body small">

        <div class="row align-items-center mb-2">
          <div class="col-4 text-muted">Available Balance</div>
          <div class="col-8 fw-bold">$1200.00</div>
        </div>

        <div class="row align-items-center mb-2">
          <div class="col-4 text-muted">Amount to withdraw</div>
          <div class="col-8">
            <input class="form-control form-control-sm" placeholder="$">
          </div>
        </div>

        <div class="row align-items-center mb-2">
          <div class="col-4 text-muted">Withdraw into</div>
          <div class="col-8 d-flex align-items-center gap-2">
            <span>Bank Mandiri 1212121212</span>
          </div>
        </div>

        <div class="row align-items-center mb-2">
          <div class="col-4 text-muted">Notes</div>
          <div class="col-8">
            <span class="text-muted">No notes (optional)</span>
            <span class="text-primary ms-1" style="cursor:pointer;">edit</span>
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-4 text-muted">Withdrawal fee</div>
          <div class="col-8 fw-bold">$2.50</div>
        </div>

      </div>


      <div class="modal-footer" style="border-top:0ch;">
        <button class="btn" style="color: #7047EB;border:1px solid #7047EB;" data-bs-dismiss="modal">Cancel</button>
        <button class="btn" data-bs-toggle="modal"
                data-bs-target="#confirm-wd-Modal" style="background: #7047EB;color:#fff;">Withdraw $52.50</button>
      </div>

    </div>
  </div>
</div>
