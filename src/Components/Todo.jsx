import EmptyImage from '../assets/emptyimage.svg';

import { useState } from "react";

function Todo() {
  const [todo, setTodo] = useState([]);
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
    <div className="bg-[#222] flex flex-col items-center overflow-x-hidden h-screen">
      <div className="flex flex-col items-center justify-center w-full px-4">
        <div className="bg-gray-50 rounded-md flex p-2 gap-2 w-full sm:w-[650px] md:w-[800px] mt-14">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task"
            onKeyDown={(e) => e.key === "Enter" && addTodo()} // Save when Enter is pressed
            className="border border-gray-400 rounded w-full px-2 py-1 focus:outline-none focus:border-[#1b9b85]"
            autoFocus
          />
          <button
            onClick={addTodo}
            className="bg-[#1a9e88] px-4 py-2 rounded text-white text-nowrap active:scale-95"
          >
            Add Task
          </button>
        </div>

        <div className="mt-4 bg-gray-50 px-4 py-2 w-full sm:w-[650px] md:w-[800px] rounded min-h-[400px] max-h-[450px] overflow-y-scroll mx-4">
          <div className="">
            {todo.length === 0 ? (
              <>
              <p className=" text-[16px] text-gray-400 text-center mt-4">
                ( Task is Empty! Add a new Task )
              </p>
              <img src={EmptyImage} alt="Empty task" className='mt-8'/>
              </>
            ) : (
              <div className="border-b pb-2 border-gray-300">
                <div className="text-left flex items-center gap-2 rounded-full py-1.5 w-fit text-gray-600">
                  Total: <p className="font-medium text-[16px] text-[#1a9e88]">{todo.length}</p>
                </div>
              </div>
            )}
          </div>

          {todo.map((item, index) => (
            <div key={index} className="border-b border-gray-300 py-2 w-full pl-2">
              {editingIndex === index ? (
                <div className="bg-gray-100 flex justify-between gap-2 w-full">
                  <div className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveTodo()} // Save when Enter is pressed
                      autoFocus
                      className="border border-gray-400 rounded p-1.5 w-full focus:outline-none focus:border-[#1b9b85]"
                    />
                  </div>
                  <div className="inline-flex gap-2">
                    <button
                      onClick={saveTodo}
                      className="bg-[#1a9e88] px-4 py-2 rounded text-white active:scale-95"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="bg-red-600 hover:bg-red-500 active:scale-95 px-4 py-2 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <div className="flex space-x-2">
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
                      className="bg-gray-500 px-4 py-1.5 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(index)}
                      className="bg-red-600 hover:bg-red-500 active:scale-95 px-4 py-2 rounded text-white"
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
    </div>
  );
}

export default Todo;
