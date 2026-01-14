<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title', 'INA FE')</title>

    {{-- LOAD VITE --}}
    @vite(['resources/js/app.js'])
    @stack('styles')
    
</head>

<body class="app">

@include('layouts.header')

<div class="d-flex">
    @include('layouts.sidebar')

    <main id="mainContent" class="d-flex flex-column">
        <div class="content-wrapper p-4">
            @yield('content')
        </div>

        <footer class="footer">
            &copy; {{ date('Y') }} PT ABCD. All rights reserved.
        </footer>
    </main>
</div>

{{-- JS BIASA TANPA jQuery --}}
<script>
window.API_BASE = '{{ config("services.api.host") }}';
window.csrf_token = '{{ csrf_token() }}';
window.API_TOKEN = '{{ session("api_token") }}';
window.AUTH_USER = {
        name: @json(session('auth_user.name') ?? 'PT Contoh Seller')
    };
window.App = {
    apiBase: '{{ config("services.api.host") }}',
    token: '{{ session("api_token") }}',
    csrf: '{{ csrf_token() }}',
};

document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('sidebarToggle');
    if (!toggle) return;

    const body = document.body;

    if (localStorage.getItem('sidebar') === 'hidden') {
        body.classList.add('sidebar-hidden');
    }

    toggle.addEventListener('click', () => {
        body.classList.toggle('sidebar-hidden');
        localStorage.setItem(
            'sidebar',
            body.classList.contains('sidebar-hidden') ? 'hidden' : 'shown'
        );
    });
});
function formatDateAndTime(date = new Date()) {
    const pad = n => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
</script>

{{-- SCRIPT PAGE (jQuery AMAN DI SINI) --}}
@stack('scripts')

</body>
</html>
