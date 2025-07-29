import sliceReducer from "./slice";
import slice0Reducer from "./slice0";
import authReducer from "../authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store= configureStore({
    reducer:{
        slice:sliceReducer,
        slice0:slice0Reducer,
        auth:authReducer
    }
});

export default store;