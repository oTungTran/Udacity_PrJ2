import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { logout } from "../../../plugins/store/slices/userSlice";
import { AppDispatch, getUser } from "../../../plugins/store";
import { useState } from "react";
import styles from "./Navigator.module.scss"
import Avatar from "../../Common/Avatar/Avatar";

export default function Navigator() {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const user = useSelector(getUser);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const [menus] = useState<{ to: string, text: string }[]>([
        {
            to: "/",
            text: "Home"
        },
        {
            to: "/leaderboard",
            text: "Leaderboard"
        },
        {
            to: "/add",
            text: "New"
        },
    ]);

    return (
        <div className={styles['navigator']}>
            <div className={styles['wrapper-left']}>
                <nav >
                    <ul>
                        {menus.map(menu => (
                            <li key={menu.text}>
                                <Link to={menu.to} className={location.pathname === menu.to ? styles.active : ''}>{menu.text}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className={styles['wrapper-right']} onClick={() => setIsOpen(!isOpen)}>
                <Avatar isShowName={true} img={user?.avatarURL} alt={user?.name} name={user?.name} />
                {isOpen && (
                    <div className={`${styles['account-funct']} ${isOpen ? styles['open'] : ''}`}>
                        <ul>
                            <li onClick={() => dispatch(logout() as any)}>Sign Out</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}