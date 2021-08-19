import GeneralMessage from "../commons/GeneralMessage";
import useFormLogin from "../../hooks/useFormLogin";
import InputControl from "../commons/control/InputControl";
import './Login.css';
import {Link, NavLink} from "react-router-dom";
import chatapatLogo from '../../images/logo192.png';
import {permittedAllRoutes} from "../../routes/AppRoutes";


const LoginForm = props => {
    let {getCartData, onSuccess} = props;
    const {
        registerValidationFor,
        onSubmit,
        generalErrorList,
        fieldErrorFor,
    } = useFormLogin(props);
    // {
    //     getCartData,
    //     onSuccess,
    // });

    const formElement = (
        <form noValidate id="loginForm" onSubmit={onSubmit}>
            <div className="text-center">
                <img src={chatapatLogo} alt="Chatapat logo"/>
            </div>
            <p className="text-center login-text">Powered by Chatapat®</p>
            <GeneralMessage className="c-msg" errorList={generalErrorList}/>
            <InputControl
                error={fieldErrorFor.username?.message}
                registerRef={registerValidationFor.username}
                name="username"
                type="username"
                placeholder="Username *"
                id="username"
            />
            <InputControl
                error={fieldErrorFor.password?.message}
                registerRef={registerValidationFor.password}
                name="password"
                type="password"
                placeholder="Password *"
                id="password"
            />
            <div className="row">
                <div className={'col-12 d-flex align-items-center justify-content-end'}>
                    <button className="btn w-100 btn-outline-warning " type="submit">
                        Login
                    </button>
                </div>
            </div>
            <div className="row">
                <div className={'col-12 d-flex align-items-center justify-content-center mt-3'}>
                    <h6>
                        <Link to={permittedAllRoutes.forgotPass}>Forgot Password?</Link>
                    </h6>
                </div>
            </div>


            {/*<div className={'col-4'}>*/}
            {/*    <button className="btn btn-outline-info px-4" type="submit">*/}
            {/*        Register*/}
            {/*    </button>*/}
            {/*</div>*/}
            {/*<div className={'col-4'}>*/}
            {/*    <button className="btn btn-outline-dark px-2" type="submit">*/}
            {/*        Forgot pass*/}
            {/*    </button>*/}
            {/*</div>*/}
        </form>
    );

    return formElement;
};

export default LoginForm;
