import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, getUser } from "../../../plugins/store";
import { NewQuestion, createQuestion } from "../../../plugins/store/slices/questionsSlice";
import { useNavigate } from "react-router-dom";
import styles from "./NewQuestion.module.scss";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";

export default function New() {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(getUser);
    const title = "Would you rather";

    const [formValue, setFormValue] = useState<NewQuestion>({
        title,
        author: '',
        optionOneText: '',
        optionTwoText: ''
    });

    const handleChange = (name: string, val: string) => {
        if (!name) return;
        setFormValue(prevState => ({ ...prevState, [name]: val }));
    };

    const [errors, setErrors] = useState<NewQuestion | null>(null);

    const validateForm = () => {
        let newErrors: any = {};

        if (!formValue.optionOneText.trim()) {
            newErrors.optionOneText = 'Option One is required';
        }

        if (!formValue.optionTwoText.trim()) {
            newErrors.optionTwoText = 'Option Two is required';
        }

        if (formValue.optionOneText.trim() === formValue.optionTwoText.trim()) {
            newErrors.optionOneText = 'Option One and Option Two cannot be the same';
        }

        setErrors(newErrors);
        return Object.values(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createQuestion({ ...formValue, author: user.id }) as any);
        navigate("/");
    }

    return (
        <div className={styles['new-page']}>
            <h2>{title}</h2>
            <h3>Create your own poll</h3>
            <form className={styles.form} noValidate autoComplete="false" onSubmit={handleSubmit}>
                <div className={styles.control}>
                    <Input
                        label="Option One"
                        value={formValue.optionOneText}
                        name="optionOneText"
                        message={errors?.optionOneText}
                        onChange={e => handleChange(e.target.name, e.target.value)} />
                </div>
                <div className={styles.control}>
                    <Input
                        label="Option Two"
                        value={formValue.optionTwoText}
                        name="optionTwoText"
                        message={errors?.optionTwoText}
                        onChange={e => handleChange(e.target.name, e.target.value)} />
                </div>
                <div className={styles.control}>
                    <Button
                        size="l"
                        className={styles.loginBtn}
                        onClick={handleSubmit}
                    >

                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}