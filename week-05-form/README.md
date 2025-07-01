# 📌 React Hook Form

## 🧩 React Hook Form (RHF)

폼 상태 관리 라이브러리

### ✅ 특징

- 불필요한 리렌더링 방지 → 성능 최적화
- uncontrolled 방식 기반
- 작은 번들 크기
- 다양한 유효성 검사 라이브러리(Zod, Yup 등)와 통합 가능

### 🔧 주요 함수

- useForm() – 폼 전체 상태 관리 훅
- register() – 입력 요소와 RHF 연결
- handleSubmit() – 제출 시 로직 처리
- formState.errors – 에러 객체 접근

### 🧩 resolver

- RHF가 사용하는 useForm()에 Zod/Yup 스키마 기반 유효성 검사 로직을 연결해주는 함수
- RHF는 기본적으로 자체적인 검증 메커니즘이 있지만, resolver를 통해 외부 라이브러리(Zod, Yup 등)로 검증을 위임할 수 있음

## 유효성 검사 라이브러리

### 🔐 Zod

TypeScript-first 스키마 기반 유효성 검사 및 파싱 라이브러리

#### ✅ 특징

- 런타임에서 TypeScript 타입 보장
- z.object()를 기반으로 스키마 정의
- 직관적인 API

#### 예시

```tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    email: z.string().email({ message: '올바른 이메일 형식이어야 합니다.' }),
    password: z.string().min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
});

type FormData = z.infer<typeof schema>;

const FormZod = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('Zod 제출 결과:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="이메일" />
            <p>{errors.email?.message}</p>

            <input type="password" {...register('password')} placeholder="비밀번호" />
            <p>{errors.password?.message}</p>

            <button type="submit">제출</button>
        </form>
    );
};

export default FormZod;
```

### 🧪 Yup

JS 객체 유효성 검사 라이브러리. React Hook Form 초기 통합 사례로 널리 사용됨

#### ✅ 특징

- 선언적 방식으로 유효성 정의
- 다양한 데이터 타입 지원
- 커스텀 메시지 및 정규식 활용 가능

#### 예시

```tsx
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
    email: yup.string().email('올바른 이메일 형식이어야 합니다.').required('이메일은 필수입니다.'),
    password: yup
        .string()
        .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
        .required('비밀번호는 필수입니다.'),
});

type FormData = yup.InferType<typeof schema>;

const FormYup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log('Yup 제출 결과:', data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="이메일" />
            <p>{errors.email?.message}</p>

            <input type="password" {...register('password')} placeholder="비밀번호" />
            <p>{errors.password?.message}</p>

            <button type="submit">제출</button>
        </form>
    );
};

export default FormYup;
```

### ⚖️ Zod vs Yup 비교

| 항목              | Zod                                                       | Yup                                                       |
| ----------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| 기본 철학         | TypeScript-first: 타입과 런타임 유효성 검사를 동시에 보장 | Schema-first: 유효성 검사가 주 목적, 타입은 부가적        |
| 타입스크립트 지원 | ✅ 타입스크립트 친화적. 타입 추론이 자동으로 잘 작동함    | ⚠️ 타입 추론이 약해 `yup.InferType` 등의 추가 작업 필요   |
| 런타임 타입 체크  | ✅ 스키마 자체로 런타임 타입 검사 수행 가능               | ❌ 별도 타입 검사기 필요 (런타임 검사만으론 불완전)       |
| 스키마 작성 방식  | 체이닝보다 **객체 기반 선언**에 가까움                    | `.string().required()` 등 **체이닝 방식**이 주류          |
| 확장성            | `z.pipe()`, `z.union()`, `z.refine()` 등으로 확장 가능    | `.test()` 또는 `.when()` 등으로 커스텀 가능               |
| 에러 메시지 관리  | 기본 메시지 간단하지만 커스터마이징 쉬움                  | 에러 메시지 커스터마이징에 강점 (다국어 처리 포함)        |
| 문서 및 학습 곡선 | 공식 문서 깔끔하고 modern한 스타일                        | Stack Overflow 등 자료 많고 실무 예제 풍부                |
| 최근 트렌드       | TypeScript 기반 프로젝트에서 채택 증가                    | 기존 코드베이스나 JS 기반 프로젝트에서 여전히 많이 사용됨 |
| 번들 크기         | 더 작고 경량                                              | 약간 더 큼                                                |

> Zod와 Yup은 문법이 비슷해 보이지만 철학과 동작 방식에 중요한 차이들이 있음.

## ✅ 어떤 걸 선택하면 좋을까?

- **Zod 추천 상황**

    - 타입스크립트를 적극 활용하는 프로젝트
    - 런타임에서도 타입 안정성이 중요한 경우
    - 새 프로젝트에서 깔끔한 코드와 타입 안정성이 필요한 경우

- **Yup 추천 상황**
    - 기존 프로젝트가 Yup을 이미 사용 중인 경우
    - 커스텀 메시지나 다국어 에러 처리 기능이 중요한 경우
    - 체이닝 방식의 문법이 더 익숙한 경우
