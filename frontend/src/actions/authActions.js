import api from '../services/apiService'

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const register = ({name, role, email, password}) => async (dispatch)=> {
    try{
        const res = await api.post('/register', {name, role, email, password});
        
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: res.data
        });
        localStorage.setItem('token', res.data.token);

    }catch(err){
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: err.message
        });

    }
}

export const login =({email, password}) => async (dispatch)=>{
    try{
        const res = await api.post('/login', {email, password});

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: res.data
        });
        localStorage.setItem('token', res.data.token);
    }catch(err){
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: err.message
        });

    }
};