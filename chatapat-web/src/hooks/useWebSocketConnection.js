import WebSocketCommunication from "../http/WebSocketCommunication";
import {useEffect, useMemo} from "react";

const useWebSocketConnection = props => {
    const webSocketCommunication = useMemo( () => new WebSocketCommunication(), []);

    useEffect(() => {
        if(props && props.onMessageReceiveEventHandler) {
            webSocketCommunication.initConnection(props.onMessageReceiveEventHandler);
        }
    }, [webSocketCommunication])

    const disconnect = () => {
        webSocketCommunication.closeConnection();
    }

    return {
        disconnect,
    }

};

export default useWebSocketConnection;