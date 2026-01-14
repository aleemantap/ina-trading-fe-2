import api from "./api";


export const apiGet = (url) => api.get(url);
export const apiPost = (url, data) => api.post(url, data);
export const apiPut = (url, data) => api.put(url, data);
export const apiDelete = (url) => api.delete(url);
// UPLOAD FILE
export const apiUploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post("/file/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};