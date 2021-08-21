export default class ServerApis {
    constructor() {
        this.origin = 'http://localhost:8080';
        this.apiEndpoint = '/api';
        this.userOperationEndpoint = '/user-management';
    };

    login = () => `${this.origin}${this.apiEndpoint}/auth/login`;
    register = () => `${this.origin}${this.apiEndpoint}/auth/register`;
    userConversations = username => `${this.origin}${this.apiEndpoint}/conversations/${username}`;
    allUsers = () => `${this.origin}${this.apiEndpoint}${this.userOperationEndpoint}/users`
}