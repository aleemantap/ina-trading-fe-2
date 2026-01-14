<header class="header d-flex justify-content-between align-items-center px-4">

    {{-- LEFT --}}
    <div class="d-flex align-items-center gap-3">
        <button id="sidebarToggle" class="btn p-0 text-white">
            <i class="bi bi-list fs-3"></i>
        </button>

        <img src="/img/logo-ina-merah.png" width="50" height="40" alt="Logo">
    </div>

    {{-- RIGHT --}}
    <div class="d-flex align-items-center gap-4 text-white">

        {{-- Search --}}
        <button class="btn p-0 text-white">
            <i class="bi bi-search fs-5"></i>
        </button>

        {{-- Notification --}}
        <div class="position-relative">
            <button class="btn p-0 text-white">
                <i class="bi bi-bell fs-5"></i>
            </button>
            <span class="position-absolute top-0 start-100 translate-middle
                         badge rounded-pill bg-danger">
                3
            </span>
        </div>

        {{-- Profile --}}
        <div class="dropdown">

            {{-- BUTTON PROFILE (KLIK PANAH) --}}
            <button class="btn p-0 text-white d-flex align-items-center gap-2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">

                <img src="https://i.pravatar.cc/40"
                    class="rounded-circle"
                    width="32"
                    height="32"
                    alt="Avatar">

                <span class="fw-semibold">
                    {{ session('auth_user.name') ?? 'PT Contoh Seller' }}
                </span>

                <i class="bi bi-chevron-down"></i>
            </button>

            {{-- DROPDOWN MENU --}}
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">

                <li>
                    <a class="dropdown-item" href="#">
                        <i class="bi bi-person me-2"></i> Profile
                    </a>
                </li>

                <li>
                    <a class="dropdown-item" href="#">
                        <i class="bi bi-gear me-2"></i> Settings
                    </a>
                </li>

                <li><hr class="dropdown-divider"></li>

                {{-- LOGOUT --}}
                <li>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit"
                                class="dropdown-item text-danger">
                            <i class="bi bi-box-arrow-right me-2"></i> Logout
                        </button>
                    </form>
                </li>
            </ul>
        </div>


    </div>
</header>
