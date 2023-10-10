"use client";

import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {todoActions} from "@/redux/features/todo-slice";

function TodoList() {
  const todoList = useSelector((state: RootState) => state.todoReducer.list);
  const dispatch = useDispatch<AppDispatch>();
  const [todo, setTodo] = React.useState("");

  const handleSubmit = () => {
    dispatch(
      todoActions.addTodo({
        id: Date.now(),
        name: todo,
        done: false,
      })
    );
    setTodo("");
  };

  const handleDelete = (id: number) => {
    dispatch(todoActions.removeTodo(id));
  };

  const handleToggle = (id: number) => {
    dispatch(todoActions.toggleTodo(id));
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={handleSubmit}>Add</button>
      {todoList.map((todo) => {
        return (
          <div key={todo.id} className="flex">
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.name}
            <button onClick={() => handleDelete(todo.id)} className="ml-auto">
              🗑️
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;