import axiosInstance from "./AxiosInstance";

export default class HttpRequests {

    get = (endpoint, config) => {
        return axiosInstance.get(endpoint, config);
    };

    post = (endpoint, data, config) => {
      return axiosInstance.post(endpoint, data, config);
    };

    put = (endpoint, data, config) => {
        return axiosInstance.put(endpoint, data, config);
    };

    delete = (endpoint, config) => {
        return axiosInstance.delete(endpoint, config);
    };
}