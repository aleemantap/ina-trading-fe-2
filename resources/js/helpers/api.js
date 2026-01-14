import axios from "axios";
import axiosRetry from "axios-retry";

// =====================
// AXIOS INSTANCE
// =====================
const api = axios.create({
    baseURL: window.App.apiBase,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// =====================
// RETRY CONFIG
// =====================
axiosRetry(api, {
    retries: 2,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return (
            axiosRetry.isNetworkError(error) ||
            axiosRetry.isRetryableError(error)
        );
    },
});

// =====================
// REQUEST INTERCEPTOR
// =====================
api.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + window.App.token;
    config.headers["Reference-Number"] = "REF20230708100000001";
    config.headers["Channel-Id"] = "WEB";
    config.headers["Request-Time"] = formatDateAndTime();

    return config;
});

// =====================
// RESPONSE INTERCEPTOR
// =====================
api.interceptors.response.use(
    (response) => response.data, //  AUTO JSON
    async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
            await axios.post("/force-logout", {
                _token: window.App.csrf,
            });

            alert("Session anda habis. Silakan login kembali.");
            window.location.href = "/login";
            return;
        }

        alert("Terjadi kesalahan.");
        return Promise.reject(error);
    }
);

export default api;


//contoh post put delete 

// api.post("/products", {
//     name: productName,
//     price: price,
// });

// api.put(`/products/${id}`, payload);


// api.delete(`/products/${id}`);
