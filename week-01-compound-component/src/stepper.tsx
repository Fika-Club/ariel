import { createContext, useContext, useState } from 'react';
import Q1 from '../assets/Q1.JPG';
import Q2 from '../assets/Q2.jpg';
import Q3 from '../assets/Q3.jpg';
import Wrong from '../assets/wrong.jpg';

type StepperContextType = {
    question: number;
    setQuestion: (question: number) => void;
    answer: boolean | undefined;
    setAnswer: (answer?: boolean) => void;
    isCorrect: boolean;
    setIsCorrect: (isCorrect: boolean) => void;
};

const answerMap: Record<number, boolean> = {
    1: true,
    2: false,
    3: true,
};
const correctImages: Record<number, string> = { 1: Q1, 2: Q2, 3: Q3 };

const StepperContext = createContext<StepperContextType>({
    question: 1,
    setQuestion: () => {},
    answer: undefined,
    setAnswer: () => {},
    isCorrect: false,
    setIsCorrect: () => {},
});

export const Stepper = ({ children }: { children: React.ReactNode }) => {
    const [question, setQuestion] = useState<number>(1);
    const [answer, setAnswer] = useState<boolean | undefined>(undefined);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    return (
        <StepperContext.Provider
            value={{ question, setQuestion, answer, setAnswer, isCorrect, setIsCorrect }}
        >
            <div className="flex flex-col gap-12 w-1/3 justify-center items-center">{children}</div>
        </StepperContext.Provider>
    );
};

Stepper.Question = ({ value, children }: { value: number; children: React.ReactNode }) => {
    const { question } = useContext(StepperContext);
    if (question !== value) return null;
    return (
        <h1 className="text-2xl font-bold">
            Q{question}. {children}
        </h1>
    );
};

Stepper.Answer = () => {
    const { answer, setAnswer, question, setIsCorrect } = useContext(StepperContext);
    const handleClickAnswer = (answer: boolean) => {
        setAnswer(answer);
        setIsCorrect(answerMap[question] === answer);
    };
    if (answer !== undefined) return null;
    return (
        <div className="flex gap-4">
            <button
                className="w-50 h-40 p-4 text-2xl bg-blue-500 text-white rounded-md cursor-pointer"
                onClick={() => handleClickAnswer(true)}
            >
                O
            </button>
            <button
                className="w-50 h-40 p-4 text-2xl bg-orange-500 text-white rounded-md cursor-pointer"
                onClick={() => handleClickAnswer(false)}
            >
                X
            </button>
        </div>
    );
};

Stepper.Result = () => {
    const { answer, isCorrect, question } = useContext(StepperContext);
    if (answer === undefined) return null;
    const image = () => {
        if (!isCorrect) return <img src={Wrong} alt="cat" />;
        return <img src={correctImages[question]} alt="cat" />;
    };
    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-lg font-bold">{isCorrect ? 'Correct!!' : 'Wrong!!'}</p>
            {image()}
        </div>
    );
};

Stepper.Navigation = () => {
    const { question, setQuestion, answer, setAnswer } = useContext(StepperContext);
    if (answer === undefined) return null;
    const handleClickNext = () => {
        if (question === 3) {
            setQuestion(1);
        } else {
            setQuestion(question + 1);
        }
        setAnswer(undefined);
    };
    return (
        <button className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={handleClickNext}
        >
            {question === 3 ? 'Finish' : 'Next'}
        </button>
    );
};
