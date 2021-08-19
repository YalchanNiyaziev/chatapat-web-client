import * as get from 'lodash/get';
import ValidatorService from "../service/ValidatorService";

//returns [errorList, errorResponse]
const axiosErrorHandler = error => {
    const validator = new ValidatorService();
    if (error.response) {
        // client received an error response (5xx, 4xx)
        const httpCode = get(error.response, 'status', 0);
        switch (httpCode) {
            case 400:
            case 403:
                let errorMessages = get(error, 'response.data.errors', []);
                if (!errorMessages.length) {
                    errorMessages = [get(error, 'response.data.message', '')];
                }
                if (!errorMessages.length) {
                    errorMessages = [validator.errorMessages.SOMETHING_WENT_WRONG];
                }
                return [errorMessages, error.response];
            default:
                return [[validator.errorMessages.SOMETHING_WENT_WRONG], error.response];
        }
    } else if (error.request) {
        // client never received a response, or request never left
        return [[validator.errorMessages.SERVER_COMMUNICATION_FAILURE], null];
    } else {
        // anything else
        return [[validator.errorMessages.SOMETHING_WENT_WRONG], null];
    }
};

export default axiosErrorHandler;
