@extends('layouts.app')

@section('title', 'List Product')

@section('content')
<div class="container-fluid p-4">

    <h4 class="mb-4">Hello,  {{ session('auth_user.name') ?? 'PT Contoh Seller' }}</h4>
    <div class="d-flex justify-content-between align-items-center">
        
        <ul class="product-tabs" id="productTabs">
            <li>
                <button class="product-tab active" data-key="all">All Product</button>
            </li>
            <li>
                <button class="product-tab" data-key="draft">Draft</button>
            </li>
            <li>
                <button class="product-tab" data-key="international">International</button>
            </li>
            <li>
                <button class="product-tab" data-key="local">Local Market</button>
            </li>
            <li>
                <button class="product-tab" data-key="outofstock">Out of Stock</button>
            </li>
        </ul>


        {{-- Custom Search --}}
        <div class="product-search" style="margin-top:-15px;">
            <span class="search-icon">
                <i class="bi bi-search"></i>
            </span>

            <input
                type="text"
                id="customSearchInput"
                placeholder="Search your product"
            >

            <button id="btnSearch">
                Search
            </button>
        </div>
    </div>

    <div class="card shadow-sm" style="margin-top:-15px;">
        <div class="card-body">

            <div id="tableLoading" class="d-none mb-2">
                <div class="d-flex align-items-center gap-2 text-muted small">
                    <div class="spinner-border spinner-border-sm text-danger"></div>
                    <span>Loading products...</span>
                </div>
            </div>

            <table id="productTable" class="table table-striped align-middle w-100">
                <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th>PRICE</th>
                        <th>STOCK</th>
                        <th>MARKET</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>

</div>
<!-- DELETE MODAL -->
<div class="modal fade" id="deleteModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete your Product</h5>
      </div>
      <div class="modal-body" style="color : #D35636;">
        Warning: This action is irreversible. The product and all its review data will be permanently removed from the system.
      </div>
      <div class="modal-footer">
        <button class="btn cancel-modal" data-bs-dismiss="modal">Cancel</button>
        <button class="btn confirm-delete-modal" id="btnDeleteConfirm">Confirm & Delete</button>
      </div>
    </div>
  </div>
</div>

<!-- GROUP MODAL -->
<div class="modal fade" id="groupModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Product Group</h5>
      </div>
      <div class="modal-body">
        Are you sure you want to group this product?
      </div>
      <div class="modal-footer">
        <button class="btn cancel-modal" data-bs-dismiss="modal">Cancel</button>
        <button class="btn confirm-delete-modal" id="btnGroupConfirm">Save & Confirm</button>
      </div>
    </div>
  </div>
</div>

