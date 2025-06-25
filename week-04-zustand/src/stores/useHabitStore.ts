import { create } from 'zustand';
import { habitReducer, Habit } from '../reducers/habitReducer';

type HabitStore = {
    habits: Habit[];
    add: (text: string, date: string) => void;
    toggle: (id: string) => void;
    remove: (id: string) => void;
};

export const useHabitStore = create<HabitStore>((set, get) => ({
    habits: [],
    add: (text, date) => {
        const updated = habitReducer(get().habits, { type: 'ADD', payload: { text, date } });
        set({ habits: updated });
    },
    toggle: (id) => {
        const updated = habitReducer(get().habits, { type: 'TOGGLE', payload: id });
        set({ habits: updated });
    },
    remove: (id) => {
        const updated = habitReducer(get().habits, { type: 'DELETE', payload: id });
        set({ habits: updated });
    },
}));
