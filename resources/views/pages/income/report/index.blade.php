@extends('layouts.app')

@section('content')
<div class="p-4">

    <h1 class="fs-6 mb-0">Transaction history</h1>
    <p class="text-muted small border-bottom pb-1">
        View all your site transaction here.
    </p>

    <div class="d-flex justify-content-end ">
        <div class="text-end">
          
        </div>
    </div>

    @include('pages.income.report.transaction-table')

</div>
@endsection
@push('scripts')
<script>
let currentPage = 1;
const pageSize = 10;

function paginate() {
    const rows = Array.from(document.querySelectorAll("#transactionTable tbody tr"))
        .filter(r => r.style.display !== "none");

    const totalPages = Math.ceil(rows.length / pageSize);

    rows.forEach((row, i) => {
        row.style.display =
            i >= (currentPage - 1) * pageSize && i < currentPage * pageSize
            ? ""
            : "none";
    });

    document.getElementById("pageInfo").innerText =
        `Page ${currentPage} of ${totalPages}`;
}

function nextPage() {
    currentPage++;
    paginate();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        paginate();
    }
}

function filterTable() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    document.querySelectorAll("#transactionTable tbody tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(keyword)
            ? ""
            : "none";
    });
    currentPage = 1;
    paginate();
}

document.addEventListener("DOMContentLoaded", paginate);
</script>
@endpush
