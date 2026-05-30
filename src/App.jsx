import { useState, useEffect } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoFilters from './components/TodoFilters';
import TodoItem from './components/TodoItem';
import EditTodoModal from './components/EditTodoModal';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState('all');
  const [isDark, setIsDark] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const themeStyles = {
    backgroundColor: isDark ? '#1a1a2e' : '#f5f5f5',
    color: isDark ? '#e0e0e0' : '#333',
    minHeight: '100vh',
    transition: 'all 0.3s'
  };

  const cardStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: isDark ? '#16213e' : '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  return (
    <div style={themeStyles}>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
        <div style={cardStyles}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ margin: 0, color: isDark ? '#e0e0e0' : '#333' }}>Менеджер задач</h1>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{
                padding: '6px 12px',
                background: isDark ? '#e0e0e0' : '#333',
                color: isDark ? '#333' : '#e0e0e0',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {isDark ? '☀️ Светлая' : '🌙 Тёмная'}
            </button>
          </div>

          <AddTodoForm onAdd={addTodo} />

          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
          />

          {filteredTodos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999' }}>
              {filter === 'all' ? 'Задач пока нет' :
               filter === 'active' ? 'Нет активных задач' : 'Нет выполненных задач'}
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {filteredTodos.map(todo => (
                <TodoItem
                  key={todo.id}
                  task={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={(id) => setEditingTask(todos.find(t => t.id === id))}
                />
              ))}
            </ul>
          )}

          {todos.length > 0 && (
            <button
              onClick={() => setTodos([])}
              style={{
                marginTop: '20px',
                padding: '8px 16px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Очистить всё
            </button>
          )}
        </div>
      </div>

      {editingTask && (
        <EditTodoModal
          task={editingTask}
          onSave={editTodo}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;
