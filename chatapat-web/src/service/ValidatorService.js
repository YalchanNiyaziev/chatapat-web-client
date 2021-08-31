class ValidatorService {
    constructor() {
        this.errorMessages = {
            MISSING_NAME: `Please, enter a username`,
            MISSING_PASSWORD: `Please, enter a password`,
            MISSING_PASSWORD_CONFIRMATION: `Please, confirm your password`,
            EMAIL_TOO_LONG: `Maximum length of 100 symbols`,
            WRONG_EMAIL_FORMAT: `Invalid email format.`,
            PASSWORD_TOO_SHORT: `Password has to be at least 6 symbols`,
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
            }
        }
        return statusInfo;
    }

}

export default ValidatorService