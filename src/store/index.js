import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthReducer";
import PostReducer from "./reducers/PostReducer";
import UserReducer from "./reducers/UserReducer";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        post: PostReducer,
        user: UserReducer
    }
})

export default store