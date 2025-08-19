import { ChangeEvent, useState } from 'react';
import { ITodoType } from './types/todoType';

interface TodoListProps {
  todos: ITodoType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const handleCancle = () => {
    setEditId('');
  };

  // <HTMLInputElement> 이건 왜 안넣어지는거야
  const handleChange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setEditTitle(input.value);
  };

  const handleSave = () => {
    if (!editId) return;
    const newTitle = editTitle.trim();
    if (!newTitle) return; // 제목 비어있으면 무시(선택)
    onEdit(editId, newTitle);
    setEditId('');
    setEditTitle('');
  };

  return (
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
                <input
                  type="checkbox"
                  onChange={() => onToggle(item.id)}
                  checked={item.completed}
                />
                <span
                  className={`min-w-0 flex-1 truncate ${
                    item.completed
                      ? 'text-cyan-400 line-through'
                      : 'text-rose-200 dark:text-gray-100'
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
  );
}

export default TodoList;
