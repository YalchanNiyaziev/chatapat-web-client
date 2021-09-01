import AuthService from "../service/AuthService";
import {useHistory} from "react-router-dom";
import {permittedAllRoutes} from "../routes/AppRoutes";
import {useMemo} from "react";
import WebSocketCommunication from "../http/WebSocketCommunication";

const useAppLogout = props => {
    const authService = new AuthService();
    let history = useHistory();
    const webSocketCommunication = useMemo( () => new WebSocketCommunication(), []);



    const logout = () => {
        if(props && props.logutCallbacks) {
            props.logutCallbacks.forEach(logoutCallback => {
                logoutCallback();
            });
        }
        webSocketCommunication.closeConnection();
        //TODO use REDUX
        authService.removeToken();
        authService.removeUsername();
        authService.removeProfileImage();
        history.push(permittedAllRoutes.login.path);
    }
    return {
        logout,
    }
}

export default useAppLogout;