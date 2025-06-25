import styled from '@emotion/styled';
import HabitForm from '../components/HabitForm';
import HabitItem from '../components/HabitItem';
import { useHabitStore } from '../stores/useHabitStore';

const HabitPage = () => {
    const habits = useHabitStore((state) => state.habits);

    const sortedHabits = [...habits].sort((a, b) => a.date.localeCompare(b.date));

    return (
        <Container>
            <Title>🧹 오늘의 습관</Title>
            <HabitForm />
            <List>
                {sortedHabits.map((habit) => (
                    <HabitItem key={habit.id} habit={habit} />
                ))}
            </List>
        </Container>
    );
};

export default HabitPage;

const Container = styled.div`
    max-width: 500px;
    margin: 0 auto;
    background: #fffafc;
    padding: 2rem;
    border-radius: 2rem;
    border: 2px solid #ffb6c1;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: #bb377d;
    text-shadow: 1px 1px 2px #ffffff;
    font-family: 'Gulim', 'Dotum', sans-serif;
`;

const List = styled.ul`
    list-style: none;
`;
