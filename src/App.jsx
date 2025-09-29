import { useRef, useState } from "react";
import TimeDisplay from "./TimeDisplay";
import QuoteComponent from "./QuoteComponent";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "영어 공부", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: true },
  ]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo 관리 앱</h1>
        <p>할 일을 효율적으로 관리해보세요.</p>
        <TimeDisplay />
        <QuoteComponent />
      </header>
      <div className="container">
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
        <TodoList todoList={todoList} setTodoList={setTodoList} />
      </div>
    </div>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  return (
    <div className="todo-input">
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="새로운 할 일을 입력하세요"
      />
      <button
        onClick={() => {
          if (!inputValue.trim()) return; // 빈 값 방지
          const newTodo = {
            id: Date.now(),
            content: inputValue,
            completed: false,
          };
          setTodoList([...todoList, newTodo]);
          setInputValue("");
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        추가하기
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  const handleToggleComplete = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, completed: !el.completed } : el
      )
    );
  };

  const handleEditSave = () => {
    if (isEditing) {
      setTodoList((prev) =>
        prev.map((el) =>
          el.id === todo.id ? { ...el, content: inputValue } : el
        )
      );
    }
    setIsEditing((prev) => !prev);
  };

  const handleDelete = () => {
    setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleEditSave();
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      {isEditing ? (
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      ) : (
        <span>{todo.content}</span>
      )}
      <div className="todo-buttons">
        <button onClick={handleEditSave}>{isEditing ? "저장" : "수정"}</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </li>
  );
}

export default App;
