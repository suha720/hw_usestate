# Todo

- 오직 useState 만 사용해서 작성하기

- 삭제해도 되는 파일, package.json

```json
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.7.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
```

## props 넘길 때, 주의할 점

- 받는 쪽에서 props의 type을 정의해줘야함

## 궁금한 것

- TodoAdd.tsx 에서 `event`를 인자로 줬을 때, 타입을 정의해야 하는데 `<HTMLInputElement>` 이게 작성인 안됨
  - 우회해서 해결했지만 다시 보기
