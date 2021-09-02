import React from 'react';
import RegistrationForm from "../components/registration/RegistrationForm";
import LoginFormRedirector from "../components/login/LoginFormRedirector";

export const Register = () => {

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h1 className="display-4 mb-4 mt-4">Chatapat</h1>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-5 register-form">

                    <div className="card-group">
                        <div className="card p-3">
                            <div className="card-body">
                                <RegistrationForm/>
                            </div>
                        </div>
                    </div>

                    <div className="card-group">
                        <div className="card p-0">
                            <div className="card-body">
                                <LoginFormRedirector/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
