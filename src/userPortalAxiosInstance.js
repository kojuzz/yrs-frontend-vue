import axios from "axios";
import { Notify } from "vant";

const userPortalAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_END_POINT,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

// Request Interceptor
userPortalAxiosInstance.interceptors.request.use(
    function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
);

// Response Interceptor
userPortalAxiosInstance.interceptors.response.use(
    function (response) {
        return response;
    }, function (error) {
        if (error.response) {
            const status = error.response.status;
            if (status === 500) {
                showNotify({
                    type: "danger",
                    message: "Internal Server Error",
                    position: "bottom",
                });
            } else if (status === 422) {
                showNotify({
                    type: "danger",
                    message: error.response.data.message,
                    position: "bottom",
                });
            } else if (status === 403) {
                showNotify({
                    type: "danger",
                    message: error.response.data.message,
                    position: "bottom",
                });
            }
        } else {
            console.log("Error", error.message);
        }
        return Promise.reject(error);
    }
);

export default userPortalAxiosInstance;