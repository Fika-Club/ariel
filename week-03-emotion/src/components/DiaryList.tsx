/** @jsxImportSource @emotion/react */
import { useDiary } from '../context/DiaryContext';
import { css } from '@emotion/react';

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

const DiaryList = () => {
    const { state } = useDiary();

    return (
        <div
            css={css`
                margin-top: 32px;
            `}
        >
            <h3>📒 일기 목록</h3>
            {state.length === 0 ? (
                <p>작성된 일기가 없습니다.</p>
            ) : (
                <ul>
                    {state.map((entry) => (
                        <li
                            key={entry.id}
                            css={css`
                                margin: 12px 0;
                                padding: 12px;
                                border-left: 6px solid ${emotionColors[entry.emotion]};
                                background: #f9f9f9;
                            `}
                        >
                            <strong>{entry.date}</strong> - {emotionEmojis[entry.emotion]}{' '}
                            {entry.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DiaryList;
