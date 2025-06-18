import { createContext, useContext, useState, ReactNode } from 'react';

type Emotion = 'happy' | 'sad' | 'angry' | 'calm' | '';

type EmotionContextType = {
    emotion: Emotion;
    setEmotion: (emotion: Emotion) => void;
};

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const EmotionProvider = ({ children }: { children: ReactNode }) => {
    const [emotion, setEmotion] = useState<Emotion>('');
    return (
        <EmotionContext.Provider value={{ emotion, setEmotion }}>
            {children}
        </EmotionContext.Provider>
    );
};

export const useEmotion = () => {
    const context = useContext(EmotionContext);
    if (!context) throw new Error('useEmotion must be used within EmotionProvider');
    return context;
};
