@extends('layouts.app')

@section('content')
<div class="p-4">


    <div class="card">
        <div class="card-body text-secondary">
            {{-- BALANCE + CHART --}}
            <div class="row g-2" style="min-height:400px">
                <div class="col-lg-4">
                    @include('pages.income.withdraw.balance-info-card')
                </div>
                <div class="col-lg-8">
                    @include('pages.income.withdraw.balance-chart')
                </div>
            </div>

            {{-- SECTIONS --}}
            <div class="mt-4">
                @include('pages.income.withdraw.recent-withdraws')
            </div>

            <div class="mt-4">
                @include('pages.income.withdraw.upcoming-withdraws')
            </div>

            <div class="mt-4">
                @include('pages.income.withdraw.pending-withdraws')
            </div>
        </div>
    </div>

</div>

@include('pages.income.withdraw.request-withdraw-modal')
@include('pages.income.withdraw.change-account-modal')
@include('pages.income.withdraw.confirm-change-account-modal')
@include('pages.income.withdraw.confirm-wd-modal')

@endsection
