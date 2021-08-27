import ServerApis from "./ServerApis";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
import AuthService from "../service/AuthService";

class WebSocketCommunication {
    constructor() {
        this.serverApis = new ServerApis();
        this.wsClient = null;
        this.stompClient = null;
        this.authService = new AuthService();
    }

    initConnection = (onMessageReceiveEventHandler) => {
        if (!this.wsClient && !this.stompClient && onMessageReceiveEventHandler) {
            this.wsClient = new SockJS(this.serverApis.websocket.connect());
            this.stompClient = Stomp.over(this.wsClient);
            const jwt = this.authService.getToken()
            if (jwt && jwt.length) {
                console.log('webSocket jwt', jwt);
                this.stompClient.connect(
                    {
                        "Authorization": jwt,
                    },
                    frame => {
                        console.log('Chatapat Frame: ', frame);

                        this.stompClient.subscribe(`/user/queue/messages`, userSpecificMessage => {
                            console.log('You received user specific message' + userSpecificMessage);
                            onMessageReceiveEventHandler(userSpecificMessage);
                        });
                    }
                );
            } else {
                console.log("Can not find jwt")
            }
        }
    };

    closeConnection = () => {
        if(this.wsClient && this.stompClient) {
            this.stompClient.disconnect();
            this.wsClient.close();
            console.log("Successfully disconnected from websockets")
        }
        console.log("Error when closing websocket connection")
    };
}

export default WebSocketCommunication;