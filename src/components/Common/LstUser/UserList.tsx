import { useSelector } from "react-redux";
import { getUsers } from "../../../plugins/store";
import { User } from "../../../plugins/store/slices/userSlice";
import Avatar from "../Avatar/Avatar";
import "./UserList.scss";

export default function UserList({ click }: { click: (user: User) => void }) {
    const users = useSelector(getUsers);

    return (<ul className="user-list">{Object.keys(users).map(userCode => {
        const user = users[userCode];
        return <li className="user-item" key={user.id} onClick={() => click(user)}>
            <span className="tooltip">{user.name}</span>
            <Avatar img={user.avatarURL} alt={user.name} />
        </li>
    })}</ul>);
}