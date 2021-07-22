import GeneralMessage from "../commons/GeneralMessage";

const LoginForm = props => {
    let { getCartData, onSuccess } = props;
    const {
        registerValidationFor,
        onSubmit,
        generalErrorList,
        fieldErrorFor,
        getWarningMessage,
    } = useFormLogin({
        getCartData,
        onSuccess,
    });

    const formElement = (
        <form noValidate id="loginForm" onSubmit={onSubmit}>
            <div className="text-center">
                <img src={melindaLogo} alt="Melinda" />
            </div>
            <p className="text-center login-text">Powered by Melinda®</p>
            <GeneralMessage className="c-msg" errorList={generalErrorList} />
            <Control
                error={fieldErrorFor.username?.message}
                registerRef={registerValidationFor.username}
                name="username"
                type="username"
                placeholder="Username *"
                id="username"
            />
            <Control
                error={fieldErrorFor.password?.message}
                registerRef={registerValidationFor.passwod}
                name="password"
                type="password"
                placeholder="Password *"
                id="password"
            />
            <LoginFormWarningMessage message={getWarningMessage()} />
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
