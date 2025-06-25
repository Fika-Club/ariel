import { Global } from '@emotion/react';
import { globalStyles } from './styles/global';
import HabitPage from './pages/HabitPage';

function App() {
    return (
        <>
            <Global styles={globalStyles} />
            <HabitPage />
        </>
    );
}

export default App;
