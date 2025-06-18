# 🧩 `useReducer` 정리

## ✅ `useReducer`란?

React의 `useReducer`는 상태 변경 로직을 reducer 함수로 분리해서 관리할 수 있도록 도와주는 Hook입니다.  
여러 상태 값이 서로 **로직적으로 연결되어 있거나**, 복잡한 분기 처리가 필요한 경우 유용하게 사용할 수 있습니다.

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## ⚡️ 언제 `useReducer`를 쓰는 게 좋을까?

| 상황                                        | `useState` 사용          | `useReducer` 사용                  |
| ------------------------------------------- | ------------------------ | ---------------------------------- |
| 상태가 단순함 (예: toggle, input)           | ✅ 적합                  | ❌ 과함                            |
| 상태가 여러 개로 구성됨 (객체/배열 등)      | 🤔 관리 가능하지만 번잡  | ✅ 구조화에 유리                   |
| 상태 변경 조건이 복잡하거나 많음            | ❌ 조건 분기 흩어짐      | ✅ reducer 내부에 깔끔히 정리 가능 |
| 상태들이 서로 연관되어 함께 갱신됨          | ❌ 중복 코드 발생 가능   | ✅ 액션 하나로 연계 처리 가능      |
| 상태 업데이트 방식이 반복되거나 재사용 필요 | ❌ 매번 새로 작성해야 함 | ✅ 액션 기반으로 재사용성 높음     |
| Redux 등 Flux 패턴에 익숙한 경우            | ❌ 낯설 수 있음          | ✅ 익숙한 방식으로 도입 가능       |

> `useReducer`는 "상태 간 연결이 있고, 변형 로직이 복잡하거나 명확히 정리되고 싶을 때" 쓰면 좋습니다.

## 🔄 useState와의 차이점

### useState 방식

- 상태 변경은 컴포넌트 내에서 직접 수행
- 간단한 로직엔 효과적이나, 상태가 늘어나면 코드 중복 발생

```tsx
const [count, setCount] = useState(0);
setCount((prev) => prev + 1);
```

### useReducer 방식

- 상태 변경은 reducer 함수에서 액션 기반으로 처리
- 상태와 변경 로직이 분리돼 있어 유지보수가 쉬움

```tsx
const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        default:
            return state;
    }
};

const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'INCREMENT' });
```

## ❌ 사용하면 안 좋은 경우

- 여러 상태들이 서로 연관이 없는 경우 → useState로 각각 독립적으로 관리하는 것이 더 명확함

```tsx
// ❌ 좋지 않은 예
const reducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
        case 'SET_THEME':
        case 'UPDATE_FORM':
        // 서로 관계없는 상태들을 한데 묶어버림
    }
};
```

## 🧭 정리

- useReducer는 로직이 많아지거나 상태 간 의존이 높을 때 훨씬 효율적
- 단순한 상태나 연관 없는 상태는 useState가 더 적합
- 둘 다 상황에 맞게 섞어 사용하는 것이 Best Practice!
