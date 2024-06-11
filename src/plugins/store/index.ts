import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import logger from './middlewares/logger';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const getUsers = (state: RootState) => state.users;

export const getUsersLength = (state: RootState) => Object.keys(state.users).length;

export const getUser = (state: RootState) => state.user;

export const getQuestions = (state: RootState) => state.questions;

export default store;