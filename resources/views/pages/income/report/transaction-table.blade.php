@php
$pageSize = 10;

$data = collect(range(1,30))->map(function($i){

    $fees = 2.50;
    $amount = 40 + $i * 2; // contoh amount
    $total = $amount + $fees;

    return [
        'amount' => '$' . number_format($amount, 2),
        'fees' => '$' . number_format($fees, 2),
        'total' => '$' . number_format($total, 2),

        'status' => $i % 3 === 0 ? 'completed' : ($i % 3 === 1 ? 'upcoming' : 'pending'),
        'status_class' => $i % 3 === 0 ? 'bg-success'
                          : ($i % 3 === 1 ? 'bg-warning' : 'bg-secondary'),
        'date' => "Mar $i, 2022",
        'notes' => $i % 4 === 0 ? 'No issues' : '-'
    ];
});
@endphp

<div class="">

   

    {{-- Table --}}
    <div class="table-responsive border rounded">
        <table class="table table-sm align-middle mb-0" id="transactionTable">
            <thead class="table-light">
                <tr>
                    <th class="p-3">AMOUNT</th>
                    <th class="p-3">DETAIL</th>
                    <th class="p-3">STATUS</th>
                    <th class="p-3">DATE</th>
                    <th class="p-3">NOTES</th>
                    <th class="p-3">ACTION</th>
                </tr>
            </thead>
            <tbody>
                @foreach($data as $row)
                <tr>
                    <td class="p-3">{{ $row['amount'] }}</td>
                    <td class="p-3">
                        <div class="small">
                            <div class="text-muted">fees {{ $row['fees'] }}</div>
                            <div class="fw-medium">total {{ $row['total'] }}</div>
                        </div>
                    </td>
                    <td>
                        <span class="d-inline-flex align-items-center gap-2">
                            <span class="rounded-circle {{ $row['status_class'] }}"
                                  style="width:8px;height:8px"></span>
                            {{ $row['status'] }}
                        </span>
                    </td>
                    <td class="p-3">{{ $row['date'] }}</td>
                    <td class="text-muted p-3">{{ $row['notes'] }}</td>
                    <td class="p-3">
                        @include('pages.income.report.transaction-action-menu')
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- Pagination (JS) --}}
    <div class="d-flex justify-content-between align-items-center mt-3 small">
        <span id="pageInfo" class="text-muted"></span>

        <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-secondary" onclick="prevPage()">Prev</button>
            <button class="btn btn-outline-secondary" onclick="nextPage()">Next</button>
        </div>
    </div>

</div>
