import {useState} from "react";
import ApiRequest from "../http/ApiRequest";
import {useForm} from "react-hook-form";
import ValidatorService from "../service/ValidatorService";
import {authenticatedRoutes} from "../routes/AppRoutes";
import {useHistory} from "react-router-dom";
import axiosErrorHandler from '../http/AxiosErrorHandler';
import AuthService from "../service/AuthService";


const useFormLogin = props => {
    const api = new ApiRequest();
    const authService = new AuthService()
    const validator = new ValidatorService();
    const {register, handleSubmit, errors} = useForm();
    const [generalErrorList, setGeneralErrorList] = useState([]);
    let history = useHistory();

    const onSubmit = (data) => {
        console.log(data);
        if(data.username && data.password){
            api.login(data)
                .then(res => {
                    // console.log(res);
                    // api.getAllUsers()
                    //     .then(res => res)
                    //TODO move it to REDUX STORAGE
                    authService.storeUsername(data.username);
                    history.push(authenticatedRoutes.main.path);
                })
                .catch( err => {
                    console.log('login erro$', err);
                    if (err.response.status === 401) {
                        setGeneralErrorList([validator.errorMessages.WRONG_USERNAME_OR_PASSWORD]);
                    } else {
                        const [errorList] = axiosErrorHandler(err);
                        setGeneralErrorList(errorList);
                    }
                })
        }
    }

    const registerValidationFor = {
        username:() => register({
            required: validator.errorMessages.MISSING_NAME
        }),
        password: () =>
            register({
                required: validator.errorMessages.MISSING_PASSWORD
            }),
    };

    return {
        registerValidationFor,
        onSubmit: handleSubmit(
            onSubmit,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),
        generalErrorList,
        fieldErrorFor: errors,
    };
};

export default useFormLogin;