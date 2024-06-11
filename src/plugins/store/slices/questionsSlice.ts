import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../api/_DATA';
import { Users, fetchUsers } from './usersSlice';
import { AppDispatch, RootState } from '..';
import { saveAnswers } from './userSlice';

// Define the Question type
export type Question = {
    id: string;
    timestamp: number;
    author: string;
    title: string;
    optionOne: {
        votes: string[];
        text: string;
    };
    optionTwo: {
        votes: string[];
        text: string;
    };
};

// Define the Questions type as a dictionary of Question objects
export type Questions = {
    [key: string]: Question;
};

// Create the questions slice
const questionsSlice = createSlice({
    name: 'questions',
    initialState: {} as Questions,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

// Define the fetchQuestions thunk
export const fetchQuestions = createAsyncThunk<Questions, void>('questions/fetchQuestions', async () => {
    return await _getQuestions();
});

// Define the NewQuestion type
export type NewQuestion = {
    author: string;
    title?: string;
    optionOneText: string;
    optionTwoText: string;
};

// Define the AnswerQuestion type
export type AnswerQuestion = {
    authedUser: string;
    qid: string;
    answer: string;
};

export const createQuestion = (newQuestion: NewQuestion) => {
    return async (dispatch: AppDispatch) => {
        await _saveQuestion(newQuestion);
        dispatch(fetchQuestions());
        dispatch(fetchUsers());
    };
};

export const answerQuestion = (answerQuestion: AnswerQuestion) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        await _saveQuestionAnswer(answerQuestion);
        await dispatch(fetchQuestions());
        const userFetchResult = await dispatch(fetchUsers());
        if (userFetchResult.meta.requestStatus === 'fulfilled') {
            const newUser = (userFetchResult.payload as Users)[getState().user.id];
            dispatch(saveAnswers(newUser.answers));
        }
    };
};

export default questionsSlice.reducer;