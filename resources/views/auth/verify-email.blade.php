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
    <div class="container min-vh-100 d-flex justify-content-center align-items-center">
    <div style="width: 100%; max-width: 480px;">
        
        <!-- Logo -->
        <div class="text-center mb-4">
            <img src="{{ asset('logo.png') }}" alt="logo" style="height:60px;">
        </div>

        <!-- Card -->
        <div class="card shadow border-0 rounded-4">
            <div class="card-body p-5 text-center">

                <!-- Icon -->
                <div class="mb-3">
                    <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width:70px;height:70px;">
                       <img src="{{ asset('img\icons\email-sent.png') }}" alt="email-logo" style="height:30px;">
                    </div>
                </div>

                @if (session('success'))
                    <div class="alert alert-success text-center mb-3">
                        {{ session('success') }}
                    </div>
                @endif

                <!-- Title -->
                <h4 class="fw-bold mb-2">Cek Email Kamu</h4>

                <!-- Description -->
                <p class="text-muted mb-4">
                    Kami sudah mengirim link verifikasi ke email kamu.  
                    Silakan buka email dan klik link tersebut untuk melanjutkan.
                </p>

                <!-- Button -->
                <form method="POST" action="/email/verification-notification">
                    @csrf
                    <button type="submit" class="btn btn-primary w-100 py-2">
                        Kirim Ulang Email
                    </button>
                </form>

                <!-- Info kecil -->
                <p class="text-muted small mt-3 mb-0">
                    Tidak menerima email? Cek folder spam atau klik tombol di atas.
                </p>

            </div>
        </div>

    </div>
</div>
</body>
</html>