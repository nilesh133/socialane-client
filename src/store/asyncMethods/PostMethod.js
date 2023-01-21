import axios from "axios"
import { setPosts } from "../reducers/PostReducer";

export const SavePostAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.post("https://socialane-nilesh133.vercel.app/save-post", state, config);
            dispatch(setPosts(data.allPosts));
        }
        catch(err){
            console.log(err);
        }
    }
}

export const FetchAllPosts = () => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try{
            const {data} = await axios.get("https://socialane-nilesh133.vercel.app/fetch-all-posts", config);
            dispatch(setPosts(data.allPosts));
        }
        catch(err){
        }
    }
}

export const AddRemoveLikesAction = (userId, postId) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post(`https://socialane-nilesh133.vercel.app/add-remove-likes/${userId}/${postId}`, config);
            dispatch(setPosts(data.allPosts));
            
        } catch (err) {
        }
    }
}

export const SaveCommentAction = (state) => {
    return async (dispatch, getState) => {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.post("https://socialane-nilesh133.vercel.app/save-comment", state, config);
            dispatch(setPosts(data.allPosts));
            
        } catch (err) {
        }
    }
} 