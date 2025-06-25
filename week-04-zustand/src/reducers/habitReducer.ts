export type Habit = { id: string; text: string; date: string; done: boolean };

export type Action =
    | { type: 'ADD'; payload: { text: string; date: string } }
    | { type: 'TOGGLE'; payload: string }
    | { type: 'DELETE'; payload: string };

export const habitReducer = (state: Habit[], action: Action): Habit[] => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    id: Date.now().toString(),
                    text: action.payload.text,
                    date: action.payload.date,
                    done: false,
                },
            ];
        case 'TOGGLE':
            return state.map((habit) =>
                habit.id === action.payload ? { ...habit, done: !habit.done } : habit,
            );
        case 'DELETE':
            return state.filter((habit) => habit.id !== action.payload);
        default:
            return state;
    }
};
