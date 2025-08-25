# Todo

- 오직 useState 만 사용해서 작성하기
- GitHub 의 `til_react_cra_ts` 오픈북

## 구상하기

- 추가, 수정, 삭제, 목록이 있어야 함.
  - 크게 2 가지(`추가`, `목록`) 으로 나누기
  - 목록에서 `수정`, `삭제` 버튼 만들기

## 폴더 및 파일 생성

- src/components 폴더 생성
- src/components/todos 폴더 생성

- src/components/todos/TodoAdd.tsx. 파일 생성
- ts 버전에서 props 를 받는다면 받는 쪽에서 props의 데이터 타입을 명시하기

```tsx
<TodoAdd handleTodoUpdate={handleTodoUpdate}></TodoAdd>;

interface TodoAddProps {
  handleTodoUpdate: (newTodo: ITodoType) => void;
}
```

- 집에서는 `<HTMLInputElement>` 저장하면 사라졌는데, 그냥 VSCode 설정 문제인듯

```tsx
// <HTMLInputElement> 이건 왜 안넣어지는거야
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;
  setTitle(input);
};

// 현재 목록을 함수를 통해 전체 목록으로 업데이트하기
const handleAdd = () => {
  if (title.trim()) {
    const newTodo: ITodoType = {
      id: Date.now().toString(),
      title: title,
      completed: false,
    };

    handleTodoUpdate(newTodo);

    setTitle('');
  }
};
```

```tsx
<div className="w-full rounded-2xl border-2 border-cyan-400 bg-white/80 p-4 shadow-sm dark:bg-neutral-900/80">
  <div className="flex items-center gap-3">
    <input
      type="text"
      value={title}
      onChange={e => handleChange(e)}
      placeholder="할 일을 입력하세요"
      className="flex-1 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-cyan-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500/50 md:text-base dark:border-cyan-700 dark:bg-neutral-800 dark:text-white"
    />
    <button
      onClick={handleAdd}
      className="rounded-xl bg-cyan-600 px-4 py-2.5 font-medium text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 md:px-5"
    >
      추가
    </button>
  </div>
</div>
```

- src/components/todos/TodoList.tsx. 파일 생성
- TodoAdd.tsx 와 마찬가지로 받은 쪽에서는 `props`의 타입을 명시해야 함

```tsx
interface TodoListProps {
  todos: ITodoType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}
```

- 수정 id 빼기

```tsx
const [editId, setEditId] = useState('');
const [editTitle, setEditTitle] = useState('');
const handleCancle = () => {
  setEditId('');
};
```

- 수정한 것을 업데이트하기

```tsx
const handleSave = () => {
  if (!editId) return;
  const newTitle = editTitle.trim();
  if (!newTitle) return; // 제목 비어있으면 무시(선택)
  onEdit(editId, newTitle);
  setEditId('');
  setEditTitle('');
};
```

- tsx 에서 일어나고 있는 일

```tsx
<div className="w-full rounded-2xl border-2 border-cyan-400 bg-white/80 p-4 shadow-sm dark:bg-neutral-900/80">
  <h2 className="text-lg font-semibold text-cyan-700 dark:text-gray-100">할 일 목록</h2>
  {todos.length === 0 ? (
    <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-neutral-700 dark:text-gray-400">
      목록이 없습니다.
    </div>
  ) : (
    <ul className="mt-4 space-y-2">
      {todos.map(item => {
        if (item.id === editId) {
          return (
            <li
              key={item.id}
              className="flex h-16 items-center gap-3 rounded-xl border border-cyan-300 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <input
                type="text"
                value={editTitle}
                onChange={e => handleChange(e)}
                className="h-10 min-w-0 flex-1 rounded-lg border-2 border-cyan-300 px-3 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:border-cyan-700 dark:bg-neutral-800 dark:text-white"
                placeholder="할 일을 수정하세요"
              />
              <button
                onClick={handleSave}
                className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                저장
              </button>
              <button
                onClick={handleCancle}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-neutral-800 dark:text-gray-200 dark:hover:bg-neutral-700"
              >
                취소
              </button>
            </li>
          );
        }
        return (
          <li
            key={item.id}
            className={`flex h-16 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 ${item.completed ? 'opacity-80' : ''}`}
          >
            <input type="checkbox" onChange={() => onToggle(item.id)} checked={item.completed} />
            <span
              className={`min-w-0 flex-1 truncate ${
                item.completed ? 'text-cyan-400 line-through' : 'text-rose-200 dark:text-gray-100'
              }`}
            >
              {item.title}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onDelete(item.id)}
                className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-300 dark:bg-rose-900/30 dark:text-rose-300"
              >
                삭제
              </button>
              <button
                onClick={() => {
                  setEditId(item.id);
                  setEditTitle(item.title);
                }}
                className="rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                수정
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  )}
</div>
```

