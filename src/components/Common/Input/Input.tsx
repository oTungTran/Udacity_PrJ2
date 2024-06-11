import { ChangeEventHandler } from "react";
import styles from "./Input.module.scss";

export default function Input({ label, value, name, message, onChange }: { label: string, name: string, value: string, message: string | undefined, onChange: ChangeEventHandler<HTMLInputElement> }) {
    return (<div className={styles.wrapper}>
        {!!label && <label className={styles.label} htmlFor={name}>{label}</label>}
        <div className={styles.inputBlock}>
            <input
                type="text"
                id={name}
                name={name}
                className={[styles.input, message ? styles.errors : ''].join(" ")}
                placeholder={label}
                value={value}
                onChange={onChange}
            />
        </div>
        {!!message && <p className={styles.message}>{message}</p>}
    </div>)
}