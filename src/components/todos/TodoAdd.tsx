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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setTitle(input);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (title.trim()) {
        handleAdd();
      }
    }
  };

  return (
    <div className="w-full rounded-2xl border-2 border-cyan-400 bg-white/80 p-4 shadow-sm dark:bg-neutral-900/80">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={title}
          onChange={e => handleChange(e)}
          onKeyDown={e => handleKeyDown(e)}
          placeholder="할 일을 입력하세요"
          className="flex-1 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-cyan-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:border-cyan-700 dark:bg-neutral-800 dark:text-white md:text-base"
        />
        <button
          onClick={handleAdd}
          className="rounded-xl bg-cyan-600 px-4 py-2.5 font-medium text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 md:px-5"
        >
          추가
        </button>
      </div>
    </div>
  );
}

export default TodoAdd;
