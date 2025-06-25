import { useState } from 'react';
import styled from '@emotion/styled';
import { useHabitStore } from '../stores/useHabitStore';

const HabitForm = () => {
    const [text, setText] = useState('');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const add = useHabitStore((state) => state.add);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            add(text, date);
            setText('');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="오늘의 습관 입력"
            />
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Button type="submit">기록하기</Button>
        </Form>
    );
};

export default HabitForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
`;

const Input = styled.input`
    padding: 0.6rem;
    border: 2px dotted #bb377d;
    border-radius: 1rem;
    background-color: #fff0f5;
    color: #3e3e3e;
    font-size: 1rem;
`;

const Button = styled.button`
    padding: 0.6rem 1.2rem;
    background-color: #ff69b4;
    color: white;
    border: none;
    border-radius: 1rem;
    font-weight: bold;
    font-size: 1rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.1s ease-in-out;

    &:hover {
        transform: scale(1.05);
        background-color: #ff85c1;
    }
`;
