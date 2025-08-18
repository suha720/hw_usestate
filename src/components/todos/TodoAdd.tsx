import { ChangeEvent, useState } from 'react';
import { ITodoType } from './types/todoType';

// 내가 받은 props 도 타입을 정의해야 하는건 귀찮아
// props 타입 명시하기
interface TodoAddProps {
  handleTodoUpdate: (newTodo: ITodoType) => void;
}

function TodoAdd({ handleTodoUpdate }: TodoAddProps) {
  const [title, setTitle] = useState('');

  // <HTMLInputElement> 이건 왜 안넣어지는거야
  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setTitle(input.value);
  };

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
  return (
    <div>
      <input type="text" value={title} onChange={e => handleChange(e)} />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
}

export default TodoAdd;
