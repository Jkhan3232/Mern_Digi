import { Router } from "express";
// Importing todo controller functions
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
// Importing middleware to verify JWT tokens
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initializing express router
const router = Router();

// Route to add a new todo, protected by JWT verification
router.post("/add-todo", verifyJWT, createTodo);
// Route to get all todos for a user, protected by JWT verification
router.get("/get-todo", verifyJWT, getTodos);

// Route to update a specific todo by ID, protected by JWT verification
router.patch("/update-todo/:todoId", verifyJWT, updateTodo);
// Route to delete a specific todo by ID, protected by JWT verification
router.delete("/delete-todo/:todoId", verifyJWT, deleteTodo);

// Exporting the router to be used in the application
export default router;
