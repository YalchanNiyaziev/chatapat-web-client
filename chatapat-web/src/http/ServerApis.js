export default class ServerApis {
    constructor() {
        this.origin = 'http://localhost:8080';
        this.apiEndpoint = '/api';
        this.userOperationEndpoint = '/user-management';
    };

    login = () => `${this.origin}${this.apiEndpoint}/auth/login`;
    register = () => `${this.origin}${this.apiEndpoint}/auth/register`;
    //TODO thing about changing below endoint from /api/conversation/{username} to /api/users/{username}/conversations
    userConversations = username => `${this.origin}${this.apiEndpoint}/conversations/${username}`;
    conversationHistory = conversationId => `${this.origin}${this.apiEndpoint}/conversations/${conversationId}/messages`;
    allUsers = () => `${this.origin}${this.apiEndpoint}${this.userOperationEndpoint}/users`
}