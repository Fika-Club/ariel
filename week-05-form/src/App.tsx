import { SurveyProvider, useSurveyContext } from './contexts/SurveyContext';
import { SurveyForm } from './components/SurveyForm';
import { SurveyResult } from './components/SurveyResult';

const Contents = () => {
    const { state } = useSurveyContext();
    return state.step === 'form' ? <SurveyForm /> : <SurveyResult />;
};

const App = () => (
    <SurveyProvider>
        <Contents />
    </SurveyProvider>
);

export default App;
