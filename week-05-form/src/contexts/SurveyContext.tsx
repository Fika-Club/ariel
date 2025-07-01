import { createContext, useContext, useReducer, ReactNode } from 'react';

type SurveyStep = 'form' | 'submitted';

type State = {
    step: SurveyStep;
};

type Action = { type: 'SUBMIT' } | { type: 'RESET' };

const initialState: State = { step: 'form' };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SUBMIT':
            return { step: 'submitted' };
        case 'RESET':
            return { step: 'form' };
        default:
            return state;
    }
};

const SurveyContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
} | null>(null);

export const SurveyProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <SurveyContext.Provider value={{ state, dispatch }}>{children}</SurveyContext.Provider>;
};

export const useSurveyContext = () => {
    const context = useContext(SurveyContext);
    if (!context) throw new Error('SurveyContext not found');
    return context;
};
