import { ITodoType } from './types/todoType';

interface TodoListProps {
  todos: ITodoType[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  return (
    <div>
      <h2>테스트 중입니다.</h2>
      {todos.length === 0 ? (
        <div>목록이 없습니다.</div>
      ) : (
        <ul>
          {todos.map(item => (
            <li key={item.id}>
              <input type="checkbox" onChange={() => onToggle(item.id)} checked={item.completed} />
              <span>{item.title}</span>
              <button onClick={() => onDelete(item.id)}>삭제</button>
              <button>수정</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
