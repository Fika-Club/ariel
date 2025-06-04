import { createContext, useContext, useReducer } from 'react';
import Q1 from '../../../assets/Q1.jpg';
import Q2 from '../../../assets/Q2.jpg';
import Q3 from '../../../assets/Q3.jpg';
import Wrong from '../../../assets/wrong.jpg';
import { reducer } from '../composables/reducer';
import { State, Action } from '../type/type';

type StepperContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

const correctImages: Record<number, string> = { 1: Q1, 2: Q2, 3: Q3 };

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const Stepper = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, {
        question: 1,
        answer: undefined,
        isCorrect: false,
    });

    return (
        <StepperContext.Provider value={{ state, dispatch }}>
            <div className="flex flex-col gap-12 w-1/3 justify-center items-center">{children}</div>
        </StepperContext.Provider>
    );
};

Stepper.Question = ({ value, children }: { value: number; children: React.ReactNode }) => {
    const { state } = useContext(StepperContext)!;
    if (state.question !== value) return null;
    return (
        <h1 className="text-2xl font-bold">
            Q{state.question}. {children}
        </h1>
    );
};

Stepper.Answer = () => {
    const { state, dispatch } = useContext(StepperContext)!;
    if (state.answer !== undefined) return null;
    return (
        <div className="flex gap-4">
            <button
                className="w-50 h-40 p-4 text-2xl bg-blue-500 text-white rounded-md cursor-pointer"
                onClick={() => dispatch({ type: 'ANSWER', payload: true })}
            >
                O
            </button>
            <button
                className="w-50 h-40 p-4 text-2xl bg-orange-500 text-white rounded-md cursor-pointer"
                onClick={() => dispatch({ type: 'ANSWER', payload: false })}
            >
                X
            </button>
        </div>
    );
};

Stepper.Result = () => {
    const { state, dispatch } = useContext(StepperContext)!;
    if (state.answer === undefined) return null;

    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-bold">{state.isCorrect ? 'Correct!!' : 'Wrong!!'}</p>
            <img src={state.isCorrect ? correctImages[state.question] : Wrong} alt="cat" />
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => dispatch({ type: 'NEXT' })}
            >
                {state.question === 3 ? 'Finish' : 'Next'}
            </button>
        </div>
    );
};
