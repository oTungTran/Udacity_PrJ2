import { Link } from "react-router-dom";
import styles from './NotFound.module.scss';

export default function NotFound() {
    return (
        <div className={styles.wrapperNotFound}>
            <p>404</p>
            <p>OOPS! NOTHING WAS FOUND</p>
            <span>
                The page you are looking for might have been removed had its name
                changed or is temporarily unavailable.
                <Link to="/" className={styles.returnHome}>
                    <span>Return to homepage.</span>
                </Link>
            </span>
        </div>
    )
}