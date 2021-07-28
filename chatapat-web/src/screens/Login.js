import LoginForm from '../components/login/LoginForm';

const Login = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="display-4 mb-5 mt-5">Chatapat</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-5 login-form">
                    <div className="card-group">
                        <div className="card p-4">
                            <div className="card-body">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
