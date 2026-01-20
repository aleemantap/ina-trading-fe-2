@extends('layouts.app')

@section('content')
<div class="container py-4" style="margin-top:-30px;">
     <!-- ===== JUDUL ===== -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 class="fw-semibold">Your Order Detail</h2>
      <p class="text-muted mb-0">
        ORDER ID:
        <span class="fw-medium text-dark">#1234</span>
        <a href="#" class="text-primary text-decoration-none ms-2">Domestic</a>
      </p>
    </div>
  </div>

  <div class="border rounded p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h6 class="fw-semibold mb-0">
        Order Details
        <small class="text-muted fw-normal">
          • 18-Sept-2025 • 2 Product
        </small>
      </h6>

      <a href="/your-orders" class="text-success fw-medium text-decoration-none">
        Back to List
      </a>
    </div>

    <!-- ===== DETAIL ORDER ===== -->
    <div class="border rounded p-1 mb-4">
      <table class="table table-borderless table-sm text-muted mb-0">
        <tbody>
          <tr>
            <td width="30%">Name</td>
            <td width="70%">John Doe</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              Jalan Raya jakarta kota nomer 1. kecamatan pancoran. jakarta selatan
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>JohnDoe@gmail.com</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>(021) 555-0110</td>
          </tr>
          <tr>
            <td>Product Ordered</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Order Time</td>
            <td>18-Sept-2025 10:10:10</td>
          </tr>
          <tr>
            <td>Order Expired Time</td>
            <td>20-Sept-2025 10:10:10</td>
          </tr>
          <tr>
            <td>Estimated Arrival Time</td>
            <td>24-Sept-2025 10:10:10</td>
          </tr>
          <tr>
            <td>Total Weight</td>
            <td>2000 gr</td>
          </tr>
          <tr>
            <td>Total Dimension</td>
            <td>30x20x30 cm</td>
          </tr>
          <tr>
            <td>Shipping Expedition</td>
            <td>Pos Indonesia</td>
          </tr>
          <tr>
            <td>Air Way Bills</td>
            <td>AWB12331231</td>
          </tr>
          <tr>
            <td>Buyer Remarks</td>
            <td>
              Tolong pastikan menggunakan bubble wrap, dan sticker fragile
            </td>
          </tr>
          <tr>
            <td>Invoice Number</td>
            <td>INV-18092025-K311-01</td>
          </tr>
          <tr>
            <td>Order Status</td>
            <td>
              <span class="badge bg-warning text-dark">
                Waiting Seller Confirmation
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ===== PRODUK ===== -->
    <div class="border rounded-1 p-3" style="background: #fff;">
      <div class="row bg-light text-muted fw-medium py-2">
        <div class="col-5">PRODUCT</div>
        <div class="col-2">PRICE</div>
        <div class="col-2">QUANTITY</div>
        <div class="col-3">SUBTOTAL</div>
      </div>

      <!-- Product Item -->
      <div class="row align-items-center py-3 border-top">
        <div class="col-5 d-flex align-items-center gap-3">
          <img
            src="https://picsum.photos/seed/2/60"
            width="60"
            height="60"
            class="rounded border"
            alt=""
          />
          <div>
            <div class="fw-medium">Iphone 17 Promax</div>
            <small class="text-muted">Metallic Black 512GB</small>
          </div>
        </div>
        <div class="col-2">$360.00</div>
        <div class="col-2">x1</div>
        <div class="col-3">$360.00</div>
      </div>

      <div class="row align-items-center py-3 border-top">
        <div class="col-5 d-flex align-items-center gap-3">
          <img
            src="https://picsum.photos/seed/3/60"
            width="60"
            height="60"
            class="rounded border"
            alt=""
          />
          <div>
            <div class="fw-medium">Leather Case Iphone 17 Promax</div>
            <small class="text-muted">Magnetic with button</small>
          </div>
        </div>
        <div class="col-2">$5.00</div>
        <div class="col-2">x1</div>
        <div class="col-3">$5.00</div>
      </div>

      <!-- TOTAL -->
      <div class="row border-top py-3 fw-semibold">
        <div class="col-7"></div>
        <div class="col-2">Total</div>
        <div class="col-3">$365.00</div>
      </div>
    </div>
  </div>
</div>
@endsection

@push('styles') 
<style>

</style>
@endpush
