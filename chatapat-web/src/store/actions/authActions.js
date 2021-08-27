
import ApiRequest from "../../http/ApiRequest";

//Action Types
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

// Success
export const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';

// Errors
export const ERROR_MESSAGE = 'ERROR_MESSAGE';

export const setCurrentUser = payload => ({
    type: SET_CURRENT_USER,
    payload,
});

export const getCurrentUser = () => {
    const api = new ApiRequest();

    return dispatch => {
        api.getUserProfileInfo('')
            .then(res => {
                dispatch(setCurrentUser(get(res, 'data')));
            })
            .catch(err => {
                // const [errorList] = axiosErrorHandler(err);
                // dispatch(setErrorMessage(errorList));
            });
    };
};