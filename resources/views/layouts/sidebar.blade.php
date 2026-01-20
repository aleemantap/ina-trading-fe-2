<aside id="sidebar" 
       class="border-end bg-white d-flex flex-column justify-content-between"
       style="width:260px; min-height:100vh; transition: transform 0.3s ease;">

    <nav class="nav flex-column py-3">

        {{-- OVERVIEW --}}
        <a href="{{ route('dashboard') }}"
           class="nav-link d-flex align-items-center gap-3 px-4
           {{ request()->routeIs('dashboard') ? 'active text-danger fw-semibold' : 'text-secondary' }}">
            <img src="/img/icons/overview.png" width="20">
            <span>Overview</span>
        </a>

        {{-- PRODUCT --}}
        <button class="nav-link d-flex justify-content-between align-items-center px-4 text-secondary"
                data-bs-toggle="collapse"
                data-bs-target="#menuProduct">
            <div class="d-flex align-items-center gap-3">
                <img src="/img/icons/product.png" width="20">
                <span>Product</span>
            </div>
            <i class="bi bi-chevron-down"></i>
        </button>

        <div class="collapse ps-5" id="menuProduct">
            <a href="{{ route('post.product') }}"
                class="nav-link {{ request()->routeIs('post.product') ? 'text-danger fw-semibold' : 'text-secondary' }}">
                    Post Product
            </a>

            <a href="{{ route('list.product') }}"
                class="nav-link {{ request()->routeIs('list.product') ? 'text-danger fw-semibold' : 'text-secondary' }}">
                    List Product
            </a>
        </div>

        {{-- ORDERS --}}
        <a href="{{ route('your.orders') }}"
           class="nav-link d-flex align-items-center gap-3 px-4 text-secondary">
            <img src="/img/icons/orders.png" width="20">
            <span>Orders</span>
            <span class="badge bg-danger ms-auto">3</span>
        </a>
        {{-- <hr> --}}

        {{-- <small class="text-uppercase text-muted px-4">Admin</small> --}}

        {{-- incame & report --}}
        <button class="nav-link d-flex justify-content-between align-items-center px-4 text-secondary"
                data-bs-toggle="collapse"
                data-bs-target="#menuIncome">
            <div class="d-flex align-items-center gap-3">
                <img src="/img/icons/globe2.png" width="20">
                <span>Income & Report</span>
            </div>
            <i class="bi bi-chevron-down"></i>
        </button>
        <div class="collapse ps-5" id="menuIncome">
            <a href="{{ route('income.balance') }}"
                class="nav-link {{ request()->routeIs('income.balance') ? 'text-danger fw-semibold' : 'text-secondary' }}">
                   Income
            </a>

            <a href="{{ route('income.report') }}"
                class="nav-link {{ request()->routeIs('income.report') ? 'text-danger fw-semibold' : 'text-secondary' }}">
                    Report
            </a>
        </div>

        {{-- SETTINGS --}}
        <button class="nav-link d-flex justify-content-between align-items-center px-4 text-secondary"
                data-bs-toggle="collapse"
                data-bs-target="#menuSetting">
            <div class="d-flex align-items-center gap-3">
                <img src="/img/icons/setting.png" width="20">
                <span>Settings</span>
            </div>
            <i class="bi bi-chevron-down"></i>
        </button>

        <div class="collapse ps-5" id="menuSetting">
            <a href="{{ route('your.profile') }}" class="nav-link text-secondary">Store Profile</a>
        </div>
    </nav>

    {{-- LOGOUT --}}
    <div class="p-4 border-top">
        <button type="button" class="btn w-100 text-start  d-flex align-items-center gap-2 text-secondary">
            <img src="/img/icons/info.png" width="20">
            Help Center
        </button>
        <button type="button" class="btn w-100 text-start  d-flex align-items-center gap-2 text-secondary">
            <img src="/img/icons/contact.png" width="20">
            Contact Us
        </button>
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button class="btn w-100 text-start text-danger d-flex align-items-center gap-2">
                <img src="/img/icons/logout.png" width="20">
                Log out
            </button>
        </form>
    </div>
</aside>
