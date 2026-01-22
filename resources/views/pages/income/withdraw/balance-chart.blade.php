<div class="card h-100  border-0 shadow-none"">
    <div class="card-body">

        <div class="mb-3">
            <div class="text-muted">Balance</div>
            <div class="fw-bold fs-4">$1200.00</div>
        </div>

        <canvas id="balanceChart" height="120"></canvas>
    </div>
</div>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
new Chart(document.getElementById('balanceChart'), {
    type: 'bar',
    data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [{
            data: [2000,5000,3000,9000,4000,7000,6000,8000,3000,5000,9000,10000],
            backgroundColor: '#916FF8',
            borderRadius: 6,
            barThickness: 16
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                max: 10000,
                grid: {
                    borderDash: [6, 6],
                    color: '#ddd',
                    lineWidth: 0.5,
                    drawBorder: false
                },
                ticks: {
                    callback: function(value) {
                        return '$' + (value / 1000) + 'K';
                    }
                }
            }
        }
    }
});


</script>
@endpush
