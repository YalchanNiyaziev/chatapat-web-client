import HttpRequests from "./HttpRequests";
import ServerApis from "./ServerApis";
import AuthService from "../service/AuthService";

class ApiRequest {
    http = new HttpRequests();
    serverApis = new ServerApis();
    authService = new AuthService();

    constructor() {
        // this.userToken = this.authService.getToken();
        this.requestHeaders = contentType => {
            const headers = {
                'Content-Type': contentType,
            };
            // if(this.userToken) headers['Authorization'] = this.userToken;
            return headers;
        };
    }

    login = data => {
        return this.http.post(
            this.serverApis.login(),
            data,
            this.requestHeaders('application/json')
        );
    };

}

export default ApiRequest;