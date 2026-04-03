<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Register | InaTrading</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="{{ asset('icon.png') }}" type="image/x-icon">

    {{-- Bootstrap 5 --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    {{-- Bootstrap Icons --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
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

            <h4 class="fw-bold mb-4">Create Account</h4>

            {{-- GLOBAL ERROR --}}
            @if ($errors->any())
                <div class="alert alert-danger">
                    {{ $errors->first() }}
                </div>
            @endif

            {{-- @if ($errors->has('api_error'))
                <div class="alert alert-danger">
                    {{ $errors->first('api_error') }}
                </div>
            @endif --}}

            {{-- REGISTER FORM --}}
            <form method="POST" action="{{ route('register.submit') }}">
                @csrf

                {{-- Name --}}
                <div class="mb-3">
                    <label class="form-label">Your name</label>
                    <input
                        type="text"
                        name="name"
                        value="{{ old('name') }}"
                        class="form-control @error('name') is-invalid @enderror"
                        required
                    >
                    @error('name')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                {{-- Email --}}
                <div class="mb-3">
                    <label class="form-label">Your Email</label>
                    <input
                        type="email"
                        name="email"
                        value="{{ old('email') }}"
                        class="form-control @error('email') is-invalid @enderror"
                        required
                    >
                    @error('email')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                {{-- Mobile --}}
                <div class="mb-3">
                    <label class="form-label">Mobile number</label>
                    <input
                        type="text"
                        name="mobile"
                        value="{{ old('mobile') }}"
                        class="form-control @error('mobile') is-invalid @enderror"
                        required
                    >
                    @error('mobile')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>

                {{-- Password --}}
                <div class="mb-3">
                    <label class="form-label">Password (at least 6 characters)</label>
                    <div class="input-group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            class="form-control @error('password') is-invalid @enderror"
                            required
                        >
                        <button type="button" class="btn btn-outline-secondary toggle-password" data-target="password">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                    @error('password')
                        <div class="invalid-feedback d-block">{{ $message }}</div>
                    @enderror
                </div>

                {{-- Confirm Password --}}
                <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <div class="input-group">
                        <input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            class="form-control"
                            required
                        >
                        <button type="button" class="btn btn-outline-secondary toggle-password" data-target="password_confirmation">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </div>

                {{-- Submit --}}
                <button type="submit"
                        id="registerBtn"
                        class="btn w-100 d-flex align-items-center justify-content-center gap-2"
                        style="background: #474e76; color:#fff;">

                    <span class="btn-text">Submit</span>

                    <span class="btn-spinner d-none">
                        <span class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"></span>
                    </span>
                </button>

            </form>

            {{-- Already have account --}}
            <p class="small mt-3">
                Already have an account?
                <a href="{{ route('login') }}" class="text-decoration-none fw-semibold">
                    Sign in
                </a>
            </p>

            {{-- Terms --}}
            <p class="text-muted small mt-3">
                By creating an account, you agree to InaTrading’s
                <a href="#" class="text-decoration-none">Terms & Conditions</a>
                and
                <a href="#" class="text-decoration-none">Privacy Policy</a>.
            </p>

        </div>
    </div>

</div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

<script>
    // Loading Button
    $('form').on('submit', function () {
        const btn = $('#registerBtn');

        btn.prop('disabled', true);
        btn.find('.btn-text').text('Processing...');
        btn.find('.btn-spinner').removeClass('d-none');
    });

    // Toggle Password
    $('.toggle-password').on('click', function () {
        const target = $(this).data('target');
        const input = $('#' + target);
        const icon = $(this).find('i');

        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });
</script>

</body>
</html>