<h6 class="fw-semibold text-muted">Recent withdraws</h6>
<hr style="margin-top:-5px;">

@php
$data = [
 ['amount'=>'$99.00','desc'=>'balance updated on Feb 15, 2022','ref'=>'Approved By Ina Trading'],
 ['amount'=>'$38.00','desc'=>'balance updated on Feb 01, 2022','ref'=>'Approved By Ina Trading'],
 ['amount'=>'$99.00','desc'=>'balance updated on Feb 01, 2022','ref'=>'Approved By Ina Trading'],
];
@endphp

@foreach($data as $item)
<div class="row small text-secondary mb-2">
    <div class="col fw-medium">{{ $item['amount'] }}</div>
    <div class="col text-muted">{{ $item['desc'] }}</div>
    <div class="col text-end" style="color:#7A52F0;">{{ $item['ref'] }}</div>
</div>
@endforeach

<div class="text-end">
    <button class="btn  btn-sm" style="color:#1567EF;">Load more</button>
</div>
