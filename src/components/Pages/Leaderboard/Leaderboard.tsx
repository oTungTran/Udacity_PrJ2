import { useSelector } from "react-redux";
import styles from "./Leaderboard.module.scss"
import { getUsers } from "../../../plugins/store";
import Avatar from "../../Common/Avatar/Avatar";

export default function Leaderboard() {
    const users = useSelector(getUsers);

    return (
        <div className={styles['leaderboard-page']}>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Users</th>
                        <th>Answered</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>{Object.values(users)
                    .sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length)
                    .map((user, indx) => {
                        return <tr key={user.id}>
                            <td>{indx + 1}</td>
                            <td><Avatar isShowName={true} img={user?.avatarURL} alt={user?.name} name={user?.name} /></td>
                            <td>{Object.keys(user.answers).length}</td>
                            <td>{user.questions.length}</td>
                        </tr>;
                    })}</tbody>
            </table>
        </div>
    );
}