class  ValidatorService {
    constructor() {
        this.errorMessages = {
            MISSING_NAME: `Please, enter a username`,
            MISSING_PASSWORD: `Please, enter a password`,
            MISSING_PASSWORD_CONFIRMATION: `Please, confirm your password`,
            EMAIL_TOO_LONG: `Maximum length of 100 symbols`,
            WRONG_EMAIL_FORMAT: `Invalid email format.`,
            PASSWORD_TOO_SHORT: `Password has to be at least 6 symbols`,
            INVALID_FIELDS: `Invalid fields`,
            MISSING_REQUIRED_FIELDS: `One or more of the fields are not filled correctly and have been colored red.`,
        }
    }
    extractErrorsFromInvalidForm = (setErrorsFunction, setSuccess) => {
        if (setErrorsFunction) {
            return errors => {
                let errorList = [];

                let errorFields = Object.keys(errors);
                if (errorFields.length > 0) {
                    if (setSuccess) {
                        setSuccess(false);
                    }
                    const errorTypeList = errorFields.map(errorField => errors[errorField].type);
                    if (errorTypeList.includes('required')) {
                        errorList.push(this.errorMessages.MISSING_REQUIRED_FIELDS);
                    }

                    if (errorTypeList.filter(errorType => errorType !== 'required').length > 0) {
                        errorList.push(this.errorMessages.INVALID_FIELDS);
                    }
                }

                setErrorsFunction(errorList);
            };
        }
    }

}
export default ValidatorService