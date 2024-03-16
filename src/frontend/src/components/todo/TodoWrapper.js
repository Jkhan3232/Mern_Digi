import React, { useState } from "react";
import Box from "@mui/system/Box";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";
import Navbar from "../navbar/Navbar";
uuidv4();

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
    console.log(todos);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(todos.map((todo) => todo.id === id ? {...todo, task, isEditing : !todo.isEditing} : todo))
  }

  return (
    <>   
          <Box sx={{height: "12vh"}}> <Navbar /></Box>
    {/* <Box sx={{background: "linear-gradient(#2A00B7, #42006C)",
    height: "100vh",
    // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
    }}> */}
      {/* <Navbar/> */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        background: "linear-gradient(#2A00B7, #42006C)",
        // flexDirection: "column",
        textAlign: "left",
        alignItems: "center",
        height: "87.9vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#1c1616",
          // flexDirection: "column",
          textAlign: "left",
          alignItems: "center",
          maxHeight: "100vh",
        }}
      >
        {/* <p style={{fontSize: "40px"}}>Todo List</p> */}
        {/* <Box sx={{ marginBottom: todos.some((todo) => todo.isEditing) ? "-20px" : "0px" }}> */}
          <TodoForm addTodo={addTodo} />
        {/* </Box> */}
        <Box sx={{ paddingBottom: "25px" }}>
          {todos.map((todo, index) => (
            todo.isEditing ? ( <Box sx={{marginTop: "0px"}} ><EditTodoForm editTodo={editTask} task={todo} /></Box> ) : (
                <Todo
              task={todo}
              key={index}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
            )
          ))}
        </Box>
      </Box>
    </Box>
    {/* </Box> */}
    </>

  );
};

export default TodoWrapper;
