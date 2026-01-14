<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Login | InaTrading</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Bootstrap 5 --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center">

    {{-- Logo --}}
    <div class="mb-4 text-center">
        <img src="{{ asset('logo.png') }}" alt="logo" style="height:60px;">
    </div>

    {{-- Card --}}
    <div class="card shadow-sm" style="width: 100%; max-width: 420px;">
        <div class="card-body p-4">

            <h4 class="fw-bold mb-4">Sign In</h4>

            {{-- ERROR GLOBAL --}}
            @if ($errors->has('login'))
                <div class="alert alert-danger">
                    {{ $errors->first('login') }}
                </div>
            @endif

            {{-- LOGIN FORM --}}
            <form method="POST" action="{{ route('login.submit') }}">
                @csrf

                {{-- Username --}}
                <div class="mb-3">
                    <label class="form-label">
                        Email or mobile phone number
                    </label>
                    <input
                        type="text"
                        name="username"
                        value="{{ old('username') }}"
                        class="form-control"
                        required
                    >
                </div>

                {{-- Password --}}
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        class="form-control"
                        required
                    >
                </div>

                {{-- Submit --}}
                <button type="submit" class="btn w-100" style="background: #474e76; color:#fff;">
                    Sign in
                </button>
            </form>

            {{-- Agreement --}}
            <p class="text-muted small mt-3">
                By continuing, you agree to Inatrading’s
                <a href="#" class="text-decoration-none">Terms & Conditions</a>
                and
                <a href="#" class="text-decoration-none">Privacy Policy</a>.
            </p>

            {{-- Links --}}
            <div class="d-flex justify-content-between small mt-2">
                <a href="#" class="text-decoration-none">Help?</a>
                <a href="/register" class="text-decoration-none">Register</a>
                <a href="/forgot-password" class="text-decoration-none">Forgot password?</a>
            </div>

            {{-- Divider --}}
            <hr class="my-4">

            <p class="text-center small mb-2">or sign in using</p>

            {{-- INA PAS --}}
            <button class="btn btn-danger w-100 mb-3">
                INA PAS
            </button>

            {{-- Create business --}}
            <div class="text-start small">
                <p class="mb-1 text-muted">Selling your product?</p>
                <a href="/account" class="text-decoration-none fw-semibold">
                    Create free business account
                </a>
            </div>

        </div>
    </div>

</div>

</body>
</html>
