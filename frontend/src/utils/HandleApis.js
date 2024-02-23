import axios from "axios";

const baseURL = "http://localhost:5000";

export const getAllToDo = async (setToDo) => {
  try {
    await axios.get(baseURL).then(({ data }) => {
      console.log("Data----", data);
      setToDo(data);
    });
  } catch (error) {
    console.log(error.message, "Error in getalltodo ");
  }
};

export const addToDo = async (text, setText, setToDo) => {
  try {
    await axios.post(`${baseURL}/save`, { text }).then((data) => {
      console.log(data);
      setText("");
      getAllToDo(setToDo);
    });
  } catch (error) {
    console.log(error.message, "error in add to do");
  }
};

export const updateTodo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  try {
    axios.put(`${baseURL}/update/${toDoId}`, { text }).then((data) => {
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
    });
  } catch (error) {
    console.log(error.message, "Error in update to do ");
  }
};

export const deleteToDo = (toDoId, setToDo) => {
  try {
    axios
      .delete(`${baseURL}/delete/${toDoId}`)
      .then((data) => {
        getAllToDo(setToDo);
      })
      .catch((error) => {
        console.log(error.message, "Error in delete to do");
      });
  } catch (error) {
    console.log(error.message);
  }
};

const HandleApis = { getAllToDo, addToDo, updateTodo, deleteToDo };

export default HandleApis;
