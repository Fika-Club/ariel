import { useSurveyStore } from '../stores/useSurveyStore';
import { useSurveyContext } from '../contexts/SurveyContext';
import {
    ResultBox,
    ResultItem,
    ResultLabel,
    ResultValue,
    SubmitButton,
} from '../styles/survey.styles';

export const SurveyResult = () => {
    const { data } = useSurveyStore();
    const { dispatch } = useSurveyContext();

    if (!data) return <p>데이터가 없습니다.</p>;

    return (
        <ResultBox>
            <h2>🎉 설문 제출 완료!</h2>

            <ResultItem>
                <ResultLabel>나이</ResultLabel>
                <ResultValue>{data.age}세</ResultValue>
            </ResultItem>

            <ResultItem>
                <ResultLabel>성별</ResultLabel>
                <ResultValue>{data.gender === 'male' ? '남성' : '여성'}</ResultValue>
            </ResultItem>

            <ResultItem>
                <ResultLabel>관심사</ResultLabel>
                <ResultValue>{data.preferences.join(', ')}</ResultValue>
            </ResultItem>

            {data.feedback && (
                <ResultItem>
                    <ResultLabel>피드백</ResultLabel>
                    <ResultValue>{data.feedback}</ResultValue>
                </ResultItem>
            )}

            <SubmitButton onClick={() => dispatch({ type: 'RESET' })}>다시 하기</SubmitButton>
        </ResultBox>
    );
};
