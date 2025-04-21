import { useState, useEffect } from 'react';
import './App.css';
import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { FaFaceSmileWink } from 'react-icons/fa6';

function App() {
  const [todos, setTodos] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const [time, setTime] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  const addTodo = (todo) => {
    const result = [...todos, todo];
    setTodos(result);
  };

  const removeTodo = (id) => {
    const result = todos.filter(el => el.id !== id);
    setTodos(result);
  };

  const editTodo = (id) => {
    const todo = todos.find(el => el.id === id);
    setCurrentTodo(todo);
    setEditedText(todo.title);
    setModal(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = { title: formData.get("title"), id: Date.now() };
    if (!title) {
      return;
    }
    addTodo(res);
    e.target.reset();
  };

  const saveEditedTodo = () => {
    const updated = todos.map(el =>
      el.id === currentTodo.id ? { ...el, title: editedText } : el
    );
    setTodos(updated);
    setModal(false);
  };

  return (
    <div className='app'>
      <h1>To Do List</h1>
      <form onSubmit={handleClick}>
        <div className='informations'>
          <input autoFocus placeholder='Please enter a word...' type="text" name="title" />
          <button>submit</button>
        </div>
      </form>
      <div className="date">
        <span>{month} / {day} / {year}, {hours}:{minutes}:{seconds}</span>
      </div>
      <div className="list">
        <ul>
          {todos.length > 0 ?
            todos.map(({ title, id }) => {
              return (
                <li key={id}>{title}
                  <div className="btns">
                    <button onClick={() => { editTodo(id) }}><CiEdit className='edit' /></button>
                    <button onClick={() => removeTodo(id)}><MdDeleteOutline className='delete' /></button>
                  </div>
                </li>
              )
            }) : <h2>Malumot mavjud emas
              <span><FaFaceSmileWink /></span>
            </h2>
          }
        </ul>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Ma'lumotni tahrirlash</h3>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              autoFocus
            />
            <div className="modal-buttons">
              <button onClick={saveEditedTodo}>Save</button>
              <button onClick={() => setModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
