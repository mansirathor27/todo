// App.jsx
import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-8 p-6 bg-violet-100 rounded-3xl shadow-xl min-h-[80vh] md:w-[40%]">
        <h1 className="font-extrabold text-center text-3xl mb-6 text-violet-900">🧠 eTasker - Your Task Hub</h1>

        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add a Todo</h2>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task..."
              className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="transition-all bg-violet-700 hover:bg-violet-900 disabled:bg-violet-400 text-white px-4 py-2 rounded-full font-semibold"
            >
              Save
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-gray-700">
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} className="w-4 h-4 accent-violet-700" />
          <label>Show Finished</label>
        </div>

       
        <h2 className="text-lg font-bold mb-2 text-violet-800">Your Todos</h2>
        <div className="flex flex-col gap-4">
          {todos.length === 0 && (
            <div className="text-gray-500 text-center mt-10">
              <p className="text-lg"> No Todos Yet!</p>
              <p className="text-sm">Add a task above to get started.</p>
            </div>
          )}

          {todos
            .filter((item) => showFinished || !item.isCompleted)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 flex justify-between items-center shadow-md transition hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="w-4 h-4 accent-violet-700"
                  />
                  <span className={`${item.isCompleted ? "line-through text-gray-500" : "text-gray-800"} font-medium`}>
                    {item.todo}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="p-2 text-violet-700 hover:text-white hover:bg-violet-800 rounded-full transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded-full transition"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
