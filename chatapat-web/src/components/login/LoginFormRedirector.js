import {NavLink} from "react-router-dom";
import {unauthenticatedRoutes} from "../../routes/AppRoutes";

const LoginFormRedirector = () => {
    return (
        <div className="row">
            <div className={'col-12 d-flex align-items-center justify-content-center my-1'}>

                <h6>
                    Already have an account? <NavLink to={`${unauthenticatedRoutes.login.path}`}>Sign in</NavLink>
                </h6>
            </div>
        </div>
    );
};

export default LoginFormRedirector;