import PollShell from "../PollShelf/PollShelf";
import { useSelector } from "react-redux";
import { getQuestions, getUser } from "../../../plugins/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../Common/Button/Button";
import styles from "./HomPage.module.scss";

export default function Home() {
    const navigate = useNavigate();
    const questions = useSelector(getQuestions);
    const user = useSelector(getUser);
    const [isUnansweredPage, setIsUnansweredPage] = useState(true)
    const answered = Object.keys(questions).filter(question => Object.keys(user.answers).includes(question))
        .map(id => questions[id]);

    const unanswered = Object.keys(questions).filter(question => !Object.keys(user.answers).includes(question))
        .map(id => questions[id]);

    function handleView(id: string): void {
        navigate(`/questions/${id}`);
    }



    return (
        <div className={styles['home-page']}>
            <Button
                size="l"
                type="border"
                onClick={() => setIsUnansweredPage(!isUnansweredPage)}
            >
                {!isUnansweredPage ? "Unanswered" : "Answered"}
            </Button>
            {isUnansweredPage ?
                <PollShell headline="Poll Unanswered" polls={unanswered} onView={handleView} />
                : <PollShell headline="Poll Answered" polls={answered} onView={handleView} />}

        </div>
    );
}