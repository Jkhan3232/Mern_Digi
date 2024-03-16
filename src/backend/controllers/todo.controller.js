import { asyncHandler } from "../utils/AsyncHandaler.js";
import { Todo } from "../model/todo.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError, handleErrorResponse } from "../utils/ApiError.js";

// Create a new todo with status handling
export const createTodo = asyncHandler(async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      throw new ApiError(400, "Title is required");
    }
    const todo = await Todo.create({
      title,
      description,
      status: status || "pending", // Default to "pending" if not provided
      user: req.user._id,
    });
    res
      .status(201)
      .json(new ApiResponse(201, todo, "Todo created successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Get all todos for a user with optional status filter
export const getTodos = asyncHandler(async (req, res) => {
  try {
    const { status } = req.query; // Get status from query parameters
    const query = { user: req.user._id };
    if (status) {
      query.status = status;
    }
    const todos = await Todo.find(query);
    if (!todos.length) {
      throw new ApiError(
        404,
        "No todos found for this user with the specified criteria"
      );
    }
    res
      .status(200)
      .json(new ApiResponse(200, todos, "Todos fetched successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Update a todo with status handling
export const updateTodo = asyncHandler(async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findByIdAndUpdate(todoId, req.body, { new: true });
    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, todo, "Todo updated successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Delete a todo
export const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }
    res.status(200).json(new ApiResponse(200, {}, "Todo deleted successfully"));
  } catch (error) {
    handleErrorResponse(error, res);
  }
});
