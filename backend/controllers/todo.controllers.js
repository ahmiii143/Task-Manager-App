import { ToDo } from "../models/todo.models.js";
export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      console.log(error.message, "Error in create todo controller");
      res.status(400).json({ message: "Text is required" });
    }
    const newTodo = new ToDo({ text });
    await newTodo.save();
    return res
      .status(201)
      .json({ message: "New Todo Created Successfully", data: newTodo });
  } catch (error) {
    console.log(error.message, "Error in create todo controller");
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;

    const { text } = req.body;
    const updatedTodo = await ToDo.findByIdAndUpdate(
      todoId,
      {
        $set: {
          text: text,
        },
      },
      { new: true }
    );
    if (!updatedTodo) {
      console.log("Error in update todo controller: Task not found");
      return res.status(401).json({ message: "Task not found" });
    }
    return res
      .status(201)
      .json({ message: "Task Updated Successfully", data: updatedTodo });
  } catch (error) {
    console.log(error.message, "Error in update todo controller");
    res.status(502).json({ message: "Internal Server Error" });
  }
};
export const getAllTodo = async (req, res) => {
  try {
    const allTodo = await ToDo.find();
    if (!allTodo) {
      console.log(error.message, "Task not found");
      return res.status(401).json({ message: "Task not found" });
    }
    return res.status(201).json(allTodo);
  } catch (error) {
    console.log(error.message, "Error in get all todo Controller");
    res.status(501).json({ message: "Internal Server Error" });
  }
};
export const getTodoById = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const todoById = await ToDo.findById(todoId);
    if (!todoById) {
      console.log(error.message, "Task not found");
      res.status(404).json({ message: "Task Not Found" });
    }
    return res.status(201).json(todoById);
  } catch (error) {
    console.log(error.message, "Error in getTodoById controller");
    res.status(501).json({ message: "Internal Server Error" });
  }
};
export const deleteTodo = async (req, res) => {
  try {
    const { id: todoId } = req.params;
    const deletetodo = await ToDo.findByIdAndDelete(todoId);
    if (!deleteTodo) {
      res.status(401).json({ message: "Task not found" });
    }
    return res.status(201).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    console.log(error.message, "Error in delete todo controller");
    res.status(501).json({ message: "Internal Server Error" });
  }
};

export default { createTodo, updateTodo, getAllTodo, getTodoById, deleteTodo };
