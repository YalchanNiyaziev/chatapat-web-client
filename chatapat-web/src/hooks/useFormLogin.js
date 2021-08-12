import {useState} from "react";
import ApiRequest from "../http/ApiRequest";
import {useForm} from "react-hook-form";
import ValidatorService from "../service/ValidatorService";

const useFormLogin = props => {
    const api = new ApiRequest();
    const validator = new ValidatorService();
    const {register, handleSubmit, errors} = useForm();
    const [generalErrorList, setGeneralErrorList] = useState([]);

    const onSubmit = (data) => {
        console.log(data);
    }

    const registerValidatorFor = {
        username:() => {
            register({required: validator.errorMessages.MISSING_NAME})
        },
        password: () => {
            register({required: validator.errorMessages.MISSING_PASSWORD})
        },
    };

    return {
        registerValidatorFor,
        onSubmit: handleSubmit(
            onSubmit,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),
        generalErrorList,
        fieldErrorFor: errors,
    };
};

export default useFormLogin;