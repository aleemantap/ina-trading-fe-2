<ul class="nav nav-tabs border-bottom mb-3" role="tablist">
    @php
        $tabs = [
            'orders' => 'Orders',
            'waiting' => 'Waiting Confirmation',
            'not-yet-shipped' => 'Not Yet Shipped',
            'shipped' => 'Shipped',
            'cancelled' => 'Cancelled Orders',
            'completed' => 'Completed'
        ];
    @endphp

    @foreach($tabs as $id => $label)
        <li class="nav-item" role="presentation">
            <button class="nav-link {{ $loop->first ? 'active fw-semibold' : '' }}"
                    data-bs-toggle="tab"
                    data-bs-target="#{{ $id }}"
                    type="button">
                {{ $label }}
            </button>
        </li>
    @endforeach
</ul>
