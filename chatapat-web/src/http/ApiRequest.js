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


    //!!! only admin MUST has the athorities to do it
    getAllUsers = () =>{
        return this.http.get(
            this.serverApis.allUsers(),
            this.requestHeaders('application/json')
        );
    };


}

export default ApiRequest;