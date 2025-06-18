import styled from '@emotion/styled';
import { EmotionProvider } from './context/EmotionContext';
import { DiaryProvider } from './context/DiaryContext';
import EmotionSelector from './components/EmotionSelector';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';

const Container = styled.div`
    max-width: 500px;
    margin: 50px auto;
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background: white;
`;
const BackgroundContainer = styled.div`
    transition: background-color 0.3s ease;
    min-height: 100vh;
`;

const Background = ({ children }: { children: React.ReactNode }) => {
    return <BackgroundContainer>{children}</BackgroundContainer>;
};

const AppContent = () => (
    <Background>
        <Container>
            <h1 className="text-2xl font-bold">오늘의 감정 일기</h1>
            <EmotionSelector />
            <DiaryForm />
            <DiaryList />
        </Container>
    </Background>
);

const App = () => (
    <EmotionProvider>
        <DiaryProvider>
            <AppContent />
        </DiaryProvider>
    </EmotionProvider>
);

export default App;
