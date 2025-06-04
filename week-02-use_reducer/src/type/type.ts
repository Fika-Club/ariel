export type State = {
    question: number;
    answer: boolean | undefined;
    isCorrect: boolean;
};

export type Action = { type: 'ANSWER'; payload: boolean } | { type: 'NEXT' } | { type: 'RESET' };
