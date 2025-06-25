# Zustand 상태 관리 개요

## 🧠 Zustand란?

Zustand는 React 애플리케이션에서 전역 상태 관리를 간편하게 구현할 수 있도록 해주는 **상태 관리 라이브러리**다.
Redux나 Context API처럼 상태를 전역적으로 공유할 수 있지만, 훨씬 간결하고 설정이 적다는 장점이 있다.

## 🆚 Zustan vs 다른 상태 관리 도구

| 항목             | Zustand                         | Redux             | Recoil                     | Context API    |
| ---------------- | ------------------------------- | ----------------- | -------------------------- | -------------- |
| 러닝 커브        | 낮음                            | 높음              | 중간                       | 낮음           |
| 비동기 처리      | middleware 또는 직접 처리       | Thunk / Saga 필요 | 내장된 async 지원          | 직접 처리 필요 |
| React 의존성     | 없음 (React 밖에서도 사용 가능) | 높음              | 높음                       | 높음           |
| 상태 구독 최적화 | 자동 분리 및 shallow 비교       | 수동 설정 필요    | 자동 분리 및 selector 지원 | 수동 설정 필요 |
| DevTools         | 지원 (미들웨어)                 | 강력한 지원       | 약한 편                    | 없음           |

> `Recoil`과 `Zustand`는 둘 다 React에서 전역 상태를 관리할 수 있는 경량 라이브러리다. Redux보다 보일러플레이트가 적고 사용하기 쉬운 편이지만, 두 라이브러리는 철학과 접근 방식이 다르다.

## 🆚 Recoil vs Zustand

| 항목          | Recoil                                       | Zustand                                     |
| ------------- | -------------------------------------------- | ------------------------------------------- |
| 구조 방식     | atom/selector를 활용한 선언적 상태 구성      | create 함수로 상태 store 직접 구성          |
| React 의존성  | 있음 (React 전용)                            | 없음 (React 외부에서도 사용 가능)           |
| 상태 접근     | `useRecoilState`, `useRecoilValue` 등        | `useStore()` 등 커스텀 훅                   |
| 상태 단위     | atom 단위로 쪼개어 구성                      | store 단위로 구성. 필요시 slice 형태로 분할 |
| 비동기 지원   | selector + Suspense 기반으로 자연스럽게 지원 | 미들웨어 또는 직접 구현으로 처리            |
| 렌더링 최적화 | atom 단위 구독. 의존성 기반 자동 최적화      | 구독한 값만 리렌더링. shallow 비교 지원     |
| DevTools 지원 | 제한적 (비공식 플러그인 많음)                | 공식 미들웨어 제공                          |
| 러닝 커브     | atom, selector 개념이 필요 (약간 있음)       | 매우 낮음. 함수형 구성만 이해하면 충분      |

### Shallow

불필요한 컴포넌트 리렌더링을 방지하기 위해 사용하는 얕은 비교 함수

#### 언제 사용할까?

zustand의 useStore 훅으로 여러 상태를 선택할 때, 객체나 배열을 반환하면 기본적으로는 참조 비교를 합니다. 이 경우 값은 같아도 참조가 바뀌면 리렌더링이 발생합니다.

```tsx
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const MyComponent = () => {
    const { a, b } = useStore((state) => ({ a: state.a, b: state.b }), shallow);
    // a 또는 b 둘 중 하나라도 바뀌면 리렌더링됨
};
```

## ✅ Recoil이 적합한 경우

- 여러 컴포넌트 간 세부 상태를 잘게 나누고 싶을 때
- 상태 간 의존 관계가 복잡한 경우
- Suspense 기반의 비동기 상태 처리를 쓰고 싶을 때
- 파생 상태(derived state)를 선언형으로 관리하고 싶을 때

> 예시: 필터 조합 UI, 복잡한 파생 상태가 많은 앱

## ✅ Zustand가 적합한 경우

- 간단하고 빠른 전역 상태가 필요한 경우
- Redux 대체로 사용하고 싶은 경우
- 상태를 React 외부에서도 사용할 필요가 있을 때
- 여러 상태를 하나의 store로 묶어 관리하고 싶은 경우

> 예시: 사용자 정보 저장, UI 상태 (모달, 토스트), 단일 API 상태

```
- Recoil: 상태를 조각(atom)으로 쪼개서 조립(selector)하는 방식
  → 정교하고 유연하지만 개념 학습 필요

- Zustand: 함수 안에 필요한 상태를 모두 선언하고, 필요한 것만 꺼내 쓰는 방식
  → 빠르고 간단하게 구현 가능
```

## 📦 기본 사용 예제 (Zustand)

```tsx
// store/useCounterStore.ts
import { create } from 'zustand';

type CounterState = {
    count: number;
    increase: () => void;
    decrease: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increase: () => set((state) => ({ count: state.count + 1 })),
    decrease: () => set((state) => ({ count: state.count - 1 })),
}));

// components/Counter.tsx
import { useCounterStore } from '../store/useCounterStore';

const Counter = () => {
    const { count, increase, decrease } = useCounterStore();

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={increase}>+</button>
            <button onClick={decrease}>-</button>
        </div>
    );
};
```

## 📦 기본 사용 예제 (Recoil)

```tsx
// recoil/counterState.ts
import { atom, selector } from 'recoil';

export const countState = atom({
    key: 'countState',
    default: 0,
});

export const increaseCount = selector({
    key: 'increaseCount',
    get: ({ get }) => get(countState),
    set: ({ set, get }) => {
        const current = get(countState);
        set(countState, current + 1);
    },
});

export const decreaseCount = selector({
    key: 'decreaseCount',
    get: ({ get }) => get(countState),
    set: ({ set, get }) => {
        const current = get(countState);
        set(countState, current - 1);
    },
});

// components/Counter.tsx
import { useRecoilState, useSetRecoilState } from 'recoil';
import { countState, increaseCount, decreaseCount } from '../recoil/counterState';

const Counter = () => {
    const [count] = useRecoilState(countState);
    const increase = useSetRecoilState(increaseCount);
    const decrease = useSetRecoilState(decreaseCount);

    return (
        <div>
            <h2>Count: {count}</h2>
            <button onClick={() => increase()}>+</button>
            <button onClick={() => decrease()}>-</button>
        </div>
    );
};

export default Counter;
```
