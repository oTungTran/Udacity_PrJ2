import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getUsers } from '../../api/_DATA';
import { User } from './userSlice';

export type Users = {
    [key: string]: User
}

const usersSlice = createSlice({
    name: 'users',
    initialState: {} as Users,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    },
});;

export const fetchUsers = createAsyncThunk<Users>('users/fetchUsers', async () => {
    const users = await _getUsers();
    return users;
});

export default usersSlice.reducer;