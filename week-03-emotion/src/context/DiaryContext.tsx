import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export type DiaryEntry = {
    id: string;
    emotion: string;
    text: string;
    date: string;
};

type State = DiaryEntry[];

type Action = { type: 'ADD_ENTRY'; payload: DiaryEntry } | { type: 'INIT'; payload: DiaryEntry[] };

const DiaryContext = createContext<
    | {
          state: State;
          dispatch: React.Dispatch<Action>;
      }
    | undefined
>(undefined);

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ADD_ENTRY':
            const updated = [action.payload, ...state];
            localStorage.setItem('diary', JSON.stringify(updated));
            return updated;
        case 'INIT':
            return action.payload;
        default:
            return state;
    }
};

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        const data = localStorage.getItem('diary');
        if (data) {
            dispatch({ type: 'INIT', payload: JSON.parse(data) });
        }
    }, []);

    return <DiaryContext.Provider value={{ state, dispatch }}>{children}</DiaryContext.Provider>;
};

export const useDiary = () => {
    const context = useContext(DiaryContext);
    if (!context) throw new Error('useDiary must be used within DiaryProvider');
    return context;
};
