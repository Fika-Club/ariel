import { useDiary } from '../context/DiaryContext';
import styled from '@emotion/styled';

const emotionEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    calm: '😌',
};

const emotionColors: Record<string, string> = {
    happy: '#FFD93D',
    sad: '#A0C4FF',
    angry: '#FF6B6B',
    calm: '#BDB2FF',
};

const DiaryListContainer = styled.div`
    margin-top: 32px;
`;

const DiaryItem = styled.li<{ emotion: string }>`
    margin: 12px 0;
    padding: 12px;
    border-left: 6px solid ${({ emotion }) => emotionColors[emotion]};
    background: #f9f9f9;
`;

const DiaryList = () => {
    const { state } = useDiary();

    return (
        <DiaryListContainer>
            <h3>📒 일기 목록</h3>
            {state.length === 0 ? (
                <p>작성된 일기가 없습니다.</p>
            ) : (
                <ul>
                    {state.map((entry) => (
                        <DiaryItem key={entry.id} emotion={entry.emotion}>
                            <strong>{entry.date}</strong> - {emotionEmojis[entry.emotion]}{' '}
                            {entry.text}
                        </DiaryItem>
                    ))}
                </ul>
            )}
        </DiaryListContainer>
    );
};

export default DiaryList;
