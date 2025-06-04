import { Action, State } from '../type/type';

const answerMap: Record<number, boolean> = {
    1: true,
    2: false,
    3: true,
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'ANSWER': {
            const isCorrect = answerMap[state.question] === action.payload;
            return { ...state, answer: action.payload, isCorrect };
        }
        case 'NEXT': {
            const nextQuestion = state.question === 3 ? 1 : state.question + 1;
            return { question: nextQuestion, answer: undefined, isCorrect: false };
        }
        default:
            return state;
    }
};
