import WebSocketCommunication from "../http/WebSocketCommunication";
import {useEffect, useMemo} from "react";

const useWebSocketConnection = props => {
    const webSocketCommunication = useMemo( () => new WebSocketCommunication(), []);

    useEffect(() => {
        if(props && props.onMessageReceiveEventHandler) {
            webSocketCommunication.initConnection(props.onMessageReceiveEventHandler);
        }
    }, [webSocketCommunication, props])

    const disconnect = () => {
        webSocketCommunication.closeConnection();
    }

    const sendTextMessage = (message, receiver) => {
        webSocketCommunication.sendTextMessage(message, receiver);
    }

    return {
        disconnect,
        sendTextMessage,
    }

};

export default useWebSocketConnection;