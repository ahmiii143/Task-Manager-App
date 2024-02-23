import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { dbConnection } from "./dbConnection/dbConnection.js";
import todoRoutes from "./routes/todo.routes.js";
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

app.use("/", todoRoutes);
app.listen(PORT, (req, res) => {
  dbConnection();
  console.log(`Server is running on the Port ${PORT}`);
});
