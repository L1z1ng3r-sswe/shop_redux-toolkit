import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../redux/features/CrudSlice";
import TodoItem from "../../components/TodoItem";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TTodos } from "../../redux/features/CrudSlice/type";
import CircularProgress from "@mui/material/CircularProgress";
import { RootDispatch, RootState } from "../../redux/Store";

const HomePage = () => {
  const { todos, status, error } = useSelector(
    (state: RootState) => state.todos
  );
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (error && status === "error") {
    return <div>{error}</div>;
  }

  if (status === "loading") {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="warning" size={48} />
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Case</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Button</TableCell>
            <TableCell align="right">Button</TableCell>
            <TableCell align="right">Button</TableCell>
          </TableRow>
        </TableHead>
        {todos.map((todo: TTodos) => (
          <TodoItem todos={todo} key={todo.id} />
        ))}
      </Table>
    </TableContainer>
  );
};

export default HomePage;
