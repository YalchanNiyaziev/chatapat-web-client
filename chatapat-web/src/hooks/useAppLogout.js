import AuthService from "../service/AuthService";
import {useHistory} from "react-router-dom";
import {permittedAllRoutes} from "../routes/AppRoutes";

const useAppLogout = props => {
    const authService = new AuthService();
    let history = useHistory();


    const logout = () => {
        // TODO use REDUX
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