export default class ServerApis {
    constructor() {
        this.origin = 'http://localhost:8080';
        this.apiEndpoint = '/api';
    };

    login = () => `${this.origin}${this.apiEndpoint}/auth/login`;
    register = () => `${this.origin}${this.apiEndpoint}/auth/register`;
}