import LoginForm from '../components/login/LoginForm';
import RegistrationFormRedirector from "../components/registration/RegistrationFormRedirector";

const Login = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="display-4 mb-4 mt-4">Chatapat</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-5 login-form">
                    <div className="card-group">
                        <div className="card p-3">
                            <div className="card-body">
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                    <div className="card-group">
                        <div className="card p-0">
                            <div className="card-body">
                                <RegistrationFormRedirector/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
