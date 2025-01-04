import { useState } from "react";

const initalLists = ['Hi Dev\'s, Dheen Here'] 

function Todo() {
  const [todo, setTodo] = useState(initalLists);
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
      setEditValue("");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(todo[index]);
  };

  const saveTodo = () => {
    if (editValue.trim() !== "") {
      const updatedTodo = todo.map((item, index) =>
        index === editingIndex ? editValue : item
      );
      setTodo(updatedTodo);
      setEditingIndex(null); // Reset editingIndex after saving
      setEditValue(""); // Clear editValue after saving
    } else {
      alert("Task cannot be empty!");
    }
  };

  return (
    <div className="bg-[#222] h-screen p-4">
      <div className="bg-gray-50 rounded-md flex p-2 gap-2 w-[400px] mx-auto mt-14">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new task"
          onKeyDown={(e) =>
            e.key === "Enter" && addTodo() // Save when Enter is pressed
          }
          className="border border-gray-400 rounded w-full px-2 focus:outline-none focus:border-gray-600"
          autoFocus
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 px-2 py-1.5 rounded text-white text-nowrap"
        >
          Add Item
        </button>
      </div>

      <div className="mt-4 bg-gray-50 px-4 py-2 max-w-[400px] rounded min-h-[400px] max-h-[450px] overflow-y-scroll mx-auto">
        <div className="relative">
          {todo.length === 0 ? (
            <p className="sticky text-[16px] text-gray-400 mt-[10em] ml-[5.8em]">
              ( Task is Empty! Add new Task )
            </p>
          ) : (
            <div className="border-b pb-2 border-gray-300">
              <div className="text-left flex items-center gap-2 bg-gray-500 rounded px-2 py-1.5 w-fit text-gray-50">
                Total Task: <p className="font-medium">{todo.length}</p>
              </div>
            </div>
          )}
        </div>

        {todo.map((item, index) => (
          <div key={index} className="border-b border-gray-300 py-2">
            {editingIndex === index ? (
              <div className="bg-gray-100 flex justify-between gap-2">
                <div className="inline-flex items-center gap-1">
                  {/* <p>{index + 1})</p> */}
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    // onBlur={saveTodo} // Save when focus is lost
                    onKeyDown={(e) =>
                      e.key === "Enter" && saveTodo() // Save when Enter is pressed
                    }
                    autoFocus
                    className="border border-gray-400 rounded p-1.5 w-full focus:outline-none focus:border-gray-600"
                  />
                </div>
                <div className="inline-flex gap-2">
                  <button
                    onClick={saveTodo}
                    className="bg-[#008916] px-4 py-1.5 rounded text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="bg-[#DC143C] px-4 py-1.5 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="flex space-x-2">
                  {/* <p>{index + 1})</p> */}
                  <p
                    onClick={() => handleEdit(index)}
                    className="font-normal cursor-pointer"
                  >
                    {item}
                  </p>
                </div>

                <div className="inline-flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-[#008916] px-4 py-1.5 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(index)}
                    className="bg-[#DC143C] px-4 py-1.5 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
