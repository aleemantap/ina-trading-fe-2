<h6 class="fw-semibold text-muted">Upcoming withdraws</h6>
<hr style="margin-top:-5px;">

@php
$data = [
 ['amount'=>'$47.50','desc'=>'expected to be on Okt 26, 2026','ref'=>'#order id : 1231232131'],
 ['amount'=>'$97.50','desc'=>'expected to be on Okt 29, 2026','ref'=>'#order id : 1231232132'],
 ['amount'=>'$37.50','desc'=>'expected to be on Nov 12, 2026','ref'=>'#order id : 1231232133'],
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


