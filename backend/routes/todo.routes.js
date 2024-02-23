import express from "express";
const router = express.Router();
import {
  createTodo,
  updateTodo,
  getAllTodo,
  getTodoById,
  deleteTodo,
} from "../controllers/todo.controllers.js";

router.post("/save", createTodo);
router.put("/update/:id", updateTodo);
router.get("/", getAllTodo);
router.get("/:id", getTodoById);
router.delete("/delete/:id", deleteTodo);

export default router;
