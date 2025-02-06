import { combineReducers, configureStore } from "@reduxjs/toolkit";
import timezonesReducer from "./timezonesSlice";

const rootReducer = combineReducers({
  timezones: timezonesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
