import { useState } from "react";

const initial = ['dheen', 'sudhar'];

function NewTodo() {
  const [todo, setTodo] = useState(initial);
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodo([...todo, inputValue]);
      setInputValue("");
    } else {
      alert("Add task");
    }
  };

  const deleteTodo = (index) => {
    const updatedTodo = todo.filter((_, i) => i !== index);
    setTodo(updatedTodo);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(todo[index]);
  };

  const saveTodo = () => {
    if (editingIndex !== null && editValue.trim() !== "") {
      const updatedTodo = todo.map((item, index) =>
        index === editingIndex ? editValue : item
      );
      setTodo(updatedTodo);
      setEditingIndex(null);
    }
  };

  return (
    <div className="bg-[#222] h-screen p-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addTodo} className="ml-2">Add</button>

      {todo.map((item, index) => (
        <div key={index} className="mt-4">
          {editingIndex === index ? (
            <div>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={saveTodo} // Save when focus is lost
              />
              <div style={{ display: 'inline-flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={saveTodo}>Save</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            </div>
          ) : (
            <div>
              <p onClick={() => handleEdit(index)}>{item}</p>
              <div style={{ display: 'inline-flex', gap: '8px', marginTop: '4px' }}>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default NewTodo;
