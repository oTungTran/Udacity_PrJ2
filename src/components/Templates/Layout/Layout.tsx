import { Outlet } from "react-router-dom";
import Navigator from "../Navigator/Navigator";
import styles from "./Layout.module.scss"

export default function Layout() {
    return (
        <div className={styles['wrapper']}>
            <main className={styles['layout']}>
                <Navigator />
                <div className={styles['container']}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}