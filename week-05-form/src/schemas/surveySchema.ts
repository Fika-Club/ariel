import { z } from 'zod';

export const surveySchema = z.object({
    age: z
        .number()
        .min(10, '10세 이상만 참여할 수 있습니다.')
        .max(100, '나이는 100세 이하여야 합니다.'),
    gender: z.enum(['male', 'female'], { required_error: '성별을 선택해주세요.' }),
    preferences: z.array(z.string()).min(1, '하나 이상의 관심사를 선택해주세요.'),
    feedback: z.string().max(200, '피드백은 200자 이하로 입력해주세요.').optional(),
});

export type SurveyFormData = z.infer<typeof surveySchema>;
