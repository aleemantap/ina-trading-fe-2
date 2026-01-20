@php
$trackingData = [
    [
        'status' => 'Delivered, parcel locker',
        'location' => 'PROVIDENCE, RI 02903',
        'date' => 'April 3, 2023, 4:23pm',
        'completed' => true,
    ],
    [
        'status' => 'Out for delivery',
        'location' => 'PROVIDENCE, RI 02903',
        'date' => 'April 3, 2023, 7:37am',
        'completed' => false,
    ],
    [
        'status' => 'Arrived at post office',
        'location' => 'PROVIDENCE, RI 02903',
        'date' => 'April 3, 2023, 7:26am',
        'completed' => false,
    ],
    [
        'status' => 'Departed USPS regional facility',
        'location' => 'PROVIDENCE, RI 02903',
        'date' => 'April 3, 2023, 3:47am',
        'completed' => false,
    ],
    [
        'status' => 'In transit to next facility',
        'location' => '',
        'date' => 'April 2, 2023',
        'completed' => false,
    ],
    [
        'status' => 'Departed post office',
        'location' => 'NEW YORK, NY 10013',
        'date' => 'March 31, 2023, 6:04pm',
        'completed' => false,
    ],
];
@endphp
<style>
    .timeline-container {
        position: relative;
        padding-left: 30px;
    }
    
    .timeline-line {
        position: absolute;
        left: 15px;
        top: 15px;
        bottom: 15px;
        width: 2px;
        background-color: #126DA0;
        z-index: 1;
    }
    
    .timeline-item {
        position: relative;
        margin-bottom: 25px;
        padding-bottom: 10px;
    }
    
    .timeline-item:not(:last-child)::before {
        content: '';
        position: absolute;
        left: -24px;
        top: 25px;
        bottom: -25px;
        width: 2px;
        background-color: #126DA0;
        z-index: 1;
    }
    
    .timeline-dot {
        position: absolute;
        left: -30px;
        top: 5px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #126DA0;
        z-index: 2;
    }
    
    .timeline-dot.completed {
        width: 24px;
        height: 24px;
        left: -36px;
        background-color: #2F6926;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -7px; 
    }
    
    .timeline-dot.completed i {
        font-size: 12px;
        color: white;
    }
    
    .timeline-content h6 {
        margin-bottom: 5px;
    }
</style>

<div class="container mt-5">
    <div class="row g-5">

        {{-- LEFT : TIMELINE --}}
        <div class="col-lg-6 p-3" style="background:#fff;border-radius:5px;">
            <div class="timeline-container">
                @foreach($trackingData as $item)
                <div class="timeline-item">
                    {{-- DOT --}}
                    <div class="timeline-dot {{ $item['completed'] ? 'completed' : '' }}">
                        @if($item['completed'])
                        <i class="bi bi-check"></i>
                        @endif
                    </div>

                    {{-- CONTENT --}}
                    <div class="timeline-content">
                        <h6 class="fw-semibold mb-1 {{ $item['completed'] ? 'text-success' : 'text-primary' }}">
                            {{ $item['status'] }}
                        </h6>
                        <div class="text-muted small">{{ $item['location'] }}</div>
                        <div class="text-secondary small">{{ $item['date'] }}</div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>

        {{-- RIGHT : PRODUCT LIST (sama seperti di atas) --}}
         {{-- RIGHT : MAP --}}
        <div class="col-lg-6">
           
    {{-- HEADER --}}
    <div class="px-3 py-2 fw-semibold text-secondary small" style="background-color: #eaefee">
        PRODUCT
    </div>

    {{-- PRODUCT ITEM --}}
    <div class="list-group list-group-flush">

        {{-- ITEM 1 --}}
                <div class="list-group-item py-3">
                    <div class="d-flex align-items-center gap-3">

                        {{-- IMAGE --}}
                        <img
                            src="https://picsum.photos/seed/2/60"
                            width="60"
                            height="60"
                            class="rounded border"
                            alt=""
                        />

                        {{-- INFO --}}
                        <div>
                            <div class="fw-semibold">
                                Iphone 17 Promax
                            </div>
                            <div class="text-muted small">
                                Metallic Black 512GB
                            </div>
                        </div>

                    </div>
                </div>

                {{-- ITEM 2 --}}
                <div class="list-group-item py-3">
                    <div class="d-flex align-items-center gap-3">

                        {{-- IMAGE --}}
                        <img
                            src="https://picsum.photos/seed/3/60"
                            width="60"
                            height="60"
                            class="rounded border"
                            alt=""
                        />

                        {{-- INFO --}}
                        <div>
                            <div class="fw-semibold">
                                Leather Case Iphone 17 promax
                            </div>
                            <div class="text-muted small">
                                Magnetic with button
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>


    </div>
</div>