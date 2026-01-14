@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<div class="p-4">

    {{-- Welcome --}}
    <h1 class="h3 mb-1 fw-bold">Welcome Back, {{ session('auth_user.name') }}</h1>
    <p class="text-muted mb-4">
        Here is the information about all your orders and products
    </p>

    {{-- Stats Group --}}
    <div class="d-flex flex-wrap gap-3 mb-4">
        {{-- Card 1: Total products --}}
        <div class="card flex-fill position-relative" style="min-width: 220px;">
            <div class="position-absolute top-0 end-0 p-2 bg-light rounded m-2">
                <i class="fas fa-box"></i>
            </div>
            <div class="card-body">
                <p class="h4 fw-bold mb-0">100</p>
                <p class="text-muted mb-1">Total products</p>
                <p class="text-success small mb-0">▲ 3.1 +0.49% this week</p>
            </div>
        </div>

        {{-- Card 2: Total buyers --}}
        <div class="card flex-fill position-relative" style="min-width: 220px;">
            <div class="position-absolute top-0 end-0 p-2 bg-light rounded m-2">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="card-body">
                <p class="h4 fw-bold mb-0">10,827</p>
                <p class="text-muted mb-1">Total buyers</p>
                <p class="text-danger small mb-0">▼ 2.56 -0.91% this week</p>
            </div>
        </div>

        {{-- Card 3: Refunded --}}
        <div class="card flex-fill position-relative" style="min-width: 220px;">
            <div class="position-absolute top-0 end-0 p-2 bg-light rounded m-2">
                <i class="fas fa-undo"></i>
            </div>
            <div class="card-body">
                <p class="h4 fw-bold mb-0">957</p>
                <p class="text-muted mb-1">Refunded</p>
                <p class="text-success small mb-0">▲ 7.2 +1.51% this week</p>
            </div>
        </div>
    </div>

    <h1 class="h3 mb-3 fw-bold">Orders Analytics</h1>

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
                <canvas id="ordersChart" height="150"></canvas>
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


@section('scripts')
{{-- Chart.js --}}
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    // ===== Orders Line Chart =====
    const ctxOrders = document.getElementById('ordersChart').getContext('2d');
    const ordersChart = new Chart(ctxOrders, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Foreign orders',
                    data: [18, 25, 60, 45, 40, 38, 65],
                    borderColor: 'rgba(66, 133, 244, 1)',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    tension: 0.4,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Domestic orders',
                    data: [30, 35, 55, 65, 60, 55, 50],
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
                y: { beginAtZero: true, ticks: { stepSize: 20 } }
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
</script>
@endsection