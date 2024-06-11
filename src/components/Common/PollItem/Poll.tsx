import { formatDate } from "../../../utils/date.format";
import Button from "../Button/Button";
import styles from "./Poll.module.scss";

export type PollType = {
    id: string;
    title: string;
    timestamp: number;
    onView: (id: string) => void
}
export default function Poll({ id, title, timestamp, onView }: PollType) {
    const timeDisplay: string = formatDate(timestamp);

    return (
        <li className={styles.poll}>
            <h3>{title}</h3>
            <h6>{timeDisplay}</h6>
            <Button
                size="l"
                onClick={e => onView(id)}
            >
                Show
            </Button>
        </li>
    );
}