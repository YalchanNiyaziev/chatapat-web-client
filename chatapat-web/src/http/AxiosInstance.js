import axios from "axios";
import AuthService from "../service/AuthService";
import {permittedAllRoutes} from "../routes/AppRoutes";

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
        if(response.headers && response.headers['Authorization']) {
            authService.storeToken(response.headers['Authorization']);
        }
        return response;
    },
        error => {
            switch (error.response.status) {
                case 401:
                    if (window.location.href !== window.location.origin + permittedAllRoutes.login.path) {
                        authService.removeToken();
                        window.location = window.location.origin + permittedAllRoutes.login.path;
                    }
                    break;
                default:
                    break;
            }

            return Promise.reject(error);
    });

export default axiosInstance;