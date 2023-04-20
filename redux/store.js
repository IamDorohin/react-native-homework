import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
  [AuthSlice.name]: AuthSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
