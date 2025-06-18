import { useEmotion } from '../context/EmotionContext';

const EmotionSelector = () => {
    const { emotion, setEmotion } = useEmotion();

    return (
        <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value as any)}
            className="mt-2"
        >
            <option value="">오늘의 기분은?</option>
            <option value="happy">😊 기쁨이</option>
            <option value="sad">😢 슬픔이</option>
            <option value="angry">😠 화남이</option>
            <option value="calm">😌 차분함이</option>
        </select>
    );
};

export default EmotionSelector;
