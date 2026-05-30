import { useState, useEffect } from 'react';

function EditTodoModal({ task, onSave, onClose }) {
  const [text, setText] = useState(task.text);

  useEffect(() => {
    setText(task.text);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSave(task.id, text.trim());
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white', borderRadius: '8px', padding: '24px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{ marginTop: 0 }}>Редактировать задачу</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            style={{
              width: '100%', padding: '8px', borderRadius: '4px',
              border: '1px solid #ddd', boxSizing: 'border-box', marginBottom: '12px'
            }}
          />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{
              padding: '8px 16px', background: '#f0f0f0', border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>Отмена</button>
            <button type="submit" style={{
              padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTodoModal;