- 전체 목록에 데이터가 있는지 없는지 확인용

```tsx
{todos.length === 0 ? "목록이 없습니다. : <ul>...</ul>}
```

- ul 태그에서도 수정/삭제에 따라 li 태그 나뉨

```tsx
// 일단 map 돌리기
{todos.map(item) => {
  // 수정 버튼을 눌렀을 경우
  // 수정 버튼을 눌렀다면 setEditId(item.id), setEditTitle(item.title)
  // 여기에는 저장, 취소 버튼 있음
  // 저장 누르면 handleSave 실행
  // 취소 누르면 setEditId('') 설정, if (item.id === editId) 일치하지 않으므로 빠져나가기
  if(item.id === edit) {
    return (<li>...</li>)
  }

  // 평범한 todos 목록(삭제, 수정 버튼 있음)
  return (<li>...</li>)
}}
```

- src/components/todos/todos/types 폴더 생성
- src/components/todos/todos/types/todoType.ts 파일 생성

```ts
// ts 버전이므로 초기값(todo, todos)의 타입이 필요함
export interface ITodoType {
  id: string;
  title: string;
  completed: boolean;
}
```

- App.tsx
- `useState` 만 사용하므로 이 파일에서 각 컴포넌트에 `props` 전달하기
- todos : 전체 목록

```tsx
const initialTodos: ITodoType[] = [];
// 객체를 배열로 감싸고 있음
const [todos, setTodos] = useState(initialTodos);
```

- handleTodoUpdate : 목록 업데이트

```tsx
// TodoAdd.tsx. 에서 입력 받은 값을 todos 에 추가하기
// 최신 데이터를 위로 올라가게 설정 (LIFO)
const handleTodoUpdate = (newTodo: ITodoType) => {
  // 최신 todo 는 최상단으로
  setTodos(prev => [newTodo, ...prev]);
};
```

- onToggle : completed 토글

```tsx
// 체크박스 true, false 로 할 일 했는지 안했는지 확인
const onToggle = (id: string) => {
  // 전달 받은 id 를 이용해서 map 으로 찾아서 completed 변경
  const updatedTodos: ITodoType[] = todos.map(item =>
    item.id === id ? { ...item, completed: !item.completed } : item,
  );

  setTodos(updatedTodos);
};
```

- onDelete : 현재 아이템 삭제

```tsx
// 삭제 버튼을 누르면 해당 id 를 제외한 todos 를 뽑아서 새로 세팅하기
const onDelete = (id: string): void => {
  const arr = todos.filter(todo => todo.id !== id);
  setTodos(arr);
};
```

- onEdit : 현재 아이템 수정

```tsx
// Edit 버튼을 누른 item 의 id 를 뽑아서 수정하기
const onEdit = (id: string, newTitle: string): void => {
  const arr: ITodoType[] = todos.map(item =>
    item.id === id ? { ...item, title: newTitle } : item,
  );

  setTodos(arr);
};
```

## 1. 설정

- 삭제해도 되는 파일, package.json

```json
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.7.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
```

### 1.1. props 넘길 때, 주의할 점

- 받는 쪽에서 props의 type을 정의해줘야함

#### 1.2. 궁금한 것

- TodoAdd.tsx 에서 `event`를 인자로 줬을 때, 타입을 정의해야 하는데 `<HTMLInputElement>` 이게 작성인 안됨
  - 우회해서 해결했지만 다시 보기(VS Code 설정 문제인듯)

## 2. tailwind 사용하기

### 2.1. 코드 정렬 설정

- .prettierrc
- 아래 코드 추가하기

```
{
  "plugins": ["prettier-plugin-tailwindcss"],
}
```

# 08-25 코드 수정

## App 파일

### editId 관리하기

- 상태관리

```tsx
const [editId, setEditId] = useState('');
```

- 취소 버튼 클릭시

```tsx
const handleCancle = () => {
  setEditId('');
};
```

## TodoAdd 파일

- 키다운 추가

```tsx
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    if (title.trim()) {
      handleAdd();
    }
  }
};
```

- input 태그 옵션

```tsx
onKeyDown={e => handleKeyDown(e)}
```
