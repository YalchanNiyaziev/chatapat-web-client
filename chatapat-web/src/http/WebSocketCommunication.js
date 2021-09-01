import ServerApis from "./ServerApis";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs';
import AuthService from "../service/AuthService";
import {text} from "@fortawesome/fontawesome-svg-core";

class WebSocketCommunication {
    constructor() {
        this.serverApis = new ServerApis();
        this.wsClient = null;
        this.stompClient = null;
        this.authService = new AuthService();
        this.connected = false;
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
                            this.connected = true;
                            const payload = JSON.parse(userSpecificMessage.body);
                            console.log("Recieved MESSAGE PAYLOAD ", payload);
                            onMessageReceiveEventHandler(payload);
                        });
                    }
                );
            } else {
                console.log("Can not find jwt")
            }
        } else {
            console.log("CAN NOT ESTABLISH WEB-SOCKED CONNECTION")
        }
    };

    closeConnection = () => {
        if (this.isConnected()) {
            this.stompClient.disconnect();
            this.wsClient.close();
            console.log("Successfully disconnected from websockets")
        } else {
            console.log("Error when closing websocket connection")
        }
    };

    sendTextMessage = (textMessage, receiver) => {
        console.log("@@@ connected: ", this.isConnected());
        console.log("@@@@ MESSAGE", textMessage);
        console.log("@@@@ Receiver", receiver)

        if (this.isConnected() && textMessage && textMessage.length) {
            console.log("@@@@ Message Sending");
            const payload = {
                content: textMessage,
                senderName: this.authService.getUsername(),
                receiverName: receiver,
            }

            this.stompClient.send(this.serverApis.websocket.sendTextMessage(),
                {},
                JSON.stringify(payload));
        } else {
            console.log("@@@@@@@@@@@@@@ CAN NOT SEND MESSAGE")
        }

    }

    isConnected = () => {
        return this.wsClient != null && this.stompClient != null;
    }



}

export default WebSocketCommunication;