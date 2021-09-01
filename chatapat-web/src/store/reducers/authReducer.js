import {SET_CURRENT_USER} from "../actions/authActions";

const INIT_STATE = {
    currentUser: null,
};

const authReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return Object.assign({}, state, {
                currentUser: action.payload,
            });

        default:
            return {...state};
    }
};

export default authReducer;