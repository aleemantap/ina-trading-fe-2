<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="{{ asset('icon.png') }}" type="image/x-icon">
    <title>@yield('title', 'INA FE')</title>

    {{-- LOAD VITE --}}
    @vite(['resources/js/app.js'])
    @stack('styles')
    <style>
         #page-loader {
            position: fixed;
            inset: 0;
            background: #ffffff;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .loader-box {
            text-align: center;
        } 

        /* SEMBUNYIKAN HALAMAN DULU */
        /* body {
            overflow: hidden;
        }  */
    </style>
    
</head>

<body class="app">
    <div id="page-loader">
        <div class="loader-box">
            <div class="spinner-border text-primary" role="status"></div>
            <div class="mt-2 fw-semibold">Loading...</div>
        </div>
    </div>
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

    // loader halaman
    const loader = document.getElementById('page-loader');

    loader.style.opacity = '0';
    loader.style.transition = 'opacity .3s ease';

    setTimeout(() => {
        loader.remove();
        document.body.style.overflow = '';
    }, 300);

    
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
