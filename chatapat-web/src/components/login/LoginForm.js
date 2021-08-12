import GeneralMessage from "../commons/GeneralMessage";
import useFormLogin from "../../hooks/useFormLogin";
import InputControl from "../commons/control/InputControl";
import './Login.css';


const LoginForm = props => {
    let { getCartData, onSuccess } = props;
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
                <img src="../../../public/logo192.png" alt="Chatapat logo" />
            </div>
            <p className="text-center login-text">Powered by Chatapat®</p>
            <GeneralMessage className="c-msg" errorList={generalErrorList} />
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
            {/*<LoginFormWarningMessage message={getWarningMessage()} />*/}
            <div className="row">
                <div className={'col-6'}>
                    <button className="btn btn-primary px-4" type="submit">
                        Login
                    </button>
                </div>
            </div>
        </form>
    );

    return formElement;
};

export default LoginForm;
