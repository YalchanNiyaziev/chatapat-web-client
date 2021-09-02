import {NavLink} from "react-router-dom";
import {unauthenticatedRoutes} from "../../routes/AppRoutes";

const RegistrationFormRedirector = () => {
    return (
        <div className="row">
            <div className={'col-12 d-flex align-items-center justify-content-center my-2'}>

                <h6>
                    Don't have an account? <NavLink to={`${unauthenticatedRoutes.register.path}`}>Sign up</NavLink>
                </h6>
            </div>
        </div>
    );
};

export default RegistrationFormRedirector;