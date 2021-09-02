import AuthService from "../service/AuthService";
import {useHistory} from "react-router-dom";
import {unauthenticatedRoutes} from "../routes/AppRoutes";

const useAppLogout = props => {
    const authService = new AuthService();
    let history = useHistory();

    const logout = () => {
        if(props && props.logutCallbacks) {
            props.logutCallbacks.forEach(logoutCallback => {
                logoutCallback();
            });
        }
        //TODO use REDUX
        authService.removeToken();
        authService.removeUsername();
        authService.removeProfileImage();
        history.replace(unauthenticatedRoutes.login.path);
    }
    return {
        logout,
    }
}

export default useAppLogout;