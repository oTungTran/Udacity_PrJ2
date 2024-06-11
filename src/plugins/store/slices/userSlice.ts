import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _login } from '../../api/_DATA';

// Define the User type
export type User = {
    id: string;
    password: string;
    name: string;
    avatarURL: string | null;
    answers: {
        [key: string]: string;
    };
    questions: string[];
};

// Create the user slice
const userSlice = createSlice({
    name: 'user',
    initialState: {} as User,
    reducers: {
        saveAnswers(state, action) {
            state.answers = { ...state.answers, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(logout.fulfilled, (state, action) => {
                if (action.payload) {
                    return {} as User;
                }
            });
    },
});

// Define the login thunk
export const login = createAsyncThunk<User, { username: string; password: string }>(
    'user/login',
    async ({ username, password }) => {
        const user = await _login(username, password);
        return user;
    }
);

// Define the logout thunk
export const logout = createAsyncThunk<boolean>(
    'user/logout',
    async () => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000);
        });
    }
);

// Export the saveAnswers action
export const { saveAnswers } = userSlice.actions;

// Export the user reducer as the default export
export default userSlice.reducer;
