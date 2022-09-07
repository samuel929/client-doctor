import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from 'redux';
import { alertSlice } from "./alerts.reducer";
import { UserSlice } from "./userSlice";
const rootReducer=combineReducers({
    alerts:alertSlice.reducer,
    user:UserSlice.reducer
})

const store=configureStore ({
    reducer:rootReducer
})

export default store;