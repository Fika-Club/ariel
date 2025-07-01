import { create } from 'zustand';
import { SurveyFormData } from '../schemas/surveySchema';

interface SurveyStore {
    data: SurveyFormData | null;
    setData: (data: SurveyFormData) => void;
}

export const useSurveyStore = create<SurveyStore>((set) => ({
    data: null,
    setData: (data) => set({ data }),
}));
