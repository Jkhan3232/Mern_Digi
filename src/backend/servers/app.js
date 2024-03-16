import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

//routes import
import userRouter from "../routes/user.routs.js";
import todoRouter from "../routes/todo.routes.js";
//routes declaration

app.use("/api/v1/users", userRouter);
// After userRouter
app.use("/api/v1/todos", todoRouter);

// http://localhost:8000/api/v1/

export { app };
