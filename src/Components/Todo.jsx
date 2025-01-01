import { useState } from 'react';
import deleteIcon from '../assets/delete-icon.png';
import saveIcon from '../assets/save-icon.png';
import addIcon from '../assets/add-icon.png';

function App() {
  const [todos, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [IndexValue, setIndexValue] = useState("");
  const [EditValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodo([...todos, inputValue]);
      setInputValue("");  
    }
    else {
        alert('Cannot add empty task or list!')
    }
  };

  const deleteTodo = (index) => {
    setIndexValue("");
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodo(updatedTodos);
  };

  const handleOnSave = () => {
    const updatedTodos = [...todos];
    updatedTodos[IndexValue] = EditValue;
    setTodo(updatedTodos);
    setIndexValue("");
  };

  const handleOnClick = (index) => {
    setIndexValue(index);
    /* const updatedTodos = [...todos]; */
    setEditValue(() => todos[index]);
  };

  return (
    <div className='h-screen w-screen bg-[#222] flex flex-col justify-center items-center overflow-y-hidden overflow-x-hidden'>
      <div className=' w-[22rem] md:w-[35rem] h-auto bg-white border rounded-md'>
        {/* <h1 className='flex justify-center items-center text-[24px] font-bold text-gray-500'>Todo Application</h1> */}
        <div className='h-[4rem] flex items-center justify-between px-4 space-x-4'>
          <input
            type="text"
            placeholder='Add your list...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='px-2 w-full h-[38px] border border-gray-200 rounded-md focus:border-gray-400 focus:rounded-md focus:outline-none'
          />
          <button
            className='flex items-center justify-center space-x-1 px-5 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium active:scale-95'
            onClick={addTodo}
          >
            <img src={addIcon} alt="add" className='h-[22px] pt-0.5'/>
            <p className='pr-0.5'>Add</p>
          </button>
        </div>
        <div className="max-h-[28rem] overflow-y-scroll bg-white">
  {todos.map((item, index) => (
    <div
      className="h-[60px] w-full flex justify-center items-center px-4 md:px-4"
      key={index}
    >
      <div className="border-t w-full h-[60px] flex justify-between items-center space-x-2">
        {IndexValue === index ? (
          <div className="flex items-center w-full space-x-2">
            {/* Editable Input */}
            <input
              type="text"
              value={EditValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-[38px] flex-grow border focus:border-gray-400 focus:rounded-md focus:outline-none rounded-md px-2 overflow-hidden text-ellipsis whitespace-nowrap"
            />
            {/* Save Icon */}
            <img
              src={saveIcon}
              alt="save"
              className="p-2 h-[36px] bg-green-100 hover:bg-green-200 rounded-md text-white font-normal lg:font-medium active:scale-95 cursor-pointer"
              onClick={handleOnSave}
            />
            {/* Delete Icon */}
            <img
              src={deleteIcon}
              alt="delete"
              className="p-2 h-[36px] bg-red-100 hover:bg-red-200 rounded-md text-white font-normal lg:font-medium active:scale-95 cursor-pointer"
              onClick={() => deleteTodo(index)}
            />
          </div>
        ) : (
          <div className="flex items-center w-full space-x-2">
            {/* Non-Editable Text */}
            <h1
              className="h-[40px] flex-grow flex items-center px-2 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
              onClick={() => handleOnClick(index)}
            >
              {item}
            </h1>
            {/* Delete Icon */}
            <img
              src={deleteIcon}
              alt="delete"
              className="p-2 h-[36px] bg-red-100 hover:bg-red-200 rounded-md text-white font-normal lg:font-medium active:scale-95 cursor-pointer"
              onClick={() => deleteTodo(index)}
            />
          </div>
        )}
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default App;