import axios from "axios";
import axiosRetry from "axios-retry";

// =====================
// AXIOS INSTANCE
// =====================
const api = axios.create({
    baseURL: window.App.apiBase,
    timeout:  60000,
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

api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        // NETWORK / TIMEOUT
        if (!error.response) {
            console.error("Network / Timeout Error:", error.message);

            return Promise.reject({
                responseCode: "NETWORK_ERROR",
                responseDesc: "Server tidak merespon / timeout",
            });
        }

        const status = error.response.status;
        const data = error.response.data;

        // AUTH EXPIRED
        if (status === 401 || status === 403) {
            await axios.post("/force-logout", {
                _token: window.App.csrf,
            });

            window.location.href = "/login";
            return Promise.reject(data);
        }
         console.log("status", status);
         console.log("data", data);
        // API GENERAL ERROR
        if (data?.responseCode === "999999") {
            return Promise.reject(data);
        }

        return Promise.reject(data);
    }
);


export default api;


//contoh post put delete 

// api.post("/products", {
//     name: productName,
//     price: price,
// });



// api.delete(`/products/${id}`);
