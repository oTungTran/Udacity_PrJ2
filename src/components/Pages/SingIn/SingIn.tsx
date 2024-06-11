import { useDispatch } from "react-redux";
import UserList from "../../Common/LstUser/UserList";
import LoginForm, { LoginType } from "../../Common/LoginForm/LoginForm";
import { login } from "../../../plugins/store/slices/userSlice";
import { AppDispatch } from "../../../plugins/store";
import { useNavigate } from "react-router-dom";
import { Questions, fetchQuestions } from "../../../plugins/store/slices/questionsSlice";
import css from "./SignIn.module.scss";
import { useState } from "react";
import { PayloadAction } from "@reduxjs/toolkit";

export default function SingIn({ prevRouter = "/" }: { prevRouter?: string }) {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<string>();

    const handleSubmit = (frm: LoginType) => {
        dispatch(login(frm)).then((res) => {
            switch (res.meta.requestStatus) {
                case "fulfilled":
                    dispatch(fetchQuestions()).then((res): asserts res is PayloadAction<Questions, string, {
                        arg: void;
                        requestId: string;
                        requestStatus: "fulfilled";
                    }, never> => {
                        navigate(prevRouter, { replace: true });
                        console.debug('prevRouter', prevRouter)
                    });
                    break;
                case "rejected":
                    const { error: { message } } = res as any;
                    setError(message ?? '');
                    break;
            }
        });
    }

    return (
        <div className={css['signin-page']}>
            <div className={css['wrapper']}>
                <LoginForm submit={handleSubmit} error={error} />
                <UserList click={(user) => handleSubmit({ username: user.id, password: user.password })} />
            </div>
        </div>
    );
}