@endsection
@push('scripts')
<script>
window.addEventListener('load', function () {

    const apiMap = {
        all: '{{ config("services.api.host") }}/seller/product',
        draft: '{{ config("services.api.host") }}/seller/draft/product',
        international: '{{ config("services.api.host") }}/seller/international/product',
        local: '{{ config("services.api.host") }}/seller/local/product',
        outofstock: '{{ config("services.api.host") }}/seller/outofstock/product'
    };

    let currentApi = apiMap.all;
    let searchParam = '';
    const table = $('#productTable').DataTable({
        processing: false,
        serverSide: true,
        paging: true,
        searching: false,
        pageLength: 10,
        lengthChange: false,
        info: false,
        language: {
        processing: `
            <div class="d-flex align-items-center gap-2">
                <div class="spinner-border text-danger" role="status"></div>
                <span>Loading products...</span>
            </div>
        `,
            zeroRecords: "No products found",
            emptyTable: "No data available"
        },
        ajax: {
            url: currentApi,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer {{ session("api_token") }}',
                'Reference-Number': 'REF20230708100000001',
                'Channel-Id': 'WEB',
                'Request-Time' : formatDateAndTime(),
            },
            data: function (d) {
                return {
                    page: (d.start / d.length) + 1,
                    size: d.length,
                    // param: d.search.value
                    param: searchParam 
                };
            },
            dataSrc: function (json) {
                //  inject metadata ke DataTables

                if (json.responseDesc === 'Access Denied') {
                        alert('Session anda habis. Silakan login kembali.');
                        window.location.href = '/login';
                        return [];
                }

                //return json.rows ?? [];


                json.recordsTotal = json.totalItem;
                json.recordsFiltered = json.totalItem;

                return json.rows;
            },
            error: function (xhr) {
                    if (xhr.status === 401 || xhr.status === 403) {

                        $.post('/force-logout', {
                            _token: '{{ csrf_token() }}'
                        }).always(function () {
                            alert('Session anda habis. Silakan login kembali.');
                            window.location.href = '/login';
                        });

                        return;
                    }

                    alert('Terjadi kesalahan.');
            }
        },

        columns: [
            {
                data: 'name',
                render: (data, type, row) => `
                    <div class="d-flex align-items-center gap-2">
                        <img src="${row.image ?? 'https://via.placeholder.com/52'}"
                             width="52" height="52" class="rounded">
                        <strong>${data}</strong>
                    </div>`
            },
            {
                data: null,
                render: r => `$${Number(r.minPrice).toLocaleString('en')} - $${Number(r.maxPrice).toLocaleString('en')}`
            },
            { data: 'totalStock' },
            {
                data: 'market',
                render: m => `
                    <span class="${marketClass(m)}">
                        ${m}
                    </span>
                `
            },
            {
                data: 'id',
                orderable: false,
                render: id => `
                <div class="d-flex align-items-center gap-2 position-relative">

                    <!-- See Detail -->
                    <a href="/product/${id}"
                    class="btn btn-sm rounded-pill px-4 py-1 text-white" style="background:#00B207;">
                        See Detail
                    </a>

                    <!-- Action Menu -->
                    <div class="dropdown">
                        <button class="btn btn-light btn-sm rounded-circle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                            <li>
                                <a href="#"
                                class="dropdown-item d-flex align-items-center gap-2"
                                onclick="confirmGroup('${id}')">
                                    <i class="bi bi-diagram-3"></i>
                                    Group Product
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                class="dropdown-item text-danger d-flex align-items-center gap-2"
                                onclick="confirmDelete('${id}')">
                                    <i class="bi bi-trash"></i>
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                `
            },
            // {
            //     data: 'id',
            //     orderable: false,
            //     render: id => `
            //         <a href="/product/${id}" class="btn btn-sm btn-success">
            //             See Detail
            //         </a>`
            // }
        ]
    });

    const loadingEl = $('#tableLoading');

    // Show loading sebelum request
    table.on('preXhr.dt', function () {
        loadingEl.removeClass('d-none');
    });

    // Hide loading setelah data masuk
    table.on('xhr.dt', function () {
        loadingEl.addClass('d-none');
    });

    // $('#productTabs').on('click', 'button', function () {
    //     $('#productTabs button').removeClass('active');
    //     $(this).addClass('active');

    //     const key = $(this).data('key');
    //     currentApi = apiMap[key];

    //     loadingEl.removeClass('d-none'); // show loading
    //     table.ajax.url(currentApi).load();
    // });

    $('#productTabs').on('click', '.product-tab', function () {
        $('.product-tab').removeClass('active');
        $(this).addClass('active');

        const key = $(this).data('key');
        currentApi = apiMap[key];

        table.ajax.url(currentApi).load(); // DataTable reload
    });


    // $('#btnSearch').on('click', function () {
    //     searchParam = $('#customSearch').val().trim();
    //     table.ajax.reload(); //  reload endpoint TAB aktif
    // });
    $('#btnSearch').on('click', function () {
        searchParam = $('#customSearchInput').val().trim();
        table.ajax.reload();
    });


    $('#customSearch').on('keypress', function (e) {
        if (e.key === 'Enter') {
            searchParam = this.value.trim();
            table.ajax.reload();
        }
    });

});

// function formatDateTime(date = new Date()) {
//     const pad = n => n.toString().padStart(2, '0');

//     return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
//            `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
// }
function marketClass(market = '') {
    return market.toLowerCase().includes('international')
        ? 'bg-international'
        : 'bg-nonInternational';

     // return 'bg-international';
}

let selectedProductId = null;

// GROUP
function confirmGroup(id) {
    selectedProductId = id;
    const modal = new bootstrap.Modal(document.getElementById('groupModal'));
    modal.show();
}

document.getElementById('btnGroupConfirm')?.addEventListener('click', function () {
    console.log('Group product:', selectedProductId);

    bootstrap.Modal.getInstance(
        document.getElementById('groupModal')
    ).hide();
});

// DELETE
function confirmDelete(id) {
    selectedProductId = id;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}

document.getElementById('btnDeleteConfirm')?.addEventListener('click', function () {
    // console.log('Delete product:', selectedProductId);

    // T call delete API here

    bootstrap.Modal.getInstance(
        document.getElementById('deleteModal')
    ).hide();
});

</script>
@endpush
