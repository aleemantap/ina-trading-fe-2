@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="p-4">

    {{-- Welcome --}}
    <h3 class="mb-1 fw-semibold">Welcome Back, {{ session('auth_user.name') }}</h3>
    <p class="text-muted mb-4">
        Here is the information about all your orders and products
    </p>
    {{-- Stats Group --}}
    <div class="d-flex flex-wrap gap-3 mb-4">
        <div class="card border-0 shadow-sm">
            <div class="card-body"  style="width: 50rem;">
                <div class="row">
                    <!-- Total products -->
                    <div class="col-md-4">
                       <div class="box-stat p-3  border-start  position-relative">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="h4 fw-bold mb-0">100</p>
                                    <p class="text-muted mb-1">Total products</p>
                                </div>
                                <div class="icon-box">
                                    <img src="{{ asset('img/icons/case.png') }}" width="18">
                                </div>
                            </div>
                            <div style="color:#7C8DB5;" class="small mt-2 d-flex align-items-center gap-2">
                                <img src="{{ asset('img/icons/up.png') }}" width="16">
                                <span class="fw-medium">3.1</span>
                                <span style="margin-left:10px;">+0.49% this week</span>
                            </div>
                        </div>
                    </div>
                     <div class="col-md-4">
                       <div class="box-stat p-3 border-start position-relative">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="h4 fw-bold mb-0">10,827</p>
                                    <p class="text-muted mb-1">Total buyers</p>
                                </div>
                                <div class="icon-box">
                                    <img src="{{ asset('img/icons/check.png') }}" width="18">
                                </div>
                            </div>
                            <div style="color:#7C8DB5;" class="small mt-2 d-flex align-items-center gap-2">
    
                                <img src="{{ asset('img/icons/down2.png') }}" width="16">

                                <span class="fw-medium">2.56</span>

                                <span style="margin-left:10px;">-0.91% this week</span>

                            </div>
                        </div>
                    </div>

                     <div class="col-md-4">
                       <div class="box-stat p-3 border-start position-relative">

                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <p class="h4 fw-bold mb-0">957</p>
                                    <p class="text-muted mb-1">Refunded</p>
                                </div>

                                <div class="icon-box">
                                    <img src="{{ asset('img/icons/arrow-right.png') }}" width="18">
                                </div>
                            </div>
                            <div style="color:#7C8DB5;" class="small mt-2 d-flex align-items-center gap-2">
    
                                <img src="{{ asset('img/icons/up.png') }}" width="16">

                                <span class="fw-medium">7.2</span>

                                <span style="margin-left:10px;">+1.51% this week</span>

                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </div>
    </div>

    {{-- <h1 class="h3 mb-3 fw-bold">Orders Analytics</h1> --}}

     <div class="row g-4">

        {{-- Orders Analytics --}}
        <div class="col-lg-8">
            <div class="card p-3">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Orders Analytics</h5>
                    <select class="form-select form-select-sm w-auto">
                        <option>Monthly</option>
                        <option>Weekly</option>
                    </select>
                </div>
                <canvas id="ordersChart" height="256"></canvas>
            </div>
        </div>

        {{-- Earnings --}}
        <div class="col-lg-4">
            <div class="card p-3">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Earnings</h5>
                    <i class="bi bi-three-dots fs-5"></i>
                </div>
                <canvas id="earningsChart" height="200"></canvas>
                <div class="mt-3 d-flex justify-content-around">
                    <div>
                        <span class="badge bg-warning">&nbsp;</span> Domestic
                    </div>
                    <div>
                        <span class="badge bg-primary">&nbsp;</span> Foreign
                    </div>
                </div>
            </div>
        </div>

    </div>

    {{-- Orders Table --}}
    
    <div class="card mt-5">
        <div class="card-header">
            Recent Orders
        </div>
        <div class="card-body p-0">
            <table class="table table-striped mb-0">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ORD-1001</td>
                        <td>John Doe</td>
                        <td><span class="badge bg-success">Completed</span></td>
                        <td>$120.00</td>
                        <td>2026-01-07</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>ORD-1002</td>
                        <td>Jane Smith</td>
                        <td><span class="badge bg-warning text-dark">Pending</span></td>
                        <td>$250.00</td>
                        <td>2026-01-06</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>ORD-1003</td>
                        <td>Michael Lee</td>
                        <td><span class="badge bg-danger">Cancelled</span></td>
                        <td>$0.00</td>
                        <td>2026-01-05</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</div>
@endsection

@push('styles') 
<style>
.box-stat {
    /* background: #f8f9fa; */
    min-width: 220px;
    height: 100%;
}

.icon-box {
    background: #fff;
    width: 30px;     
    height: 30px;     
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%; 

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
</style>
@endpush

@push('scripts')
{{-- Chart.js --}}
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
  
    document.addEventListener("DOMContentLoaded", function () {
    // ===== Orders Line Chart =====
        const ctxOrders = document.getElementById('ordersChart').getContext('2d');
        const ordersChart = 
        new Chart(ctxOrders, {
        type: 'line',
        data: {
            labels: [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ],
            datasets: [
                {
                    label: 'Foreign orders',
                    data: [18, 25, 40, 45, 50, 38, 65, 70, 60, 75, 80, 90],
                    borderColor: 'rgba(66, 133, 244, 1)',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Domestic orders',
                    data: [30, 35, 50, 65, 60, 55, 50, 58, 62, 70, 75, 85],
                    borderColor: 'rgba(255, 159, 28, 1)',
                    backgroundColor: 'rgba(255, 159, 28, 0.1)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' },
                tooltip: { mode: 'index', intersect: false },
            },
            interaction: { mode: 'nearest', intersect: false },
            scales: {
               y: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

        // ===== Earnings Doughnut Chart =====
        const ctxEarnings = document.getElementById('earningsChart').getContext('2d');
        const earningsChart = new Chart(ctxEarnings, {
            type: 'doughnut',
            data: {
                labels: ['Domestic', 'Foreign'],
                datasets: [{
                    data: [65, 35],
                    backgroundColor: ['#FF9F1C', '#4285F4'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false }
                }
            }
        });
    
    })
</script>
@endpush