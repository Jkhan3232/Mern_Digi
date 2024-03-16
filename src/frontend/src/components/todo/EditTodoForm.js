import React, { useState } from 'react';
import Box from '@mui/system/Box';

const EditTodoForm = ({editTodo, task}) => {

    const [values, setValues] = useState(task.task);

    const handleSubmit = (e) => {
        e.preventDefault();

        editTodo(values, task.id);

        // setValues('');
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        background: '#1c1616',
        textAlign: 'left',
        alignItems: 'center',
        maxHeight: '100vh',
        margin: "12px",
      }}
    >
    {/* <p style={{fontSize: "40px", color: "#fff",marginTop: "-20px" }}>Get things done!</p> */}
      <form
      onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        //   marginTop: '20px',
          justifyContent: 'space-between',
        }}
      >
        <input
          type="text"
          placeholder="Update Task"
          value={values}
          style={{
            padding: '10px',
            fontSize: '16px',
            // marginTop: '-10px',
            width: '280px',
            border: '2px solid rgb(106 102 101)', // Set border to be visible
            // background: "linear-gradient(#2A00B7, #42006C)",
            backgroundColor: 'transparent', // Make background transparent
            color: '#fff', // Set font color
            outline: "none",
          }}
          onChange={(e) => setValues(e.target.value)}
        />
        <button
        onClick={handleSubmit}
          type="button"
          style={{
            padding: '12px 20px',
            // marginTop: '-10px',
            marginLeft: "1px",
            fontSize: '16px',
            backgroundColor: 'rgb(106 102 101)',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            display: 'flex',
          }}
        >
          Update
        </button>
      </form>
      {/* <Todo/> */}
    </Box>
  );
};

export default EditTodoForm;
