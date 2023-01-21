import axios from "axios"
import { loginErrors, logout, registerErrors, setMessage, setRedirectTrue, setToken } from "../reducers/AuthReducer";

export const UserRegisterAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            // dispatch(setLoadingTrue());
            const {data} = await axios.post("https://socialane-nilesh133.vercel.app/user-register", state, config);
            localStorage.setItem('authToken', data.token);
            dispatch(setToken(data.token));
            dispatch(setRedirectTrue());
            dispatch(setMessage(data.msg));
            // dispatch(setLoadingFalse());
        }
        catch(err){
            dispatch(registerErrors(err.response.data.errors))
        }
    }
}

export const UserLoginAction = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            // dispatch(setLoadingTrue());
            const {data} = await axios.post("https://socialane-nilesh133.vercel.app/user-login", state, config);
            localStorage.setItem('authToken', data.token);
            dispatch(setToken(data.token));
            dispatch(setRedirectTrue());
            dispatch(setMessage(data.msg));
            // dispatch(setLoadingFalse());
        }
        catch(err){
            dispatch(loginErrors(err.response.data.errors))
        }
    }
}

export const UserLogoutAction = () => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try{
            dispatch(setRedirectTrue());
            dispatch(logout());
        }
        catch(err){
        }
    }
}