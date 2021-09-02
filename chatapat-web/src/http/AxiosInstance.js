import axios from "axios";
import AuthService from "../service/AuthService";
import {unauthenticatedRoutes} from "../routes/AppRoutes";

const axiosInstance = axios.create();
const authService = new AuthService();

axiosInstance.interceptors.request.use(config => {
    const token = authService.getToken();
    if (token && token.length) {
        config.headers['Authorization'] = token;
    }
    return config;
}, error => {
    Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    response => {
        console.log("axiso rESPONSE ",response);
        if (response.headers && (response.headers['authorization'] || response.headers['Authorization'])) {
            console.log("Axious token ", response.headers['authorization']);
            const token = response.headers['authorization']? response.headers['authorization']: response.headers['Authorization'];
            authService.storeToken(token);
        }
        return response;
    },
    error => {
        console.log(error)
        if (error && error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
                    if (window.location.href !== window.location.origin + unauthenticatedRoutes.login.path) {
                        authService.removeToken();
                        authService.removeUsername();
                        authService.removeProfileImage();
                        window.location = window.location.origin + unauthenticatedRoutes.login.path;
                    }
                    break;
                default:
                    break;
            }
        }

        return Promise.reject(error);
    });

export default axiosInstance;