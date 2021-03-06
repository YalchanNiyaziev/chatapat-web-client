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

    registration = data => {
        return this.http.post(
            this.serverApis.register(),
            data,
            this.requestHeaders('application/json'),
        );
    }

    getUserProfileInfo = username => {
        return this.http.get(
            this.serverApis.currentUserProfileInfo(username),
            this.requestHeaders('application/json')
        );
    };

    getUserConversations = username => {
        return this.http.get(
            this.serverApis.userConversations(username),
            this.requestHeaders('application/json'),
        );
    };

    getUserConnections = username => {
        return this.http.get(
            this.serverApis.validConnections(username),
            this.requestHeaders('application/json'),
        );
    };

    getPendingConnections = username => {
        return this.http.get(
            this.serverApis.pendingConnections(username),
            this.requestHeaders('application/json'),
        );
    };

    getUserBlockedConnections = username => {
        return this.http.get(
            this.serverApis.blockedConnections(username),
            this.requestHeaders('application/json'),
        );
    };

    getChatHistory = conversationId => {
        return this.http.get(
            this.serverApis.conversationHistory(conversationId),
            this.requestHeaders('application/json'),
        );
    }

    searchChatUsersInfo = searchData => {
        return this.http.post(
            this.serverApis.searchChatUsers(),
            searchData,
            this.requestHeaders('application/json'),
        );
    }

    doBlockConnection = (username, blockedUsername) => {
        return this.http.post(
            this.serverApis.blockConnection(username, blockedUsername),
            null,
            this.requestHeaders('application/json'),
        );
    }

    doUnblockConnection = (username, unblockedUsername) => {
        return this.http.delete(
            this.serverApis.unblockConnection(username, unblockedUsername),
            this.requestHeaders('application/json'),
        );
    }

    doRemoveConnection = (username, removedUsername) => {
        return this.http.delete(
            this.serverApis.removeConnection(username, removedUsername),
            this.requestHeaders('application/json'),
        );
    }

    doSendConnectionRequest = (senderName, data) => {
        return this.http.post(
            this.serverApis.sendConnectionRequest(senderName),
            data,
            this.requestHeaders('application/json'),
        );
    };

    doCancelConnectionRequest = (canceledUsername, currentUsername) => {
        return this.http.delete(
            this.serverApis.cancelConnectionRequest(canceledUsername, currentUsername),
            this.requestHeaders('application/json'),
        );
    };

    doAcceptConnectionRequest = (username, acceptedName) => {
        return this.http.put(
            this.serverApis.acceptConnectionRequest(username, acceptedName),
            null,
            this.requestHeaders('application/json'),
        );
    };

    doRejectConnectionRequest = (username, rejectedUsername) => {
        return this.http.delete(
            this.serverApis.rejectConnectionRequest(username, rejectedUsername),
            this.requestHeaders('application/json'),
        );
    };

    //!!! only admin MUST has the athorities to do it
    getAllUsers = () => {
        return this.http.get(
            this.serverApis.allUsers(),
            this.requestHeaders('application/json')
        );
    };


}

export default ApiRequest;