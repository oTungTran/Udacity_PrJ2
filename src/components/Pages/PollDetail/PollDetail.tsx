import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, getQuestions, getUser, getUsers } from "../../../plugins/store";
import { useEffect, useState } from "react";
import { Question, answerQuestion } from "../../../plugins/store/slices/questionsSlice";
import { User } from "../../../plugins/store/slices/userSlice";
import QuestionDetail from "../../Common/QuestionDetail/QuestionDetail";
import Avatar from "../../Common/Avatar/Avatar";
import styles from "./PollDetail.module.scss";

export default function PollDetail() {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(getUser);
    const users = useSelector(getUsers);
    const questions = useSelector(getQuestions);

    const [isAnswer, setIsAnswer] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [question, setQuestion] = useState<Question | undefined>();
    const [creator, setCreator] = useState<User | undefined>();

    useEffect(() => {
        if (typeof questionId === 'undefined') {
            return;
        }
        console.log('LOG', questions, questionId)
        const question = questions[questionId];
        if (typeof question === 'undefined') {
            navigate("/404");
            return;
        }
        setQuestion(question);
        const userCreator = users[question.author];
        setCreator(userCreator);
        const answers = user.answers[questionId];
        setIsAnswer(typeof answers === 'string');
    }, [questionId, user, questions, users, navigate]);

    function handleChooseOption(answer: string) {
        if (!question || disabled === true) {
            return;
        }
        setDisabled(!disabled);
        dispatch(answerQuestion({
            authedUser: user.id,
            qid: question.id,
            answer
        })).then(() => {
            setDisabled(!disabled);
            navigate("/");
        });
    }

    return (
        <div className={styles['poll-detail-page']} style={disabled ? { pointerEvents: "none" } : {}}>
            {creator && <div className={styles['poll-author']}>
                <h2>Poll by {creator.name}</h2>
                <Avatar img={creator.avatarURL} alt={creator.name} size="128px" />
            </div>}
            {question &&
                <QuestionDetail question={question} isAnswer={isAnswer} userId={user.id}
                    totalUser={Object.keys(users).length}
                    onChoose={handleChooseOption} />
            }
        </div>
    );
}