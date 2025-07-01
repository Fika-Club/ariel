import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { surveySchema, SurveyFormData } from '../schemas/surveySchema';
import { useSurveyStore } from '../stores/useSurveyStore';
import { useSurveyContext } from '../contexts/SurveyContext';
import {
    FormContainer,
    FieldGroup,
    Label,
    Input,
    Textarea,
    CheckboxGroup,
    ErrorText,
    SubmitButton,
    RadioGroup,
} from '../styles/survey.styles';

const preferencesList = ['운동', '음악', '독서', '여행'];

export const SurveyForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SurveyFormData>({
        resolver: zodResolver(surveySchema),
        defaultValues: {
            preferences: [],
        },
    });

    const { setData } = useSurveyStore();
    const { dispatch } = useSurveyContext();

    const onSubmit = (data: SurveyFormData) => {
        setData(data);
        dispatch({ type: 'SUBMIT' });
        reset();
    };

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            {/* 나이 */}
            <FieldGroup>
                <Label htmlFor="age">나이</Label>
                <Input type="number" id="age" {...register('age', { valueAsNumber: true })} />
                {errors.age && <ErrorText>{errors.age.message}</ErrorText>}
            </FieldGroup>

            {/* 성별 */}
            <FieldGroup>
                <Label>성별</Label>
                <RadioGroup>
                    <label>
                        <input type="radio" value="male" {...register('gender')} /> 남성
                    </label>
                    <label>
                        <input type="radio" value="female" {...register('gender')} /> 여성
                    </label>
                </RadioGroup>
                {errors.gender && <ErrorText>{errors.gender.message}</ErrorText>}
            </FieldGroup>

            {/* 관심사 */}
            <FieldGroup>
                <Label>관심사</Label>
                <CheckboxGroup>
                    {preferencesList.map((item) => (
                        <label key={item}>
                            <input type="checkbox" value={item} {...register('preferences')} />{' '}
                            {item}
                        </label>
                    ))}
                </CheckboxGroup>
                {errors.preferences && <ErrorText>{errors.preferences.message}</ErrorText>}
            </FieldGroup>

            {/* 피드백 */}
            <FieldGroup>
                <Label htmlFor="feedback">피드백 (선택)</Label>
                <Textarea id="feedback" {...register('feedback')} />
                {errors.feedback && <ErrorText>{errors.feedback.message}</ErrorText>}
            </FieldGroup>

            <SubmitButton type="submit">설문 제출</SubmitButton>
        </FormContainer>
    );
};
