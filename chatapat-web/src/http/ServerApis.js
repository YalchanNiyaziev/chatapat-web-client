export default class ServerApis {
    constructor() {
        this.origin = 'http://localhost:8080';
        this.apiEndpoint = '/api';
        this.userOperationEndpoint = '/user-management'
        this.wsConnectionEndpoint = `/ws-connect`;
        this.userConnectionsEndpoint = '/user-connections';
    };

    login = () => `${this.origin}${this.apiEndpoint}/auth/login`;
    register = () => `${this.origin}${this.apiEndpoint}/auth/register`;
    //TODO thing about changing below endoint from /api/conversation/{username} to /api/users/{username}/conversations
    userConversations = username => `${this.origin}${this.apiEndpoint}/conversations/${username}`;
    conversationHistory = conversationId => `${this.origin}${this.apiEndpoint}/conversations/${conversationId}/messages`;
    currentUserProfileInfo = username => `${this.origin}${this.apiEndpoint}${this.userOperationEndpoint}/users/${username}`;
    searchChatUsers = () => `${this.origin}${this.apiEndpoint}${this.userOperationEndpoint}/users/search`;
    allUsers = () => `${this.origin}${this.apiEndpoint}${this.userOperationEndpoint}/users`;
    validConnections = username => `${this.origin}${this.apiEndpoint}${this.userConnectionsEndpoint}/users/${username}`;
    pendingConnections = username => `${this.origin}${this.apiEndpoint}${this.userConnectionsEndpoint}/users/${username}/pending-connections`
    blockedConnections = username => `${this.origin}${this.apiEndpoint}${this.userConnectionsEndpoint}/users/${username}/blocks`

    websocket = {
        connect: () => `${this.origin}${this.wsConnectionEndpoint}`,
        sendTextMessage: () => `/chat/message`,
    };

}