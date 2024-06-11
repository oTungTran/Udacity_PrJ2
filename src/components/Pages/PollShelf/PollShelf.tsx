import { Question } from "../../../plugins/store/slices/questionsSlice";
import Poll from "../../Common/PollItem/Poll";
import styles from "./PollShelf.module.scss"

export type PollShellType = {
    headline: string;
    polls: Question[];
    onView: (id: string) => void;
}

export default function PollShell({ headline, polls, onView }: PollShellType) {

    const pollList = polls
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(poll => <Poll key={poll.id} {...poll} onView={onView} />);

    return (<>
        <div className={styles['poll-headline']}>
            <h2>{headline}</h2>
        </div>
        <div className={styles['poll-shelf']}>
            <div className={styles['poll-grid-wrapper']}>
                <ul className={styles['poll-grid']}>{pollList}</ul>
            </div>
        </div>
    </>
    );
}