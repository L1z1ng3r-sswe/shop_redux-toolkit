import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ECategory, TCategory, TTodos } from "../redux/features/CrudSlice/type";
import { useDispatch } from "react-redux";
import CustomButton from "./CustomButton";
import { RootDispatch } from "../redux/Store";
import { deleteTodos, editCategoryTodos } from "../redux/features/CrudSlice";

interface IProps {
  todos: TTodos;
}

const TodoItem: React.FC<IProps> = ({ todos }) => {
  const dispatch = useDispatch<RootDispatch>();

  function handleDone() {
    dispatch(deleteTodos(todos.id));
  }
  function handleToDo() {
    const newCategory: TCategory = {
      category: ECategory.todo,
      id: todos.id,
    };
    dispatch(editCategoryTodos(newCategory));
  }
  function handleInProcess() {
    const newCategory: TCategory = {
      category: ECategory.inProcess,
      id: todos.id,
    };
    dispatch(editCategoryTodos(newCategory));
  }

  return (
    <TableBody>
      <TableRow
        key={todos.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="todos">
          {todos.text}
        </TableCell>
        <TableCell align="right">{todos.category}</TableCell>

        <TableCell align="right">
          <CustomButton
            color={"blue"}
            h_color={"dodgerblue"}
            text={"To Do"}
            eventFunction={handleToDo}
          ></CustomButton>
        </TableCell>

        <TableCell align="right">
          <CustomButton
            color={"green"}
            h_color={"lightgreen"}
            text={"In Process"}
            eventFunction={handleInProcess}
          />
        </TableCell>

        <TableCell align="right">
          <CustomButton
            color={"red"}
            h_color={"#FF3333"}
            text={"Done"}
            eventFunction={handleDone}
          />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TodoItem;
