# 📌 React Compiler

## React Compiler란?
> React Compiler는 컴파일 타임에 React 코드를 최적화하여 더 빠른 실행 성능을 제공하는 컴파일러

기존에는 React 코드가 런타임에서 JSX → React.createElement → 렌더링 이런 식으로 처리되었지만,
이제는 코드를 미리 분석하고 최적화해서 더 적은 re-render, 더 빠른 실행이 가능해진다.

```tsx
// 기본 코드
const MyComponent = ({ value }) => {
  const handleClick = () => {
    console.log(value);
  };

  return <button onClick={handleClick}>Click</button>;
};

// React Compiler의 최적화
// 자동으로 useMemo, useCallback을 적용
const handleClick = useCallback(() => {
  console.log(value);
}, [value]);
```

## 최적화 대상
| 최적화 대상            | 기존 방식                      | Compiler 방식                  |
|------------------------|-------------------------------|--------------------------------|
| `useMemo` / `useCallback` | 직접 작성해야 했음              | 자동으로 생성됨                 |
| 렌더링 최적화           | `React.memo`로 수동 처리         | 불필요한 렌더 자동 제거         |
| 의존성 추적            | 수동으로 배열 관리              | 코드 분석으로 정확히 추적       |
| 코드 유지보수          | 복잡                            | 훨씬 간결해짐                   |

### useMemo
#### 역할
- 컴포넌트가 리렌더링될 때 계산 비용이 큰 작업을 “기억”해서 재사용함
- 즉, 의존성 배열이 바뀌지 않으면 계산을 다시 하지 않음
```tsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(input);
}, [input]);
```
- input이 바뀔 때만 heavyCalculation() 실행됨
- 나머지 리렌더링에서는 캐시된 값 재사용

### useCallback
#### 역할
- 함수를 메모이제이션하여 불필요한 함수 재생성을 막음
- 주로 자식 컴포넌트에 콜백 함수를 props로 전달할 때 성능 최적화에 사용됨
```tsx
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```
- count가 바뀌지 않으면 handleClick은 기존 함수 재사용됨

### 어떤 상황에서 써야 할까?
| 상황 | 사용 Hook | 이유 |
|------|-----------|------|
| 연산량이 많은 함수 결과를 재사용하고 싶을 때 | `useMemo` | CPU 낭비 방지 |
| 자식 컴포넌트에 콜백 전달 시, 불필요한 리렌더 막고 싶을 때 | `useCallback` | props가 안 바뀌도록 방지 |
| 동일한 객체/배열이 계속 재생성돼서 `useEffect`, `React.memo`가 반복 실행될 때 | `useMemo`, `useCallback` | 참조값 재사용으로 효과적인 리렌더링 제어 |

### 그런데 문제는…
- 이걸 어디에 쓰면 좋고, 어디는 과도한 최적화인지 판단하기 어려움
- 의존성 배열도 종종 실수함 ([a, b] 빠뜨리거나, 과하게 넣거나)
- 그래서 React 팀이 React Compiler에서 자동 적용해주려는 것!

## 핵심 포인트 요약
- React Compiler는 컴파일 타임에 React 코드를 분석한다.
- 렌더링 성능을 크게 개선할 수 있다.
- useMemo, useCallback 등 수동 최적화가 필요 없어진다.
  - 함수가 매번 새로 만들어지는데, 참조 유지가 필요하면 자동으로 useCallback처럼 변환
  - 무거운 연산이 반복되는 걸 보면 자동으로 useMemo처럼 캐시 처리
  - 의존성 배열도 정확하게 분석해서 누락/오버도 방지
- Strict 모드 + Server Components + React Compiler 조합은 미래 React 앱의 기본 구조가 될 가능성이 크다.

## 📌 현재 시점 (2025년 7월 기준)에서의 React Compiler 정리
| 항목 | 상태 |
|------|------|
| **React Compiler 개념** | ✅ 공개됨 (React Conf 2024 발표) |
| **Meta 내부 적용 여부** | ✅ 사용 중 (Instagram, Ads 등에서) |
| **공식 릴리스** | ❌ 아직 안 됨 |
| **적용 방법** | ❌ 미공개 (opt-in 방식 예정) |
| **설정 방식** | 🔍 예상만 존재 (Vite, Next 설정, Babel 플러그인 등) |
| **목표** | useMemo/useCallback 자동 최적화 + 렌더링 성능 향상 |ㅍ