import React from 'react';
import Box from '@mui/system/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Todo.css';

const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#fff',
        background: 'rgb(106 102 101)',
        padding: '5px',
        marginBottom: '15px',
        height: "45px",
        borderRadius: "5px",
        width: "410px !important"
      }}
    >
      <Box sx={{padding: "10px", cursor: "pointer"}}><p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ""}`}>{task.task}</p></Box>
      {/* <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ""}`}>{task.task}</p> */}
      <Box sx={{display: "flex", flexDirection: "row", padding: "10px"}}>
        <IconButton aria-label="edit">
          <EditIcon onClick={() => editTodo(task.id)} />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={() => deleteTodo(task.id)} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Todo;
