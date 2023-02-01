import { configureStore } from "@reduxjs/toolkit";
import {Login} from '../reducers/reducerIndex'

export const store = configureStore({
    reducer: {
        user: Login
    }
});