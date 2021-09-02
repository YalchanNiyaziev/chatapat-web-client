import {useForm} from "react-hook-form";
import {useState} from "react";
import ValidatorService from "../service/ValidatorService";
import ApiRequest from "../http/ApiRequest";
import moment from "moment";
import {useHistory} from "react-router-dom";
import axiosErrorHandler from "../http/AxiosErrorHandler";
import {unauthenticatedRoutes} from "../routes/AppRoutes";

const useUserRegistration = props => {
    const validator = new ValidatorService();
    const api = new ApiRequest();
    const {register, handleSubmit, control, watch, errors, getValues} = useForm();
    const [generalErrorList, setGeneralErrorList] = useState([]);
    const history = useHistory();

    const genderOptions = [
        {label: 'Male', value: 'MALE'},
        {label: 'Female', value: 'FEMALE'},
        {label: 'Other', value: 'UNKNOWN'}
    ];
    const registerValidationFor = {
        firstName: () => register({
            required: validator.errorMessages.MISSING_FIRST_NAME,
            minLength: {
                value: 2,
                message: validator.errorMessages.FIELD_TOO_SHORT
            },
            maxLength: {
                value: 128,
                message: validator.errorMessages.FIELD_TOO_LONG,
            }

        }),
        lastName: () => register({
            required: validator.errorMessages.MISSING_LAST_NAME,
            minLength: {
                value: 2,
                message: validator.errorMessages.FIELD_TOO_SHORT
            },
            maxLength: {
                value: 128,
                message: validator.errorMessages.FIELD_TOO_LONG,
            }
        }),
        email: () => register({
            required: validator.errorMessages.MISSING_EMAIL,
            validate: validator.validateEmail,
        }),
        password: () => register({
            required: validator.errorMessages.MISSING_PASSWORD,
            validate: validator.validatePassword,
        }),
        passwordConfirm: () => register({
            required: validator.errorMessages.MISSING_PASSWORD_CONFIRMATION,
            validate: value => validator.validatePasswordConfirmation(watch('password'), value),
        }),
        gender: () => register({
            required: validator.errorMessages.MISSING_GENDER
        }),
        birthDate: () => register({
            required: {value: true, message: validator.errorMessages.MISSING_BIRTH_DATE},
        }),

    };

    const userRegistrationHandler = formData => {
        if(!formData.birthDate ||
            (formData.birthDate && moment().diff(moment(formData.birthDate),'years') < 16)
        ) {
            setGeneralErrorList(["You must be 16 years old to use our services."]);
            return;
        }

        console.log(moment(formData.birthDate).utc().format())
        console.log('Before 16 years',  moment(formData.birthDate).utc().subtract(16, 'years').utc().format() )
        console.log('Years to now', moment().diff(moment(formData.birthDate),'years'))
        console.log(formData);

        if(formData.firstName && formData.lastName && formData.email && formData.password
            && formData.passwordConfirm && formData.gender) {

            const registrationData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,
                gender: formData.gender,
                birthDate: moment(formData.birthDate).utc().format(),
            }
            // TODO thing if user press back after submit
            api.registration(registrationData)
                .then(res => {
                    history.push(unauthenticatedRoutes.login.path);
                })
                .catch(err => {
                    const [errorList] = axiosErrorHandler(err);
                    setGeneralErrorList(errorList);
                });
        }

    }
    return {
        genderOptions,
        onSubmit: handleSubmit(
            userRegistrationHandler,
            validator.extractErrorsFromInvalidForm(setGeneralErrorList)
        ),
        registerValidationFor,
        generalErrorList,
        fieldErrorFor: errors,
        control,
    }
}

export default useUserRegistration;