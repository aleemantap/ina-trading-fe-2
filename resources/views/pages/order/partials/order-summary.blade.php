<div class="card shadow-sm h-100">
    <div class="card-body d-flex flex-column justify-content-between">

        <div>
            <div class="d-flex justify-content-between text-muted fw-semibold small mb-2">
                <span>ORDER ID: #{{ $id }}</span>
                <a href="#" class="text-info">Domestic</a>
            </div>

            <div class="small text-secondary">
                <div class="d-flex justify-content-between mb-2">
                    <span>Total</span><strong>${{ $total }}</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                    <span>Shipping</span><strong>{{ $shipping }}</strong>
                </div>
                <div class="d-flex justify-content-between">
                    <span>AWB</span><strong>{{ $awb }}</strong>
                </div>
            </div>
        </div>

        <div class="border-top pt-2 mt-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <strong>Total</strong>
                <strong class="text-success">${{ $total }}</strong>
            </div>
            <a href="/your-orders/tracking/111"
               class="btn btn-success btn-sm rounded-pill">
                Track your order
            </a>
        </div>

    </div>
</div>
