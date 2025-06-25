import styled from '@emotion/styled';
import { Habit } from '../reducers/habitReducer';
import { useHabitStore } from '../stores/useHabitStore';

const HabitItem = ({ habit }: { habit: Habit }) => {
    const toggle = useHabitStore((state) => state.toggle);
    const remove = useHabitStore((state) => state.remove);

    return (
        <Item>
            <Label>
                <input type="checkbox" checked={habit.done} onChange={() => toggle(habit.id)} />
                <span style={{ textDecoration: habit.done ? 'line-through' : 'none' }}>
                    [{habit.date}] {habit.text}
                </span>
            </Label>
            <DeleteButton onClick={() => remove(habit.id)}>삭제</DeleteButton>
        </Item>
    );
};

export default HabitItem;

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: #fffafc;
    margin-bottom: 0.75rem;
    border-radius: 1rem;
    border: 1px dashed #ffb6c1;
    font-size: 1rem;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;

const DeleteButton = styled.button`
    background: #ffe4e1;
    border: 1px solid #ff69b4;
    color: #d63031;
    padding: 0.3rem 0.6rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #ffccd5;
    }
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;
