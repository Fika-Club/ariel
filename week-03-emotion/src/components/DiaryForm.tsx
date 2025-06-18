/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEmotion } from '../context/EmotionContext';
import { useDiary } from '../context/DiaryContext';
import { useState } from 'react';

const DiaryForm = () => {
    const { emotion } = useEmotion();
    const { dispatch } = useDiary();
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (!emotion || !text.trim()) return;

        const entry = {
            id: crypto.randomUUID(),
            emotion,
            text,
            date: new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        };

        dispatch({ type: 'ADD_ENTRY', payload: entry });
        setText('');
    };

    return (
        <>
            <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="한 줄 일기를 작성하세요."
                css={css`
                    margin-top: 16px;
                    width: 100%;
                    padding: 12px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                    resize: none;
                `}
            />
            <button
                onClick={handleSubmit}
                css={css`
                    margin-top: 12px;
                    padding: 8px 16px;
                    border: none;
                    background: #6c5ce7;
                    color: white;
                    border-radius: 8px;
                    cursor: pointer;
                `}
            >
                저장
            </button>
        </>
    );
};

export default DiaryForm;
