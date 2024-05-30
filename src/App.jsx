import React, { useState, useEffect } from 'react';
import './App.css'; 

function getTodoListFromLocalStorage() {
  try {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList && storedTodoList.length > 0) {
      return JSON.parse(storedTodoList);
    } else {
      return []; 
    }
  } catch (error) {
    console.error('Error retrieving todo list from localStorage:', error);
    return []; 
  }
}

function TodoList() {
  const [todoList, setTodoList] = useState(getTodoListFromLocalStorage());

  
  // useEffect(() => {
  //   localStorage.setItem('todoList', JSON.stringify(todoList));
  // }, [todoList]);

  function handleAddTodo() {
    const userInputElement = document.getElementById('todoUserInput');
    const userInputValue = userInputElement.value.trim();

    if (userInputValue === '') {
      alert('Enter a valid task');
      return;
    }

    const newTodo = {
      text: userInputValue,
      uniqueNo: todoList.length + 1,
      isChecked: false,
    };

    setTodoList((prevList) => [...prevList, newTodo]);
    userInputElement.value = '' 
  }

  function handleTodoStatusChange(todoId) {
    setTodoList((prevList) =>
      prevList.map((todo) =>
        todo.uniqueNo === todoId ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  }

  function handleDeleteTodo(todoId) {
    setTodoList((prevList) =>
      prevList.filter((todo) => todo.uniqueNo !== todoId)
    );
  }

  function handleSavetodo() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  return (
    <div className="todos-bg-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="todos-heading">Todos</h1>
            <h1 className="create-task-heading">
              Create <span className="create-task-heading-subpart">Task</span>
            </h1>
            <input
              type="text"
              id="todoUserInput"
              className="todo-user-input"
              placeholder="What needs to be done?"
            />
            <button className="button" id="addTodoButton" onClick={handleAddTodo}>
              Add
            </button>
            <h1 className="todo-items-heading">
              My <span className="todo-items-heading-subpart">Tasks</span>
            </h1>
            <ul className="todo-items-container" id="todoItemsContainer">
              {todoList.map((todo, index) => (
                <TodoItem
                  key={index}
                  todo={todo}
                  onTodoStatusChange={handleTodoStatusChange}
                  onDeleteTodo={handleDeleteTodo}
                />
              ))}
            </ul>
            <button className="button" id="saveTodoButton" onClick={handleSavetodo}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TodoItem({ todo, onTodoStatusChange, onDeleteTodo }) {
  const { text, uniqueNo, isChecked } = todo;
  const checkboxId = `checkbox${uniqueNo}`;
  const labelId = `label${uniqueNo}`;

  return (
    <li className="todo-item-container d-flex flex-row">
      <input
        type="checkbox"
        id={checkboxId}
        checked={isChecked}
        onChange={() => onTodoStatusChange(uniqueNo)}
        className="checkbox-input"
      />
      <div className="label-container">
        <label htmlFor={checkboxId} id={labelId} className={`checkbox-label ${isChecked ? 'checked' : ''}`}>
          {text}
        </label>
        <i
          className="far fa-trash-alt delete-icon"
          onClick={() => onDeleteTodo(uniqueNo)}
        />
      </div>
    </li>
  );
}

export default TodoList;
