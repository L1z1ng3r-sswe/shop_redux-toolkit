import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./AddPage.module.scss";
import { AppDispatch } from "../../redux/Store";
import { TProduct, ECategory } from "../../redux/features/ProductsSlice/types";
import { Navigate, useNavigate } from "react-router-dom";
import { addProduct } from "../../redux/features/ProductsSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const AddPage = () => {
  const [user, setUser] = useState<null | string>(null);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<ECategory>(ECategory.car);

  const dispatch = AppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      return <Navigate to="/" />;
    }
    setUser(data.email);
  }, []);

  function handleSubmit(e: any): void {
    e.preventDefault();

    //! date generate starts
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const addDate = `${day}/${month}/${year}`;
    //! date generate ends

    const product: TProduct = {
      title: title,
      img: img,
      description: description,
      price: +price,
      category: category,
      likes: [],
      user,
      date: addDate,
    };

    dispatch(addProduct(product));
    setUser("");
    setTitle("");
    setImg("");
    setDescription("");
    setPrice("");
    setCategory(ECategory.car);

    navigate("/");
  }

  function handleChange(event: React.MouseEvent<HTMLInputElement>) {
    setCategory(event.target.value);
  }

  //todo +++++++++++++++++++++++++++++++++++++++++++++++ return ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles["login-box"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-box"]}>
            <input
              required
              name="email"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Title</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              required
              name="email"
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <label>Img</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Price</label>
          </div>
          <FormControl
            fullWidth
            sx={{
              borderBottom: "2px solid white",
            }}
          >
            <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
              Age
            </InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="category"
              onChange={handleChange}
            >
              <MenuItem value={ECategory.car}>Cars</MenuItem>
              <MenuItem value={ECategory.garden}>Gardens</MenuItem>
              <MenuItem value={ECategory.food}>Cooking</MenuItem>
              <MenuItem value={ECategory.home}>House</MenuItem>
            </Select>
          </FormControl>

          <a onClick={handleSubmit} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Add
          </a>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
