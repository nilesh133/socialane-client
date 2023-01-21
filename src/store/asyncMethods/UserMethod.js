import axios from "axios"
import { setToken } from "../reducers/AuthReducer";
import { setAllUsers } from "../reducers/UserReducer";

export const FetchAllUsersAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data } = await axios.post("https://socialane-nilesh133.vercel.app/fetch-all-users", state, config);
            dispatch(setAllUsers(data.allUsers));
        }
        catch (err) {
        }
    }
}

export const AddRemoveFriendAction = (userId, friendId) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`https://socialane-nilesh133.vercel.app/add-remove-friend/${userId}/${friendId}`, config);
            localStorage.setItem('authToken', data.token);
            dispatch(setToken(data.token));
        } catch (err) {
        }
    }
}

export const UpdateUserProfileAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post("https://socialane-nilesh133.vercel.app/update-user-profile", state, config);
            localStorage.setItem('authToken', data.token);
            dispatch(setToken(data.token));
        } catch (err) {
        }
    }
}

export const UpdateProfileAboutAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post("https://socialane-nilesh133.vercel.app/update-profile-about", state, config);
            localStorage.setItem('authToken', data.token);
            dispatch(setToken(data.token));
        } catch (err) {
        }
    }
}