import { Question } from "../../../plugins/store/slices/questionsSlice";
import styles from "./QuestionDetail.module.scss";

type QuestionDetailOptions = {
    userId: string,
    question: Question;
    isAnswer: boolean;
    totalUser: number;
    onChoose: (answer: string) => void;
};

export default function QuestionDetail(
    { userId, question, isAnswer, totalUser, onChoose }: QuestionDetailOptions
) {

    const answered = (votes: string[]) => {
        const percent = votes.length * 100 / totalUser;
        return (
            <>
                <div>
                    <h4>{votes.length} / {totalUser} voted</h4>
                </div>
                <div>
                    <span>{percent}%</span>
                </div>
            </>
        );
    };

    const render = ({ votes, text, key }: { votes: string[], text: string, key: string }) => {
        return (
            <div onClick={() => !isAnswer && onChoose(key)} className={[styles['option-item'], (isAnswer ? styles['selected'] : ''), (votes.includes(userId) ? styles['voted'] : "")].join(" ")}>
                <p className={styles['text']}>{text}</p>
                {isAnswer ? answered(votes) : <span>Choose</span>}
            </div>
        );
    }

    return (
        <div className={styles['question-group']}>
            <h2>{question.title}</h2>
            <div className={styles['option-group']}>
                {render({ ...question.optionOne, key: "optionOne" })}
                {render({ ...question.optionTwo, key: "optionTwo" })}
            </div>
        </div>
    );
}