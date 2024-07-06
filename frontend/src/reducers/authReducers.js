import {REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE} from '../actions/authActions';

const initialState ={
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    user:null,
    loading:true,
    error:null
};

const authReducer=(state=initialState, action)=>{
    const {type, payload}= action;

    switch(type){
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated:true,
                user:payload.user,
                loading:false,
                error:null
};
        case REGISTER_USER_FAILURE:
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user:null,
                loading:false,
                error:payload,
            }
        default:
                return state;

    }
}

export default authReducer;




