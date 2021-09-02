class ValidatorService {
    constructor() {
        this.errorMessages = {
            MISSING_FIRST_NAME: `Please, enter your first name`,
            MISSING_LAST_NAME: `Please, enter your last name`,
            MISSING_NAME: `Please, enter a username`,
            MISSING_EMAIL: `Please, enter a email`,
            MISSING_PASSWORD: `Please, enter a password`,
            MISSING_PASSWORD_CONFIRMATION: `Please, confirm your password`,
            MISSING_GENDER: `Please select a gender`,
            MISSING_BIRTH_DATE: `Please, enter birth date`,
            FIELD_TOO_SHORT: `First name has to be at least 2 symbols`,
            FIELD_TOO_LONG: `First name has to be max 128 symbols`,
            EMAIL_TOO_LONG: `Maximum length of 100 symbols`,
            WRONG_EMAIL_FORMAT: `Invalid email format.`,
            PASSWORD_TOO_SHORT: `Password has to be at least 6 symbols`,
            PASSWORD_TOO_LONG: `Maximum length of 60 symbols`,
            PASSWORD_CONFIRMATION_MISMATCH: `Must match with password`,
            INVALID_FIELDS: `Invalid fields`,
            WRONG_USERNAME_OR_PASSWORD: 'Wrong username or password',
            MISSING_REQUIRED_FIELDS: `One or more of the fields are not filled correctly and have been colored red.`,
            SERVER_COMMUNICATION_FAILURE: 'Connection timed out',
            SOMETHING_WENT_WRONG: 'Unknown error',
        };

        this.userStatus = {
            ACTIVE: 'ACTIVE',
            RECENTLY_ACTIVE: 'RECENTLY_ACTIVE',
            AWAY: 'AWAY',
        }

        this.messageTypes = {
            text: 'TEXT',
            image: 'IMAGE',
            video: 'VIDEO',
            voice: 'VOICE',
            file: 'FILE',
        }

        this.validationRules = {
            EMAIL_PATTERN: '(.+)@(.+){1,}.(.+){2,}',
        };

    }

    isEmpty = (...args) => {
        let isEmpty = false;
        args.forEach(arg => {
            if (!arg) {
                isEmpty = true;
            }
        });
        return isEmpty;
    };

    validateUserTextData = text => {
        if (text.length < 2 && !this.isEmpty(text)) {
            console.log("Too SHort user data text")
            return  this.errorMessages.FIELD_TOO_SHORT;
        }

        if (text.length > 128) {
            console.log("Too LOng user data text")
            return this.errorMessages.FIELD_TOO_LONG;
        }
    }

    validateEmail = email => {
        // Validate email format
        if (!/(.+)@(.+){1,}\.(.+){2,}/.test(email) && !this.isEmpty(email)) {
            return this.errorMessages.WRONG_EMAIL_FORMAT;
        }
        // Validate email length
        if (email.length > 100) {
            return this.errorMessages.EMAIL_TOO_LONG;
        }

    };

    validatePassword = password => {
        console.log("PASSSQ", password)
        // Validate password min length
        if (password.length < 6 && !this.isEmpty(password)) {
            console.log("Too SHort passs")
            return  this.errorMessages.PASSWORD_TOO_SHORT;
        }
        // Validate password max length
        if (password.length > 60 && !this.isEmpty(password)) {
            return this.errorMessages.PASSWORD_TOO_LONG;
        }
    };

    validatePasswordConfirmation = (password, passwordConfirmation) => {
        // Validate password confirmation
        if (password !== passwordConfirmation) {
            return  this.errorMessages.PASSWORD_CONFIRMATION_MISMATCH;
        }
    };

    validateBirthDate = birthDate => {
        console.log("BITHDATE", birthDate);
        // if(birthDate)
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
    prepareUserStatus = (status) => {
        const statusInfo = {
            statusText: '',
            statusColor: '',
        }
        if (status) {
            switch (status) {
                case this.userStatus.ACTIVE:
                    statusInfo.statusText = 'Active';
                    statusInfo.statusColor = '#34A835';
                    break;
                case this.userStatus.RECENTLY_ACTIVE:
                    statusInfo.statusText = 'Recently active';
                    statusInfo.statusColor = '#ffba01';
                    break;
                case this.userStatus.AWAY:
                    statusInfo.statusText = 'Away';
                    statusInfo.statusColor = '#e91224';
                    break;
                default:
                    statusInfo.statusText = 'No info';
                    statusInfo.statusColor = '#010a36';
                    break;
            }
        }
        return statusInfo;
    }

}

export default ValidatorService