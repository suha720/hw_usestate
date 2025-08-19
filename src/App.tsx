import { useState } from 'react';
import TodoAdd from './components/todos/TodoAdd';
import TodoList from './components/todos/TodoList';
import { ITodoType } from './components/todos/types/todoType';

const initialTodos: ITodoType[] = [];

function App() {
  // ts
  // 1. 전체 목록
  const [todos, setTodos] = useState(initialTodos);

  // 2. 목록 추가하기
  // setTodos 를 props 를 넘겨줘도 되지만 어딘가 안좋대
  const handleTodoUpdate = (newTodo: ITodoType) => {
    // 최신 todo 는 최상단으로
    setTodos(prev => [newTodo, ...prev]);
  };

  // 2.1. completed 토글 함수
  const onToggle = (id: string) => {
    // 전달 받은 id 를 이용해서 map 으로 찾아서 completed 변경
    const updatedTodos: ITodoType[] = todos.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );

    setTodos(updatedTodos);
  };

  // 2.2 삭제 함수
  const onDelete = (id: string): void => {
    const arr = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };

  const onEdit = (id: string, newTitle: string): void => {
    const arr: ITodoType[] = todos.map(item =>
      item.id === id ? { ...item, title: newTitle } : item,
    );

    setTodos(arr);
  };

  // tsx
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-[640px] rounded-2xl border-2 border-cyan-400 bg-white/90 p-6 shadow-lg dark:bg-neutral-900 md:p-8">
        <h1 className="text-center text-2xl font-bold tracking-tight text-cyan-700 md:text-3xl">
          HW Tailwind 적용
        </h1>
        <div className="mt-6 flex justify-center">
          <TodoAdd handleTodoUpdate={handleTodoUpdate}></TodoAdd>
        </div>
        <div className="mt-6 flex justify-center">
          <TodoList
            todos={todos}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          ></TodoList>
        </div>
      </div>
    </div>
  );
}

export default App;
