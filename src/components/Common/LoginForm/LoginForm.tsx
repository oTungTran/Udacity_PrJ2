import { FormEvent, useState } from "react";
import styles from "./LoginForm.module.scss";
import Input from "../Input/Input";
import Button from "../Button/Button";

export type LoginType = {
    username: string,
    password: string
};

export default function LoginForm({ submit, error }: { submit: (_: LoginType) => void, error?: string }) {

    const [formValue, setFormValue] = useState<LoginType>({
        username: '',
        password: ''
    });

    const changeFrm = (name: string, val: string) => {
        if (!name) {
            return;
        }
        setFormValue({ ...formValue, [name]: val });
    }

    const [errors, setErrors] = useState<LoginType | null>(null);

    const validateForm = () => {
        let newErrors: any = {};

        if (!formValue.username.trim()) {
            newErrors = { username: 'Username is required' };
        }

        if (!formValue.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.values(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        submit(formValue);
    }

    return (
        <div className={styles['login-form']}>
            <div className={styles['wrapper']}>
                <h1 className={styles.h1}>Login</h1>
                <form className={styles.form} noValidate autoComplete="false" onSubmit={handleSubmit}>
                    <div className={styles.control}>
                        <Input
                            label="Username"
                            value={formValue.username}
                            name="username"
                            message={errors?.username || error}
                            onChange={e => changeFrm(e.target.name, e.target.value)} />
                    </div>
                    <div className={styles.control}>
                        <Input
                            label="Password"
                            name="password"
                            value={formValue.password}
                            message={errors?.password}
                            onChange={e => changeFrm(e.target.name, e.target.value)} />
                    </div>
                    <div className={styles.control}>
                        <Button
                            size="l"
                            className={styles.loginBtn}
                            onClick={handleSubmit}
                        >
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}